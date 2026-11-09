import type { ReactNode } from 'react';
import { Pressable, StyleSheet, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { tapHaptic } from '@/lib/haptics';

type Props = Omit<PressableProps, 'style' | 'children'> & {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

/** Pressable with platform press feedback (ripple / highlight) and a light haptic tap. */
export function PressableRow({ children, style, onPress, ...rest }: Props) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      android_ripple={{ color: theme.backgroundSelected }}
      onPress={(event) => {
        tapHaptic();
        onPress?.(event);
      }}
      style={({ pressed }) => [
        style,
        pressed && process.env.EXPO_OS !== 'android' ? styles.pressed : undefined,
      ]}
      {...rest}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.6,
  },
});
