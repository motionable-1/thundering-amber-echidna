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
import { Glow } from "../../library/components/effects/Glow";
import { ShapeAnimation } from "../../library/components/effects/ShapeAnimation";
import { Particles } from "../../library/components/effects/Particles";

const LOGO_URL =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/wispr-flow/1773849681324_nlqj5uvyfhe_wispr_flow_logo.svg";
const GREEN = "#034F46";
const PURPLE = "#F0D7FF";
const DARK = "#1A1A1A";

export const CtaScene: React.FC<{
  headingFont: string;
  bodyFont: string;
}> = ({ headingFont, bodyFont }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Funding badge
  const badgeScale = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 12, stiffness: 100 }, durationInFrames: 25 });
  const badgeOpacity = interpolate(frame, [5, 18], [0, 1], { extrapolateRight: "clamp" });

  // CTA button
  const btnScale = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 10, stiffness: 100 }, durationInFrames: 25 });
  const btnOpacity = interpolate(frame, [40, 52], [0, 1], { extrapolateRight: "clamp" });

  // Website url
  const urlOpacity = interpolate(frame, [55, 68], [0, 1], { extrapolateRight: "clamp" });
  const urlY = interpolate(frame, [55, 68], [15, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Logo
  const logoScale = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, durationInFrames: 30 });

  // Subtle confetti celebration
  const showParticles = frame > 35;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {/* Celebratory particles */}
      {showParticles && (
        <Particles
          type="sparks"
          count={20}
          speed={0.5}
          colors={[GREEN, PURPLE, `${GREEN}80`]}
          seed="cta-sparks"
          size={[2, 4]}
        />
      )}

      {/* Decorative shapes */}
      <div style={{ position: "absolute", top: "18%", left: "12%", opacity: 0.15 }}>
        <ShapeAnimation shape="hexagon" animation="rotate" size={50} color={GREEN} speed={0.08} />
      </div>
      <div style={{ position: "absolute", bottom: "18%", right: "14%", opacity: 0.12 }}>
        <ShapeAnimation shape="diamond" animation="breathe" size={40} color={PURPLE} speed={0.3} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        {/* Logo */}
        <Glow color={GREEN} intensity={18} pulsate pulseDuration={3} pulseMin={0.4}>
          <div style={{ transform: `scale(${logoScale})` }}>
            <Img src={LOGO_URL} style={{ width: 200, height: "auto" }} />
          </div>
        </Glow>

        {/* Funding badge */}
        <div
          style={{
            opacity: badgeOpacity,
            transform: `scale(${badgeScale})`,
            marginTop: 8,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 20px",
              borderRadius: 100,
              background: `${GREEN}12`,
              border: `1.5px solid ${GREEN}25`,
            }}
          >
            <Img
              src="https://api.iconify.design/lucide/trending-up.svg?color=%23034F46&width=18"
              style={{ width: 18, height: 18 }}
            />
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: 15,
                fontWeight: 700,
                color: GREEN,
              }}
            >
              $81M Funded — Building the Voice OS
            </span>
          </div>
        </div>

        {/* Heading */}
        <FadeInWords
          stagger={0.06}
          duration={0.5}
          ease="power3.out"
          startFrom={15}
          style={{
            fontFamily: headingFont,
            fontSize: 56,
            fontWeight: 500,
            color: DARK,
            textAlign: "center",
            lineHeight: 1.15,
            textWrap: "balance",
            maxWidth: 700,
          }}
        >
          The Future of Typing is Free
        </FadeInWords>

        {/* Subtitle */}
        <FadeInWords
          stagger={0.06}
          duration={0.5}
          ease="power2.out"
          startFrom={28}
          style={{
            fontFamily: bodyFont,
            fontSize: 22,
            fontWeight: 400,
            color: `${DARK}A0`,
            textAlign: "center",
            maxWidth: 500,
            textWrap: "balance",
          }}
        >
          Download for free today — available on every platform
        </FadeInWords>

        {/* CTA Button */}
        <div
          style={{
            opacity: btnOpacity,
            transform: `scale(${btnScale})`,
            marginTop: 8,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "18px 44px",
              borderRadius: 16,
              background: PURPLE,
              border: `2px solid ${DARK}`,
              boxShadow: `0 4px 20px ${PURPLE}60`,
              cursor: "pointer",
            }}
          >
            <Img
              src="https://api.iconify.design/lucide/download.svg?color=%231A1A1A&width=22"
              style={{ width: 22, height: 22 }}
            />
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: 20,
                fontWeight: 700,
                color: DARK,
              }}
            >
              Download for Free
            </span>
          </div>
        </div>

        {/* Website URL */}
        <div
          style={{
            opacity: urlOpacity,
            transform: `translateY(${urlY}px)`,
          }}
        >
          <span
            style={{
              fontFamily: bodyFont,
              fontSize: 18,
              color: GREEN,
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            wisprflow.ai
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
