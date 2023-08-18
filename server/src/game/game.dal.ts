import { IGameAttr } from './game.interface';
import { Game } from './game.model';

const createGame = async (data: IGameAttr) => {
    const game = new Game(data);
    await game.save();
};

const updateGame = async (id: string, data: Partial<IGameAttr>) => {
    const game = await Game.findById(id);
    if (game) {
        game.set(data);
        await game.save();
    }
};

const getGames = async () => {
    const res = await Game.find();
    return res;
};

const findGame = (gameId: string) => {
    return Game.findById(gameId);
};

export { createGame, getGames, updateGame, findGame };
