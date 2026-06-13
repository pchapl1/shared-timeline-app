import { api } from './api';

import type { Circle } from '@/types/circle';

type ReactNativeFile = {
  uri: string;
  name: string;
  type: string;
};

function getImageFileInfo(uri: string, fallbackName: string) {
  let filename = uri.split('/').pop() || fallbackName;

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
  return {
    uri,
    name: filename,
    type,
  };
}

export type UpdateCirclePayload =
  | Partial<
      Pick<
        Circle,
        | 'name'
        | 'circle_type'
        | 'start_date'
        | 'is_archived'
      >
    >
  | FormData;

export type CircleImagePayload = {
  name?: string;
  circle_type?: string;
  start_date?: string;
  is_archived?: boolean;
  avatarUri?: string | null;
  coverPhotoUri?: string | null;
};

export function buildCircleFormData(data: CircleImagePayload) {
  const formData = new FormData();

  if (data.name !== undefined) {
    formData.append('name', data.name);
  }

  if (data.circle_type !== undefined) {
    formData.append('circle_type', data.circle_type);
  }

  if (data.start_date !== undefined) {
    formData.append('start_date', data.start_date);
  }

  if (data.is_archived !== undefined) {
    formData.append('is_archived', String(data.is_archived));
  }

  if (data.avatarUri) {
    const { filename, type } = getImageFileInfo(
      data.avatarUri,
      'circle-avatar.jpg'
    );

    formData.append(
      'avatar',
      createReactNativeFile(
        data.avatarUri,
        filename,
        type
      ) as any
    );
  }

  if (data.coverPhotoUri) {
    const { filename, type } = getImageFileInfo(
      data.coverPhotoUri,
      'circle-cover.jpg'
    );

    formData.append(
      'cover_photo',
      createReactNativeFile(
        data.coverPhotoUri,
        filename,
        type
      ) as any
    );
  }

  return formData;
}


type PaginatedCirclesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Circle[];
};

export async function getCircles() {
  const response =
    await api.get<PaginatedCirclesResponse>(
      '/circles/'
    );

  return response.data.results;
}

export async function getCircle(circleId: string) {
  const response = await api.get<Circle>(
    `/circles/${circleId}/`
  );

  return response.data;
}

export async function updateCircle(
  circleId: number,
  payload: UpdateCirclePayload
) {
  const response = await api.patch<Circle>(
    `/circles/${circleId}/`,
    payload,
    payload instanceof FormData
      ? {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      : undefined
  );

  return response.data;
}

export async function deleteCircle(circleId: number) {
  await api.delete(`/circles/${circleId}/`);
}