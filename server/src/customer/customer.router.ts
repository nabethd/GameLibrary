import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { createCustomer } from './customer.service';

export const customerRouter = Router();

customerRouter.post(
    '/customer',
    [
        body('firstName').not().isEmpty().withMessage('first name must be provided'),
        body('lastName').not().isEmpty().withMessage('last name must be provided'),
        body('phone').not().isEmpty().withMessage('phone must be provided'),
        body('email').isEmail().withMessage('Email must be valid'),
    ],
    async (req: Request, res: Response) => {
        const { email, firstName, lastName, phone, address } = req.body;
        try {
            await createCustomer(email, firstName, lastName, phone, address);
            res.status(201).send();
        } catch (e) {}
    },
);

export default customerRouter;
