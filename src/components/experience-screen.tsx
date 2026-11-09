import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { AppSymbol } from '@/components/app-symbol';
import { ChipRow } from '@/components/chip';
import { ContactRow } from '@/components/contact-row';
import { HighlightCard } from '@/components/highlight-card';
import { ScreenScrollView } from '@/components/screen-scroll-view';
import { CardSurface, SectionCard } from '@/components/section-card';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing, withAlpha } from '@/constants/theme';
import type { Experience } from '@/data/resume';
import { useTheme } from '@/hooks/use-theme';
import { enterAnimation } from '@/lib/motion';
import { formatDuration, formatPeriod } from '@/lib/period';

function hostOf(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
}

/** Shared template for a company tab, rendered entirely from resume data. */
export function ExperienceScreen({ experience }: { experience: Experience }) {
  const theme = useTheme();
  const accent = experience.accentColor;

  return (
    <ScreenScrollView>
      <Animated.View entering={enterAnimation(0)}>
        <CardSurface style={styles.header} tintColor={withAlpha(accent, 0.12)}>
          <View style={[styles.accentBar, { backgroundColor: accent }]} />
          <View style={styles.headerRow}>
            <View style={[styles.logo, { backgroundColor: accent }]}>
              <AppSymbol icon={experience.icon} size={26} color="#FFFFFF" />
            </View>
            <View style={styles.headerText}>
              <ThemedText type="title2" accessibilityRole="header">
                {experience.company}
              </ThemedText>
              <ThemedText type="headline" style={{ color: accent }}>
                {experience.role}
              </ThemedText>
            </View>
          </View>
          <View style={styles.metaRow}>
            <AppSymbol
              icon={{ ios: 'calendar', android: 'calendar_month' }}
              size={14}
              color={theme.textSecondary}
            />
            <ThemedText type="subheadline" themeColor="textSecondary">
              {formatPeriod(experience.period)} · {formatDuration(experience.period)}
            </ThemedText>
          </View>
        </CardSurface>
      </Animated.View>

      <SectionCard title="Overview" index={1}>
        {experience.intro.map((paragraph) => (
          <ThemedText key={paragraph} type="callout">
            {paragraph}
          </ThemedText>
        ))}
      </SectionCard>

      <SectionCard title="Highlights" index={2} bare>
        {experience.highlights.map((highlight, i) => (
          <HighlightCard
            key={highlight.title}
            icon={highlight.icon}
            title={highlight.title}
            text={highlight.text}
            accentColor={accent}
            index={i + 2}
          />
        ))}
      </SectionCard>

      {experience.keyChallenges?.length ? (
        <SectionCard title="Key challenges solved" index={3}>
          {experience.keyChallenges.map((challenge) => (
            <View key={challenge} style={styles.challenge}>
              <AppSymbol
                icon={{ ios: 'checkmark.circle.fill', android: 'check_circle' }}
                size={18}
                color={accent}
              />
              <ThemedText type="callout" style={styles.challengeText}>
                {challenge}
              </ThemedText>
            </View>
          ))}
        </SectionCard>
      ) : null}

      <SectionCard title="Tech stack" index={4}>
        <ChipRow items={experience.techStack} accentColor={accent} />
      </SectionCard>

      <SectionCard title="Company" index={5}>
        <ContactRow
          icon={{ ios: 'safari.fill', android: 'language' }}
          label="Website"
          value={hostOf(experience.websiteUrl)}
          action={{ type: 'url', url: experience.websiteUrl }}
          accentColor={accent}
        />
      </SectionCard>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: Spacing.three,
    paddingTop: Spacing.three + Spacing.one,
    gap: Spacing.three,
  },
  accentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: Radius.medium,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
    gap: Spacing.half,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one + Spacing.half,
  },
  challenge: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two + Spacing.half,
  },
  challengeText: {
    flex: 1,
  },
});
