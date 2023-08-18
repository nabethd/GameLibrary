import { Request, Response, Router } from 'express';
import { body, param } from 'express-validator';
import { createNewOrder, findAndUpdateOrder, findOneOrder, getAllOrders } from './order.service';

export const orderRouter = Router();

orderRouter.post(
    '/order',
    [body('gameId').not().isEmpty().withMessage('orderId must be provided')],
    [body('customerId').not().isEmpty().withMessage('customerId must be provided')],
    async (req: Request, res: Response) => {
        const { gameId, customerId } = req.body;

        try {
            await createNewOrder({ gameId, customerId });
            res.status(201).send();
        } catch (error: any) {
            res.status(500).send(`Error creating new order:  ${error.message}`);
        }
    },
);

// Get all orders
orderRouter.get('/order', async (req: Request, res: Response) => {
    try {
        const orders = await getAllOrders();
        res.status(200).json(orders);
    } catch (error: any) {
        console.error('Error retrieving orders:', error);
        res.status(500).send(`Error retrieving orders:  ${error.message}`);
    }
});
// Find order
orderRouter.get(
    '/order/:orderId',
    [param('orderId').not().isEmpty().withMessage('orderId must be provided')],
    async (req: Request, res: Response) => {
        try {
            const { orderId } = req.params;

            const orders = await findOneOrder(orderId);
            res.status(200).json(orders);
        } catch (error: any) {
            console.error('Error retrieving order:', error);
            res.status(500).send(`Error retrieving order:  ${error.message}`);
        }
    },
);

// Update order
orderRouter.put(
    '/order/:orderId',
    [
        param('orderId').not().isEmpty().withMessage('orderId must be provided'),
        body('name').not().isEmpty().withMessage('order name must be provided'),
        body('hebrewName').not().isEmpty().withMessage('order name must be provided'),
        body('imageUrl').not().isEmpty().withMessage('imageUrl must be provided'),
        body('copies').not().isEmpty().isInt().withMessage('copies must be provided'),
    ],
    async (req: Request, res: Response) => {
        try {
            const { orderId } = req.params;

            const order = await findAndUpdateOrder(orderId, req.body);
            res.status(201).json(order);
        } catch (error: any) {
            console.error('Error Updating order:', error);
            res.status(500).send(`Error Updating order:  ${error.message}`);
        }
    },
);

export default orderRouter;
