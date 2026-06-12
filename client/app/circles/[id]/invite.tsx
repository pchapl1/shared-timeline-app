import { useState } from 'react';

import {
  Alert,
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';

import { AppScreen } from '@/components/ui/layout/AppScreen';
import { AppText } from '@/components/ui/AppText';

import {
  createCircleInvite,
  searchUsers,
} from '@/services/api';

import { useAuth } from '@/context/AuthContext';

import { colors } from '@/theme/colors';
import { inviteMemberStyles as styles } from '@/styles/inviteMemberStyles';

type UserSearchResult = {
  id: number;
  username: string;
  email: string;
};

export default function InviteMemberScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { tokens, isLoading } = useAuth();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<UserSearchResult[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleInvite(userId: number) {
    if (isLoading || !tokens || !id) {
      return;
    }

    try {
      setIsSubmitting(true);

      await createCircleInvite(Number(id), userId);

      Alert.alert(
        'Invite sent',
        'The invite was created successfully.'
      );

      router.push({
        pathname: '/circles/[id]',
        params: {
          id: id.toString(),
        },
      });
    } catch (error: any) {
      console.error(
        'Error creating invite:',
        error.response?.data || error
      );

      Alert.alert(
        'Invite not sent',
        error.response?.data?.error ||
          'Could not send invite.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSearch(text: string) {
    setQuery(text);

    if (text.length < 2) {
      setResults([]);
      return;
    }

    if (isLoading || !tokens) {
      return;
    }

    try {
      const data = await searchUsers(text);

      setResults(data);
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading) {
    return (
      <AppScreen padded={false}>
        <View style={styles.loadingContainer}>
          <AppText variant="body" color={colors.textMuted}>
            Loading...
          </AppText>
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen padded={false}>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <View style={styles.content}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() =>
                router.push({
                  pathname: '/circles/[id]',
                  params: {
                    id: id?.toString(),
                  },
                })
              }
            >
              <AppText variant="bodyStrong">← Back</AppText>
            </TouchableOpacity>

            <View style={styles.header}>
              <AppText variant="h1">Invite Member</AppText>

              <AppText
                variant="bodySmall"
                color={colors.textMuted}
                style={styles.subtitle}
              >
                Search for a user and invite them into this circle.
              </AppText>
            </View>

            <TextInput
              style={styles.input}
              value={query}
              onChangeText={handleSearch}
              placeholder="Search username or email"
              placeholderTextColor={colors.textSubtle}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <View style={styles.divider} />
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.userCard,
              isSubmitting && styles.cardDisabled,
            ]}
            onPress={() => handleInvite(item.id)}
            disabled={isSubmitting}
            activeOpacity={0.85}
          >
            <View style={styles.avatar}>
              <AppText variant="bodyStrong" color={colors.primary}>
                {item.username.charAt(0).toUpperCase()}
              </AppText>
            </View>

            <View style={styles.userInfo}>
              <AppText variant="bodyStrong">
                {item.username}
              </AppText>

              <AppText variant="bodySmall" color={colors.textMuted}>
                {item.email}
              </AppText>
            </View>

            <AppText variant="bodySmall" color={colors.primary}>
              Invite
            </AppText>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <AppText variant="bodySmall" color={colors.textMuted}>
              {query.length >= 2
                ? 'No users found.'
                : '🔍 Search for a username or email'}
            </AppText>
          </View>
        }
      />
    </AppScreen>
  );
}