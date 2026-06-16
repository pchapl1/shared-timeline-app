import { ScrollView, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Camera } from 'lucide-react-native';

import { AppScreen } from '@/components/ui/layout/AppScreen';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { BackButton } from '@/components/ui/BackButton';

import { useCircles } from '@/hooks/circles/useCircles';

import { colors } from '@/theme/colors';
import { createPickerStyles as styles } from '@/styles/createPickerStyles';

import type { Circle } from '@/types/circle';

export default function CreateMemoryScreen() {
  const { data: circles = [], isLoading } = useCircles();

  function handleSelectCircle(circle: Circle) {
    router.push({
      pathname: '/circles/[id]/add-memory',
      params: {
        id: String(circle.id),
      },
    });
  }

  return (
    <AppScreen padded={false}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <BackButton onPress={() => router.back()} />

        <View style={styles.header}>
          <View style={styles.iconBubble}>
            <Camera size={24} color={colors.primary} />
          </View>

          <AppText variant="h1">Choose a Circle</AppText>

          <AppText
            variant="bodySmall"
            color={colors.textMuted}
            style={styles.subtitle}
          >
            Pick where this memory belongs.
          </AppText>
        </View>

        {isLoading ? (
          <AppCard>
            <AppText
              variant="bodySmall"
              color={colors.textMuted}
              style={styles.centerText}
            >
              Loading circles...
            </AppText>
          </AppCard>
        ) : (
          circles.map((circle) => (
            <TouchableOpacity
              key={circle.id}
              activeOpacity={0.9}
              onPress={() => handleSelectCircle(circle)}
            >
              <AppCard style={styles.circleCard}>
                <View style={styles.circleRow}>
                  <View style={styles.circleAvatar}>
                    <AppText variant="bodyStrong" color={colors.primary}>
                      {circle.name.charAt(0).toUpperCase()}
                    </AppText>
                  </View>

                  <View style={styles.circleInfo}>
                    <AppText variant="bodyStrong">
                      {circle.name}
                    </AppText>

                    <AppText variant="bodySmall" color={colors.textMuted}>
                      {circle.memory_count} memories • {circle.trip_count} trips
                    </AppText>
                  </View>

                  <AppText variant="bodyStrong" color={colors.textSubtle}>
                    →
                  </AppText>
                </View>
              </AppCard>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </AppScreen>
  );
}