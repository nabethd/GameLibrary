import { create, find, findByNameOrEmail, update } from './customer.dal';

const createCustomer = async (email: string, firstName: string, lastName: string, phone: string, address: string) => {
    try {
        await create({ email, firstName, lastName, phone, address });
    } catch (e: any) {
        console.log(e.message);
    }
};

const addOrderToCustomer = async (orderId: string, customerId: string) => {
    const customer = await find(customerId);
    if (!customer) {
        throw new Error('Error finding customer');
    }
    const orders = customer.orders;
    if (orders?.some((id) => id === orderId)) {
        throw new Error('Order already exist');
    }
    orders.push(orderId);

    await update(customerId, {
        orders,
    });
};

const getCustomerByKeyword = async (keyword: string) => {
    return findByNameOrEmail(keyword);
};

export { createCustomer, addOrderToCustomer, getCustomerByKeyword };
