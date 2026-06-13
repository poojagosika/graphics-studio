import { useState, useRef, useCallback } from 'react';
import { removeBackground } from '@imgly/background-removal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, ImagePlus } from 'lucide-react';
import PlayingXI from '@/components/graphics/PlayingXI';
import Scorecard from '@/components/graphics/Scorecard';
import MilestoneCard from '@/components/graphics/MilestoneCard';
import WicketCard from '@/components/graphics/WicketCard';
import AchievementCard from '@/components/graphics/AchievementCard';
import QuoteCard from '@/components/graphics/QuoteCard';
import MatchResult from '@/components/graphics/MatchResult';
import PlayerOfMatch from '@/components/graphics/PlayerOfMatch';

function LabelInput({ label, ...props }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <Input {...props} />
    </div>
  );
}

// Reusable image upload button
function ImageUpload({ image, onImageChange, label = 'Upload Photo' }) {
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onImageChange(url);
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-input px-3 py-3 transition hover:border-accent hover:bg-accent/10"
      >
        <ImagePlus className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">
          {image ? 'Change image' : 'Click to upload'}
        </span>
        {image && (
          <img src={image} alt="preview" className="ml-auto h-8 w-8 rounded object-cover" />
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  );
}

// ── Scorecard Editor ──────────────────────────────────────
function ScorecardEditor() {
  const [data, setData] = useState({
    seriesName: "ICC Women's T20 World Cup 2026",
    matchInfo: 'Match 1',
    battingTeam: 'India',
    bowlingTeam: 'Australia',
    inningsNumber: 1,
    totalRuns: 180,
    totalWickets: 5,
    totalOvers: '20',
    batters: [
      { name: 'H. Kaur', runs: 56, balls: 40, fours: 6, sixes: 2, isNotOut: true, strikeRate: 140 },
      { name: 'Y. Bhatia', runs: 32, balls: 18, fours: 4, sixes: 1, isNotOut: false, strikeRate: 177.78 },
    ],
    bowlers: [
      { name: 'L. Bell', overs: 4, maidens: 0, runsConceded: 36, wickets: 2, economy: 9 },
    ],
    customImage: null,
  });

  const addBatter = () => setData(p => ({
    ...p,
    batters: [...p.batters, { name: '', runs: 0, balls: 0, fours: 0, sixes: 0, isNotOut: false, strikeRate: 0 }],
  }));
  const addBowler = () => setData(p => ({
    ...p,
    bowlers: [...p.bowlers, { name: '', overs: 0, maidens: 0, runsConceded: 0, wickets: 0, economy: 0 }],
  }));

  const updateBatter = (i, field, value) => {
    const batters = [...data.batters];
    batters[i] = { ...batters[i], [field]: field === 'name' || field === 'isNotOut' ? value : Number(value) };
    if (batters[i].balls > 0) batters[i].strikeRate = ((batters[i].runs / batters[i].balls) * 100).toFixed(2);
    setData(p => ({ ...p, batters }));
  };

  const updateBowler = (i, field, value) => {
    const bowlers = [...data.bowlers];
    bowlers[i] = { ...bowlers[i], [field]: field === 'name' ? value : Number(value) };
    if (bowlers[i].overs > 0) bowlers[i].economy = (bowlers[i].runsConceded / bowlers[i].overs).toFixed(2);
    setData(p => ({ ...p, bowlers }));
  };

  const removeBatter = (i) => setData(p => ({ ...p, batters: p.batters.filter((_, idx) => idx !== i) }));
  const removeBowler = (i) => setData(p => ({ ...p, bowlers: p.bowlers.filter((_, idx) => idx !== i) }));

  const innings = {
    battingTeam: data.battingTeam,
    bowlingTeam: data.bowlingTeam,
    totalRuns: data.totalRuns,
    totalWickets: data.totalWickets,
    totalOvers: data.totalOvers,
    batters: data.batters.filter(b => b.name),
    bowlers: data.bowlers.filter(b => b.name),
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
        <Card>
          <CardHeader><CardTitle className="text-sm">Match & Innings</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <ImageUpload image={data.customImage} onImageChange={url => setData(p => ({ ...p, customImage: url }))} label="Match Photo (main background)" />
            <LabelInput label="Series" value={data.seriesName} onChange={e => setData(p => ({ ...p, seriesName: e.target.value }))} />
            <div className="grid grid-cols-2 gap-3">
              <LabelInput label="Batting Team" value={data.battingTeam} onChange={e => setData(p => ({ ...p, battingTeam: e.target.value }))} />
              <LabelInput label="Bowling Team" value={data.bowlingTeam} onChange={e => setData(p => ({ ...p, bowlingTeam: e.target.value }))} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <LabelInput label="Runs" type="number" value={data.totalRuns} onChange={e => setData(p => ({ ...p, totalRuns: Number(e.target.value) }))} />
              <LabelInput label="Wickets" type="number" value={data.totalWickets} onChange={e => setData(p => ({ ...p, totalWickets: Number(e.target.value) }))} />
              <LabelInput label="Overs" value={data.totalOvers} onChange={e => setData(p => ({ ...p, totalOvers: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Innings</label>
              <select value={data.inningsNumber} onChange={e => setData(p => ({ ...p, inningsNumber: Number(e.target.value) }))} className="mt-1 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm">
                <option value={1}>1st Innings</option>
                <option value={2}>2nd Innings</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-sm">Batters</CardTitle>
            <Button variant="ghost" size="sm" onClick={addBatter} className="gap-1 text-xs"><Plus className="h-3 w-3" /> Add</Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.batters.map((b, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <Input placeholder="Name" value={b.name} onChange={e => updateBatter(i, 'name', e.target.value)} className="flex-1 h-8 text-xs" />
                <Input placeholder="R" type="number" value={b.runs || ''} onChange={e => updateBatter(i, 'runs', e.target.value)} className="w-14 h-8 text-xs" />
                <Input placeholder="B" type="number" value={b.balls || ''} onChange={e => updateBatter(i, 'balls', e.target.value)} className="w-14 h-8 text-xs" />
                <Input placeholder="4s" type="number" value={b.fours || ''} onChange={e => updateBatter(i, 'fours', e.target.value)} className="w-12 h-8 text-xs" />
                <Input placeholder="6s" type="number" value={b.sixes || ''} onChange={e => updateBatter(i, 'sixes', e.target.value)} className="w-12 h-8 text-xs" />
                <label className="flex items-center gap-1 text-[10px] whitespace-nowrap">
                  <input type="checkbox" checked={b.isNotOut} onChange={e => updateBatter(i, 'isNotOut', e.target.checked)} /> NO
                </label>
                <button onClick={() => removeBatter(i)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-3 w-3" /></button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-sm">Bowlers</CardTitle>
            <Button variant="ghost" size="sm" onClick={addBowler} className="gap-1 text-xs"><Plus className="h-3 w-3" /> Add</Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.bowlers.map((b, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <Input placeholder="Name" value={b.name} onChange={e => updateBowler(i, 'name', e.target.value)} className="flex-1 h-8 text-xs" />
                <Input placeholder="O" type="number" value={b.overs || ''} onChange={e => updateBowler(i, 'overs', e.target.value)} className="w-12 h-8 text-xs" />
                <Input placeholder="R" type="number" value={b.runsConceded || ''} onChange={e => updateBowler(i, 'runsConceded', e.target.value)} className="w-14 h-8 text-xs" />
                <Input placeholder="W" type="number" value={b.wickets || ''} onChange={e => updateBowler(i, 'wickets', e.target.value)} className="w-12 h-8 text-xs" />
                <button onClick={() => removeBowler(i)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-3 w-3" /></button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="sticky top-8">
        <Scorecard
          innings={innings}
          inningsNumber={data.inningsNumber}
          battingTeamName={data.battingTeam}
          bowlingTeamName={data.bowlingTeam}
          seriesName={data.seriesName}
          matchInfo={data.matchInfo}
          customImage={data.customImage}
        />
      </div>
    </div>
  );
}

// Player images per team (from /player-images/{team}/{file})
const TEAM_PLAYER_IMAGES = {
  'india': '/player-images/india/59348.png',
  'australia': '/player-images/australia/sophie.png',
  'england': '/player-images/england/nat.png',
  'bangladesh': '/player-images/bangladesh/ban.png',
  'south africa': '/player-images/south africa/laura.png',
  'new zealand': '/player-images/new zealand/amelia.png',
  'west indies': '/player-images/west indies/hayley.png',
  'sri lanka': '/player-images/sri lanka/chamari.png',
  'pakistan': '/player-images/pakistan/fatima.png',
  'ireland': '/player-images/ireland/gaby.png',
  'scotland': '/player-images/scotland/kat.png',
  'netherlands': '/player-images/netherlands/babbe.png',
};

function getTeamImage(teamName) {
  if (!teamName) return null;
  return TEAM_PLAYER_IMAGES[teamName.toLowerCase()] || null;
}

// ── Playing XI Editor ──────────────────────────────────────
function PlayingXIEditor() {
  const [data, setData] = useState({
    seriesName: "ICC Women's T20 World Cup 2026",
    matchInfo: 'Match 1',
    venue: 'England & Wales',
    date: '',
    team1Name: 'India',
    team2Name: 'Australia',
    singleTeam: true,
    activeTeam: 'team1',
    customImage: getTeamImage('India'),
    backgroundImage: null,
    team1Players: [
      { name: 'Smriti Mandhana', role: 'batter', isCaptain: false, isWicketkeeper: false },
      { name: 'Shafali Verma', role: 'batter', isCaptain: false, isWicketkeeper: false },
      { name: 'Yastika Bhatia', role: 'batter', isCaptain: false, isWicketkeeper: true },
      { name: 'Harmanpreet Kaur', role: 'batter', isCaptain: true, isWicketkeeper: false },
      { name: 'Jemimah Rodrigues', role: 'batter', isCaptain: false, isWicketkeeper: false },
      { name: 'Richa Ghosh', role: 'wicketkeeper', isCaptain: false, isWicketkeeper: false },
      { name: 'Deepti Sharma', role: 'allrounder', isCaptain: false, isWicketkeeper: false },
      { name: 'Pooja Vastrakar', role: 'allrounder', isCaptain: false, isWicketkeeper: false },
      { name: 'Radha Yadav', role: 'bowler', isCaptain: false, isWicketkeeper: false },
      { name: 'Renuka Singh', role: 'bowler', isCaptain: false, isWicketkeeper: false },
      { name: 'Shreyanka Patil', role: 'bowler', isCaptain: false, isWicketkeeper: false },
    ],
    team2Players: [
      { name: 'Alyssa Healy', role: 'wicketkeeper', isCaptain: true, isWicketkeeper: true },
      { name: 'Beth Mooney', role: 'batter', isCaptain: false, isWicketkeeper: false },
      { name: 'Meg Lanning', role: 'batter', isCaptain: false, isWicketkeeper: false },
      { name: 'Ellyse Perry', role: 'allrounder', isCaptain: false, isWicketkeeper: false },
      { name: 'Tahlia McGrath', role: 'allrounder', isCaptain: false, isWicketkeeper: false },
      { name: 'Ashleigh Gardner', role: 'allrounder', isCaptain: false, isWicketkeeper: false },
      { name: 'Grace Harris', role: 'batter', isCaptain: false, isWicketkeeper: false },
      { name: 'Georgia Wareham', role: 'bowler', isCaptain: false, isWicketkeeper: false },
      { name: 'Jess Jonassen', role: 'bowler', isCaptain: false, isWicketkeeper: false },
      { name: 'Megan Schutt', role: 'bowler', isCaptain: false, isWicketkeeper: false },
      { name: 'Darcie Brown', role: 'bowler', isCaptain: false, isWicketkeeper: false },
    ],
  });

  const updatePlayer = (team, index, field, value) => {
    const key = `${team}Players`;
    const players = [...data[key]];
    players[index] = { ...players[index], [field]: value };
    setData(prev => ({ ...prev, [key]: players }));
  };

  // Parse pasted string like "Team Playing XI: Name1 (c), Name2 (wk), Name3, ..."
  const parsePaste = (team, text) => {
    // Strip "Team Playing XI:" prefix if present
    const cleaned = text.replace(/^.*?:\s*/, '');
    const names = cleaned.split(',').map(s => s.trim()).filter(Boolean);
    const players = names.map(raw => {
      const isCaptain = /\(c\)/i.test(raw);
      const isWicketkeeper = /\(wk\)/i.test(raw);
      const name = raw.replace(/\s*\((c|wk|c\/wk|wk\/c)\)\s*/gi, '').trim();
      return { name, role: 'batter', isCaptain, isWicketkeeper };
    });
    // Pad to 11 if fewer
    while (players.length < 11) {
      players.push({ name: '', role: 'batter', isCaptain: false, isWicketkeeper: false });
    }
    setData(prev => ({ ...prev, [`${team}Players`]: players.slice(0, 15) }));
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
        <Card>
          <CardHeader><CardTitle className="text-sm">Match Details</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <ImageUpload
              image={data.customImage}
              onImageChange={async (url) => {
                setData(p => ({ ...p, customImage: url, removingBg: true }));
                try {
                  const blob = await removeBackground(url);
                  const cleanUrl = URL.createObjectURL(blob);
                  setData(p => ({ ...p, customImage: cleanUrl, removingBg: false }));
                } catch {
                  setData(p => ({ ...p, removingBg: false }));
                }
              }}
              label={data.removingBg ? 'Removing background...' : 'Player Photo (auto bg-remove)'}
            />
            <ImageUpload image={data.backgroundImage} onImageChange={url => setData(p => ({ ...p, backgroundImage: url }))} label="Background Image (Skyline/Venue)" />
            <LabelInput label="Series" value={data.seriesName} onChange={e => setData(p => ({ ...p, seriesName: e.target.value }))} />
            <LabelInput label="Match Info" value={data.matchInfo} onChange={e => setData(p => ({ ...p, matchInfo: e.target.value }))} />
            <div className="grid grid-cols-2 gap-3">
              <LabelInput label="Venue" value={data.venue} onChange={e => setData(p => ({ ...p, venue: e.target.value }))} />
              <LabelInput label="Date" value={data.date} onChange={e => setData(p => ({ ...p, date: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Match</label>
              <div className="flex items-center gap-2">
                <Input value={data.team1Name} onChange={e => setData(p => ({ ...p, team1Name: e.target.value }))} className="flex-1" />
                <span className="text-sm font-bold text-muted-foreground">v</span>
                <Input value={data.team2Name} onChange={e => setData(p => ({ ...p, team2Name: e.target.value }))} className="flex-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team selector for preview */}
        <Card>
          <CardHeader><CardTitle className="text-sm">Show Playing XI For</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {['team1', 'team2'].map((t) => (
                <Button
                  key={t}
                  variant={data.activeTeam === t ? 'default' : 'outline'}
                  className="text-sm"
                  onClick={() => setData(p => ({ ...p, activeTeam: t, customImage: getTeamImage(p[`${t}Name`]) || p.customImage }))}
                >
                  {data[`${t}Name`]}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {['team1', 'team2'].map((team) => (
          <Card key={team}>
            <CardHeader><CardTitle className="text-sm">{data[`${team}Name`]} - Playing XI</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <textarea
                placeholder="Paste full XI here, e.g.: Player1 (c), Player2 (wk), Player3, ..."
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs text-muted-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
                rows={2}
                onPaste={e => {
                  const text = e.clipboardData.getData('text');
                  if (text.includes(',')) {
                    e.preventDefault();
                    parsePaste(team, text);
                  }
                }}
                onChange={e => {
                  const text = e.target.value;
                  if (text.includes(',')) {
                    parsePaste(team, text);
                    e.target.value = '';
                  }
                }}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="sticky top-8">
        <PlayingXI
          team1={{
            name: data[`${data.activeTeam}Name`],
            playingXI: data[`${data.activeTeam}Players`].filter(p => p.name),
          }}
          team2={{ name: data.team2Name }}
          matchTitle={`${data.team1Name} v ${data.team2Name}`}
          seriesName={data.seriesName}
          matchInfo={data.matchInfo}
          venue={data.venue}
          date={data.date}
          customImage={data.customImage}
          backgroundImage={data.backgroundImage}
          singleTeam={data.singleTeam}
        />
      </div>
    </div>
  );
}

// ── Milestone Editor ──────────────────────────────────────
function MilestoneEditor() {
  const [data, setData] = useState({
    playerName: 'Danni Wyatt-Hodge', runs: 100, balls: 56, fours: 12, sixes: 4,
    isNotOut: true, teamName: 'England', opponent: 'Sri Lanka',
    seriesName: "ICC Women's T20 World Cup 2026", type: 'century', customImage: null,
  });

  return (
    <div className="grid grid-cols-2 gap-8">
      <Card>
        <CardHeader><CardTitle className="text-sm">Milestone Details</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <ImageUpload image={data.customImage} onImageChange={url => setData(p => ({ ...p, customImage: url }))} label="Player Photo" />
          <LabelInput label="Player Name" value={data.playerName} onChange={e => setData(p => ({ ...p, playerName: e.target.value }))} />
          <div className="grid grid-cols-2 gap-3">
            <LabelInput label="Runs" type="number" value={data.runs} onChange={e => setData(p => ({ ...p, runs: Number(e.target.value), type: Number(e.target.value) >= 100 ? 'century' : 'fifty' }))} />
            <LabelInput label="Balls" type="number" value={data.balls} onChange={e => setData(p => ({ ...p, balls: Number(e.target.value) }))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <LabelInput label="Fours" type="number" value={data.fours} onChange={e => setData(p => ({ ...p, fours: Number(e.target.value) }))} />
            <LabelInput label="Sixes" type="number" value={data.sixes} onChange={e => setData(p => ({ ...p, sixes: Number(e.target.value) }))} />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={data.isNotOut} onChange={e => setData(p => ({ ...p, isNotOut: e.target.checked }))} /> Not Out
          </label>
          <div className="grid grid-cols-2 gap-3">
            <LabelInput label="Team" value={data.teamName} onChange={e => setData(p => ({ ...p, teamName: e.target.value }))} />
            <LabelInput label="Opponent" value={data.opponent} onChange={e => setData(p => ({ ...p, opponent: e.target.value }))} />
          </div>
          <LabelInput label="Series" value={data.seriesName} onChange={e => setData(p => ({ ...p, seriesName: e.target.value }))} />
        </CardContent>
      </Card>
      <div className="sticky top-8">
        <MilestoneCard {...data} />
      </div>
    </div>
  );
}

// ── Wicket Haul Editor ──────────────────────────────────────
function WicketEditor() {
  const [data, setData] = useState({
    playerName: 'Freya Kemp', wickets: 4, runsConceded: 21, overs: 4, maidens: 0,
    teamName: 'England', opponent: 'Sri Lanka',
    seriesName: "T20 World Cup 2026", customImage: null,
  });

  return (
    <div className="grid grid-cols-2 gap-8">
      <Card>
        <CardHeader><CardTitle className="text-sm">Bowling Figures</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <ImageUpload image={data.customImage} onImageChange={url => setData(p => ({ ...p, customImage: url }))} label="Player Photo" />
          <LabelInput label="Player Name" value={data.playerName} onChange={e => setData(p => ({ ...p, playerName: e.target.value }))} />
          <div className="grid grid-cols-4 gap-3">
            <LabelInput label="Overs" type="number" value={data.overs} onChange={e => setData(p => ({ ...p, overs: Number(e.target.value) }))} />
            <LabelInput label="Maidens" type="number" value={data.maidens} onChange={e => setData(p => ({ ...p, maidens: Number(e.target.value) }))} />
            <LabelInput label="Runs" type="number" value={data.runsConceded} onChange={e => setData(p => ({ ...p, runsConceded: Number(e.target.value) }))} />
            <LabelInput label="Wickets" type="number" value={data.wickets} onChange={e => setData(p => ({ ...p, wickets: Number(e.target.value) }))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <LabelInput label="Team" value={data.teamName} onChange={e => setData(p => ({ ...p, teamName: e.target.value }))} />
            <LabelInput label="Opponent" value={data.opponent} onChange={e => setData(p => ({ ...p, opponent: e.target.value }))} />
          </div>
          <LabelInput label="Series" value={data.seriesName} onChange={e => setData(p => ({ ...p, seriesName: e.target.value }))} />
        </CardContent>
      </Card>
      <div className="sticky top-8">
        <WicketCard {...data} />
      </div>
    </div>
  );
}

// ── Achievement Editor ──────────────────────────────────────
function AchievementEditor() {
  const [data, setData] = useState({
    playerName: 'Harmanpreet Kaur', achievementNumber: '4000', achievementLabel: 'Runs in T20Is',
    subtitle: '', teamName: 'India', seriesName: "#ENGvIND", customImage: null,
  });

  return (
    <div className="grid grid-cols-2 gap-8">
      <Card>
        <CardHeader><CardTitle className="text-sm">Achievement Details</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <ImageUpload image={data.customImage} onImageChange={url => setData(p => ({ ...p, customImage: url }))} label="Player Photo(s)" />
          <LabelInput label="Player Name" value={data.playerName} onChange={e => setData(p => ({ ...p, playerName: e.target.value }))} />
          <LabelInput label="Number" value={data.achievementNumber} onChange={e => setData(p => ({ ...p, achievementNumber: e.target.value }))} />
          <LabelInput label="Label" value={data.achievementLabel} onChange={e => setData(p => ({ ...p, achievementLabel: e.target.value }))} />
          <LabelInput label="Subtitle" value={data.subtitle} onChange={e => setData(p => ({ ...p, subtitle: e.target.value }))} />
          <LabelInput label="Team" value={data.teamName} onChange={e => setData(p => ({ ...p, teamName: e.target.value }))} />
          <LabelInput label="Series / Hashtag" value={data.seriesName} onChange={e => setData(p => ({ ...p, seriesName: e.target.value }))} />
        </CardContent>
      </Card>
      <div className="sticky top-8">
        <AchievementCard {...data} />
      </div>
    </div>
  );
}

// ── Quote Editor ──────────────────────────────────────
function QuoteEditor() {
  const [data, setData] = useState({
    quote: "But, for the global game as a whole, the positioning of this tournament could hardly be more perfect. It's a homecoming in every sense.",
    playerName: 'Andrew Miller',
    role: 'Writer',
    teamName: 'England',
    source: 'EXCERPT',
    articleTitle: "Women's World Cup homecoming offers chance to show how game has changed",
    customImage: null,
  });

  return (
    <div className="grid grid-cols-2 gap-8">
      <Card>
        <CardHeader><CardTitle className="text-sm">Quote / Excerpt</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <ImageUpload image={data.customImage} onImageChange={url => setData(p => ({ ...p, customImage: url }))} label="Person Photo" />
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Quote</label>
            <textarea value={data.quote} onChange={e => setData(p => ({ ...p, quote: e.target.value }))} rows={5}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </div>
          <LabelInput label="Source Label" value={data.source} onChange={e => setData(p => ({ ...p, source: e.target.value }))} placeholder="e.g. EXCERPT, INTERVIEW" />
          <LabelInput label="Article Title" value={data.articleTitle} onChange={e => setData(p => ({ ...p, articleTitle: e.target.value }))} />
          <LabelInput label="Author / Player" value={data.playerName} onChange={e => setData(p => ({ ...p, playerName: e.target.value }))} />
          <LabelInput label="Role" value={data.role} onChange={e => setData(p => ({ ...p, role: e.target.value }))} />
          <LabelInput label="Team" value={data.teamName} onChange={e => setData(p => ({ ...p, teamName: e.target.value }))} />
        </CardContent>
      </Card>
      <div className="sticky top-8">
        <QuoteCard {...data} />
      </div>
    </div>
  );
}

// ── Match Result Editor ──────────────────────────────────────
function ResultEditor() {
  const [data, setData] = useState({
    team1: { name: 'England', score: '219/1', overs: '20' },
    team2: { name: 'Sri Lanka', score: '132', overs: '20' },
    winner: 'England',
    result: 'England won by 87 runs',
    playerOfMatch: 'Danni Wyatt-Hodge',
    seriesName: "ICC Women's T20 World Cup 2026",
    matchInfo: 'Match 1, Birmingham',
    customImage: null,
  });

  return (
    <div className="grid grid-cols-2 gap-8">
      <Card>
        <CardHeader><CardTitle className="text-sm">Result</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <ImageUpload image={data.customImage} onImageChange={url => setData(p => ({ ...p, customImage: url }))} label="Match Photo" />
          <LabelInput label="Series" value={data.seriesName} onChange={e => setData(p => ({ ...p, seriesName: e.target.value }))} />
          <LabelInput label="Match Info" value={data.matchInfo} onChange={e => setData(p => ({ ...p, matchInfo: e.target.value }))} />
          <div className="grid grid-cols-3 gap-3">
            <LabelInput label="Team 1" value={data.team1.name} onChange={e => setData(p => ({ ...p, team1: { ...p.team1, name: e.target.value } }))} />
            <LabelInput label="Score" value={data.team1.score} onChange={e => setData(p => ({ ...p, team1: { ...p.team1, score: e.target.value } }))} />
            <LabelInput label="Overs" value={data.team1.overs} onChange={e => setData(p => ({ ...p, team1: { ...p.team1, overs: e.target.value } }))} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <LabelInput label="Team 2" value={data.team2.name} onChange={e => setData(p => ({ ...p, team2: { ...p.team2, name: e.target.value } }))} />
            <LabelInput label="Score" value={data.team2.score} onChange={e => setData(p => ({ ...p, team2: { ...p.team2, score: e.target.value } }))} />
            <LabelInput label="Overs" value={data.team2.overs} onChange={e => setData(p => ({ ...p, team2: { ...p.team2, overs: e.target.value } }))} />
          </div>
          <LabelInput label="Winner" value={data.winner} onChange={e => setData(p => ({ ...p, winner: e.target.value }))} />
          <LabelInput label="Result Text" value={data.result} onChange={e => setData(p => ({ ...p, result: e.target.value }))} />
          <LabelInput label="Player of Match" value={data.playerOfMatch} onChange={e => setData(p => ({ ...p, playerOfMatch: e.target.value }))} />
        </CardContent>
      </Card>
      <div className="sticky top-8">
        <MatchResult {...data} />
      </div>
    </div>
  );
}

// ── Player of the Match Editor ──────────────────────────────────────
function POTMEditor() {
  const [data, setData] = useState({
    playerName: 'Danni Wyatt-Hodge',
    team1Name: 'England',
    team2Name: 'Sri Lanka',
    seriesName: "ICC Women's T20 World Cup 2026",
    customImage: null,
  });

  return (
    <div className="grid grid-cols-2 gap-8">
      <Card>
        <CardHeader><CardTitle className="text-sm">Player of the Match</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <ImageUpload image={data.customImage} onImageChange={url => setData(p => ({ ...p, customImage: url }))} label="Player Photo" />
          <LabelInput label="Player Name" value={data.playerName} onChange={e => setData(p => ({ ...p, playerName: e.target.value }))} />
          <div className="grid grid-cols-2 gap-3">
            <LabelInput label="Team 1" value={data.team1Name} onChange={e => setData(p => ({ ...p, team1Name: e.target.value }))} />
            <LabelInput label="Team 2" value={data.team2Name} onChange={e => setData(p => ({ ...p, team2Name: e.target.value }))} />
          </div>
          <LabelInput label="Series" value={data.seriesName} onChange={e => setData(p => ({ ...p, seriesName: e.target.value }))} />
        </CardContent>
      </Card>
      <div className="sticky top-8">
        <PlayerOfMatch {...data} />
      </div>
    </div>
  );
}

// ── Main Graphics Studio ──────────────────────────────────────
export default function GraphicsStudio() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Graphics Studio</h1>
        <p className="text-sm text-muted-foreground">
          Upload a photo, fill in the data, download the graphic
        </p>
      </div>

      <Tabs defaultValue="scorecard">
        <TabsList className="flex w-full flex-wrap">
          <TabsTrigger value="scorecard" className="flex-1">Scorecard</TabsTrigger>
          <TabsTrigger value="playing-xi" className="flex-1">Playing XI</TabsTrigger>
          <TabsTrigger value="milestone" className="flex-1">Milestone</TabsTrigger>
          <TabsTrigger value="wickets" className="flex-1">Bowling</TabsTrigger>
          <TabsTrigger value="achievement" className="flex-1">Achievement</TabsTrigger>
          <TabsTrigger value="quote" className="flex-1">Quote</TabsTrigger>
          <TabsTrigger value="result" className="flex-1">Result</TabsTrigger>
          <TabsTrigger value="potm" className="flex-1">POTM</TabsTrigger>
        </TabsList>

        <TabsContent value="scorecard" className="mt-6"><ScorecardEditor /></TabsContent>
        <TabsContent value="playing-xi" className="mt-6"><PlayingXIEditor /></TabsContent>
        <TabsContent value="milestone" className="mt-6"><MilestoneEditor /></TabsContent>
        <TabsContent value="wickets" className="mt-6"><WicketEditor /></TabsContent>
        <TabsContent value="achievement" className="mt-6"><AchievementEditor /></TabsContent>
        <TabsContent value="quote" className="mt-6"><QuoteEditor /></TabsContent>
        <TabsContent value="result" className="mt-6"><ResultEditor /></TabsContent>
        <TabsContent value="potm" className="mt-6"><POTMEditor /></TabsContent>
      </Tabs>
    </div>
  );
}
