import mongoose, { Schema } from 'mongoose';
import { ICustomer } from './customer.interface';

const customerSchema = new Schema<ICustomer>(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        currentGame: {
            type: String,
        },
        address: {
            type: String,
        },
        orders: {
            type: [
                {
                    orderId: {
                        type: String,
                        required: true,
                    },
                },
            ],
            default: [],
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
customerSchema.set('versionKey', 'version');

const Customer = mongoose.model<ICustomer>('Customer', customerSchema);

export { Customer };
