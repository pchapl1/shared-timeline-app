import { View } from 'react-native';
import { router } from 'expo-router';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { PageHeader } from '@/components/ui/PageHeader';

import { useAuth } from '@/context/AuthContext';
import { profileStyles as styles } from '@/styles/profileStyles';

import { colors } from '@/theme/colors';

export default function ProfileScreen() {
  const { logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Profile"
        subtitle="Manage your account and app settings."
      />

      <AppCard style={styles.profileCard}>
        <View style={styles.avatar}>
          <AppText variant="h1" color={colors.textInverse}>
            P
          </AppText>
        </View>

        <AppText variant="h2" style={styles.profileName}>
          Your Account
        </AppText>

        <AppText
          variant="bodySmall"
          color={colors.textMuted}
          style={styles.profileSubtitle}
        >
          Shared Timeline member
        </AppText>
      </AppCard>

      <AppCard style={styles.sectionCard}>
        <AppText variant="h3">Account</AppText>

        <AppText
          variant="bodySmall"
          color={colors.textMuted}
          style={styles.sectionText}
        >
          More profile settings will live here soon.
        </AppText>
      </AppCard>

      <AppButton
        title="Logout"
        variant="secondary"
        onPress={handleLogout}
        style={styles.logoutButton}
      />
    </View>
  );
}