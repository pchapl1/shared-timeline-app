import {api} from './api'

type createMemoryData = {
    circleId: string,
    title: string,
    description: string,
    memoryDate: string,
    imageUri?: string | null
}

async function uriToFile(uri: string, filename: string, mimeType: string) {
  const response = await fetch(uri);
  const blob = await response.blob();

  return new File([blob], filename, {
    type: mimeType,
  });
}

export async function createMemory(data: createMemoryData) {

    const formData = new FormData();

    formData.append('circle', data.circleId);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('memory_date', data.memoryDate);

    if (data.imageUri) {
        let filename =
            data.imageUri.split('/').pop() || 'photo.jpg';

        if (!filename.includes('.')) {
            filename = `${filename}.jpg`;
        }

        const match = /\.(\w+)$/.exec(filename);

        const type = match
            ? `image/${match[1]}`
            : 'image/jpeg';

        const file = await uriToFile(
            data.imageUri,
            filename,
            type
        );

        formData.append('photo', file);
    }

    return api.post('/memories/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}