import axios from 'axios';

const BASE_URL = 'https://api.cricapi.com/v1';

class CricketApiService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: BASE_URL,
      params: { apikey: apiKey },
    });
  }

  async getCurrentMatches() {
    try {
      const { data } = await this.client.get('/currentMatches');
      if (data.status !== 'success') throw new Error(data.info || 'API Error');
      return data.data || [];
    } catch (err) {
      console.error('Failed to fetch current matches:', err.message);
      return [];
    }
  }

  async getMatchInfo(matchId) {
    try {
      const { data } = await this.client.get('/match_info', {
        params: { id: matchId },
      });
      if (data.status !== 'success') throw new Error(data.info || 'API Error');
      return data.data;
    } catch (err) {
      console.error(`Failed to fetch match ${matchId}:`, err.message);
      return null;
    }
  }

  async getMatchScorecard(matchId) {
    try {
      const { data } = await this.client.get('/match_scorecard', {
        params: { id: matchId },
      });
      if (data.status !== 'success') throw new Error(data.info || 'API Error');
      return data.data;
    } catch (err) {
      console.error(`Failed to fetch scorecard ${matchId}:`, err.message);
      return null;
    }
  }

  async getSeriesList() {
    try {
      const { data } = await this.client.get('/series');
      if (data.status !== 'success') throw new Error(data.info || 'API Error');
      return data.data || [];
    } catch (err) {
      console.error('Failed to fetch series:', err.message);
      return [];
    }
  }

  async getPlayerInfo(playerId) {
    try {
      const { data } = await this.client.get('/players_info', {
        params: { id: playerId },
      });
      if (data.status !== 'success') throw new Error(data.info || 'API Error');
      return data.data;
    } catch (err) {
      console.error(`Failed to fetch player ${playerId}:`, err.message);
      return null;
    }
  }

  // Transform API match data to our schema format
  static transformMatch(apiMatch) {
    const teams = apiMatch.teamInfo || [];
    const team1Info = teams[0] || {};
    const team2Info = teams[1] || {};

    return {
      apiMatchId: apiMatch.id,
      matchTitle: apiMatch.name,
      seriesName: apiMatch.series || 'Unknown Series',
      venue: apiMatch.venue,
      date: apiMatch.date,
      status: apiMatch.matchStarted
        ? apiMatch.matchEnded ? 'completed' : 'live'
        : 'upcoming',
      result: apiMatch.status,
      team1: {
        name: team1Info.name || apiMatch.teams?.[0] || 'Team 1',
        shortName: team1Info.shortname || '',
        logo: team1Info.img || '',
        playingXI: [],
      },
      team2: {
        name: team2Info.name || apiMatch.teams?.[1] || 'Team 2',
        shortName: team2Info.shortname || '',
        logo: team2Info.img || '',
        playingXI: [],
      },
      innings: (apiMatch.score || []).map(s => ({
        battingTeam: s.inning?.replace(' Inning 1', '').replace(' Inning 2', '') || '',
        totalRuns: s.r || 0,
        totalWickets: s.w || 0,
        totalOvers: s.o?.toString() || '0',
        batters: [],
        bowlers: [],
      })),
    };
  }
}

export default CricketApiService;
