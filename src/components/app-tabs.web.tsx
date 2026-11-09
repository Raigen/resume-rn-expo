import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { resume } from '@/data/resume';

const { epages, plancraft } = resume.experience;

/** Web has no native tab bar, so tabs are rendered with expo-router's headless UI. */
export default function AppTabs() {
  return (
    <Tabs style={styles.root}>
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="(about)" href="/" asChild>
            <TabButton>About</TabButton>
          </TabTrigger>
          <TabTrigger name="epages" href="/epages" asChild>
            <TabButton>{epages.shortName}</TabButton>
          </TabTrigger>
          <TabTrigger name="plancraft" href="/plancraft" asChild>
            <TabButton>{plancraft.shortName}</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
      <TabSlot style={styles.slot} />
    </Tabs>
  );
}

export function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  // The slot's `ref` targets the native tab trigger element; Pressable manages its own ref on web.
  const { ref: _slotRef, ...pressableProps } = props;
  return (
    <Pressable {...pressableProps} style={({ pressed }) => pressed && styles.pressed}>
      <ThemedView
        type={isFocused ? 'backgroundSelected' : 'backgroundElement'}
        style={styles.tabButtonView}>
        <ThemedText type="subheadline" themeColor={isFocused ? 'text' : 'textSecondary'}>
          {children}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  return (
    <ThemedView {...props} style={styles.tabListContainer}>
      <ThemedView type="backgroundElement" style={styles.innerContainer}>
        <ThemedText type="headline" style={styles.brandText}>
          {resume.profile.name}
        </ThemedText>
        {props.children}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  slot: {
    flex: 1,
  },
  tabListContainer: {
    width: '100%',
    padding: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerContainer: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.five,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    flexGrow: 1,
    gap: Spacing.two,
    maxWidth: MaxContentWidth,
  },
  brandText: {
    marginRight: 'auto',
  },
  pressed: {
    opacity: 0.7,
  },
  tabButtonView: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },
});
