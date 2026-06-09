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
  is_archived: boolean;
};