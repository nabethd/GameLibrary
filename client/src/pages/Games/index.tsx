import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Game.css";
import OrderGameModal from "../../Components/OrderGameModal";
import useFetchGamesQuery from "../../queries/use-fetch-games-query";

const Games = () => {
  const [filterValue, setFilterValue] = useState("");
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderGameId, setOrderGameId] = useState("");
  const [isAvailableFilter, setIsAvailableFilter] = useState("");
  const { data: games = [] } = useFetchGamesQuery();

  const navigate = useNavigate();

  const handleCreateAddGame = () => {
    navigate("/games/new");
  };
  const handleUpdateGame = (gameId: string) => {
    navigate(`/games/${gameId}`);
  };
  const orderGame = (event: React.MouseEvent, gameId: string) => {
    event.stopPropagation();
    setOrderGameId(gameId);
    setIsOrderModalOpen(true);
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
            <th></th>
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
              <td>
                <button
                  className="order-game-button"
                  onClick={(e) => orderGame(e, game.id)}
                >
                  {" "}
                  order{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOrderModalOpen && (
        <OrderGameModal
          onClose={() => {
            setIsOrderModalOpen(false);
            setOrderGameId("");
          }}
          gameId={orderGameId}
        />
      )}
    </div>
  );
};

export default Games;
