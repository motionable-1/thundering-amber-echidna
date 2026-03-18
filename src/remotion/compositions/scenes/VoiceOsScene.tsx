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

const GREEN = "#034F46";
const PURPLE = "#F0D7FF";
const DARK = "#1A1A1A";

// Offset to clear transition-in
const O = 12;

const TIMELINE_ITEMS = [
  {
    icon: "lucide/keyboard",
    label: "Traditional Typing",
    desc: "Slow, repetitive, error-prone",
    isOld: true,
    delay: 0,
  },
  {
    icon: "lucide/mic",
    label: "Basic Dictation",
    desc: "Raw speech, needs editing",
    isOld: true,
    delay: 10,
  },
  {
    icon: "lucide/sparkles",
    label: "Wispr Flow",
    desc: "Intelligent voice-to-polished text",
    isOld: false,
    delay: 20,
  },
];

const TimelineItem: React.FC<{
  item: (typeof TIMELINE_ITEMS)[0];
  bodyFont: string;
  index: number;
}> = ({ item, bodyFont, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const startFrame = item.delay + O + 18;
  const itemScale = spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config: { damping: 12, stiffness: 90 },
    durationInFrames: 25,
  });
  const itemOpacity = interpolate(frame, [startFrame, startFrame + 12], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const itemX = interpolate(frame, [startFrame, startFrame + 15], [-30, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Strikethrough animation for old items
  const strikeWidth = item.isOld
    ? interpolate(frame, [startFrame + 28, startFrame + 45], [0, 100], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
        easing: Easing.out(Easing.cubic),
      })
    : 0;

  // Glow for Wispr Flow item
  const isActive = !item.isOld;
  const glowPulse = isActive ? 0.6 + Math.sin(frame / fps * 3) * 0.4 : 0;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        opacity: itemOpacity,
        transform: `scale(${itemScale}) translateX(${itemX}px)`,
      }}
    >
      {/* Timeline dot */}
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: isActive ? GREEN : `${DARK}30`,
          border: isActive ? `3px solid ${GREEN}40` : `2px solid ${DARK}20`,
          boxShadow: isActive ? `0 0 ${12 * glowPulse}px ${GREEN}60` : "none",
          flexShrink: 0,
        }}
      />

      {/* Card */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: "20px 28px",
          borderRadius: 18,
          background: isActive ? `${GREEN}08` : "rgba(255,255,255,0.5)",
          border: isActive ? `2px solid ${GREEN}25` : `1.5px solid ${DARK}10`,
          boxShadow: isActive
            ? `0 4px 20px ${GREEN}15`
            : `0 2px 10px rgba(0,0,0,0.03)`,
          position: "relative",
          width: 420,
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: 14,
            background: isActive ? GREEN : `${DARK}08`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Img
            src={`https://api.iconify.design/${item.icon}.svg?color=${isActive ? "%23FFFFEB" : "%231A1A1A80"}&width=24`}
            style={{ width: 24, height: 24 }}
          />
        </div>

        {/* Text */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span
            style={{
              fontFamily: bodyFont,
              fontSize: 18,
              fontWeight: isActive ? 700 : 600,
              color: isActive ? GREEN : `${DARK}90`,
            }}
          >
            {item.label}
          </span>
          <span
            style={{
              fontFamily: bodyFont,
              fontSize: 14,
              fontWeight: 400,
              color: `${DARK}60`,
            }}
          >
            {item.desc}
          </span>
        </div>

        {/* Strikethrough line for old items */}
        {item.isOld && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 20,
              width: `${strikeWidth}%`,
              height: 2,
              background: `${DARK}25`,
              transform: "translateY(-50%)",
            }}
          />
        )}

        {/* Active badge */}
        {isActive && (
          <div
            style={{
              position: "absolute",
              top: -10,
              right: 16,
              padding: "4px 12px",
              borderRadius: 100,
              background: PURPLE,
              border: `1.5px solid ${DARK}`,
              opacity: interpolate(frame, [startFrame + 22, startFrame + 32], [0, 1], {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
              }),
              transform: `scale(${spring({
                frame: Math.max(0, frame - startFrame - 22),
                fps,
                config: { damping: 10, stiffness: 140 },
                durationInFrames: 18,
              })})`,
            }}
          >
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: 12,
                fontWeight: 700,
                color: DARK,
              }}
            >
              THE FUTURE
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export const VoiceOsScene: React.FC<{
  headingFont: string;
  bodyFont: string;
}> = ({ headingFont, bodyFont }) => {
  const frame = useCurrentFrame();

  // Label entrance
  const labelOpacity = interpolate(frame, [O, O + 12], [0, 1], { extrapolateRight: "clamp" });
  const labelX = interpolate(frame, [O, O + 15], [-20, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Vertical line between timeline items
  const lineHeight = interpolate(frame, [O + 20, O + 65], [0, 100], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
      {/* Decorative shapes */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "10%",
          opacity: interpolate(frame, [O + 5, O + 20], [0, 0.15], { extrapolateRight: "clamp" }),
        }}
      >
        <ShapeAnimation shape="ring" animation="rotate" size={70} color={GREEN} strokeWidth={2} speed={0.06} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "14%",
          left: "8%",
          opacity: interpolate(frame, [O + 10, O + 25], [0, 0.18], { extrapolateRight: "clamp" }),
        }}
      >
        <ShapeAnimation shape="star" animation="breathe" size={40} color={PURPLE} speed={0.3} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
        {/* Label */}
        <div
          style={{
            opacity: labelOpacity,
            transform: `translateX(${labelX}px)`,
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
              src="https://api.iconify.design/lucide/rocket.svg?color=%23034F46&width=20"
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
              The Voice OS
            </span>
          </div>
        </div>

        {/* Heading */}
        <FadeInWords
          stagger={0.06}
          duration={0.5}
          ease="power3.out"
          startFrom={O + 6}
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
          The Evolution of Input
        </FadeInWords>

        {/* Timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative" }}>
          {/* Vertical connecting line */}
          <div
            style={{
              position: "absolute",
              top: 8,
              left: 7,
              width: 2,
              height: `${lineHeight}%`,
              background: `linear-gradient(180deg, ${DARK}15, ${GREEN}40, ${GREEN})`,
            }}
          />

          {TIMELINE_ITEMS.map((item, i) => (
            <TimelineItem
              key={item.label}
              item={item}
              bodyFont={bodyFont}
              index={i}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
