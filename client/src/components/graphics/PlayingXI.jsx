import { getTeam } from "@/data/teams";
import GraphicWrapper from "./GraphicWrapper";

export default function PlayingXI({
  team1 = { name: "Team 1", playingXI: [] },
  team2 = { name: "Team 2", playingXI: [] },
  seriesName = "ICC Women's T20 World Cup 2026",
  matchInfo = "",
  venue = "",
  date = "",
  customImage,
  backgroundImage,
  matchTitle,
  singleTeam = false,
}) {
  const t1 = getTeam(team1.name);
  const t2 = getTeam(team2.name);

  // ═══ SINGLE TEAM MODE (ICC World Cup poster style) ═══
  if (singleTeam) {
    const team = t1;
    const opponent = t2;
    const players = team1.playingXI || [];

    // Just use the series name as-is
    const yearMatch = seriesName.match(/\d{4}/);
    const seriesYear = yearMatch ? yearMatch[0] : "";

    return (
      <GraphicWrapper filename={`xi-${team.short}`} width={1080} height={1350}>
        <div
          className="relative flex h-full w-full overflow-hidden"
          style={{ backgroundColor: "#080c18" }}
        >
          {/* ═══ LAYER 1: Background image (venue/skyline) ═══ */}
          {backgroundImage ? (
            <div className="absolute inset-0">
              <img
                src={backgroundImage}
                alt=""
                className="h-full w-full object-cover"
              />
              {/* Warm golden tint */}
              <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(120, 80, 20, 0.12)" }}
              />
              {/* Dark overlay on left side only for text readability */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(8,12,24,0.93) 0%, rgba(8,12,24,0.85) 30%, rgba(8,12,24,0.15) 48%, transparent 58%)",
                }}
              />
              {/* Bottom fade for player list readability */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(8,12,24,0.97) 0%, rgba(8,12,24,0.5) 25%, transparent 50%)",
                }}
              />
            </div>
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(160deg, ${team.bg}44 0%, #080c18 25%, #0a0e1e 50%, #080c18 75%, ${opponent.bg || "#1a1a2e"}22 100%)`,
              }}
            >
              <div className="absolute inset-0 diagonal-lines opacity-15" />
              {/* Atmospheric color glows */}
              <div
                className="absolute left-[-10%] top-[5%] h-[45%] w-[55%] rounded-full blur-[150px]"
                style={{ backgroundColor: team.bg, opacity: 0.18 }}
              />
              <div
                className="absolute right-[5%] top-[25%] h-[35%] w-[40%] rounded-full blur-[130px]"
                style={{ backgroundColor: team.accent, opacity: 0.08 }}
              />
              <div
                className="absolute bottom-[5%] right-[-5%] h-[40%] w-[45%] rounded-full blur-[140px]"
                style={{
                  backgroundColor: opponent.bg || "#1a1a2e",
                  opacity: 0.12,
                }}
              />
              {/* Subtle vignette */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)",
                }}
              />
            </div>
          )}

          {/* ═══ LAYER 2: Player photo (right side) ═══ */}
          {customImage && (
            <div className="absolute right-[-10%] top-0 z-[5] h-full">
              <img
                src={customImage}
                alt={team.name}
                className="h-full w-full object-cover object-top"
              />
              {/* Bottom fade */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[25%]"
                style={{
                  background:
                    "linear-gradient(to top, rgba(8,12,24,0.85), transparent)",
                }}
              />
            </div>
          )}

          {/* ═══ LAYER 3: All text content ═══ */}
          <div className="relative z-10 flex h-full w-full flex-col px-24 pt-32 pb-10">
            {/* Series branding */}
            <div>
              <p
                className="text-[18px] font-bold uppercase leading-snug tracking-[0.15em]"
                style={{ color: team.accent, textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
              >
                {seriesName}
              </p>
              {venue && (
                <div className="mt-2 flex items-center gap-3">
                  <div className="h-[2px] w-8" style={{ backgroundColor: team.accent }} />
                  <p
                    className="text-[13px] font-bold uppercase tracking-[0.2em] text-white/50"
                    style={{ textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}
                  >
                    {venue}
                  </p>
                  <div className="h-[2px] w-8" style={{ backgroundColor: team.accent }} />
                </div>
              )}
            </div>

            {/* ── Big match title ── */}
            <div className="mt-8">
              <h1
                className="font-display uppercase leading-[0.88] text-white"
                style={{
                  fontSize: "84px",
                  fontWeight: 900,
                  textShadow:
                    "3px 5px 25px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.5)",
                  letterSpacing: "-0.01em",
                }}
              >
                {(() => {
                  const title = matchTitle || `${opponent.name} VS ${team.name}`;
                  const parts = title.split(/\s+(v|vs)\s+/i);
                  return (<>{parts[0]}<br /><span style={{ color: team.accent }}>{(parts[1] || 'V').toUpperCase()} </span>{parts[2] || ''}</>);
                })()}
              </h1>
            </div>

            {/* "Team Playing XI" label */}
            <div className="mt-5 flex items-center gap-3">
              <span
                className="rounded px-4 py-1.5 font-display text-[24px] font-black uppercase tracking-wider text-black"
                style={{
                  backgroundColor: team.accent,
                  boxShadow: `0 0 20px ${team.accent}44`,
                }}
              >
                {team.name} Playing XI
              </span>
            </div>

            {/* ── Player names ── */}
            <div className="mt-7 space-y-[10px]">
              {players.map((player, i) => {
                const nameParts = player.name.trim().split(/\s+/);
                const firstName =
                  nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") : "";
                const lastName = nameParts[nameParts.length - 1];
                const tags = [];
                if (player.isCaptain) tags.push("C");
                if (player.isWicketkeeper) tags.push("WK");
                const tagStr = tags.length > 0 ? ` (${tags.join(", ")})` : "";

                return (
                  <div key={i} className="flex items-baseline">
                    {firstName && (
                      <span
                        className="text-[32px] uppercase text-white/80"
                        style={{
                          fontWeight: 400,
                          textShadow: "0 1px 6px rgba(0,0,0,0.7)",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {firstName}
                      </span>
                    )}
                    <span>&nbsp; &nbsp;</span>
                    <span
                      className="text-[32px] font-bold uppercase text-white"
                      style={{
                        textShadow: "0 1px 6px rgba(0,0,0,0.7)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {lastName}
                    </span>
                    {tagStr && (
                      <span
                        className="ml-2 text-[14px] font-bold uppercase"
                        style={{
                          color: team.accent,
                          textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                        }}
                      >
                        {tagStr}
                      </span>
                    )}
                  </div>
                );
              })}
              {players.length === 0 && (
                <p className="py-4 text-sm italic text-white/20">
                  Enter players on the left
                </p>
              )}
            </div>

            {/* Bottom branding */}
            <div className="mt-auto pb-6">
              <img
                src="/logo.png"
                alt="branding-logo"
                className="h-[60px] object-contain object-left"
              />
            </div>
          </div>
        </div>
      </GraphicWrapper>
    );
  }

  // No singleTeam selected — show nothing (single team mode is the only mode now)
  return null;
}
