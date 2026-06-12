export type CircleMember = {
  id: number;
  circle: number;
  user: number;
  username: string;
  role: 'owner' | 'admin' | 'member';
  joined_at: string;
};

export type Circle = {
  id: number;
  name: string;
  circle_type: string;
  start_date: string;
  members: CircleMember[];
  member_count: number;
  memory_count: number;
  trip_count: number;
  is_archived: boolean;
};