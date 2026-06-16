export type Trip = {
  id: number;

  circle: number;

  title: string;

  description: string;

  memory_count?: number;

  preview_photos?: TripPreviewPhoto[];

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

export type TripPreviewPhoto = {
  id: number;
  image: string | null;
};

export type UpdateTripPayload = Partial<
  Pick<
    Trip,
    | 'title'
    | 'description'
    | 'start_date'
    | 'end_date'
    | 'destination_name'
    | 'latitude'
    | 'longitude'
  >
>;