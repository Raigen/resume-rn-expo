import * as Haptics from 'expo-haptics';

/** Light tap feedback for buttons, links and tappable cards. */
export function tapHaptic() {
  if (process.env.EXPO_OS === 'web') return;
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
}

/** Selection feedback, e.g. when switching context. */
export function selectionHaptic() {
  if (process.env.EXPO_OS === 'web') return;
  Haptics.selectionAsync().catch(() => {});
}
