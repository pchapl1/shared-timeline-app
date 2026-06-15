import { View } from 'react-native';

import { SharedMap } from '@/components/maps/SharedMap';

export default function MapScreen() {
  return (
    <View style={{ flex: 1 }}>
      <SharedMap />
    </View>
  );
}