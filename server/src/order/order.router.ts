import { Request, Response, Router } from 'express';
import { body, param } from 'express-validator';
import { closeOrder, createNewOrder, findOneOrder, getAllOrders } from './order.service';

export const orderRouter = Router();

orderRouter.post(
    '/order',
    [body('gameId').not().isEmpty().withMessage('orderId must be provided')],
    [body('customerId').not().isEmpty().withMessage('customerId must be provided')],
    async (req: Request, res: Response) => {
        const { gameId, customerId } = req.body;

        try {
            const order = await createNewOrder({ gameId, customerId });
            res.status(201).send(order);
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
    [param('orderId').not().isEmpty().withMessage('orderId must be provided')],
    async (req: Request, res: Response) => {
        try {
            const { orderId } = req.params;

            const order = await closeOrder({ orderId });
            res.status(201).json(order);
        } catch (error: any) {
            console.error('Error Updating order:', error);
            res.status(500).send(`Error Updating order:  ${error.message}`);
        }
    },
);

export default orderRouter;
