import { getTeam } from "@/data/teams";
import GraphicWrapper from "./GraphicWrapper";

export default function WicketCard({
  playerName = "Player Name",
  wickets = 5,
  runsConceded = 25,
  overs = 4,
  maidens = 0,
  economy,
  teamName = "",
  opponent = "",
  seriesName = "ICC Women's T20 World Cup 2026",
  customImage,
}) {
  const team = getTeam(teamName);
  const figures = `${overs}-${maidens}-${runsConceded}-${wickets}`;

  return (
    <GraphicWrapper
      filename={`bowling-${playerName.replace(/\s/g, "-")}`}
      width={1080}
      height={1350}
    >
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#0c0e16]">
        {/* ═══ PLAYER PHOTO (full bleed, top 65%) ═══ */}
        <div className="relative" style={{ height: "62%" }}>
          {customImage ? (
            <img
              src={customImage}
              alt={playerName}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(160deg, ${team.bg}88 0%, #0c0e16 60%, ${team.bg}33 100%)`,
              }}
            />
          )}
          {/* Gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-[#0c0e16] via-[#0c0e16]/70 to-transparent" />
        </div>

        {/* ═══ BOTTOM DATA SECTION ═══ */}
        <div
          className="relative z-10 flex flex-1 flex-col justify-center px-12"
          style={{ marginTop: "-60px" }}
        >
          {/* Player name - spaced uppercase */}
          <p className="text-[15px] font-bold uppercase tracking-[0.4em] text-white/60">
            {playerName}
          </p>

          {/* Bowling figures - MASSIVE italic */}
          <p
            className="mt-4 font-display text-shadow-heavy"
            style={{
              fontSize: "130px",
              fontWeight: 900,
              fontStyle: "italic",
              lineHeight: 0.9,
              color: "#FFFFFF",
              letterSpacing: "-2px",
            }}
          >
            {figures}
          </p>

          {/* Match context */}
          <div className="mt-8 space-y-1.5">
            {opponent && (
              <p className="text-[14px] font-medium uppercase tracking-[0.25em] text-white/50">
                vs {opponent}
              </p>
            )}
            <p className="text-[14px] font-medium uppercase tracking-[0.25em] text-white/35">
              {seriesName}
            </p>
          </div>

          {/* Branding */}
          <div className="mt-auto pb-2">
            <p className="font-display text-[11px] font-black uppercase tracking-[0.4em] text-white/25">
              Pooja's Graphics Studio
            </p>
          </div>
        </div>

        <div className="h-[6px]" style={{ backgroundColor: "#06B6D4" }} />
      </div>
    </GraphicWrapper>
  );
}
