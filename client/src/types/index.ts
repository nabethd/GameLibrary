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

export type OrdersData = {
  borrowedDate: Date;
  returnedDate: Date;
  status: Status;
  customerId: string;
  gameId: string;
  id: string;
};

export type EnrichedOrdersData = {
  borrowedDate: Date;
  returnedDate: Date;
  status: Status;
  customerId: string;
  gameId: string;
  id: string;
  game?: GameData;
  customer?: CustomerData;
};
export enum Status {
  Returned = "returned",
  Ongoing = "ongoing",
}
