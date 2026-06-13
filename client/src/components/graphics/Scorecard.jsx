import { getTeam } from '@/data/teams';
import { formatTopScorer, formatTopWicketTaker } from '@/lib/utils';
import GraphicWrapper from './GraphicWrapper';

export default function Scorecard({
  innings = null,
  inningsNumber = 1,
  battingTeamName = '',
  bowlingTeamName = '',
  seriesName = "ICC Women's T20 World Cup 2026",
  matchInfo = '',
  customImage,
}) {
  const battingTeam = getTeam(battingTeamName);
  const bowlingTeam = getTeam(bowlingTeamName);

  const topScorer = innings ? formatTopScorer(innings.batters) : null;
  const topWicketTaker = innings ? formatTopWicketTaker(innings.bowlers) : null;

  const score = innings ? `${innings.totalRuns}/${innings.totalWickets}` : '0/0';
  const overs = innings ? `${innings.totalOvers} Overs` : '0 Overs';

  const target = inningsNumber === 1 && innings
    ? `${bowlingTeam.short || bowlingTeamName} need ${innings.totalRuns + 1} runs to win`
    : null;

  return (
    <GraphicWrapper
      filename={`scorecard-${battingTeam.short}-innings-${inningsNumber}`}
      width={1080}
      height={1350}
    >
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#0a0a14]">
        {/* ═══ PHOTO (top 70%) ═══ */}
        <div className="relative" style={{ height: '70%' }}>
          {customImage ? (
            <img src={customImage} alt="Match" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0" style={{
              background: `linear-gradient(135deg, ${battingTeam.bg}cc 0%, #0a1628 50%, ${battingTeam.bg}44 100%)`
            }} />
          )}
          {/* Heavy gradient fade at bottom for text area */}
          <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/90 to-transparent" />

          {/* Decorative geometric shape - team color */}
          <div
            className="absolute -right-20 bottom-0 h-[300px] w-[400px] opacity-20 slash-shape"
            style={{ backgroundColor: battingTeam.accent }}
          />

          {/* Series branding top-left */}
          <div className="absolute left-8 top-8 z-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/80 text-shadow-soft">
              {seriesName}
            </p>
          </div>
        </div>

        {/* ═══ SOLID DATA BAR (bottom 30%) ═══ */}
        <div className="relative z-10 flex flex-1 flex-col justify-between bg-[#0a0a14] px-10 pb-5 pt-0" style={{ marginTop: '-80px' }}>
          {/* Score section */}
          <div className="flex items-end gap-5">
            {/* Team badge circle */}
            <div
              className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full font-display text-lg font-black shadow-lg"
              style={{
                backgroundColor: battingTeam.bg,
                color: battingTeam.textColor,
                border: `3px solid ${battingTeam.accent}`,
                boxShadow: `0 0 20px ${battingTeam.bg}66`,
              }}
            >
              {battingTeam.short}
            </div>

            {/* Score + overs */}
            <div className="leading-none">
              <p className="font-display text-[80px] font-black tracking-tight text-white text-shadow-heavy">
                {score}
              </p>
              <p className="mt-1 font-display text-base font-bold uppercase tracking-[0.3em] text-white/50">
                {overs}
              </p>
            </div>

            {/* Top performers - right aligned */}
            <div className="ml-auto space-y-2 text-right">
              {topScorer && (
                <div className="flex items-baseline justify-end gap-4">
                  <span className="text-[13px] font-bold uppercase tracking-wider text-white/70">
                    {topScorer.name}
                  </span>
                  <span className="font-display text-[22px] font-black tabular-nums text-white">
                    {topScorer.runs}{topScorer.isNotOut ? '*' : ''} ({topScorer.balls})
                  </span>
                </div>
              )}
              {topWicketTaker && (
                <div className="flex items-baseline justify-end gap-4">
                  <span className="text-[13px] font-bold uppercase tracking-wider text-white/50">
                    {topWicketTaker.name}
                  </span>
                  <span className="font-display text-[22px] font-black tabular-nums text-white/80">
                    {topWicketTaker.wickets}/{topWicketTaker.runsConceded}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Target bar */}
          {target && (
            <div
              className="mt-6 rounded-lg px-6 py-4 text-center"
              style={{
                background: `linear-gradient(90deg, ${battingTeam.bg}ee, ${battingTeam.bg}cc)`,
                boxShadow: `0 0 30px ${battingTeam.bg}44`,
              }}
            >
              <p className="font-display text-[15px] font-black uppercase tracking-[0.25em]" style={{ color: battingTeam.textColor }}>
                {target}
              </p>
            </div>
          )}

          {/* Bottom branding */}
          <div className="mt-4 flex items-center justify-between">
            <span className="font-display text-[11px] font-black uppercase tracking-[0.4em] text-white/25">
              Pooja's Graphics Studio
            </span>
            <span className="font-display text-[11px] font-bold uppercase tracking-[0.3em] text-white/20">
              #{battingTeam.short}v{bowlingTeam.short}
            </span>
          </div>
        </div>
      </div>
    </GraphicWrapper>
  );
}
