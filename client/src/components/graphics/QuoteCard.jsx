import { getTeam } from '@/data/teams';
import GraphicWrapper from './GraphicWrapper';

export default function QuoteCard({
  quote = '"Cricket is a game of uncertainties."',
  playerName = 'Player Name',
  role = 'Cricketer',
  teamName = '',
  source = 'EXCERPT',
  articleTitle = '',
  customImage,
}) {
  const team = getTeam(teamName);

  return (
    <GraphicWrapper
      filename={`quote-${playerName.replace(/\s/g, '-')}`}
      width={1080}
      height={1350}
    >
      <div className="relative flex h-full w-full overflow-hidden bg-[#0f1118]">
        {/* ═══ PLAYER PHOTO (right side, fading into dark) ═══ */}
        {customImage && (
          <div className="absolute right-0 top-0 h-full w-[55%]">
            <img src={customImage} alt={playerName} className="h-full w-full object-cover object-top" />
            {/* Strong left fade */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f1118] via-[#0f1118]/70 to-transparent" />
            {/* Subtle top/bottom fade */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f1118]/30 via-transparent to-[#0f1118]/30" />
          </div>
        )}

        {/* ═══ QUOTE CONTENT (left 60%) ═══ */}
        <div className="relative z-10 flex h-full max-w-[62%] flex-col p-14">
          {/* Quote text - large, light weight */}
          <div className="flex flex-1 items-center">
            <p
              className="font-sans leading-[1.45] text-white/95"
              style={{ fontSize: '28px', fontWeight: 300 }}
            >
              {quote.replace(/^"|"$/g, '')}
            </p>
          </div>

          {/* Attribution section */}
          <div className="mt-10">
            {/* Source label (EXCERPT) - cyan */}
            {source && (
              <p className="text-[14px] font-bold uppercase tracking-[0.35em]" style={{ color: '#06B6D4' }}>
                {source}
              </p>
            )}

            {/* Article title */}
            {articleTitle && (
              <p className="mt-4 text-[15px] font-normal leading-relaxed text-white/55">
                {articleTitle}
              </p>
            )}

            {/* Author */}
            <p className="mt-3 text-[13px] text-white/35">
              By {playerName}
            </p>

            {/* Cyan accent line + branding */}
            <div className="mt-8">
              <div className="h-[3px] w-14" style={{ backgroundColor: '#06B6D4' }} />
              <p className="mt-5 font-display text-[12px] font-black uppercase tracking-[0.35em] text-white/30">
                Pooja's Graphics Studio
              </p>
            </div>
          </div>
        </div>
      </div>
    </GraphicWrapper>
  );
}
