import { createOrder, findOrder, getOrders, updateOrder } from './order.dal';
import { IOrderAttr, Status } from './order.interface';
import { findAndUpdateGame, findOneGame } from '../game/game.service';

const createNewOrder = async ({ gameId, customerId }: { gameId: string; customerId: string }) => {
    const game = await findOneGame(gameId);

    if (!game || game.availableCopies === 0) {
        throw new Error('This game is not available');
    }
    try {
        const order = await createOrder({
            gameId,
            customerId,
            status: Status.Away,
            borrowedDate: new Date(),
        });

        await findAndUpdateGame(gameId, {
            availableCopies: game.availableCopies--,
        });

        return order;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

const closeOrder = async ({ gameId, customerId }: { gameId: string; customerId: string }) => {
    const game = await findOneGame(gameId);

    if (!game || game.availableCopies === 0) {
        throw new Error('This game is not available');
    }
    try {
        const order = await createOrder({
            gameId,
            customerId,
            status: Status.Away,
            borrowedDate: new Date(),
        });

        await findAndUpdateGame(gameId, {
            availableCopies: game.availableCopies--,
        });

        return order;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};
const getAllOrders = async () => {
    try {
        return await getOrders();
    } catch (error) {
        console.error('Error retrieving orders:', error);
        throw error;
    }
};
const findOneOrder = async (orderId: string) => {
    try {
        return await findOrder(orderId);
    } catch (error) {
        console.error('Error retrieving orders:', error);
        throw error;
    }
};
const findAndUpdateOrder = async (orderId: string, order: Partial<IOrderAttr>) => {
    try {
        return await updateOrder(orderId, order);
    } catch (error) {
        console.error('Error retrieving orders:', error);
        throw error;
    }
};

export { createNewOrder, getAllOrders, findOneOrder, findAndUpdateOrder };
