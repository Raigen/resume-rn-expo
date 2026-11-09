import { isGlassEffectAPIAvailable, isLiquidGlassAvailable } from 'expo-glass-effect';

/**
 * Whether Liquid Glass surfaces should be used (iOS 26+ only).
 * `isGlassEffectAPIAvailable` guards against early iOS 26 betas that crash.
 */
export const glassEnabled =
  process.env.EXPO_OS === 'ios' && isLiquidGlassAvailable() && isGlassEffectAPIAvailable();
