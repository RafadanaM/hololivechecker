export interface HoloMember {
  id: number;
  avatar: string;
  id_channel: string;
  thumbnail: string | null;
  live: boolean;
  channel_name: string;
  subscribers: string;
  live_video_thumbnail: string | null;
  live_video_title: string | null;
  live_video_url: string | null;
  watching: string | null;
  id_generation: number;
  generation_name: string;
}

export interface MembersResponse {
  [key: string]: HoloMember[];
}
