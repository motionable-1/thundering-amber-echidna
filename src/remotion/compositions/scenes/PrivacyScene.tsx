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

const PRIVACY_FEATURES = [
  {
    icon: "lucide/cpu",
    title: "On-Device Processing",
    desc: "Your voice never leaves your device",
    delay: 0,
  },
  {
    icon: "lucide/shield-check",
    title: "End-to-End Encrypted",
    desc: "Military-grade data protection",
    delay: 8,
  },
  {
    icon: "lucide/database",
    title: "Zero Data Storage",
    desc: "Nothing stored, nothing tracked",
    delay: 16,
  },
];

const PrivacyCard: React.FC<{
  icon: string;
  title: string;
  desc: string;
  delay: number;
  bodyFont: string;
  index: number;
}> = ({ icon, title, desc, delay, bodyFont, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const startFrame = delay + O + 22;
  const cardScale = spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config: { damping: 13, stiffness: 90 },
    durationInFrames: 28,
  });
  const cardOpacity = interpolate(frame, [startFrame, startFrame + 12], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const cardY = interpolate(frame, [startFrame, startFrame + 18], [25, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Subtle float
  const floatY = Math.sin((frame - delay) / fps * 1.2 + index * 1.5) * 3;

  // Check icon scale pop
  const checkDelay = startFrame + 22;
  const checkScale = spring({
    frame: Math.max(0, frame - checkDelay),
    fps,
    config: { damping: 8, stiffness: 150 },
    durationInFrames: 18,
  });
  const checkOpacity = interpolate(frame, [checkDelay, checkDelay + 8], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        width: 260,
        opacity: cardOpacity,
        transform: `scale(${cardScale}) translateY(${cardY + floatY}px)`,
      }}
    >
      {/* Icon circle */}
      <div style={{ position: "relative" }}>
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            background: `linear-gradient(145deg, ${GREEN}15, ${PURPLE}50)`,
            border: `2px solid ${GREEN}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Img
            src={`https://api.iconify.design/${icon}.svg?color=%23034F46&width=38`}
            style={{ width: 38, height: 38 }}
          />
        </div>
        {/* Green check badge */}
        <div
          style={{
            position: "absolute",
            bottom: -4,
            right: -4,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: GREEN,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: checkOpacity,
            transform: `scale(${checkScale})`,
            boxShadow: `0 2px 8px ${GREEN}50`,
          }}
        >
          <Img
            src="https://api.iconify.design/lucide/check.svg?color=%23FFFFEB&width=16"
            style={{ width: 16, height: 16 }}
          />
        </div>
      </div>

      {/* Title */}
      <span
        style={{
          fontFamily: bodyFont,
          fontSize: 19,
          fontWeight: 700,
          color: DARK,
          textAlign: "center",
        }}
      >
        {title}
      </span>

      {/* Description */}
      <span
        style={{
          fontFamily: bodyFont,
          fontSize: 15,
          fontWeight: 400,
          color: `${DARK}80`,
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        {desc}
      </span>
    </div>
  );
};

export const PrivacyScene: React.FC<{
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

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
      {/* Decorative shapes */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "8%",
          opacity: interpolate(frame, [O + 5, O + 20], [0, 0.18], { extrapolateRight: "clamp" }),
        }}
      >
        <ShapeAnimation shape="hexagon" animation="rotate" size={55} color={GREEN} speed={0.06} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: "10%",
          opacity: interpolate(frame, [O + 10, O + 25], [0, 0.12], { extrapolateRight: "clamp" }),
        }}
      >
        <ShapeAnimation shape="diamond" animation="breathe" size={45} color={PURPLE} speed={0.4} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 44 }}>
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
              background: `${GREEN}12`,
              border: `1.5px solid ${GREEN}25`,
            }}
          >
            <Img
              src="https://api.iconify.design/lucide/lock.svg?color=%23034F46&width=20"
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
              Privacy First
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
            fontSize: 52,
            fontWeight: 500,
            color: DARK,
            textAlign: "center",
            lineHeight: 1.15,
            textWrap: "balance",
            maxWidth: 700,
          }}
        >
          Your Words Stay Yours
        </FadeInWords>

        {/* Three privacy feature cards */}
        <div style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
          {PRIVACY_FEATURES.map((f, i) => (
            <PrivacyCard
              key={f.title}
              icon={f.icon}
              title={f.title}
              desc={f.desc}
              delay={f.delay}
              bodyFont={bodyFont}
              index={i}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
