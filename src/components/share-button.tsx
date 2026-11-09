import { Pressable, StyleSheet } from 'react-native';

import { AppSymbol } from '@/components/app-symbol';
import { useTheme } from '@/hooks/use-theme';
import { tapHaptic } from '@/lib/haptics';
import { shareProfile } from '@/lib/share';

/** Header button that opens the native share sheet for the profile. */
export function ShareButton() {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Share profile"
      hitSlop={8}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={() => {
        tapHaptic();
        shareProfile();
      }}>
      <AppSymbol icon={{ ios: 'square.and.arrow.up', android: 'share' }} size={20} color={theme.tint} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.5,
  },
});
