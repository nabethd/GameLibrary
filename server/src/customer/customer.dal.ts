import { ICustomerAttr } from './customer.interface';
import { Customer } from './customer.model';

export class CustomerDbController {
    create = async (data: ICustomerAttr) => {
        const customer = new Customer(data);
        await customer.save();
    };

    update = async (id: string, data: Partial<ICustomerAttr>) => {
        const customer = await Customer.findById(id);
        if (customer) {
            customer.set(data);
            await customer.save();
        }
    };
}
