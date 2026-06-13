import cron from 'node-cron';
import CricketApiService from './cricketApi.js';
import Match from '../models/Match.js';

class MatchScheduler {
  constructor(io) {
    this.io = io;
    this.apiService = null;
    this.job = null;
  }

  init(apiKey) {
    if (!apiKey) {
      console.log('No CRICKET_API_KEY set — scheduler disabled. Add matches manually.');
      return;
    }

    this.apiService = new CricketApiService(apiKey);

    // Poll every 15 minutes (96 hits/day, within free tier limit of 100)
    this.job = cron.schedule('*/15 * * * *', () => this.fetchAndUpdate());
    console.log('Match scheduler started — polling every 15 minutes');

    // Initial fetch on startup
    this.fetchAndUpdate();
  }

  async fetchAndUpdate() {
    if (!this.apiService) return;

    try {
      console.log('[Scheduler] Fetching current matches...');
      const matches = await this.apiService.getCurrentMatches();

      for (const apiMatch of matches) {
        const transformed = CricketApiService.transformMatch(apiMatch);

        const existing = await Match.findOne({ apiMatchId: apiMatch.id });

        if (existing) {
          // Check for milestones before updating
          this.detectMilestones(existing, transformed);

          await Match.findOneAndUpdate(
            { apiMatchId: apiMatch.id },
            { $set: transformed },
            { new: true }
          );
        } else {
          await Match.create(transformed);
        }
      }

      // Broadcast update to all connected clients
      this.io.emit('matches:updated');
      console.log(`[Scheduler] Updated ${matches.length} matches`);
    } catch (err) {
      console.error('[Scheduler] Error:', err.message);
    }
  }

  detectMilestones(oldMatch, newMatch) {
    // Compare innings to detect new milestones
    for (let i = 0; i < newMatch.innings.length; i++) {
      const newInnings = newMatch.innings[i];
      const oldInnings = oldMatch.innings[i];

      if (!newInnings?.batters || !oldInnings?.batters) continue;

      for (const batter of newInnings.batters) {
        const oldBatter = oldInnings.batters?.find(b => b.name === batter.name);
        const oldRuns = oldBatter?.runs || 0;

        // Detect 50 milestone
        if (oldRuns < 50 && batter.runs >= 50 && batter.runs < 100) {
          this.io.emit('milestone:fifty', {
            player: batter.name,
            runs: batter.runs,
            balls: batter.balls,
            isNotOut: batter.isNotOut,
            team: newInnings.battingTeam,
            match: newMatch.matchTitle,
          });
        }

        // Detect 100 milestone
        if (oldRuns < 100 && batter.runs >= 100) {
          this.io.emit('milestone:century', {
            player: batter.name,
            runs: batter.runs,
            balls: batter.balls,
            isNotOut: batter.isNotOut,
            team: newInnings.battingTeam,
            match: newMatch.matchTitle,
          });
        }
      }

      // Detect 5-wicket haul
      for (const bowler of newInnings.bowlers || []) {
        const oldBowler = oldInnings.bowlers?.find(b => b.name === bowler.name);
        const oldWickets = oldBowler?.wickets || 0;

        if (oldWickets < 5 && bowler.wickets >= 5) {
          this.io.emit('milestone:fiveWickets', {
            player: bowler.name,
            wickets: bowler.wickets,
            runs: bowler.runsConceded,
            overs: bowler.overs,
            team: newInnings.bowlingTeam,
            match: newMatch.matchTitle,
          });
        }
      }
    }
  }

  stop() {
    if (this.job) {
      this.job.stop();
      console.log('Match scheduler stopped');
    }
  }
}

export default MatchScheduler;
