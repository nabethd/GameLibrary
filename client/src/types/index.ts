export type GameData = {
  name: string;
  hebrewName: string;
  imageUrl: string;
  availableCopies: number;
  copies: number;
  gameTime?: number;
  company?: string;
  playersRange?: {
    min: number;
    max: number;
  };
  id: string;
};
