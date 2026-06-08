export type Trip = {
  id: number;

  circle: number;

  title: string;

  description: string;

  start_date: string;

  end_date?: string | null;

  destination_name?: string;

  latitude?: string | null;

  longitude?: string | null;

  created_by: number;

  created_by_username: string;

  created_at: string;

  updated_at: string;
};