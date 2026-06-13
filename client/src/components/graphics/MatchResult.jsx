import { getTeam } from '@/data/teams';
import GraphicWrapper from './GraphicWrapper';

export default function MatchResult({
  team1 = { name: 'Team 1', score: '180/6', overs: '20' },
  team2 = { name: 'Team 2', score: '175/8', overs: '20' },
  winner = '',
  result = '',
  playerOfMatch = '',
  seriesName = "ICC Women's T20 World Cup 2026",
  matchInfo = '',
  customImage,
}) {
  const t1 = getTeam(team1.name);
  const t2 = getTeam(team2.name);
  const winnerTeam = getTeam(winner);
  const isTeam1Winner = winner && (winner === team1.name || winner === t1.short || winner === t1.name);

  // Extract margin from result (e.g., "by 87 runs" from "England won by 87 runs")
  const marginMatch = result.match(/by\s+(.+)/i);
  const margin = marginMatch ? `by ${marginMatch[1]}` : '';

  // ICC-style accent colors
  const accentColor1 = '#8B5CF6';
  const accentColor2 = '#10B981';

  return (
    <GraphicWrapper
      filename={`result-${t1.short}-vs-${t2.short}`}
      width={1080}
      height={1350}
    >
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#0a0a14]">
        {/* ═══ PHOTO (top 55%) ═══ */}
        <div className="relative" style={{ height: '55%' }}>
          {customImage ? (
            <img src={customImage} alt="Match" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0" style={{
              background: `linear-gradient(135deg, ${t1.bg}88 0%, #0a0a14 50%, ${t2.bg}88 100%)`
            }} />
          )}
          <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/80 to-transparent" />

          {/* ICC WC branding top-right */}
          <div className="absolute right-8 top-8 z-10 text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 text-shadow-soft">
              Women's T20
            </p>
            <p className="font-display text-sm font-black uppercase text-white/80 text-shadow-soft">
              World Cup
            </p>
            <p className="text-[10px] text-white/40">England & Wales 2026</p>
          </div>
        </div>

        {/* ═══ Lightning decorative shapes ═══ */}
        <div className="absolute bottom-0 right-0 z-[5]">
          <div className="bolt-shape h-[350px] w-[160px]" style={{ backgroundColor: accentColor1, opacity: 0.6 }} />
        </div>
        <div className="absolute bottom-[5%] right-[12%] z-[5]">
          <div className="bolt-shape h-[280px] w-[130px]" style={{ backgroundColor: accentColor2, opacity: 0.5 }} />
        </div>

        {/* ═══ RESULT DATA ═══ */}
        <div className="relative z-10 flex flex-1 flex-col justify-between px-10 pb-8" style={{ marginTop: '-100px' }}>
          {/* Winner text - HUGE */}
          <div>
            <h1
              className="font-display text-shadow-heavy uppercase leading-[0.9]"
              style={{ fontSize: '72px', fontWeight: 900, color: '#FFFFFF' }}
            >
              {winner || t1.name} Win
            </h1>
            {margin && (
              <p
                className="mt-2 font-display text-[28px] font-bold uppercase tracking-wide"
                style={{ color: winnerTeam.accent }}
              >
                {margin}
              </p>
            )}
          </div>

          {/* Scores row */}
          <div className="mt-8 flex items-center gap-6">
            {/* Team 1 */}
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-12 items-center justify-center rounded font-display text-[10px] font-black"
                style={{ backgroundColor: t1.bg, color: t1.textColor }}
              >
                {t1.short}
              </div>
              <div>
                <p className="font-display text-[36px] font-black leading-none text-white">
                  {team1.score}
                </p>
                <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                  {team1.overs} Overs
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-12 w-[2px] bg-white/15" />

            {/* Team 2 */}
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-12 items-center justify-center rounded font-display text-[10px] font-black"
                style={{ backgroundColor: t2.bg, color: t2.textColor }}
              >
                {t2.short}
              </div>
              <div>
                <p className="font-display text-[36px] font-black leading-none text-white/70">
                  {team2.score}
                </p>
                <p className="text-[11px] font-bold uppercase tracking-widest text-white/30">
                  {team2.overs} Overs
                </p>
              </div>
            </div>
          </div>

          {/* Player of the Match */}
          {playerOfMatch && (
            <div className="mt-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/35">
                Player of the Match
              </p>
              <p className="mt-1 font-display text-[22px] font-black uppercase tracking-wider text-white">
                {playerOfMatch}
              </p>
            </div>
          )}

          {/* Bottom branding */}
          <div className="mt-auto flex items-center justify-between pt-4">
            <span className="font-display text-[11px] font-black uppercase tracking-[0.4em] text-white/25">
              Pooja's Graphics Studio
            </span>
            {matchInfo && (
              <span className="text-[10px] uppercase tracking-widest text-white/20">{matchInfo}</span>
            )}
          </div>
        </div>
      </div>
    </GraphicWrapper>
  );
}
