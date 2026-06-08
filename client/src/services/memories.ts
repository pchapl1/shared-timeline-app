import { api } from './api';

import type {
  CreateMemoryData,
  MemoryComment,
} from '../types/memory';

type ReactNativeFile = {
  uri: string;
  name: string;
  type: string;
};

function getFileInfo(uri: string, index: number) {
  let filename =
    uri.split('/').pop() || `photo-${index + 1}.jpg`;

  if (!filename.includes('.')) {
    filename = `${filename}.jpg`;
  }

  const extension =
    filename.split('.').pop()?.toLowerCase() ?? 'jpg';

  const type =
    extension === 'png'
      ? 'image/png'
      : extension === 'webp'
        ? 'image/webp'
        : 'image/jpeg';

  return {
    filename,
    type,
  };
}

function createReactNativeFile(
  uri: string,
  filename: string,
  type: string
): ReactNativeFile {
  // React Native FormData expects this file-like object shape.
  // Browser File objects can crash on native because their name
  // property is read-only in some runtimes.
  return {
    uri,
    name: filename,
    type,
  };
}

export async function createMemory(data: CreateMemoryData) {
  const formData = new FormData();

  formData.append('circle', String(data.circleId));
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('memory_date', data.memoryDate);

  const imageUris = data.imageUris?.length
    ? data.imageUris
    : data.imageUri
      ? [data.imageUri]
      : [];

  for (let i = 0; i < imageUris.length; i++) {
    const uri = imageUris[i];

    const { filename, type } = getFileInfo(uri, i);

    formData.append(
      'photos',
      createReactNativeFile(uri, filename, type) as any
    );
  }

  if (imageUris.length > 0) {
    const firstImageUri = imageUris[0];

    const { filename, type } = getFileInfo(
      firstImageUri,
      0
    );

    formData.append(
      'photo',
      createReactNativeFile(
        firstImageUri,
        filename,
        type
      ) as any
    );
  }

  if (data.locationName) {
    formData.append('location_name', data.locationName);
  }

  if (data.latitude) {
    formData.append('latitude', data.latitude);
  }

  if (data.longitude) {
    formData.append('longitude', data.longitude);
  }

  return api.post('/memories/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function getMemories() {
  const response = await api.get('/memories/');

  return response.data;
}

export async function toggleMemoryReaction(memoryId: number) {
  const response = await api.post(
    `/memories/${memoryId}/toggle_reaction/`
  );

  return response.data;
}

export async function getMemoryComments(memoryId: number) {
  return api.get<MemoryComment[]>(
    `/memories/${memoryId}/comments/`
  );
}

export async function createMemoryComment(
  memoryId: number,
  content: string
) {
  return api.post<MemoryComment>(
    `/memories/${memoryId}/comments/`,
    { content }
  );
}

export async function deleteMemoryComment(
  memoryId: number,
  commentId: number
) {
  return api.delete(
    `/memories/${memoryId}/comments/${commentId}/`
  );
}

export async function getCircleMemories(
  circleId: number,
  page = 1
) {
  const response = await api.get(
    `/memories/?circle=${circleId}&page=${page}`
  );

  return response.data;
}