import { useMemo, useState } from 'react';

import { FlatList, View } from 'react-native';
import { router } from 'expo-router';
import { Ellipsis, Search } from 'lucide-react-native';

import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { IconCircleButton } from '@/components/ui/IconCircleButton';
import { CircleCard } from '@/components/circles/CircleCard';
import {
  CircleFilter,
  CircleFilterPills,
} from '@/components/circles/CircleFilterPills';
import { CircleCreateCard } from '@/components/circles/CircleCreateCard';

import { useCircles } from '@/hooks/circles/useCircles';

import { colors } from '@/theme/colors';
import { circlesScreenStyles as styles } from '@/styles/circles/circlesScreenStyles';

import type { Circle } from '@/types/circle';

export default function CirclesScreen() {
  const [selectedFilter, setSelectedFilter] =
    useState<CircleFilter>('all');

  const { data: circles = [], isLoading } = useCircles();

  const filteredCircles = useMemo(() => {
    if (selectedFilter === 'active') {
      return circles.filter((circle) => !circle.is_archived);
    }

    if (selectedFilter === 'archived') {
      return circles.filter((circle) => circle.is_archived);
    }

    return circles;
  }, [circles, selectedFilter]);

  function handleCirclePress(circleId: number) {
    router.push({
      pathname: '/circles/[id]',
      params: {
        id: circleId.toString(),
      },
    });
  }

  function handleCreateCircle() {
    router.push('/create-circle');
  }

  function handleOptionsPress(circle: Circle) {
    console.log('Circle options pressed:', circle.id);
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={filteredCircles}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <View style={styles.headerRow}>
              <View style={styles.headerCopy}>
                <AppText variant="h1" style={styles.title}>
                  Your Circles
                </AppText>

                <AppText
                  variant="body"
                  color={colors.textMuted}
                  style={styles.subtitle}
                >
                  The people and memories that matter most.
                </AppText>
              </View>

              <View style={styles.headerActions}>
                <IconCircleButton
                  icon={
                    <Search size={22} color={colors.text} />
                  }
                />

                <IconCircleButton
                  icon={
                    <Ellipsis size={22} color={colors.text} />
                  }
                />
              </View>
            </View>

            <CircleFilterPills
              selectedFilter={selectedFilter}
              onChangeFilter={setSelectedFilter}
            />
          </View>
        }
        renderItem={({ item }) => (
          <CircleCard
            circle={item}
            onPress={() => handleCirclePress(item.id)}
            onOptionsPress={() => handleOptionsPress(item)}
          />
        )}
        ListEmptyComponent={
          !isLoading ? (
            <AppCard style={styles.emptyCard}>
              <AppText
                variant="bodySmall"
                color={colors.textMuted}
                style={styles.emptyText}
              >
                No circles here yet.
              </AppText>
            </AppCard>
          ) : null
        }
        ListFooterComponent={
          <CircleCreateCard onPress={handleCreateCircle} />
        }
      />
    </View>
  );
}