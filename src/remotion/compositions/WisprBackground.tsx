import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { LiquidShape } from "../library/components/effects/LiquidShape";
import { Noise } from "../library/components/effects/Noise";

const CREAM = "#FFFFEB";
const GREEN = "#034F46";
const PURPLE = "#F0D7FF";

/**
 * Ambient background shared across all scenes.
 * Cream base with floating liquid shapes & subtle noise texture.
 */
export const WisprBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Slow parallax drift
  const driftX = Math.sin(time * 0.15) * 30;
  const driftY = Math.cos(time * 0.12) * 20;

  // Gradient rotation
  const gradAngle = 135 + Math.sin(time * 0.1) * 15;

  return (
    <div style={{ position: "absolute", inset: 0, background: CREAM, overflow: "hidden" }}>
      {/* Subtle radial gradient wash */}
      <div
        style={{
          position: "absolute",
          inset: "-20%",
          background: `linear-gradient(${gradAngle}deg, ${PURPLE}30 0%, transparent 40%, ${GREEN}15 80%, transparent 100%)`,
          transform: `translate(${driftX}px, ${driftY}px)`,
        }}
      />

      {/* Floating blob top-right */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -100,
          transform: `translate(${driftX * 0.5}px, ${driftY * 0.7}px)`,
          opacity: 0.18,
        }}
      >
        <LiquidShape
          preset="blob"
          color={PURPLE}
          colorEnd={GREEN}
          size={500}
          speed={0.4}
          seed="bg-blob-1"
        />
      </div>

      {/* Floating blob bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: -120,
          left: -80,
          transform: `translate(${-driftX * 0.6}px, ${-driftY * 0.5}px)`,
          opacity: 0.12,
        }}
      >
        <LiquidShape
          preset="organic"
          color={GREEN}
          colorEnd={PURPLE}
          size={450}
          speed={0.3}
          seed="bg-blob-2"
        />
      </div>

      {/* Small accent blob center */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "55%",
          transform: `translate(${driftX * 0.8}px, ${driftY * 1.2}px)`,
          opacity: 0.08,
        }}
      >
        <LiquidShape
          preset="circle"
          color={PURPLE}
          size={250}
          speed={0.5}
          seed="bg-blob-3"
        />
      </div>

      {/* Subtle grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${GREEN}08 1px, transparent 1px), linear-gradient(90deg, ${GREEN}08 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          opacity: interpolate(Math.sin(time * 0.3), [-1, 1], [0.3, 0.6]),
        }}
      />

      {/* Film grain */}
      <Noise type="subtle" intensity={0.15} speed={0.5} opacity={0.4} blend="multiply" />
    </div>
  );
};
