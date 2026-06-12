import { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { formatDistanceToNow } from 'date-fns';
import { useQueryClient } from '@tanstack/react-query';

import { AppScreen } from '@/components/ui/layout/AppScreen';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { Avatar } from '@/components/ui/Avatar';
import { SectionHeader } from '@/components/ui/SectionHeader';

import { useAuth } from '@/context/AuthContext';
import { useMemory } from '@/hooks/useMemory';
import { useMemoryCommentsSocket } from '@/hooks/useMemoryCommentsSocket';
import { useDeleteMemory } from '@/hooks/memories/useDeleteMemory';

import {
  createMemoryComment,
  deleteMemoryComment,
} from '@/services/memories';

import { colors } from '@/theme/colors';
import { memoryDetailStyles as styles } from '@/styles/memoryDetailStyles';
import { photoModalStyles } from '@/styles/photoModalStyles';

export default function MemoryDetailScreen() {
  const { memoryId, id } = useLocalSearchParams<{
    memoryId: string;
    id: string;
  }>();

  const { isLoading } = useAuth();
  const queryClient = useQueryClient();

  const { data: memory, isLoading: memoryLoading } =
    useMemory(memoryId);

  const deleteMemoryMutation = useDeleteMemory(Number(id));

  useMemoryCommentsSocket(memoryId);

  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(
    null
  );
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] =
    useState(false);

  function handleDeleteMemory() {
    if (!memory) {
      return;
    }

    Alert.alert(
      'Delete Memory',
      `Are you sure you want to delete "${memory.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMemoryMutation.mutateAsync(memory.id);
              router.replace(`/circles/${id}`);
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'Could not delete memory.');
            }
          },
        },
      ]
    );
  }

  async function handleCreateComment() {
    const trimmedComment = commentText.trim();

    if (!trimmedComment || !memoryId || !memory) {
      return;
    }

    try {
      setIsSubmittingComment(true);

      const response = await createMemoryComment(
        memory.id,
        trimmedComment
      );

      queryClient.setQueryData(['memory', memoryId], {
        ...memory,
        comments: [...(memory.comments ?? []), response.data],
        comment_count: (memory.comment_count ?? 0) + 1,
      });

      queryClient.invalidateQueries({
        queryKey: ['memories', Number(id)],
      });

      setCommentText('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not add comment.');
    } finally {
      setIsSubmittingComment(false);
    }
  }

  async function handleDeleteComment(commentId: number) {
    if (!memoryId || !memory) {
      return;
    }

    try {
      await deleteMemoryComment(memory.id, commentId);

      queryClient.setQueryData(['memory', memoryId], {
        ...memory,
        comments: memory.comments?.filter(
          (comment) => comment.id !== commentId
        ),
        comment_count: Math.max(
          (memory.comment_count ?? 1) - 1,
          0
        ),
      });

      queryClient.invalidateQueries({
        queryKey: ['memories', Number(id)],
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not delete comment.');
    }
  }

  if (isLoading || memoryLoading || !memory) {
    return (
      <AppScreen>
        <View style={styles.loadingContainer}>
          <AppText variant="bodyStrong" color={colors.textMuted}>
            Loading memory...
          </AppText>
        </View>
      </AppScreen>
    );
  }

  const photos = memory.photos ?? [];

  const heroPhoto =
    photos.length === 1
      ? photos[0].image
      : photos.length === 0
        ? memory.photo
        : null;

  const hasPhotoGrid = photos.length > 1;
  const hasSinglePhoto = !!heroPhoto;

  const commentCount =
    memory.comment_count ?? memory.comments?.length ?? 0;

  return (
    <AppScreen padded={false}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push(`/circles/${id}`)}
          >
            <AppText variant="bodyStrong" color={colors.text}>
              ← Back
            </AppText>
          </TouchableOpacity>

          {hasPhotoGrid ? (
            <View style={styles.photoGrid}>
              {photos.map((photo) => (
                <TouchableOpacity
                  key={photo.id}
                  activeOpacity={0.9}
                  style={styles.gridImageWrapper}
                  onPress={() => setSelectedPhoto(photo.image)}
                >
                  <Image
                    source={{ uri: photo.image }}
                    style={styles.gridImage}
                    contentFit="cover"
                  />
                </TouchableOpacity>
              ))}

              <View style={styles.photoCountBadge}>
                <AppText variant="caption" color={colors.textInverse}>
                  {photos.length} photos
                </AppText>
              </View>
            </View>
          ) : hasSinglePhoto ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setSelectedPhoto(heroPhoto)}
            >
              <Image
                source={{ uri: heroPhoto }}
                style={styles.heroImage}
                contentFit="cover"
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.imagePlaceholder}>
              <AppText variant="h3" color={colors.textMuted}>
                Photo Coming Soon
              </AppText>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <AppCard style={styles.memoryCard}>
            <View style={styles.creatorRow}>
              <Avatar
                label={memory.created_by?.username ?? '?'}
                size={44}
              />

              <View style={styles.creatorText}>
                <AppText variant="bodyStrong">
                  @{memory.created_by?.username ?? 'unknown'}
                </AppText>

                <AppText variant="bodySmall" color={colors.textMuted}>
                  {formatDistanceToNow(
                    new Date(
                      memory.created_at ?? memory.memory_date
                    ),
                    { addSuffix: true }
                  )}
                </AppText>
              </View>
            </View>

            <AppText variant="h2" style={styles.title}>
              {memory.title}
            </AppText>

            {!!memory.location_name && (
              <View style={styles.locationRow}>
                <AppText
                  variant="bodySmall"
                  color={colors.textMuted}
                >
                  📍 {memory.location_name}
                </AppText>
                <View style={styles.memoryActions}>
                  <TouchableOpacity
                    style={styles.inlineActionButton}
                    onPress={() =>
                      router.push({
                        pathname:
                          '/circles/[id]/memories/edit/[memoryId]',
                        params: { id, memoryId },
                      })
                    }
                  >
                    <AppText variant="bodySmall" color={colors.primary}>
                      Edit
                    </AppText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.inlineDangerButton}
                    onPress={handleDeleteMemory}
                  >
                    <AppText variant="bodySmall" color={colors.danger}>
                      Delete
                    </AppText>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </AppCard>

          {!!memory.description && (
            <View style={styles.section}>
              <SectionHeader title="Story" />

              <AppCard>
                <AppText
                  variant="body"
                  color={colors.textMuted}
                  style={styles.description}
                >
                  {memory.description}
                </AppText>
              </AppCard>
            </View>
          )}

          <View style={styles.section}>
            <SectionHeader
              title="Comments"
              subtitle={`${commentCount} total`}
            />

            {memory.comments && memory.comments.length > 0 ? (
              memory.comments.map((comment) => (
                <AppCard key={comment.id} style={styles.commentCard}>
                  <View style={styles.commentHeader}>
                    <Avatar label={comment.user.username} size={36} />

                    <View style={styles.commentHeaderText}>
                      <AppText variant="bodyStrong">
                        @{comment.user.username}
                      </AppText>

                      <AppText
                        variant="caption"
                        color={colors.textSubtle}
                      >
                        {formatDistanceToNow(
                          new Date(comment.created_at),
                          { addSuffix: true }
                        )}
                      </AppText>
                    </View>
                  </View>

                  <AppText
                    variant="bodySmall"
                    color={colors.textMuted}
                    style={styles.commentContent}
                  >
                    {comment.content}
                  </AppText>

                  <TouchableOpacity
                    style={styles.deleteCommentButton}
                    onPress={() => handleDeleteComment(comment.id)}
                  >
                    <AppText variant="caption" color={colors.danger} >
                      Delete
                    </AppText>
                  </TouchableOpacity>
                </AppCard>
              ))
            ) : (
              <View style={styles.emptyComments}>
                <AppText variant="h3">💬</AppText>

                <AppText variant="bodyStrong" color={colors.textMuted}>
                  No comments yet.
                </AppText>

                <AppText variant="bodySmall" color={colors.textSubtle}>
                  Be the first to comment.
                </AppText>
              </View>
            )}

            <View style={styles.commentComposer}>
              <TextInput
                value={commentText}
                onChangeText={setCommentText}
                placeholder="Add a comment..."
                placeholderTextColor={colors.textSubtle}
                style={styles.commentInput}
                multiline
              />

              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleCreateComment}
                disabled={isSubmittingComment}
              >
                <AppText
                  variant="bodyStrong"
                  color={colors.primary}
                >

                  {isSubmittingComment ? '...' : 'Send'}
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={!!selectedPhoto}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedPhoto(null)}
      >
        <View style={photoModalStyles.photoModal}>
          <TouchableOpacity
            style={photoModalStyles.closeButton}
            onPress={() => setSelectedPhoto(null)}
          >
            <AppText color={colors.textInverse}>✕</AppText>
          </TouchableOpacity>

          {selectedPhoto && (
            <Image
              source={{ uri: selectedPhoto }}
              style={photoModalStyles.fullscreenPhoto}
              contentFit="contain"
            />
          )}
        </View>
      </Modal>
    </AppScreen>
  );
}