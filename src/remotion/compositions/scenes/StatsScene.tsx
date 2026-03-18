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
import { Counter } from "../../library/components/text/Counter";
import { ShapeAnimation } from "../../library/components/effects/ShapeAnimation";

const GREEN = "#034F46";
const PURPLE = "#F0D7FF";
const DARK = "#1A1A1A";

interface StatData {
  value: number;
  suffix: string;
  label: string;
  icon: string;
  delay: number;
  decimals?: number;
  prefix?: string;
}

const STATS: StatData[] = [
  {
    value: 3,
    suffix: "x faster",
    label: "Than traditional typing",
    icon: "lucide/zap",
    delay: 0,
  },
  {
    value: 99,
    suffix: "% accuracy",
    label: "Even in noisy environments",
    icon: "lucide/target",
    delay: 6,
  },
  {
    value: 50,
    suffix: "+ languages",
    label: "Supported worldwide",
    icon: "lucide/languages",
    delay: 12,
  },
];

const StatCard: React.FC<{
  stat: StatData;
  headingFont: string;
  bodyFont: string;
  index: number;
}> = ({ stat, headingFont, bodyFont, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const startFrame = stat.delay + 18;
  const cardScale = spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config: { damping: 14, stiffness: 80 },
    durationInFrames: 30,
  });
  const cardOpacity = interpolate(frame, [startFrame, startFrame + 12], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const cardY = interpolate(frame, [startFrame, startFrame + 20], [30, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Subtle breathing
  const breathe = 1 + Math.sin(frame / fps * 1.5 + index * 1.2) * 0.008;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        width: 280,
        padding: "36px 28px",
        borderRadius: 24,
        background: "rgba(255,255,255,0.65)",
        border: `1.5px solid ${GREEN}15`,
        boxShadow: `0 4px 24px ${GREEN}08, 0 1px 4px rgba(0,0,0,0.04)`,
        opacity: cardOpacity,
        transform: `scale(${cardScale * breathe}) translateY(${cardY}px)`,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: `linear-gradient(135deg, ${GREEN}15, ${PURPLE}40)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 4,
        }}
      >
        <Img
          src={`https://api.iconify.design/${stat.icon}.svg?color=%23034F46&width=28`}
          style={{ width: 28, height: 28 }}
        />
      </div>

      {/* Animated counter + suffix */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 0 }}>
        <Counter
          from={0}
          to={stat.value}
          duration={1.8}
          delay={stat.delay / 30 + 0.8}
          decimals={stat.decimals ?? 0}
          prefix={stat.prefix}
          suffix=""
          ease="smooth"
          style={{
            fontFamily: headingFont,
            fontSize: 56,
            fontWeight: 600,
            color: GREEN,
            lineHeight: 1,
          }}
        />
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 22,
            fontWeight: 600,
            color: GREEN,
            marginLeft: 4,
          }}
        >
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
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
        {stat.label}
      </span>
    </div>
  );
};

export const StatsScene: React.FC<{
  headingFont: string;
  bodyFont: string;
}> = ({ headingFont, bodyFont }) => {
  const frame = useCurrentFrame();

  // Label entrance
  const labelOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const labelX = interpolate(frame, [0, 15], [-20, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
      {/* Decorative shapes */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "12%",
          opacity: interpolate(frame, [5, 20], [0, 0.2], { extrapolateRight: "clamp" }),
        }}
      >
        <ShapeAnimation shape="star" animation="rotate" size={50} color={PURPLE} speed={0.1} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          right: "8%",
          opacity: interpolate(frame, [10, 25], [0, 0.15], { extrapolateRight: "clamp" }),
        }}
      >
        <ShapeAnimation shape="circle" animation="pulse" size={60} color={GREEN} speed={0.5} />
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
              background: `${PURPLE}40`,
              border: `1.5px solid ${PURPLE}80`,
            }}
          >
            <Img
              src="https://api.iconify.design/lucide/bar-chart-3.svg?color=%23034F46&width=20"
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
              By the Numbers
            </span>
          </div>
        </div>

        {/* Heading */}
        <FadeInWords
          stagger={0.06}
          duration={0.5}
          ease="power3.out"
          startFrom={6}
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
          Built for Speed & Precision
        </FadeInWords>

        {/* Stat cards row */}
        <div style={{ display: "flex", gap: 32, alignItems: "stretch" }}>
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              headingFont={headingFont}
              bodyFont={bodyFont}
              index={i}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
