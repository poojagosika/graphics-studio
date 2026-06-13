import { getTeam } from '@/data/teams';
import GraphicWrapper from './GraphicWrapper';

export default function MilestoneCard({
  playerName = 'Player Name',
  runs = 50,
  balls = 30,
  fours = 5,
  sixes = 2,
  isNotOut = false,
  strikeRate,
  teamName = '',
  opponent = '',
  seriesName = "ICC Women's T20 World Cup 2026",
  type = 'fifty',
  customImage,
}) {
  const team = getTeam(teamName);
  const isCentury = type === 'century' || runs >= 100;
  const milestoneNumber = isCentury ? '100' : '50';

  // ICC-style purple/green for World Cup, team colors for others
  const accentColor1 = '#8B5CF6'; // purple
  const accentColor2 = '#10B981'; // green/teal

  return (
    <GraphicWrapper
      filename={`milestone-${type}-${playerName.replace(/\s/g, '-')}`}
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
              background: `linear-gradient(160deg, ${team.bg}aa 0%, #0a1225 50%, ${team.bg}44 100%)`
            }} />
          )}
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/80 to-transparent" />
        </div>

        {/* ═══ TOP: Team flag + Series logo ═══ */}
        <div className="relative z-10 flex items-start justify-between p-8">
          {/* Team flag badge */}
          <div
            className="flex h-14 w-[72px] items-center justify-center rounded-md font-display text-sm font-black shadow-lg"
            style={{ backgroundColor: team.bg, color: team.textColor }}
          >
            {team.short}
          </div>

          {/* Series branding */}
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 text-shadow-soft">
              Women's T20
            </p>
            <p className="font-display text-sm font-black uppercase tracking-wider text-white/80 text-shadow-soft">
              World Cup
            </p>
            <p className="text-[10px] font-bold text-white/40">England & Wales 2026</p>
          </div>
        </div>

        {/* ═══ BOTTOM: Milestone overlay ═══ */}
        <div className="relative z-10 mt-auto px-10 pb-10">
          {/* "MILESTONES" badge */}
          <div className="mb-4 inline-block">
            <div className="rounded-md bg-purple-600/90 px-5 py-2 backdrop-blur-sm">
              <p className="font-display text-[13px] font-black uppercase tracking-[0.2em] text-white">
                Milestones
              </p>
            </div>
          </div>

          {/* Lightning decorative shapes */}
          <div className="absolute -right-4 bottom-16 z-0">
            <div className="bolt-shape h-[250px] w-[120px]" style={{ backgroundColor: accentColor1, opacity: 0.7 }} />
          </div>
          <div className="absolute right-16 bottom-8 z-0">
            <div className="bolt-shape h-[200px] w-[100px]" style={{ backgroundColor: accentColor2, opacity: 0.6 }} />
          </div>

          {/* Big number */}
          <div className="relative z-10">
            <p
              className="font-display text-shadow-heavy"
              style={{
                fontSize: '180px',
                fontWeight: 900,
                lineHeight: 0.85,
                fontStyle: 'italic',
                color: isCentury ? '#FFD700' : '#FFFFFF',
                letterSpacing: '-4px',
              }}
            >
              {milestoneNumber}
            </p>
          </div>

          {/* Player name */}
          <div
            className="relative z-10 mt-4 inline-block rounded-md px-6 py-3"
            style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
          >
            <h2 className="font-display text-3xl font-black uppercase tracking-wide text-[#0a0a14]">
              {playerName}
            </h2>
          </div>

          {opponent && (
            <p className="relative z-10 mt-3 text-sm uppercase tracking-widest text-white/50">
              vs {opponent} &bull; {seriesName}
            </p>
          )}
        </div>
      </div>
    </GraphicWrapper>
  );
}
