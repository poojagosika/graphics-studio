import { getTeam } from '@/data/teams';
import GraphicWrapper from './GraphicWrapper';

export default function PlayerOfMatch({
  playerName = 'Player Name',
  team1Name = '',
  team2Name = '',
  seriesName = "ICC Women's T20 World Cup 2026",
  customImage,
}) {
  const t1 = getTeam(team1Name);
  const t2 = getTeam(team2Name);

  // ICC-style accent colors
  const accentColor1 = '#8B5CF6';
  const accentColor2 = '#10B981';

  return (
    <GraphicWrapper
      filename={`potm-${playerName.replace(/\s/g, '-')}`}
      width={1080}
      height={1350}
    >
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#0a0a14]">
        {/* ═══ PLAYER PHOTO (full bleed) ═══ */}
        <div className="absolute inset-0">
          {customImage ? (
            <img src={customImage} alt={playerName} className="h-full w-full object-cover object-top" />
          ) : (
            <div className="h-full w-full" style={{
              background: `linear-gradient(160deg, ${t1.bg}88 0%, #0a0a14 60%, ${t1.bg}44 100%)`
            }} />
          )}
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/70 to-transparent" />
          {/* Left fade for text */}
          <div className="absolute bottom-0 left-0 h-[60%] w-[70%] bg-gradient-to-r from-[#0a0a14]/80 to-transparent" />
        </div>

        {/* ═══ Lightning decorative shapes ═══ */}
        <div className="absolute -left-4 top-[10%] z-[5]">
          <div className="bolt-shape h-[200px] w-[90px]" style={{ backgroundColor: accentColor1, opacity: 0.6 }} />
        </div>
        <div className="absolute bottom-0 right-0 z-[5]">
          <div className="bolt-shape h-[300px] w-[140px]" style={{ backgroundColor: accentColor2, opacity: 0.55 }} />
        </div>
        <div className="absolute bottom-[8%] right-[10%] z-[5]">
          <div className="bolt-shape h-[250px] w-[120px]" style={{ backgroundColor: accentColor1, opacity: 0.5 }} />
        </div>

        {/* ═══ TOP: Series branding ═══ */}
        <div className="absolute right-8 top-8 z-10 text-right">
          <p className="font-display text-sm font-black uppercase text-white/80 text-shadow-soft">
            {seriesName}
          </p>
        </div>

        {/* ═══ BOTTOM: POTM content ═══ */}
        <div className="relative z-10 mt-auto px-10 pb-10">
          {/* PLAYER OF THE MATCH - huge text */}
          <h1
            className="font-display uppercase leading-[0.9] text-white text-shadow-heavy"
            style={{ fontSize: '68px', fontWeight: 900 }}
          >
            Player of<br />the Match
          </h1>

          {/* Team flags */}
          <div className="mt-6 flex items-center gap-3">
            <div
              className="flex h-9 w-11 items-center justify-center rounded font-display text-[9px] font-black"
              style={{ backgroundColor: t1.bg, color: t1.textColor }}
            >
              {t1.short}
            </div>
            <span className="text-sm font-bold text-white/40">v</span>
            <div
              className="flex h-9 w-11 items-center justify-center rounded font-display text-[9px] font-black"
              style={{ backgroundColor: t2.bg, color: t2.textColor }}
            >
              {t2.short}
            </div>
          </div>

          {/* Player name with underline */}
          <div className="mt-5">
            <div className="h-[3px] w-full" style={{ backgroundColor: t1.accent }} />
            <h2 className="mt-3 font-display text-[30px] font-black uppercase tracking-wider text-white">
              {playerName}
            </h2>
          </div>
        </div>
      </div>
    </GraphicWrapper>
  );
}
