export type Activity = {
  id: number;
  actor: number;
  actor_username: string;
  circle: number;
  circle_name: string;
  activity_type:
    | 'memory_created'
    | 'comment_created'
    | 'reaction_created'
    | 'member_joined';
  memory: number | null;
  memory_title?: string | null;
  comment: number | null;
  created_at: string;
};