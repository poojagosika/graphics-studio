import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trophy, Zap, TrendingUp, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getMatches } from '@/services/api';
import { getTeam } from '@/data/teams';
import ParticleBackground from '@/components/graphics/ParticleBackground';

function MatchCard({ match }) {
  const t1 = getTeam(match.team1?.name);
  const t2 = getTeam(match.team2?.name);
  const inn1 = match.innings?.[0];
  const inn2 = match.innings?.[1];

  return (
    <Link to={`/match/${match._id}`}>
      <Card className="group relative overflow-hidden transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/5">
        {/* Team color accent */}
        <div
          className="absolute left-0 top-0 h-full w-1 transition-all group-hover:w-1.5"
          style={{ background: `linear-gradient(to bottom, ${t1.bg}, ${t2.bg})` }}
        />

        <CardContent className="p-5 pl-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground">{match.seriesName}</p>
                {match.status === 'live' && <Badge variant="live">LIVE</Badge>}
                {match.status === 'completed' && <Badge variant="success">Completed</Badge>}
                {match.status === 'upcoming' && <Badge variant="secondary">Upcoming</Badge>}
              </div>

              <div className="mt-3 space-y-2">
                {/* Team 1 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-md text-xs font-bold"
                      style={{ backgroundColor: `${t1.bg}44`, color: t1.accent }}
                    >
                      {t1.short}
                    </div>
                    <span className="font-medium">{t1.name}</span>
                  </div>
                  {inn1 && (
                    <span className="font-display text-lg font-bold">
                      {inn1.totalRuns}/{inn1.totalWickets}
                      <span className="ml-1 text-xs text-muted-foreground">
                        ({inn1.totalOvers})
                      </span>
                    </span>
                  )}
                </div>

                {/* Team 2 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-md text-xs font-bold"
                      style={{ backgroundColor: `${t2.bg}44`, color: t2.accent }}
                    >
                      {t2.short}
                    </div>
                    <span className="font-medium">{t2.name}</span>
                  </div>
                  {inn2 && (
                    <span className="font-display text-lg font-bold">
                      {inn2.totalRuns}/{inn2.totalWickets}
                      <span className="ml-1 text-xs text-muted-foreground">
                        ({inn2.totalOvers})
                      </span>
                    </span>
                  )}
                </div>
              </div>

              {match.result && (
                <p className="mt-3 text-xs text-muted-foreground">{match.result}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function Dashboard() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMatches()
      .then(setMatches)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const liveMatches = matches.filter(m => m.status === 'live');
  const completedMatches = matches.filter(m => m.status === 'completed');
  const upcomingMatches = matches.filter(m => m.status === 'upcoming');

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-emerald-950/50 to-cyan-950/50 p-8">
        <ParticleBackground color="#00ffaa" className="opacity-30" />
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <Trophy className="h-8 w-8 text-emerald-400" />
            <div>
              <h1 className="font-display text-3xl font-bold tracking-wide">
                Pooja's Graphics Studio
              </h1>
              <p className="text-sm text-muted-foreground">
                Cricket Graphics Engine — ICC Women's T20 World Cup 2026
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Link to="/studio">
              <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                <Zap className="h-4 w-4" />
                Open Graphics Studio
              </Button>
            </Link>
            <Link to="/studio">
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Match
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Matches', value: matches.length, icon: BarChart3, color: 'text-blue-400' },
          { label: 'Live Now', value: liveMatches.length, icon: Zap, color: 'text-red-400' },
          { label: 'Completed', value: completedMatches.length, icon: TrendingUp, color: 'text-emerald-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="flex items-center gap-4 p-5">
              <Icon className={`h-8 w-8 ${color}`} />
              <div>
                <p className="font-display text-2xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Live Matches */}
      {liveMatches.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            Live Matches
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {liveMatches.map(m => <MatchCard key={m._id} match={m} />)}
          </div>
        </section>
      )}

      {/* Recent Matches */}
      {completedMatches.length > 0 && (
        <section>
          <h2 className="mb-4 font-display text-xl font-bold">Recent Matches</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {completedMatches.map(m => <MatchCard key={m._id} match={m} />)}
          </div>
        </section>
      )}

      {/* Upcoming */}
      {upcomingMatches.length > 0 && (
        <section>
          <h2 className="mb-4 font-display text-xl font-bold">Upcoming</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {upcomingMatches.map(m => <MatchCard key={m._id} match={m} />)}
          </div>
        </section>
      )}

      {/* Empty state */}
      {!loading && matches.length === 0 && (
        <Card className="p-12 text-center">
          <Trophy className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <h3 className="mt-4 font-display text-lg font-bold">No matches yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Add a match manually or connect your CricketData.org API key to auto-import.
          </p>
          <Link to="/studio" className="mt-4 inline-block">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Go to Graphics Studio
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
