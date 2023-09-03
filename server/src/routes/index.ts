import { Router } from 'express';
import gameRouter from '../game/game.router';
import customerRouter from '../customer/customer.router';
import orderRouter from '../order/order.router';

const router = Router();

router.use('/game-library', gameRouter);
router.use('/game-library', orderRouter);
router.use('/game-library', customerRouter);

export default router;
