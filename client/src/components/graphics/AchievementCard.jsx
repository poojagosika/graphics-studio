import { getTeam } from '@/data/teams';
import GraphicWrapper from './GraphicWrapper';

export default function AchievementCard({
  playerName = 'Player Name',
  achievementNumber = '3000',
  achievementLabel = 'Runs in T20Is',
  subtitle = '',
  teamName = '',
  seriesName = "ICC Women's T20 World Cup 2026",
  customImage,
}) {
  const team = getTeam(teamName);

  return (
    <GraphicWrapper
      filename={`achievement-${playerName.replace(/\s/g, '-')}-${achievementNumber}`}
      width={1080}
      height={1350}
    >
      <div className="relative flex h-full w-full overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${team.bg}dd 0%, #081020 40%, ${team.bg}99 100%)` }}
      >
        {/* ═══ Halftone dot pattern overlay ═══ */}
        <div className="absolute inset-0 halftone text-white/[0.03]" />

        {/* ═══ Player image (right side / background) ═══ */}
        {customImage && (
          <div className="absolute right-0 top-0 h-full w-[65%]">
            <img src={customImage} alt={playerName} className="h-full w-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#081020] via-[#081020]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081020]/60 to-transparent" />
          </div>
        )}

        <div className="absolute -bottom-10 -right-10 opacity-25">
          <svg width="300" height="300" viewBox="0 0 300 300">
            <path d="M150,0 L300,150 L150,300 L0,150 Z" fill="none" stroke={team.accent} strokeWidth="2" opacity="0.5" />
            <path d="M150,30 L270,150 L150,270 L30,150 Z" fill="none" stroke={team.accent} strokeWidth="1.5" opacity="0.3" />
          </svg>
        </div>
        <div
          className="absolute right-[15%] top-[10%] h-[80px] w-[80px] rotate-45 opacity-15"
          style={{ backgroundColor: team.accent }}
        />
        <div
          className="absolute right-[5%] top-[30%] h-[40px] w-[40px] rotate-12 opacity-10"
          style={{ backgroundColor: team.accent }}
        />

        {/* ═══ CONTENT ═══ */}
        <div className="relative z-10 flex h-full w-full flex-col justify-between p-12">
          {/* Top: Player name + team badge */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-display text-shadow-soft" style={{ fontSize: '50px', fontWeight: 900, lineHeight: 1, color: '#FFFFFF' }}>
                {playerName.split(' ').map((w, i) => (
                  <span key={i} className="block uppercase tracking-wide">{w}</span>
                ))}
              </h2>
            </div>

            {/* Team badge */}
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full font-display text-sm font-black shadow-xl"
              style={{
                backgroundColor: team.bg,
                color: team.textColor,
                border: `3px solid ${team.accent}`,
                boxShadow: `0 0 25px ${team.bg}88`,
              }}
            >
              {team.short}
            </div>
          </div>

          {/* Bottom: Big number + label */}
          <div>
            {/* Large achievement number */}
            <p
              className="font-display text-shadow-heavy"
              style={{
                fontSize: '200px',
                fontWeight: 900,
                lineHeight: 0.85,
                color: '#FFFFFF',
                letterSpacing: '-6px',
              }}
            >
              {achievementNumber}
            </p>

            {/* Achievement label */}
            <p className="mt-2 font-display text-[32px] font-bold uppercase tracking-wide text-white/80">
              {achievementLabel}
            </p>

            {subtitle && (
              <p className="mt-3 text-sm text-white/40">{subtitle}</p>
            )}

            {/* Bottom branding */}
            <div className="mt-10 flex items-center justify-between">
              <span className="font-display text-[11px] font-black uppercase tracking-[0.4em] text-white/25">
                Pooja's Graphics Studio
              </span>
              <span className="font-display text-[11px] font-bold uppercase tracking-[0.3em] text-white/20">
                #{team.short}
              </span>
            </div>
          </div>
        </div>
      </div>
    </GraphicWrapper>
  );
}
