import { Router } from 'express';
import Match from '../models/Match.js';

const router = Router();

// Get all matches
router.get('/', async (req, res) => {
  try {
    const { status, series } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (series) filter.seriesName = { $regex: series, $options: 'i' };
    const matches = await Match.find(filter).sort({ createdAt: -1 });
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single match
router.get('/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ error: 'Match not found' });
    res.json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create match manually
router.post('/', async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.status(201).json(match);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update match
router.put('/:id', async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!match) return res.status(404).json({ error: 'Match not found' });
    res.json(match);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete match
router.delete('/:id', async (req, res) => {
  try {
    await Match.findByIdAndDelete(req.params.id);
    res.json({ message: 'Match deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get formatted scorecard data for a match innings
router.get('/:id/scorecard/:inningsIndex', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ error: 'Match not found' });

    const idx = parseInt(req.params.inningsIndex);
    const innings = match.innings[idx];
    if (!innings) return res.status(404).json({ error: 'Innings not found' });

    const topScorer = match.getTopScorer(idx);
    const topWicketTaker = match.getTopWicketTaker(idx);
    const target = idx === 0 ? match.getTarget() : null;

    res.json({
      battingTeam: innings.battingTeam,
      bowlingTeam: innings.bowlingTeam,
      score: `${innings.totalRuns}/${innings.totalWickets}`,
      overs: `${innings.totalOvers} Overs`,
      topScorer,
      topWicketTaker,
      target,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
