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
const GREEN = "#034F46";
const DARK = "#1A1A1A";

const APPS = [
  { name: "Slack", icon: "logos:slack-icon", delay: 0 },
  { name: "Gmail", icon: "logos:google-gmail", delay: 3 },
  { name: "Notion", icon: "logos:notion-icon", delay: 6 },
  { name: "Docs", icon: "logos:google-drive", delay: 9 },
  { name: "Teams", icon: "logos:microsoft-teams", delay: 12 },
  { name: "ChatGPT", icon: "logos:openai-icon", delay: 15 },
];

const AppBubble: React.FC<{
  name: string;
  icon: string;
  delay: number;
  index: number;
  bodyFont: string;
}> = ({ name, icon, delay, index, bodyFont }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bubbleScale = spring({
    frame: Math.max(0, frame - delay - 12),
    fps,
    config: { damping: 10, stiffness: 120 },
    durationInFrames: 25,
  });
  const bubbleOpacity = interpolate(frame, [delay + 12, delay + 22], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Gentle float
  const floatY = Math.sin((frame - delay) / fps * 1.5 + index * 0.8) * 4;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        opacity: bubbleOpacity,
        transform: `scale(${bubbleScale}) translateY(${floatY}px)`,
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 22,
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 4px 20px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.05)`,
          border: `1px solid rgba(0,0,0,0.06)`,
        }}
      >
        <Img
          src={`https://api.iconify.design/${icon}.svg?width=40`}
          style={{ width: 40, height: 40 }}
        />
      </div>
      <span
        style={{
          fontFamily: bodyFont,
          fontSize: 14,
          fontWeight: 600,
          color: `${DARK}B0`,
        }}
      >
        {name}
      </span>
    </div>
  );
};

export const UniversalAppsScene: React.FC<{
  headingFont: string;
  bodyFont: string;
}> = ({ headingFont, bodyFont }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Microphone icon pulse
  const micScale = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 12, stiffness: 80 }, durationInFrames: 30 });
  const micPulse = 1 + Math.sin(frame / fps * 3) * 0.05;

  // "Works everywhere" ring expanding
  const ringExpand = interpolate(frame, [8, 40], [0.5, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const ringOpacity = interpolate(frame, [8, 20], [0, 0.15], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
      {/* Background ring */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${ringExpand})`,
          opacity: ringOpacity,
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: `3px solid ${GREEN}40`,
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36 }}>
        {/* Label */}
        <div
          style={{
            opacity: interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [0, 15], [-15, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
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
              src="https://api.iconify.design/lucide/globe.svg?color=%23034F46&width=20"
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
              Universal Compatibility
            </span>
          </div>
        </div>

        {/* Heading */}
        <FadeInWords
          stagger={0.06}
          duration={0.5}
          ease="power3.out"
          startFrom={5}
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
          Type Anywhere with Your Voice
        </FadeInWords>

        {/* Central microphone icon */}
        <div
          style={{
            opacity: interpolate(frame, [5, 18], [0, 1], { extrapolateRight: "clamp" }),
            transform: `scale(${micScale * micPulse})`,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${GREEN}, ${GREEN}DD)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 6px 24px ${GREEN}50`,
            }}
          >
            <Img
              src="https://api.iconify.design/solar/microphone-bold.svg?color=%23FFFFEB&width=34"
              style={{ width: 34, height: 34 }}
            />
          </div>
        </div>

        {/* Apps grid */}
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center", maxWidth: 600 }}>
          {APPS.map((app, i) => (
            <AppBubble
              key={app.name}
              name={app.name}
              icon={app.icon}
              delay={app.delay}
              index={i}
              bodyFont={bodyFont}
            />
          ))}
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: interpolate(frame, [50, 65], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [50, 65], [15, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
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
            Works in every app — no plugins, no setup
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
