import { Document, Types } from 'mongoose';

export enum Status {
    Returned = 'returned',
    Ongoing = 'ongoing',
}
interface DocumentResults<T> {
    _doc: T;
}
export interface IOrder extends Document, DocumentResults<IOrder> {
    _id: Types.ObjectId;
    borrowedDate: Date;
    returnedDate: Date;
    status: Status;
    customerId: string;
    gameId: string;
}
export interface IOrderAttr {
    borrowedDate: Date;
    returnedDate: Date;
    status: Status;
    customerId: string;
    gameId: string;
}
