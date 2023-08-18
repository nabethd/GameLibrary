import { IGame } from './game.interface';
import mongoose, { Schema } from 'mongoose';

const gameSchema = new Schema<IGame>(
    {
        name: {
            type: String,
            required: true,
            default: '',
            unique: true,
        },
        hebrewName: {
            type: String,
            required: true,
            default: '',
        },
        imageUrl: {
            type: String,
            default: '',
        },
        availableCopies: {
            type: Number,
            default: 1,
        },
        copies: {
            type: Number,
            default: 1,
        },
        gameTime: {
            type: Number,
        },
        company: {
            type: String,
            default: 'Unknown',
        },
        playersRange: {
            type: {
                min: {
                    type: Number,
                    required: true,
                },
                max: {
                    type: Number,
                    required: true,
                },
            },
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

gameSchema.set('versionKey', 'version');

const Game = mongoose.model<IGame>('Game', gameSchema);

export { Game };
