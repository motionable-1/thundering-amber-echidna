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

const PLATFORMS = [
  { name: "Mac", icon: "tabler:brand-apple", delay: 0 },
  { name: "Windows", icon: "tabler:brand-windows", delay: 4 },
  { name: "iPhone", icon: "tabler:device-mobile", delay: 8 },
  { name: "Android", icon: "tabler:brand-android", delay: 12 },
];

const PlatformCard: React.FC<{
  name: string;
  icon: string;
  delay: number;
  bodyFont: string;
}> = ({ name, icon, delay, bodyFont }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 12, stiffness: 100 },
    durationInFrames: 30,
  });
  const cardOpacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Subtle hover float
  const floatY = Math.sin((frame - delay) / fps * 2) * 3;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        opacity: cardOpacity,
        transform: `scale(${cardScale}) translateY(${floatY}px)`,
      }}
    >
      <div
        style={{
          width: 110,
          height: 110,
          borderRadius: 28,
          background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN}DD 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 8px 32px ${GREEN}40, 0 2px 8px ${GREEN}20`,
        }}
      >
        <Img
          src={`https://api.iconify.design/${icon}.svg?color=%23FFFFEB&width=52`}
          style={{ width: 52, height: 52 }}
        />
      </div>
      <span
        style={{
          fontFamily: bodyFont,
          fontSize: 20,
          fontWeight: 600,
          color: DARK,
          letterSpacing: "-0.01em",
        }}
      >
        {name}
      </span>
    </div>
  );
};

export const CrossPlatformScene: React.FC<{
  headingFont: string;
  bodyFont: string;
}> = ({ headingFont, bodyFont }) => {
  const frame = useCurrentFrame();

  // Section label
  const labelOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const labelX = interpolate(frame, [0, 15], [-20, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Connecting line animation
  const lineWidth = interpolate(frame, [20, 55], [0, 100], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", padding: 80 }}
    >
      {/* Decorative shapes */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "8%",
          opacity: interpolate(frame, [5, 20], [0, 0.2], { extrapolateRight: "clamp" }),
        }}
      >
        <ShapeAnimation shape="circle" animation="breathe" size={60} color={PURPLE} speed={0.3} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          opacity: interpolate(frame, [10, 25], [0, 0.15], { extrapolateRight: "clamp" }),
        }}
      >
        <ShapeAnimation shape="ring" animation="rotate" size={80} color={GREEN} strokeWidth={2} speed={0.1} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 50 }}>
        {/* Feature label */}
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
              src="https://api.iconify.design/lucide/monitor-smartphone.svg?color=%23034F46&width=20"
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
              Cross-Platform
            </span>
          </div>
        </div>

        {/* Heading */}
        <FadeInWords
          stagger={0.06}
          duration={0.5}
          ease="power3.out"
          startFrom={8}
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
          One Voice, Every Device
        </FadeInWords>

        {/* Platform cards row */}
        <div style={{ display: "flex", gap: 50, alignItems: "center", position: "relative" }}>
          {/* Connecting line */}
          <div
            style={{
              position: "absolute",
              top: 55,
              left: 55,
              right: 55,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${GREEN}30, ${GREEN}30, transparent)`,
              clipPath: `inset(0 ${100 - lineWidth}% 0 0)`,
            }}
          />

          {PLATFORMS.map((p) => (
            <PlatformCard
              key={p.name}
              name={p.name}
              icon={p.icon}
              delay={p.delay + 15}
              bodyFont={bodyFont}
            />
          ))}
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: interpolate(frame, [40, 55], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [40, 55], [15, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
          }}
        >
          <span
            style={{
              fontFamily: bodyFont,
              fontSize: 20,
              color: `${DARK}90`,
              textAlign: "center",
              display: "block",
            }}
          >
            Seamlessly sync across Mac, Windows, iPhone & Android
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
