import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  getPendingCircleInvites,
  acceptCircleInvite,
  declineCircleInvite,
} from '../../src/services/api';

type Invite = {
  id: number;
  circle_name: string;
  invited_by_username: string;
  status: string;
};

export default function InvitesScreen() {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvites();
  }, []);

  async function fetchInvites() {
    try {
      const data = await getPendingCircleInvites();

      const pendingInvites = data.filter(
        (invite: Invite) => invite.status === 'pending'
      );

      setInvites(pendingInvites);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAccept(inviteId: number) {
    try {
      await acceptCircleInvite(inviteId);

      Alert.alert('Success', 'Invite accepted.');

      await fetchInvites();

      router.replace('/(tabs)/circles');

    } catch (error) {
      console.error(error);

      Alert.alert('Error', 'Could not accept invite.');
    }
  }

  async function handleDecline(inviteId: number) {
    try {
      await declineCircleInvite(inviteId);

      Alert.alert('Invite declined');

      fetchInvites();
    } catch (error) {
      console.error(error);

      Alert.alert('Error', 'Could not decline invite.');
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>
          Loading invites...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Pending Invites
      </Text>

      <FlatList
        data={invites}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No pending invites.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.circleName}>
              {item.circle_name}
            </Text>

            <Text style={styles.invitedBy}>
              Invited by {item.invited_by_username}
            </Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => handleAccept(item.id)}
              >
                <Text style={styles.buttonText}>
                  Accept
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.declineButton}
                onPress={() => handleDecline(item.id)}
              >
                <Text style={styles.buttonText}>
                  Decline
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingTop: 80,
    paddingHorizontal: 24,
  },

  title: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 24,
  },

  loadingText: {
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 40,
  },

  emptyText: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 40,
  },

  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },

  circleName: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },

  invitedBy: {
    color: '#94a3b8',
    marginBottom: 16,
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },

  acceptButton: {
    flex: 1,
    backgroundColor: '#16a34a',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  declineButton: {
    flex: 1,
    backgroundColor: '#dc2626',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});