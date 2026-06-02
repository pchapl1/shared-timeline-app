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
  created_by?: MemoryCreator | null;
  created_at?: string;
  updated_at?: string;
};