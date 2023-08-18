import { Game } from './game.model';

const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

const filePath = '/Users/drornavon/Documents/Dror/projects/GameLibrary/server/src/bord-games.csv'; // Path to your CSV file

interface IGameData {
    name: string;
    hebrewName: string;
    imageUrl: string;
    copies: number;
    gameTime: number;
    minPlayer: number;
    maxPlayer: number;
    company: string;
}

const bulkInsert = async () => {
    try {
        const results: any = [];
        const duplicateGames: string[] = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', async (data: IGameData) => {
                try {
                    const game = {
                        name: data.name,
                        hebrewName: data.hebrewName,
                        imageUrl: data.imageUrl,
                        copies: data.copies,
                        availableCopies: data.copies,
                        gameTime: data.gameTime,
                        company: data.company,
                        playersRange:
                            data.minPlayer && data.maxPlayer
                                ? {
                                      min: data.minPlayer,
                                      max: data.maxPlayer,
                                  }
                                : undefined,
                    };

                    results.push(game);
                } catch (error) {
                    console.error('Error parsing game data:', error);
                }
            })
            .on('end', async () => {
                try {
                    const insertResult = await Game.insertMany(results, { ordered: false });
                    console.log('Finished Upload');
                } catch (error: any) {
                    // Check for duplicate key error
                    if (error.code === 11000) {
                        const duplicateKey = error.keyValue.name;
                        duplicateGames.push(duplicateKey);
                        console.log(`Skipped duplicate game: ${duplicateKey}`);
                    } else {
                        console.error('Error inserting games:', error);
                    }
                }
            });
    } catch (error) {
        console.error('Error reading CSV file:', error);
    }
};

export default bulkInsert;
