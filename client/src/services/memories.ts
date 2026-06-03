import { api } from './api';
import { MemoryComment, CreateMemoryData  } from '../types/memory';


async function uriToFile(
  uri: string,
  filename: string,
  mimeType: string
) {
  const response = await fetch(uri);
  const blob = await response.blob();

  return new File([blob], filename, {
    type: mimeType,
  });
}

function getFileInfo(uri: string, index: number) {
  let filename = uri.split('/').pop() || `photo-${index + 1}.jpg`;

  if (!filename.includes('.')) {
    filename = `${filename}.jpg`;
  }

  const match = /\.(\w+)$/.exec(filename);

  const type = match ? `image/${match[1]}` : 'image/jpeg';

  return {
    filename,
    type,
  };
}

export async function createMemory(data: CreateMemoryData) {
  const formData = new FormData();

  formData.append('circle', data.circleId);
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

    const file = await uriToFile(uri, filename, type);

    formData.append('photos', file);
  }

  if (imageUris.length > 0) {
    const firstImageUri = imageUris[0];

    const { filename, type } = getFileInfo(firstImageUri, 0);

    const firstFile = await uriToFile(
      firstImageUri,
      filename,
      type
    );

    formData.append('photo', firstFile);
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
  return api.get<MemoryComment[]>(`/memories/${memoryId}/comments/`);
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

export async function getCircleMemories(circleId: number) {
  const response = await api.get('/memories/');

  return response.data.filter(
    (memory: any) => Number(memory.circle) === circleId
  );
}