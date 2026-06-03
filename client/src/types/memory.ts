export type MemoryPhoto = {
  id: number;
  image: string;
  created_at: string;
};

export type MemoryCreator = {
  id: number;
  username: string;
};

export type Memory = {
  id: number;
  circle: number;
  title: string;
  description: string;
  memory_date: string;
  location_name?: string;
  photo?: string | null;
  photos?: MemoryPhoto[];
  reaction_count?: number;
  has_reacted?: boolean;
  comments?: MemoryComment[];
  comment_count?: number;
  created_by?: MemoryCreator | null;
  created_at?: string;
  updated_at?: string;
};

export type MemoryComment = {
  id: number;
  memory: number;
  user: {
    id: number;
    username: string;
  };
  content: string;
  created_at: string;
  updated_at: string;
};

export type CreateMemoryData = {
  circleId: string;
  title: string;
  description: string;
  memoryDate: string;
  locationName?: string;
  latitude?: string;
  longitude?: string;
  imageUri?: string | null;
  imageUris?: string[];
};

export type MemoryContextType = {
  memories: Memory[];
  setMemories: React.Dispatch<
    React.SetStateAction<Memory[]>
  >;

  addMemory: (memory: Memory) => void;

  removeMemory: (memoryId: number) => void;

  replaceMemory: (
    tempId: number,
    memory: Memory
  ) => void;
};