import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Format top scorer display string
export function formatTopScorer(batters) {
  if (!batters || batters.length === 0) return null;

  const sorted = [...batters].sort((a, b) => {
    if (b.runs !== a.runs) return b.runs - a.runs;
    return a.balls - b.balls;
  });

  const top = sorted[0];
  const notOut = top.isNotOut ? '*' : '';
  return {
    ...top,
    display: `${top.name} - ${top.runs}${notOut} (${top.balls})`,
  };
}

// Format top wicket taker display string
export function formatTopWicketTaker(bowlers) {
  if (!bowlers || bowlers.length === 0) return null;

  const withWickets = bowlers.filter(b => b.wickets > 0);
  if (withWickets.length === 0) return null;

  const sorted = [...withWickets].sort((a, b) => {
    if (b.wickets !== a.wickets) return b.wickets - a.wickets;
    return a.economy - b.economy;
  });

  const top = sorted[0];
  return {
    ...top,
    display: `${top.name} - ${top.wickets}/${top.runsConceded}`,
  };
}

// Format score display
export function formatScore(innings) {
  if (!innings) return '';
  return `${innings.totalRuns}/${innings.totalWickets}`;
}

// Format target
export function formatTarget(firstInnings, chasingTeamShort) {
  if (!firstInnings) return '';
  const target = firstInnings.totalRuns + 1;
  return `${chasingTeamShort} need ${target} runs to win`;
}

// Format milestone display
export function formatMilestone(player) {
  const notOut = player.isNotOut ? '*' : '';
  return `${player.runs}${notOut} (${player.balls})`;
}
