import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ChipRow } from '@/components/chip';
import { ContactRow } from '@/components/contact-row';
import { HighlightCard } from '@/components/highlight-card';
import { ProfileHero } from '@/components/profile-hero';
import { ScreenScrollView } from '@/components/screen-scroll-view';
import { SectionCard } from '@/components/section-card';
import { ThemedText } from '@/components/themed-text';
import { TimelineItem } from '@/components/timeline-item';
import { Spacing } from '@/constants/theme';
import { resume, type ExperienceId } from '@/data/resume';
import { useTheme } from '@/hooks/use-theme';
import { formatDuration, formatPeriod, formatPeriodYears } from '@/lib/period';

const experienceRoutes = {
  epages: '/epages',
  plancraft: '/plancraft',
} as const satisfies Record<ExperienceId, string>;

export default function AboutScreen() {
  const { profile, contact, summary, coreTechnologies, skills, languages, education } = resume;

  return (
    <ScreenScrollView>
      <ProfileHero
        initials={profile.initials}
        name={profile.name}
        headline={profile.headline}
        location={contact.location}
      />

      <SectionCard title="Summary" index={1}>
        {summary.map((paragraph) => (
          <ThemedText key={paragraph} type="callout">
            {paragraph}
          </ThemedText>
        ))}
        <ChipRow items={coreTechnologies} />
      </SectionCard>

      <SectionCard title="Contact" index={2} contentStyle={styles.list}>
        <ContactRow
          icon={{ ios: 'envelope.fill', android: 'mail' }}
          label="Email"
          value={contact.email}
          action={{ type: 'email', address: contact.email }}
        />
        <Divider />
        <ContactRow
          icon={{ ios: 'phone.fill', android: 'call' }}
          label="Phone"
          value={contact.phone}
          action={{ type: 'phone', number: contact.phone }}
          accentColor="#34C759"
        />
        <Divider />
        {[contact.linkedIn, contact.gitHub].map((link, i) => (
          <View key={link.url}>
            <ContactRow
              icon={link.icon}
              label={link.label}
              value={link.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
              action={{ type: 'url', url: link.url }}
              accentColor={link.color}
            />
            {i === 0 ? <Divider /> : null}
          </View>
        ))}
      </SectionCard>

      <SectionCard title="Career" index={3} contentStyle={styles.timeline}>
        {resume.careerOrder.map((id, i) => {
          const job = resume.experience[id];
          return (
            <TimelineItem
              key={id}
              icon={job.icon}
              title={job.company}
              subtitle={job.role}
              meta={`${formatPeriod(job.period)} · ${formatDuration(job.period)}`}
              accentColor={job.accentColor}
              showConnector={i < resume.careerOrder.length - 1}
              accessibilityHint={`Opens the ${job.shortName} tab`}
              onPress={() => router.navigate(experienceRoutes[id])}
            />
          );
        })}
      </SectionCard>

      <SectionCard title="Skills" index={4} bare>
        {skills.map((skill, i) => (
          <HighlightCard
            key={skill.title}
            icon={skill.icon}
            title={skill.title}
            text={skill.text}
            index={i + 4}
          />
        ))}
      </SectionCard>

      <SectionCard title="Languages" index={5} contentStyle={styles.list}>
        {languages.map((language, i) => (
          <View key={language.name}>
            {i > 0 ? <Divider inset={false} /> : null}
            <View style={styles.languageRow}>
              <ThemedText type="callout">{language.name}</ThemedText>
              <ThemedText type="callout" themeColor="textSecondary">
                {language.level}
              </ThemedText>
            </View>
          </View>
        ))}
      </SectionCard>

      <SectionCard title="Education" index={6}>
        {education.map((entry) => (
          <TimelineItem
            key={entry.title}
            icon={{ ios: 'graduationcap.fill', android: 'school' }}
            title={entry.title}
            subtitle={entry.institution}
            meta={formatPeriodYears(entry.period)}
          />
        ))}
      </SectionCard>

      <SectionCard title="Personal projects" index={7} bare>
        {resume.personalProjects.map((project, i) => (
          <HighlightCard
            key={project.title}
            icon={project.icon}
            title={project.title}
            text={project.text}
            index={i + 7}>
            <ChipRow items={project.techStack} />
          </HighlightCard>
        ))}
      </SectionCard>
    </ScreenScrollView>
  );
}

/** Hairline separator; inset aligns it with the text next to a row icon. */
function Divider({ inset = true }: { inset?: boolean }) {
  const theme = useTheme();
  return (
    <View
      style={[styles.divider, inset && styles.dividerInset, { backgroundColor: theme.separator }]}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: Spacing.two,
    gap: 0,
  },
  timeline: {
    gap: Spacing.four,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: Spacing.one,
  },
  dividerInset: {
    // icon tile width + row gap (see ContactRow)
    marginLeft: 30 + Spacing.three - Spacing.one,
  },
  languageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 44,
  },
});
