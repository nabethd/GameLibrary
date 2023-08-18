import { IOrder, Status } from './order.interface';
import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema<IOrder>(
    {
        borrowedDate: {
            type: Date,
            required: true,
        },
        returnedDate: {
            type: Date,
        },
        status: {
            type: String,
            enum: Status,
            required: true,
        },
        customerId: {
            type: String,
            required: true,
        },
        gameId: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    },
);

orderSchema.set('versionKey', 'version');

const Order = mongoose.model<IOrder>('Order', orderSchema);

export { Order };
