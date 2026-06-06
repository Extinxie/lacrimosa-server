export type RawShikimoriApiResponse = {
  id: number;
  name: string;
  russian: string;
  image: {
    original: string;
    preview: string;
  };
  url: string;
  kind: string;
  score: string;
  status: string;
  episodes: number;
  episodes_aired: number;
  aired_on: string;
  description: string;
  released_on: string | null;
};
