import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { getMatch } from '@/services/api';
import { getTeam } from '@/data/teams';
import PlayingXI from '@/components/graphics/PlayingXI';
import Scorecard from '@/components/graphics/Scorecard';
import MilestoneCard from '@/components/graphics/MilestoneCard';
import WicketCard from '@/components/graphics/WicketCard';
import MatchResult from '@/components/graphics/MatchResult';
import { formatTopScorer, formatTopWicketTaker } from '@/lib/utils';

export default function MatchCenter() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMatch(id)
      .then(setMatch)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">Match not found</p>
        <Link to="/"><Button variant="outline" className="mt-4">Back to Dashboard</Button></Link>
      </div>
    );
  }

  const t1 = getTeam(match.team1?.name);
  const t2 = getTeam(match.team2?.name);

  // Detect milestones in innings
  const milestones = [];
  match.innings?.forEach((innings, idx) => {
    innings.batters?.forEach(batter => {
      if (batter.runs >= 100) {
        milestones.push({ type: 'century', player: batter, team: innings.battingTeam, opponent: innings.bowlingTeam });
      } else if (batter.runs >= 50) {
        milestones.push({ type: 'fifty', player: batter, team: innings.battingTeam, opponent: innings.bowlingTeam });
      }
    });
    innings.bowlers?.forEach(bowler => {
      if (bowler.wickets >= 5) {
        milestones.push({ type: 'fiveWickets', player: bowler, team: innings.bowlingTeam, opponent: innings.battingTeam });
      }
    });
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="font-display text-2xl font-bold">
            {t1.name} vs {t2.name}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{match.seriesName}</span>
            {match.status === 'live' && <Badge variant="live">LIVE</Badge>}
            {match.status === 'completed' && <Badge variant="success">Completed</Badge>}
          </div>
        </div>
      </div>

      {/* Graphics Tabs */}
      <Tabs defaultValue="playing-xi">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="playing-xi">Playing XI</TabsTrigger>
          <TabsTrigger value="innings-1">1st Innings</TabsTrigger>
          <TabsTrigger value="innings-2">2nd Innings</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="result">Result</TabsTrigger>
        </TabsList>

        <TabsContent value="playing-xi" className="mt-6">
          <PlayingXI
            team1={match.team1}
            team2={match.team2}
            seriesName={match.seriesName}
            matchInfo={match.matchNumber}
            venue={match.venue}
            date={match.date}
            customImage={match.customImage}
          />
        </TabsContent>

        <TabsContent value="innings-1" className="mt-6">
          {match.innings?.[0] ? (
            <Scorecard
              innings={match.innings[0]}
              inningsNumber={1}
              battingTeamName={match.innings[0].battingTeam}
              bowlingTeamName={match.innings[0].bowlingTeam}
              seriesName={match.seriesName}
              matchInfo={match.matchNumber}
              customImage={match.customImage}
            />
          ) : (
            <p className="py-12 text-center text-muted-foreground">First innings data not available yet</p>
          )}
        </TabsContent>

        <TabsContent value="innings-2" className="mt-6">
          {match.innings?.[1] ? (
            <Scorecard
              innings={match.innings[1]}
              inningsNumber={2}
              battingTeamName={match.innings[1].battingTeam}
              bowlingTeamName={match.innings[1].bowlingTeam}
              seriesName={match.seriesName}
              matchInfo={match.matchNumber}
              customImage={match.customImage}
            />
          ) : (
            <p className="py-12 text-center text-muted-foreground">Second innings data not available yet</p>
          )}
        </TabsContent>

        <TabsContent value="milestones" className="mt-6">
          {milestones.length > 0 ? (
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={i}>
                  {m.type === 'fiveWickets' ? (
                    <WicketCard
                      playerName={m.player.name}
                      wickets={m.player.wickets}
                      runsConceded={m.player.runsConceded}
                      overs={m.player.overs}
                      economy={m.player.economy}
                      teamName={m.team}
                      opponent={m.opponent}
                      seriesName={match.seriesName}
                      customImage={match.customImage}
                    />
                  ) : (
                    <MilestoneCard
                      playerName={m.player.name}
                      runs={m.player.runs}
                      balls={m.player.balls}
                      fours={m.player.fours}
                      sixes={m.player.sixes}
                      isNotOut={m.player.isNotOut}
                      strikeRate={m.player.strikeRate}
                      teamName={m.team}
                      opponent={m.opponent}
                      seriesName={match.seriesName}
                      type={m.type}
                      customImage={match.customImage}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-muted-foreground">No milestones in this match yet</p>
          )}
        </TabsContent>

        <TabsContent value="result" className="mt-6">
          {match.status === 'completed' ? (
            <MatchResult
              team1={{
                name: match.team1.name,
                score: match.innings?.[0] ? `${match.innings[0].totalRuns}/${match.innings[0].totalWickets}` : '-',
                overs: match.innings?.[0]?.totalOvers || '-',
              }}
              team2={{
                name: match.team2.name,
                score: match.innings?.[1] ? `${match.innings[1].totalRuns}/${match.innings[1].totalWickets}` : '-',
                overs: match.innings?.[1]?.totalOvers || '-',
              }}
              result={match.result}
              playerOfMatch={match.playerOfMatch}
              seriesName={match.seriesName}
              matchInfo={match.matchNumber}
              customImage={match.customImage}
            />
          ) : (
            <p className="py-12 text-center text-muted-foreground">Match not completed yet</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
