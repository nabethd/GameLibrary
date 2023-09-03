import { Document, Types } from 'mongoose';

interface DocumentResults<T> {
    _doc: T;
}
export interface ICustomer extends Document, DocumentResults<ICustomer> {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
    currentGame?: string;
    orders: string[];
}

export interface ICustomerAttr {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
    currentGame?: string;
    orders?: string[];
}
