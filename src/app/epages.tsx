import { StyleSheet, ScrollView } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export default function EpagesScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ThemedText type="title">epages</ThemedText>
        <ThemedText themeColor="textSecondary">11 years</ThemedText>

        <ThemedText type="subtitle">Role</ThemedText>
        <ThemedText type="small">Role placeholder — your position at epages.</ThemedText>

        <ThemedText type="subtitle">Period</ThemedText>
        <ThemedText type="small">Placeholder — start date to end date (11 years).</ThemedText>

        <ThemedText type="subtitle">Highlights</ThemedText>
        <ThemedText type="small">• Achievement placeholder one</ThemedText>
        <ThemedText type="small">• Achievement placeholder two</ThemedText>
        <ThemedText type="small">• Achievement placeholder three</ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
    gap: Spacing.three,
    alignSelf: 'center',
    width: '100%',
  },
});
