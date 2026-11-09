import { Stack } from 'expo-router';

import { ShareButton } from '@/components/share-button';
import { useTheme } from '@/hooks/use-theme';

const isIOS = process.env.EXPO_OS === 'ios';

/**
 * Native stack used inside every tab. On iOS it shows a large title that
 * collapses into a blurred/glass bar when the content scrolls.
 */
export function TabStack({ title }: { title: string }) {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerLargeTitleEnabled: true,
        headerTransparent: isIOS,
        headerBlurEffect: isIOS ? 'systemChromeMaterial' : undefined,
        headerShadowVisible: false,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: { backgroundColor: 'transparent' },
        contentStyle: { backgroundColor: theme.background },
        headerRight: () => <ShareButton />,
      }}>
      <Stack.Screen name="index" options={{ title }} />
    </Stack>
  );
}
