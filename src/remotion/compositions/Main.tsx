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
 * Wispr Flow Product Demo — Extended
 *
 * Scene breakdown (30fps):
 * 1. Intro            — 120 frames (4.0s)
 * 2. Cross-Platform   — 110 frames (3.7s)
 * 3. Speech Cleanup   — 120 frames (4.0s)
 * 4. Universal Apps   — 110 frames (3.7s)
 * 5. Privacy First    — 120 frames (4.0s)  ← NEW
 * 6. Stats / Numbers  — 120 frames (4.0s)  ← NEW
 * 7. Voice OS Vision  — 120 frames (4.0s)  ← NEW
 * 8. CTA / Outro      — 150 frames (5.0s)
 *
 * Transitions: 7 × 20 = 140 frames overlap
 * Total: 120+110+120+110+120+120+120+150 - 140 = 830 frames (~27.7s)
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

          {/* Scene 5: Privacy First (NEW) */}
          <TransitionSeries.Sequence durationInFrames={120}>
            <PrivacyScene headingFont={headingFont} bodyFont={bodyFont} />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 6: Stats / By the Numbers (NEW) */}
          <TransitionSeries.Sequence durationInFrames={120}>
            <StatsScene headingFont={headingFont} bodyFont={bodyFont} />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 7: Voice OS Vision (NEW) */}
          <TransitionSeries.Sequence durationInFrames={120}>
            <VoiceOsScene headingFont={headingFont} bodyFont={bodyFont} />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 8: CTA + buffer */}
          <TransitionSeries.Sequence durationInFrames={150}>
            <CtaScene headingFont={headingFont} bodyFont={bodyFont} />
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </AbsoluteFill>
    </>
  );
};
