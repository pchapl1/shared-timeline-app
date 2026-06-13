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
import { BackButton } from '@/components/ui/BackButton';
import { OnboardingProgress } from '@/components/ui/OnboardingProgress';

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
  const [invitedUsers, setInvitedUsers] = useState<UserSearchResult[]>([]);
  const [submittingUserId, setSubmittingUserId] =
    useState<number | null>(null);


  function goToCircle() {
    if (!id) {
      return;
    }

    router.replace({
      pathname: '/circles/[id]',
      params: {
        id: id.toString(),
      },
    });
  }

  async function handleInvite(user: UserSearchResult) {
    const alreadyInvited = invitedUsers.some(
      (invitedUser) => invitedUser.id === user.id
    );

    if (isLoading || !tokens || !id || alreadyInvited) {
      return;
    }

    try {
      setSubmittingUserId(user.id);

      await createCircleInvite(Number(id), user.id);

      setInvitedUsers((currentUsers) => [
        ...currentUsers,
        user,
      ]);

      setQuery('');
      setResults([]);
      
    } catch (error: any) {
      console.error(
        'Error creating invite:',
        error.response?.data || error
      );

      Alert.alert(
        'Invite not sent',
        error.response?.data?.error || 'Could not send invite.'
      );
    } finally {
      setSubmittingUserId(null);
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
          <>
            <View style={styles.content}>
              <BackButton onPress={goToCircle} />

              <OnboardingProgress
                currentStep={2}
                steps={[
                  { label: 'Circle' },
                  { label: 'Invite' },
                  { label: 'Done' },
                ]}
              />

              <View style={styles.heroIcon}>
                <AppText style={styles.heroEmoji}>✨</AppText>
              </View>


              <View style={styles.header}>
                <AppText variant="h1" style={styles.title}>
                  Invite people
                </AppText>

                <AppText
                  variant="body"
                  color={colors.textMuted}
                  style={styles.subtitle}
                >
                  Start building your circle by inviting friends,
                  family, or anyone sharing this timeline.
                </AppText>
              </View>
            </View>

            <View style={styles.searchCard}>
              <AppText variant="caption" color={colors.textMuted}>
                Search Users
              </AppText>

              <TextInput
                style={styles.input}
                value={query}
                onChangeText={handleSearch}
                placeholder="Search username or email"
                placeholderTextColor={colors.textSubtle}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {query.length >= 2 && results.length > 0 ? (
              <View style={styles.resultsHeader}>
                <AppText variant="caption" color={colors.textMuted}>
                  Results
                </AppText>
              </View>
            ) : null}
          </>
        }
        renderItem={({ item }) => {
          const isInvited = invitedUsers.some(
            (user) => user.id === item.id
          );
          const isSubmitting = submittingUserId === item.id;

          return (
            <TouchableOpacity
              style={[
                styles.userCard,
                isSubmitting && styles.cardDisabled,
              ]}
              onPress={() => handleInvite(item)}
              disabled={isSubmitting || isInvited}
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

              <View
                style={
                  isInvited
                    ? styles.invitedPill
                    : styles.invitePill
                }
              >
                <AppText
                  variant="caption"
                  color={
                    isInvited ? colors.textMuted : colors.primary
                  }
                >
                  {isInvited
                    ? 'Invited ✓'
                    : isSubmitting
                      ? 'Sending...'
                      : 'Invite'}
                </AppText>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          query.length >= 2 ? (
            <View style={styles.emptyContainer}>
              <AppText
                variant="bodySmall"
                color={colors.textMuted}
                style={{ textAlign: 'center' }}
              >
                No users found.
              </AppText>
            </View>
          ) : null
        }
        ListFooterComponent={
        <View style={styles.footer}>

          {invitedUsers.length > 0 && (
            <View style={styles.invitedSection}>
              <AppText
                variant="caption"
                color={colors.textMuted}
              >
                INVITED ({invitedUsers.length})
              </AppText>




              {invitedUsers.map((user) => (
                <View key={user.id} style={styles.invitedRow}>
                  <View style={styles.invitedAvatar}>
                    <AppText variant="caption" color={colors.primary}>
                      {user.username.charAt(0).toUpperCase()}
                    </AppText>
                  </View>

                  <AppText variant="bodyStrong" style={styles.invitedName}>
                    {user.username}
                  </AppText>
                </View>
              ))}



            </View>
          )}

          <TouchableOpacity
            onPress={goToCircle}
          >
            <AppText
              variant="bodySmall"
              color={colors.textMuted}
              style={styles.skipText}
            >
              Skip for now
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={goToCircle}
            activeOpacity={0.85}
          >
            <AppText
              variant="bodyStrong"
              color={colors.textInverse}
            >
              Continue to Circle
            </AppText>
          </TouchableOpacity>

        </View>
      }
      />
    </AppScreen>
  );
}