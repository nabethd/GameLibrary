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

export type CustomerData = {
  email: string;
  lastName: string;
  firstName: string;
  address: string;
  phone: string;
  orders: string[];
  id: string;
};
