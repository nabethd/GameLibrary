import { Request, Response, Router } from 'express';
import { body, param } from 'express-validator';
import { createNewGame, findAndUpdateGame, findOneGame, getAllGames } from './game.service';

export const gameRouter = Router();

gameRouter.post(
    '/game',
    [
        body('name').not().isEmpty().withMessage('game name must be provided'),
        body('hebrewName').not().isEmpty().withMessage('game name must be provided'),
        body('imageUrl').not().isEmpty().withMessage('imageUrl must be provided'),
        body('copies').not().isEmpty().isInt().withMessage('copies must be provided'),
    ],
    async (req: Request, res: Response) => {
        const { name, hebrewName, imageUrl, copies, gameTime, playersRange, company } = req.body;

        try {
            await createNewGame(name, hebrewName, imageUrl, copies, gameTime, playersRange, company);
            res.status(201).send();
        } catch (error: any) {
            res.status(500).send(`Error creating new game:  ${error.message}`);
        }
    },
);

// Get all games
gameRouter.get('/game', async (req: Request, res: Response) => {
    try {
        const games = await getAllGames();
        res.status(200).json(games);
    } catch (error: any) {
        console.error('Error retrieving games:', error);
        res.status(500).send(`Error retrieving games:  ${error.message}`);
    }
});
// Find game
gameRouter.get(
    '/game/:gameId',
    [param('gameId').not().isEmpty().withMessage('gameId must be provided')],
    async (req: Request, res: Response) => {
        try {
            const { gameId } = req.params;

            const games = await findOneGame(gameId);
            res.status(200).json(games);
        } catch (error: any) {
            console.error('Error retrieving game:', error);
            res.status(500).send(`Error retrieving game:  ${error.message}`);
        }
    },
);

// Update game
gameRouter.put(
    '/game/:gameId',
    [
        param('gameId').not().isEmpty().withMessage('gameId must be provided'),
        body('name').not().isEmpty().withMessage('game name must be provided'),
        body('hebrewName').not().isEmpty().withMessage('game name must be provided'),
        body('imageUrl').not().isEmpty().withMessage('imageUrl must be provided'),
        body('copies').not().isEmpty().isInt().withMessage('copies must be provided'),
    ],
    async (req: Request, res: Response) => {
        try {
            const { gameId } = req.params;

            const game = await findAndUpdateGame(gameId, req.body);
            res.status(201).json(game);
        } catch (error: any) {
            console.error('Error Updating game:', error);
            res.status(500).send(`Error Updating game:  ${error.message}`);
        }
    },
);

export default gameRouter;
