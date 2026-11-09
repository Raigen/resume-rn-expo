import { SymbolView } from 'expo-symbols';
import type { ColorValue } from 'react-native';

import type { AppIcon } from '@/data/resume';

type Props = {
  icon: AppIcon;
  size?: number;
  color: ColorValue;
};

/** Platform icon: SF Symbol on iOS, Material Symbol on Android and web. */
export function AppSymbol({ icon, size = 20, color }: Props) {
  return (
    <SymbolView
      name={{ ios: icon.ios, android: icon.android, web: icon.android }}
      size={size}
      tintColor={color}
    />
  );
}
