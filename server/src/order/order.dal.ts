import { IOrderAttr } from './order.interface';
import { Order } from './order.model';

const createOrder = async (data: Omit<IOrderAttr, 'returnedDate'>) => {
    const order = new Order(data);
    await order.save();
};

const updateOrder = async (id: string, data: Partial<IOrderAttr>) => {
    const order = await Order.findById(id);
    if (order) {
        order.set(data);
        await order.save();
    }
};

const getOrders = async () => {
    const res = await Order.find();
    return res;
};

const findOrder = (orderId: string) => {
    return Order.findById(orderId);
};

export { createOrder, getOrders, updateOrder, findOrder };
