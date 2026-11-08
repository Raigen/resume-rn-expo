import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export default function AboutScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <ThemedText type="title">About</ThemedText>
          <ThemedText themeColor="textSecondary">Your name goes here.</ThemedText>

          <ThemedText type="subtitle">Who I am</ThemedText>
          <ThemedText type="small">
            Short introduction placeholder — a sentence or two about who you are.
          </ThemedText>

          <ThemedText type="subtitle">What I do</ThemedText>
          <ThemedText type="small">
            Brief summary placeholder — your current role and areas of expertise.
          </ThemedText>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
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
