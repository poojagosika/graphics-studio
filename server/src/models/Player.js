import mongoose from 'mongoose';

const playerProfileSchema = new mongoose.Schema({
  name: String,
  country: String,
  role: { type: String, enum: ['batter', 'bowler', 'allrounder', 'wicketkeeper'] },
  imageUrl: String,
  battingStyle: String,
  bowlingStyle: String,
  stats: {
    international: {
      matches: { type: Number, default: 0 },
      runs: { type: Number, default: 0 },
      hundreds: { type: Number, default: 0 },
      fifties: { type: Number, default: 0 },
      wickets: { type: Number, default: 0 },
      fours: { type: Number, default: 0 },
      sixes: { type: Number, default: 0 },
      highestScore: String,
      bestBowling: String,
      average: Number,
      strikeRate: Number,
      economy: Number,
    },
  },
}, { timestamps: true });

export default mongoose.model('Player', playerProfileSchema);
