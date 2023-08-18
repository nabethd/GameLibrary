import React, { useState } from "react";
import "./AddGamePopup.css";

interface IAddGamePopup {
  isOpen: boolean;
  onClose: () => void;
  onAddGame: (game: {
    name: string;
    hebrewName: string;
    imageUrl: string;
    copies: number;
    gameTime?: number;
    playersRange?:
      | {
          min: number;
          max: number;
        }
      | undefined;
    company?: string;
  }) => void;
}

const AddGamePopup: React.FC<IAddGamePopup> = ({
  isOpen,
  onClose,
  onAddGame,
}) => {
  const [name, setName] = useState("");
  const [hebrewName, setHebrewName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [copies, setCopies] = useState(1);
  const [gameTime, setGameTime] = useState<number | undefined>(undefined);
  const [minPlayers, setMinPlayers] = useState<number | undefined>(undefined);
  const [maxPlayers, setMaxPlayers] = useState<number | undefined>(undefined);

  const [company, setCompany] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "hebrewName") {
      setHebrewName(value);
    } else if (name === "imageUrl") {
      setImageUrl(value);
    } else if (name === "copies") {
      setCopies(Number(value)); // Convert the value to a number
    } else if (name === "gameTime") {
      setGameTime(Number(value));
    } else if (name === "minPlayers") {
      const minValue = Number(value);
      setMinPlayers(minValue);
      if (maxPlayers && minValue > maxPlayers) {
        setMaxPlayers(minValue);
      }
    } else if (name === "maxPlayers") {
      const maxValue = Number(value);
      setMaxPlayers(maxValue);
      if (minPlayers && maxValue < minPlayers) {
        setMinPlayers(maxValue);
      }
    } else if (name === "company") {
      setCompany(value);
    }
  };

  const handleAddClick = async () => {
    const newGame = {
      name,
      imageUrl,
      hebrewName,
      copies,
      gameTime,
      company,
      playersRange:
        minPlayers && maxPlayers
          ? {
              min: minPlayers,
              max: maxPlayers,
            }
          : undefined,
    };

    await onAddGame(newGame);
    onClose();
  };

  return (
    <div className={`popup ${isOpen ? "open" : ""}`}>
      <div className="popup-content">
        <h2>Add New Game</h2>
        <form>
          <div className="input-group">
            <label htmlFor="name">Game Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="hebrewName">Hebrew Game Name:</label>
            <input
              type="text"
              name="hebrewName"
              id="hebrewName"
              value={hebrewName}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              name="imageUrl"
              id="imageUrl"
              value={imageUrl}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="copies">Copies:</label>
            <input
              type="number"
              name="copies"
              id="copies"
              value={copies}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="gameTime">Game Time (in minutes):</label>
            <input
              type="text"
              name="gameTime"
              id="gameTime"
              value={gameTime}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="minPlayers">Min Players:</label>
            <input
              type="number"
              name="minPlayers"
              id="minPlayers"
              value={minPlayers}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="maxPlayers">Max Players:</label>
            <input
              type="number"
              name="maxPlayers"
              id="maxPlayers"
              value={maxPlayers}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="company">Company:</label>
            <input
              type="text"
              name="company"
              id="company"
              value={company}
              onChange={handleInputChange}
            />
          </div>
          <div className="button-group">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="add-button"
              onClick={handleAddClick}
            >
              Add Game
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGamePopup;
