import * as mongoose from 'mongoose';
import { MONGO_DB_NAME, MONGO_PASSWORD, MONGO_USER_NAME } from '../secrets';

export const initMongoDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${MONGO_USER_NAME}:${MONGO_PASSWORD}@${MONGO_DB_NAME}.olzeik7.mongodb.net/?retryWrites=true&w=majority`,
        );
        console.log('Connected to the database successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
};
