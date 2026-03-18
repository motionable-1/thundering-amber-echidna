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
import { FadeInWords, BlurReveal } from "../../library/components/text/TextAnimation";
import { Glow } from "../../library/components/effects/Glow";
import { ShapeAnimation } from "../../library/components/effects/ShapeAnimation";

const LOGO_URL =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/wispr-flow/1773849681324_nlqj5uvyfhe_wispr_flow_logo.svg";
const GREEN = "#034F46";
const PURPLE = "#F0D7FF";
const DARK = "#1A1A1A";

export const IntroScene: React.FC<{
  headingFont: string;
  bodyFont: string;
}> = ({ headingFont, bodyFont }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance spring
  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, durationInFrames: 40 });
  const logoOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Tagline entrance
  const taglineOpacity = interpolate(frame, [25, 40], [0, 1], { extrapolateRight: "clamp" });
  const taglineY = interpolate(frame, [25, 45], [30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Subtitle entrance
  const subOpacity = interpolate(frame, [45, 60], [0, 1], { extrapolateRight: "clamp" });
  const subY = interpolate(frame, [45, 65], [20, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Decorative shapes
  const ringScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 15, stiffness: 60 }, durationInFrames: 30 });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {/* Decorative ring behind logo */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -65%) scale(${ringScale})`,
          opacity: 0.15,
        }}
      >
        <ShapeAnimation
          shape="ring"
          animation="rotate"
          size={280}
          color={GREEN}
          strokeWidth={2}
          speed={0.08}
        />
      </div>

      {/* Small decorative shapes */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          right: "18%",
          opacity: interpolate(frame, [15, 30], [0, 0.3], { extrapolateRight: "clamp" }),
          transform: `scale(${spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 10 }, durationInFrames: 25 })})`,
        }}
      >
        <ShapeAnimation shape="diamond" animation="breathe" size={40} color={PURPLE} speed={0.5} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "25%",
          left: "15%",
          opacity: interpolate(frame, [20, 35], [0, 0.25], { extrapolateRight: "clamp" }),
          transform: `scale(${spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 10 }, durationInFrames: 25 })})`,
        }}
      >
        <ShapeAnimation shape="hexagon" animation="breathe" size={35} color={GREEN} speed={0.4} />
      </div>

      {/* Main content container */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        {/* Logo */}
        <Glow color={GREEN} intensity={15} pulsate pulseDuration={3} pulseMin={0.3}>
          <div
            style={{
              transform: `scale(${logoScale})`,
              opacity: logoOpacity,
            }}
          >
            <Img src={LOGO_URL} style={{ width: 280, height: "auto" }} />
          </div>
        </Glow>

        {/* Tagline */}
        <div
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            marginTop: 20,
          }}
        >
          <FadeInWords
            stagger={0.08}
            duration={0.5}
            ease="power3.out"
            startFrom={28}
            style={{
              fontFamily: headingFont,
              fontSize: 62,
              fontWeight: 500,
              color: DARK,
              textAlign: "center",
              lineHeight: 1.1,
              textWrap: "balance",
              maxWidth: 800,
            }}
          >
            Your Voice, Perfected
          </FadeInWords>
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
          }}
        >
          <BlurReveal
            stagger={0.03}
            duration={0.6}
            startFrom={48}
            style={{
              fontFamily: bodyFont,
              fontSize: 24,
              fontWeight: 400,
              color: `${DARK}B0`,
              textAlign: "center",
              maxWidth: 600,
              textWrap: "balance",
            }}
          >
            AI-powered voice dictation that turns messy speech into polished writing
          </BlurReveal>
        </div>
      </div>
    </AbsoluteFill>
  );
};
