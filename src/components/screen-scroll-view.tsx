import type { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Root scroll container for tab screens. It must be the screen's first child so
 * the native large title collapses on scroll; insets for the native header and
 * tab bar are applied automatically (no SafeAreaView needed).
 */
export function ScreenScrollView({ children }: { children: ReactNode }) {
  const theme = useTheme();
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.content}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.six,
    gap: Spacing.four,
  },
});
