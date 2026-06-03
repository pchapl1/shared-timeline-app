import { useEffect, useState } from 'react';

import { memoryDetailStyles as styles } from '../../../../src/styles/memoryDetailStyles';

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

import { api } from '../../../../src/services/api';
import { useAuth } from '../../../../src/context/AuthContext';
// 
import { photoModalStyles } from '../../../../src/styles/photoModalStyles';

import type { Memory } from '../../../../src/types/memory';

export default function MemoryDetailScreen() {
  const { memoryId, id } = useLocalSearchParams<{
    memoryId: string;
    id: string;
  }>();

  const { tokens, isLoading } = useAuth();

  const [memory, setMemory] = useState<Memory | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    if (memoryId && !isLoading && tokens) {
      setMemory(null);
      fetchMemory();
    }
  }, [memoryId, isLoading, tokens]);

  async function fetchMemory() {
    try {
      const response = await api.get(`/memories/${memoryId}/`);

      setMemory(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading || !memory) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading memory...</Text>
      </View>
    );
  }

  async function handleCreateComment() {
  const trimmedComment = commentText.trim();

  if (!trimmedComment || !memory) {
    return;
  }

  try {
    setIsSubmittingComment(true);

    const response = await api.post(
      `/memories/${memory.id}/comments/`,
      {
        content: trimmedComment,
      }
    );

    setMemory({
      ...memory,
      comments: [...(memory.comments ?? []), response.data],
      comment_count: (memory.comment_count ?? 0) + 1,
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
    if (!memory) {
      return;
    }

    try {
      await api.delete(
        `/memories/${memory.id}/comments/${commentId}/`
      );

      setMemory({
        ...memory,
        comments: memory.comments?.filter(
          (comment) => comment.id !== commentId
        ),
        comment_count: Math.max((memory.comment_count ?? 1) - 1, 0),
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
                onPress={() => setSelectedPhoto(photo.image?? null)}
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
                {
                  addSuffix: true,
                }
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

