import { useState } from 'react';

import { memoryDetailStyles as styles } from '../../../../src/styles/memoryDetailStyles';
import { photoModalStyles } from '../../../../src/styles/photoModalStyles';

import { useMemory } from '@/hooks/useMemory';
import { useMemoryCommentsSocket } from '@/hooks/useMemoryCommentsSocket';
import { createMemoryComment, deleteMemoryComment } from '@/services/memories';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';

import { Image } from 'expo-image';
import { useLocalSearchParams, router } from 'expo-router';
import { formatDistanceToNow } from 'date-fns';
import { useQueryClient } from '@tanstack/react-query';

import { useAuth } from '../../../../src/context/AuthContext';

import { useDeleteMemory } from '@/hooks/memories/useDeleteMemory';

export default function MemoryDetailScreen() {
  const { memoryId, id } = useLocalSearchParams<{
    memoryId: string;
    id: string;
  }>();

  const { isLoading } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: memory,
    isLoading: memoryLoading,
  } = useMemory(memoryId);

  const deleteMemoryMutation = useDeleteMemory(Number(id));

  useMemoryCommentsSocket(memoryId);

  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  function handleDeleteMemory() {
    if (!memory) {
      return;
    }

    const currentMemoryId = memory.id;
    const currentMemoryTitle = memory.title;

    Alert.alert(
      'Delete Memory',
      `Are you sure you want to delete "${currentMemoryTitle}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMemoryMutation.mutateAsync(currentMemoryId);

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

  if (isLoading || memoryLoading || !memory) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading memory...</Text>
      </View>
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

      queryClient.setQueryData(
        ['memory', memoryId],
        {
          ...memory,
          comments: [...(memory.comments ?? []), response.data],
          comment_count: (memory.comment_count ?? 0) + 1,
        }
      );

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

      queryClient.setQueryData(
        ['memory', memoryId],
        {
          ...memory,
          comments: memory.comments?.filter(
            (comment) => comment.id !== commentId
          ),
          comment_count: Math.max((memory.comment_count ?? 1) - 1, 0),
        }
      );

      queryClient.invalidateQueries({
        queryKey: ['memories', Number(id)],
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not delete comment.');
    }
  }

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container}>
        <Text
          style={styles.backButton}
          onPress={() => router.push(`/circles/${id}`)}
        >
          ← Back
        </Text>

        {memory.photos && memory.photos.length > 0 ? (
          <View style={styles.photoGrid}>
            {memory.photos.map((photo) => (
              <TouchableOpacity
                key={photo.id}
                activeOpacity={0.9}
                style={styles.gridImageWrapper}
                onPress={() => setSelectedPhoto(photo.image ?? null)}
              >
                <Image
                  source={{ uri: photo.image }}
                  style={styles.gridImage}
                  contentFit="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        ) : !!memory.photo ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setSelectedPhoto(memory.photo ?? null)}
          >
            <Image
              source={{ uri: memory.photo }}
              style={styles.heroImage}
              contentFit="cover"
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>Photo Coming Soon</Text>
          </View>
        )}

        <View style={styles.content}>
          <Text style={styles.title}>{memory.title}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.username}>
              @{memory.created_by?.username ?? 'unknown'}
            </Text>

            <Text style={styles.dot}>•</Text>

            <Text style={styles.timestamp}>
              {formatDistanceToNow(
                new Date(memory.created_at ?? memory.memory_date),
                { addSuffix: true }
              )}
            </Text>
          </View>

          {!!memory.location_name && (
            <Text style={styles.location}>
              📍 {memory.location_name}
            </Text>
          )}

          {!!memory.description && (
            <Text style={styles.description}>
              {memory.description}
            </Text>
          )}

          <TouchableOpacity
            style={styles.commentButton}
            onPress={() =>
              router.push({
                pathname: '/circles/[id]/memories/edit/[memoryId]',
                params: {
                  id,
                  memoryId,
                },
              })
            }
          >
          <Text style={styles.commentButtonText}>
            Edit Memory
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.commentButton}
          onPress={handleDeleteMemory}
        >
          <Text style={[styles.commentButtonText, { color: '#EF4444' }]}>
            Delete Memory
          </Text>
        </TouchableOpacity>

          <View style={styles.commentsSection}>
            <Text style={styles.commentsTitle}>
              Comments ({memory.comment_count ?? memory.comments?.length ?? 0})
            </Text>

            {memory.comments && memory.comments.length > 0 ? (
              memory.comments.map((comment) => (
                <View key={comment.id} style={styles.commentCard}>
                  <Text style={styles.commentUsername}>
                    @{comment.user.username}
                  </Text>

                  <Text style={styles.commentContent}>
                    {comment.content}
                  </Text>

                  <TouchableOpacity
                    style={styles.deleteCommentButton}
                    onPress={() => handleDeleteComment(comment.id)}
                  >
                    <Text style={styles.deleteCommentText}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.emptyCommentsText}>
                No comments yet. Start the conversation.
              </Text>
            )}

            <View style={styles.commentInputRow}>
              <TextInput
                value={commentText}
                onChangeText={setCommentText}
                placeholder="Add a comment..."
                placeholderTextColor="#8A8A8A"
                style={styles.commentInput}
                multiline
              />

              <TouchableOpacity
                style={styles.commentButton}
                onPress={handleCreateComment}
                disabled={isSubmittingComment}
              >
                <Text style={styles.commentButtonText}>
                  {isSubmittingComment ? '...' : 'Send'}
                </Text>
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
            <Text style={photoModalStyles.closeButtonText}>✕</Text>
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
    </View>
  );
}