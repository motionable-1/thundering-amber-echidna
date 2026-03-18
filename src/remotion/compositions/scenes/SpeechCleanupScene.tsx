import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  Img,
  AbsoluteFill,
} from "remotion";
import { FadeInWords } from "../../library/components/text/TextAnimation";
import { ShapeAnimation } from "../../library/components/effects/ShapeAnimation";
import { Glow } from "../../library/components/effects/Glow";

const GREEN = "#034F46";
const PURPLE = "#F0D7FF";
const DARK = "#1A1A1A";
const RED_MUTED = "#C0392B";

// Offset to clear transition-in
const O = 12;

export const SpeechCleanupScene: React.FC<{
  headingFont: string;
  bodyFont: string;
}> = ({ headingFont, bodyFont }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Messy text entrance
  const messyOpacity = interpolate(frame, [O + 15, O + 27], [0, 1], { extrapolateRight: "clamp" });
  const messyScale = spring({ frame: Math.max(0, frame - O - 15), fps, config: { damping: 14 }, durationInFrames: 25 });

  // Arrow / transform
  const arrowOpacity = interpolate(frame, [O + 50, O + 60], [0, 1], { extrapolateRight: "clamp" });
  const arrowScale = spring({ frame: Math.max(0, frame - O - 50), fps, config: { damping: 12, stiffness: 100 }, durationInFrames: 20 });

  // Clean text entrance
  const cleanOpacity = interpolate(frame, [O + 68, O + 80], [0, 1], { extrapolateRight: "clamp" });
  const cleanScale = spring({ frame: Math.max(0, frame - O - 68), fps, config: { damping: 14 }, durationInFrames: 25 });

  // Sparkle on clean text
  const sparkleOpacity = interpolate(frame, [O + 80, O + 90], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
      {/* Decorative */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "12%",
          opacity: interpolate(frame, [O + 5, O + 20], [0, 0.2], { extrapolateRight: "clamp" }),
        }}
      >
        <ShapeAnimation shape="star" animation="rotate" size={45} color={PURPLE} speed={0.15} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
        {/* Label */}
        <div
          style={{
            opacity: interpolate(frame, [O, O + 12], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateX(${interpolate(frame, [O, O + 15], [-20, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 20px",
              borderRadius: 100,
              background: `${PURPLE}40`,
              border: `1.5px solid ${PURPLE}80`,
            }}
          >
            <Img
              src="https://api.iconify.design/lucide/sparkles.svg?color=%23034F46&width=20"
              style={{ width: 20, height: 20 }}
            />
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: 15,
                fontWeight: 600,
                color: GREEN,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              AI Speech Cleanup
            </span>
          </div>
        </div>

        {/* Heading */}
        <FadeInWords
          stagger={0.06}
          duration={0.5}
          ease="power3.out"
          startFrom={O + 5}
          style={{
            fontFamily: headingFont,
            fontSize: 50,
            fontWeight: 500,
            color: DARK,
            textAlign: "center",
            lineHeight: 1.15,
            textWrap: "balance",
            maxWidth: 700,
          }}
        >
          From Messy to Polished
        </FadeInWords>

        {/* Before / After comparison */}
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          {/* Messy text */}
          <div
            style={{
              opacity: messyOpacity,
              transform: `scale(${messyScale})`,
              width: 380,
              padding: "28px 32px",
              borderRadius: 20,
              background: "#FFF5F5",
              border: `2px solid ${RED_MUTED}25`,
              boxShadow: `0 4px 20px ${RED_MUTED}10`,
            }}
          >
            <div
              style={{
                fontFamily: bodyFont,
                fontSize: 13,
                fontWeight: 600,
                color: RED_MUTED,
                marginBottom: 12,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              What you said
            </div>
            <div
              style={{
                fontFamily: bodyFont,
                fontSize: 18,
                color: `${DARK}CC`,
                lineHeight: 1.6,
              }}
            >
              <span>So, um, I was thinking that, like, we should </span>
              <span style={{ background: `${RED_MUTED}18`, padding: "2px 4px", borderRadius: 4, textDecoration: "line-through", color: `${RED_MUTED}90` }}>um </span>
              <span>probably schedule the, </span>
              <span style={{ background: `${RED_MUTED}18`, padding: "2px 4px", borderRadius: 4, textDecoration: "line-through", color: `${RED_MUTED}90` }}>you know, </span>
              <span>meeting for next week...</span>
            </div>
          </div>

          {/* Arrow */}
          <div
            style={{
              opacity: arrowOpacity,
              transform: `scale(${arrowScale})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Glow color={GREEN} intensity={12} pulsate pulseDuration={2}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: GREEN,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Img
                  src="https://api.iconify.design/lucide/sparkles.svg?color=%23FFFFEB&width=26"
                  style={{ width: 26, height: 26 }}
                />
              </div>
            </Glow>
            <span style={{ fontFamily: bodyFont, fontSize: 11, color: GREEN, fontWeight: 600 }}>
              AI
            </span>
          </div>

          {/* Clean text */}
          <div
            style={{
              opacity: cleanOpacity,
              transform: `scale(${cleanScale})`,
              width: 380,
              padding: "28px 32px",
              borderRadius: 20,
              background: `${GREEN}08`,
              border: `2px solid ${GREEN}25`,
              boxShadow: `0 4px 20px ${GREEN}10`,
              position: "relative",
            }}
          >
            <div
              style={{
                fontFamily: bodyFont,
                fontSize: 13,
                fontWeight: 600,
                color: GREEN,
                marginBottom: 12,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              What Flow writes
            </div>
            <div
              style={{
                fontFamily: bodyFont,
                fontSize: 18,
                color: DARK,
                lineHeight: 1.6,
                fontWeight: 500,
              }}
            >
              Let&apos;s schedule the meeting for next week.
            </div>

            {/* Sparkle accent */}
            <div
              style={{
                position: "absolute",
                top: -12,
                right: -12,
                opacity: sparkleOpacity,
                transform: `scale(${spring({ frame: Math.max(0, frame - O - 80), fps, config: { damping: 8, stiffness: 120 }, durationInFrames: 20 })})`,
              }}
            >
              <Img
                src="https://api.iconify.design/lucide/sparkles.svg?color=%23034F46&width=28"
                style={{ width: 28, height: 28 }}
              />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
