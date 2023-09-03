import { ICustomerAttr } from './customer.interface';
import { Customer } from './customer.model';

const create = async (data: ICustomerAttr) => {
    const customer = new Customer(data);
    await customer.save();
};

const update = async (id: string, data: Partial<ICustomerAttr>) => {
    const customer = await Customer.findById(id);
    if (customer) {
        customer.set(data);
        await customer.save();
    }
};

const find = (id: string) => {
    return Customer.findById(id);
};

const findByNameOrEmail = (keyword: string) => {
    const regexPattern = new RegExp(keyword, 'i');

    const customerQuery = {
        $or: [
            { firstName: { $regex: regexPattern } },
            { lastName: { $regex: regexPattern } },
            { email: { $regex: regexPattern } },
        ],
    };

    return Customer.find(customerQuery)
        .exec()
        .then((results) => {
            if (results.length === 0) {
                return Customer.find({}).exec(); // Return all customers
            }
            return results;
        });
};
export { create, update, find, findByNameOrEmail };
