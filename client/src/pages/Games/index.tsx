import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { getGames } from "../../API/gameApi";
import { GameData } from "../../types";
import "./Game.css";

const Games = () => {
  const [filterValue, setFilterValue] = useState("");
  const [isAvailableFilter, setIsAvailableFilter] = useState("");

  const [games, setGames] = useState<GameData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllGames = async () => {
      try {
        const res: AxiosResponse<GameData[]> = await getGames();
        if (Array.isArray(res.data)) {
          setGames(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllGames();
  }, []);

  const handleCreateAddGame = () => {
    navigate("/games/new");
  };
  const handleUpdateGame = (gameId: string) => {
    navigate(`/games/${gameId}`);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };

  const handleIsAvailableFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsAvailableFilter(event.target.value);
  };

  const filteredGames = games.filter((game) => {
    const filterByName =
      game.name.toLowerCase().includes(filterValue.toLowerCase()) ||
      game.hebrewName.toLowerCase().includes(filterValue.toLowerCase());

    // Filter by isAvailable
    if (isAvailableFilter === "available") {
      return filterByName && game.availableCopies > 0;
    } else if (isAvailableFilter === "unavailable") {
      return filterByName && game.availableCopies === 0;
    }

    // Filter by name
    return filterByName;
  });

  return (
    <div className="games-container">
      <div className="filters">
        <input
          type="text"
          id="nameFilter"
          value={filterValue}
          onChange={handleFilterChange}
          className="filter-input"
          placeholder="Search by name..."
        />

        <select
          id="isAvailableFilter"
          value={isAvailableFilter}
          onChange={handleIsAvailableFilterChange}
          className="filter-select"
        >
          <option value="">All</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
        <button onClick={handleCreateAddGame} className="create-game-button">
          Add New Game
        </button>
      </div>

      <table className="games-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Hebrew Name</th>
            <th>Available Copies</th>
          </tr>
        </thead>
        <tbody>
          {filteredGames.map((game) => (
            <tr
              key={game.id}
              className={
                game.availableCopies > 0 ? "available-row" : "unavailable-row"
              }
              onClick={() => handleUpdateGame(game.id)}
            >
              <td>
                <img
                  src={game.imageUrl}
                  alt={game.name}
                  className="game-image"
                />
              </td>
              <td>{game.name}</td>
              <td>{game.hebrewName}</td>
              <td>{game.availableCopies}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Games;
