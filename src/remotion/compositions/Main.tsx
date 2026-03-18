import { AbsoluteFill, Artifact, useCurrentFrame } from "remotion";
import { loadFont as loadFigtree } from "@remotion/google-fonts/Figtree";
import { loadFont as loadEbGaramond } from "@remotion/google-fonts/EBGaramond";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { blurDissolve } from "../library/components/layout/transitions/presentations/blurDissolve";

import { WisprBackground } from "./WisprBackground";
import { IntroScene } from "./scenes/IntroScene";
import { CrossPlatformScene } from "./scenes/CrossPlatformScene";
import { SpeechCleanupScene } from "./scenes/SpeechCleanupScene";
import { UniversalAppsScene } from "./scenes/UniversalAppsScene";
import { PrivacyScene } from "./scenes/PrivacyScene";
import { StatsScene } from "./scenes/StatsScene";
import { VoiceOsScene } from "./scenes/VoiceOsScene";
import { CtaScene } from "./scenes/CtaScene";

// Load Wispr brand fonts
const { fontFamily: headingFont } = loadEbGaramond("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
const { fontFamily: bodyFont } = loadFigtree("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

/**
 * Wispr Flow Product Demo — Extended with breathing room
 *
 * Each scene now has ~25 extra frames of hold time after animations settle,
 * plus a 12-frame offset on all animation starts to clear transition-in.
 *
 * Scene breakdown (30fps):
 * 1. Intro            — 145 frames (4.8s)   last anim ~87 → 58 frames hold
 * 2. Cross-Platform   — 135 frames (4.5s)   last anim ~77 → 58 frames hold
 * 3. Speech Cleanup   — 150 frames (5.0s)   last anim ~112 → 38 frames hold
 * 4. Universal Apps   — 140 frames (4.7s)   last anim ~87 → 53 frames hold
 * 5. Privacy First    — 145 frames (4.8s)   last anim ~90 → 55 frames hold
 * 6. Stats / Numbers  — 150 frames (5.0s)   last anim ~102 → 48 frames hold
 * 7. Voice OS Vision  — 145 frames (4.8s)   last anim ~82 → 63 frames hold
 * 8. CTA / Outro      — 170 frames (5.7s)   last anim ~87 → 83 frames hold
 *
 * Transitions: 7 × 20 = 140 frames overlap
 * Total: 145+135+150+140+145+150+145+170 - 140 = 1040 frames (~34.7s)
 */

const TRANSITION_DURATION = 20;

export const Main: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <>
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}

      {/* Persistent ambient background */}
      <AbsoluteFill>
        <WisprBackground />
      </AbsoluteFill>

      {/* Scene transitions */}
      <AbsoluteFill>
        <TransitionSeries>
          {/* Scene 1: Intro */}
          <TransitionSeries.Sequence durationInFrames={145}>
            <IntroScene headingFont={headingFont} bodyFont={bodyFont} />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 2: Cross-Platform */}
          <TransitionSeries.Sequence durationInFrames={135}>
            <CrossPlatformScene headingFont={headingFont} bodyFont={bodyFont} />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 3: Speech Cleanup */}
          <TransitionSeries.Sequence durationInFrames={150}>
            <SpeechCleanupScene headingFont={headingFont} bodyFont={bodyFont} />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 4: Universal Apps */}
          <TransitionSeries.Sequence durationInFrames={140}>
            <UniversalAppsScene headingFont={headingFont} bodyFont={bodyFont} />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 5: Privacy First */}
          <TransitionSeries.Sequence durationInFrames={145}>
            <PrivacyScene headingFont={headingFont} bodyFont={bodyFont} />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 6: Stats / By the Numbers */}
          <TransitionSeries.Sequence durationInFrames={150}>
            <StatsScene headingFont={headingFont} bodyFont={bodyFont} />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 7: Voice OS Vision */}
          <TransitionSeries.Sequence durationInFrames={145}>
            <VoiceOsScene headingFont={headingFont} bodyFont={bodyFont} />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 8: CTA + buffer */}
          <TransitionSeries.Sequence durationInFrames={170}>
            <CtaScene headingFont={headingFont} bodyFont={bodyFont} />
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </AbsoluteFill>
    </>
  );
};
