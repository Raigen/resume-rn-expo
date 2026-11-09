import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { AppSymbol } from '@/components/app-symbol';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { enterAnimation } from '@/lib/motion';

type Props = {
  initials: string;
  name: string;
  headline: string;
  location: string;
};

const AVATAR_SIZE = 96;

/** Profile header: initials avatar, name, headline and location. */
export function ProfileHero({ initials, name, headline, location }: Props) {
  const theme = useTheme();

  return (
    <Animated.View entering={enterAnimation(0)} style={styles.container}>
      <View style={[styles.avatar, { backgroundColor: theme.tint }]} accessibilityElementsHidden>
        <ThemedText style={styles.initials}>{initials}</ThemedText>
      </View>
      <View style={styles.text}>
        <ThemedText type="title" style={styles.center} accessibilityRole="header">
          {name}
        </ThemedText>
        <ThemedText type="callout" themeColor="textSecondary" style={styles.center}>
          {headline}
        </ThemedText>
        <View style={styles.location}>
          <AppSymbol
            icon={{ ios: 'mappin.and.ellipse', android: 'location_on' }}
            size={14}
            color={theme.textTertiary}
          />
          <ThemedText type="footnote" themeColor="textTertiary">
            {location}
          </ThemedText>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.two,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#FFFFFF',
    fontSize: 36,
    lineHeight: 42,
    fontWeight: 700,
    letterSpacing: 1,
  },
  text: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  center: {
    textAlign: 'center',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    marginTop: Spacing.one,
  },
});
