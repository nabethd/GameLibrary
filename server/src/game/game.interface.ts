import { Document, Types } from 'mongoose';

interface DocumentResults<T> {
    _doc: T;
}
export interface IGame extends Document, DocumentResults<IGame> {
    _id: Types.ObjectId;
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
}
export interface IGameAttr {
    name?: string;
    hebrewName?: string;
    imageUrl?: string;
    availableCopies?: number;
    copies?: number;
    gameTime?: number;
    company?: string;
    playersRange?: {
        min: number;
        max: number;
    };
}
