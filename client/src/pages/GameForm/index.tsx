import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameData } from "../../types";
import { createGame, findGame, updateGame } from "../../API/gameApi";
import { emptyImageUrl, NEW_GAME } from "../../Constants";
import "./GameForm.css";

const GameForm = () => {
  const [game, setGame] = useState<Partial<GameData>>(NEW_GAME);
  const { gameId } = useParams();
  const isNew = !gameId;

  useEffect(() => {
    if (!gameId) {
      return;
    }
    const getGame = async () => {
      try {
        const response = await findGame(gameId);
        if (!response) {
          return;
        }
        const game = response.data;
        setGame((prevState) => {
          return {
            ...prevState,
            ...response.data,
          };
        });
      } catch (e) {
        console.log("didnt found game");
      }
    };
    getGame();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "minPlayers") {
      let minPlayer = Number(value);
      setGame((prevState) => {
        let maxPlayer = Math.max(prevState.playersRange?.max || 0, minPlayer);

        return {
          ...prevState,
          playersRange: {
            min: minPlayer,
            max: maxPlayer,
          },
        };
      });
    } else if (name === "maxPlayers") {
      const maxPlayer = Number(value);
      setGame((prevState) => {
        let minPlayers = Math.min(
          prevState.playersRange?.min || Infinity,
          maxPlayer
        );

        return {
          ...prevState,
          playersRange: {
            min: minPlayers,
            max: maxPlayer,
          },
        };
      });
    } else if (name === "copies") {
      setGame((prevState) => {
        const takenGames = prevState.copies! - prevState.availableCopies!;

        return {
          ...prevState,
          copies: Number(value),
          availableCopies: Number(value) - takenGames,
        };
      });
    } else {
      setGame((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
      });
    }
  };

  const handleAddGame = async () => {
    await createGame(game);
    console.log("Creating game:", game);
    setGame(NEW_GAME);
  };

  const handleUpdateGame = async () => {
    await updateGame(game);
    console.log("Updating game:", game);
  };

  return (
    <div>
      <div className="game-details-page">
        <div className="game-form">
          <h2>Game details</h2>
          <form>
            <div className="medium-input-length">
              <label htmlFor="name">
                Game Name: <span className="required">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={game.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="medium-input-length">
              <label htmlFor="hebrewName">
                Hebrew Game Name: <span className="required">*</span>
              </label>
              <input
                type="text"
                name="hebrewName"
                id="hebrewName"
                value={game.hebrewName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="medium-input-length">
              <label htmlFor="imageUrl">
                Image URL: <span className="required">*</span>
              </label>
              <input
                type="text"
                name="imageUrl"
                id="imageUrl"
                value={game.imageUrl}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="short-input-length">
                <label htmlFor="copies">Copies:</label>
                <input
                  type="number"
                  name="copies"
                  id="copies"
                  value={game.copies}
                  width={10}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="gameTime">Game Time:</label>
                <div className="short-input-length">
                  <input
                    type="number"
                    name="gameTime"
                    id="gameTime"
                    value={game.gameTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <label htmlFor="minPlayers">Number of Players:</label>
            <div className="form-row">
              <div className="short-input-length">
                <input
                  className="min-players"
                  type="number"
                  name="minPlayers"
                  id="minPlayers"
                  placeholder="Min"
                  value={game.playersRange?.min}
                  onChange={handleInputChange}
                />
              </div>
              <div className="short-input-length">
                <input
                  type="number"
                  name="maxPlayers"
                  id="maxPlayers"
                  placeholder="Max"
                  value={game.playersRange?.max}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="medium-input-length">
              <label htmlFor="company">Company:</label>
              <input
                type="text"
                name="company"
                id="company"
                value={game.company}
                onChange={handleInputChange}
              />
            </div>
            <div className="button-group">
              {isNew && (
                <button
                  type="button"
                  className="add-button"
                  onClick={handleAddGame}
                >
                  Add Game
                </button>
              )}
              {!isNew && (
                <button
                  type="button"
                  className="update-button"
                  onClick={handleUpdateGame}
                >
                  Update Game
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="image-preview">
          <div className="image-preview">
            <img
              src={game.imageUrl || emptyImageUrl}
              width={350}
              height={450}
              alt="Game"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameForm;
