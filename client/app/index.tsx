import { Redirect, router } from 'expo-router';

import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';

import { useAuth } from '@/context/AuthContext';
import { welcomeStyles as styles } from '@/styles/welcomeStyles';
import {colors} from '@/theme/colors'

export default function Index() {
  const { tokens, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (tokens) {
    return <Redirect href="/(tabs)/circles" />;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroCard}>
        <View style={styles.logoBubble}>
          <AppText style={styles.logoIcon}>💜</AppText>
        </View>

        <AppText
          variant="caption"
          color={colors.primary}
          style={styles.kicker}
        >
          TIMELINE
        </AppText>

        <AppText
          variant="hero"
          style={styles.title}
        >
          Your story,{'\n'}together.
        </AppText>

        <AppText
          variant="body"
          color={colors.textMuted}
          style={styles.subtitle}
        >
          Remember trips, milestones, and everyday moments with the
          people who matter most.
        </AppText>
      </View>

      <View style={styles.previewCard}>
        <View style={styles.previewHeader}>
          <View>
            <AppText variant="bodyStrong">
              Summer in Italy
            </AppText>

            <AppText
              variant="bodySmall"
              color={colors.textMuted}
            >
              24 memories • 6 places
            </AppText>
          </View>

          <View style={styles.avatarStack}>
            <View style={[styles.avatar, styles.avatarPurple]}>
              <AppText variant="caption" color={colors.textInverse}>
                P
              </AppText>
            </View>

            <View style={[styles.avatar, styles.avatarPink]}>
              <AppText variant="caption" color={colors.textInverse}>
                A
              </AppText>
            </View>
          </View>
        </View>

        <View style={styles.timelineLine} />

        <View style={styles.memoryRow}>
          <View style={styles.memoryDot} />

          <View style={styles.memoryContent}>
            <AppText variant="bodyStrong">
              First night in Rome
            </AppText>

            <AppText
              variant="bodySmall"
              color={colors.textMuted}
            >
              Dinner, photos, and one perfect walk home.
            </AppText>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <AppButton
          title="Get Started"
          style={styles.primaryButton}
          onPress={() => router.push('/register')}
        />

        <AppButton
          title="I already have an account"
          variant="ghost"
          onPress={() => router.push('/login')}
        />
      </View>
    </ScrollView>
  );
}

