import { NativeTabs } from 'expo-router/native-tabs';

import { resume } from '@/data/resume';
import { selectionHaptic } from '@/lib/haptics';

const { epages, plancraft } = resume.experience;

/** Native tab bar (UITabBarController / Material bottom navigation). */
export default function AppTabs() {
  return (
    <NativeTabs screenListeners={{ tabPress: () => selectionHaptic() }}>
      <NativeTabs.Trigger name="(about)">
        <NativeTabs.Trigger.Label>About</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'person.crop.circle', selected: 'person.crop.circle.fill' }}
          md="person"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="epages">
        <NativeTabs.Trigger.Label>{epages.shortName}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'bag', selected: 'bag.fill' }} md="storefront" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="plancraft">
        <NativeTabs.Trigger.Label>{plancraft.shortName}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'hammer', selected: 'hammer.fill' }}
          md="construction"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
