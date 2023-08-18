import { createGame, findGame, getGames, updateGame } from './game.dal';
import { IGameAttr } from './game.interface';

const createNewGame = async (
    name: string,
    hebrewName: string,
    imageUrl: string,
    copies: number,
    gameTime: number,
    playersRange: { min: number; max: number },
    company: string,
) => {
    try {
        const game = await createGame({
            name,
            hebrewName,
            imageUrl,
            copies,
            availableCopies: copies,
            gameTime,
            company,
            playersRange,
        });
        return game;
    } catch (error) {
        console.error('Error creating game:', error);
        throw error;
    }
};

const getAllGames = async () => {
    try {
        return await getGames();
    } catch (error) {
        console.error('Error retrieving games:', error);
        throw error;
    }
};
const findOneGame = async (gameId: string) => {
    try {
        return await findGame(gameId);
    } catch (error) {
        console.error('Error retrieving games:', error);
        throw error;
    }
};
const findAndUpdateGame = async (gameId: string, game: Partial<IGameAttr>) => {
    try {
        return await updateGame(gameId, game);
    } catch (error) {
        console.error('Error retrieving games:', error);
        throw error;
    }
};

export { createNewGame, getAllGames, findOneGame, findAndUpdateGame };
