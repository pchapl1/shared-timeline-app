import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { router } from 'expo-router';

import { useAuth } from '@/context/AuthContext';

import { profileStyles as styles } from '@/styles/profileStyles';

export default function ProfileScreen() {
  const { logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();

      // Send the user back to login after
      // removing tokens and auth state.
      router.replace('/login');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Profile
      </Text>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}