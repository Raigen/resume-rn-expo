import { Easing, FadeInDown, Keyframe, ReduceMotion } from 'react-native-reanimated';

import { glassEnabled } from '@/lib/glass';

const DURATION_MS = 380;
const STAGGER_MS = 60;
const MAX_DELAY_MS = 360;

/**
 * Subtle staggered entering animation for content sections.
 * Honors the system "Reduce Motion" setting.
 *
 * Liquid Glass must not be rendered with an opacity below 1 (expo-glass-effect
 * docs), so when glass surfaces are in use the animation only slides content in.
 */
export function enterAnimation(index = 0) {
  const delay = Math.min(index * STAGGER_MS, MAX_DELAY_MS);
  if (glassEnabled) {
    return new Keyframe({
      0: { transform: [{ translateY: 14 }] },
      100: { transform: [{ translateY: 0 }], easing: Easing.out(Easing.cubic) },
    })
      .duration(DURATION_MS)
      .delay(delay)
      .reduceMotion(ReduceMotion.System);
  }
  return FadeInDown.duration(DURATION_MS).delay(delay).reduceMotion(ReduceMotion.System);
}
