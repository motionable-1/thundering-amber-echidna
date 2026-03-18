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
 * Wispr Flow Product Demo
 *
 * Scene breakdown (30fps):
 * 1. Intro         — 120 frames (4s)
 * 2. Cross-Platform — 110 frames (3.67s)
 * 3. Speech Cleanup — 120 frames (4s)
 * 4. Universal Apps — 110 frames (3.67s)
 * 5. CTA / Outro   — 120 frames (4s) + 30 frames buffer
 *
 * Transitions: 4 × 20 frames = 80 frames overlap
 * Total: 120 + 110 + 120 + 110 + 150 - 80 = 530 frames (~17.7s)
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
          <TransitionSeries.Sequence durationInFrames={120}>
            <IntroScene headingFont={headingFont} bodyFont={bodyFont} />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 2: Cross-Platform */}
          <TransitionSeries.Sequence durationInFrames={110}>
            <CrossPlatformScene headingFont={headingFont} bodyFont={bodyFont} />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 3: Speech Cleanup */}
          <TransitionSeries.Sequence durationInFrames={120}>
            <SpeechCleanupScene headingFont={headingFont} bodyFont={bodyFont} />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 4: Universal Apps */}
          <TransitionSeries.Sequence durationInFrames={110}>
            <UniversalAppsScene headingFont={headingFont} bodyFont={bodyFont} />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 5: CTA + buffer */}
          <TransitionSeries.Sequence durationInFrames={150}>
            <CtaScene headingFont={headingFont} bodyFont={bodyFont} />
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </AbsoluteFill>
    </>
  );
};
