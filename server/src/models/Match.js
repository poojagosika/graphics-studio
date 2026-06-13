import mongoose from 'mongoose';

const playerInningsSchema = new mongoose.Schema({
  name: String,
  runs: Number,
  balls: Number,
  fours: Number,
  sixes: Number,
  isNotOut: { type: Boolean, default: false },
  strikeRate: Number,
}, { _id: false });

const bowlerInningsSchema = new mongoose.Schema({
  name: String,
  overs: Number,
  maidens: Number,
  runsConceded: Number,
  wickets: Number,
  economy: Number,
}, { _id: false });

const inningsSchema = new mongoose.Schema({
  battingTeam: String,
  bowlingTeam: String,
  totalRuns: Number,
  totalWickets: Number,
  totalOvers: String,
  batters: [playerInningsSchema],
  bowlers: [bowlerInningsSchema],
  extras: { type: Number, default: 0 },
}, { _id: false });

const playerSchema = new mongoose.Schema({
  name: String,
  role: { type: String, enum: ['batter', 'bowler', 'allrounder', 'wicketkeeper'] },
  isCaptain: { type: Boolean, default: false },
  isWicketkeeper: { type: Boolean, default: false },
}, { _id: false });

const matchSchema = new mongoose.Schema({
  apiMatchId: { type: String, unique: true, sparse: true },
  seriesName: { type: String, default: 'ICC Women\'s T20 World Cup 2026' },
  matchTitle: String,
  matchNumber: String,
  format: { type: String, default: 'T20' },
  venue: String,
  date: String,
  time: String,
  status: { type: String, enum: ['upcoming', 'live', 'completed'], default: 'upcoming' },
  result: String,
  team1: {
    name: String,
    shortName: String,
    playingXI: [playerSchema],
    logo: String,
  },
  team2: {
    name: String,
    shortName: String,
    playingXI: [playerSchema],
    logo: String,
  },
  toss: {
    winner: String,
    decision: String,
  },
  innings: [inningsSchema],
  customImage: String,
  playerOfMatch: String,
}, { timestamps: true });

// Get top scorer for an innings
matchSchema.methods.getTopScorer = function (inningsIndex) {
  const innings = this.innings[inningsIndex];
  if (!innings || !innings.batters.length) return null;

  const sorted = [...innings.batters].sort((a, b) => {
    if (b.runs !== a.runs) return b.runs - a.runs;
    return a.balls - b.balls; // fewer balls = better
  });

  const top = sorted[0];
  const notOutMark = top.isNotOut ? '*' : '';
  return {
    ...top.toObject(),
    display: `${top.name} - ${top.runs}${notOutMark} (${top.balls})`,
  };
};

// Get top wicket taker for an innings
matchSchema.methods.getTopWicketTaker = function (inningsIndex) {
  const innings = this.innings[inningsIndex];
  if (!innings || !innings.bowlers.length) return null;

  const withWickets = innings.bowlers.filter(b => b.wickets > 0);
  if (!withWickets.length) return null;

  const sorted = [...withWickets].sort((a, b) => {
    if (b.wickets !== a.wickets) return b.wickets - a.wickets;
    return a.economy - b.economy; // better economy = better
  });

  const top = sorted[0];
  return {
    ...top.toObject(),
    display: `${top.name} - ${top.wickets}/${top.runsConceded}`,
  };
};

// Get target for chasing team
matchSchema.methods.getTarget = function () {
  if (!this.innings[0]) return null;
  const firstInningsScore = this.innings[0].totalRuns;
  const chasingTeam = this.innings[0].bowlingTeam;
  return {
    runs: firstInningsScore + 1,
    team: chasingTeam,
    display: `${chasingTeam} need ${firstInningsScore + 1} runs to win`,
  };
};

export default mongoose.model('Match', matchSchema);
