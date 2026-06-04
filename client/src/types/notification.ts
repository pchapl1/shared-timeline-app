export type Notification = {
  id: number;
  recipient: number;
  actor: number;
  actor_username: string;
  notification_type:
    | 'memory_comment'
    | 'memory_reaction'
    | 'circle_invite'
    | 'member_joined';
  is_read: boolean;
  circle: number | null;
  circle_name: string | null;
  memory: number | null;
  memory_title: string | null;
  created_at: string;
};