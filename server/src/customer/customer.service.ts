import { CustomerDbController } from './customer.dal';

const createCustomer = async (email: string, firstName: string, lastName: string, phone: string, address: string) => {
    const customerDbController = new CustomerDbController();
    try {
        await customerDbController.create({ email, firstName, lastName, phone, address });
    } catch (e: any) {
        console.log(e.message);
    }
};

export { createCustomer };
