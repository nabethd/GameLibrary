import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "@mui/material/Button";
import OrderGameModal from "../../Components/OrderGameModal";
import useFetchGamesQuery from "../../queries/use-fetch-games-query";
import "./Games.css";

const Games = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderGameId, setOrderGameId] = useState("");
  const [searchParam, setSearchParam] = useSearchParams({
    filterValue: "",
    isAvailableFilter: "all",
  });
  const filterValue = searchParam.get("filterValue") || "";
  const isAvailableFilter = searchParam.get("isAvailableFilter") || "all";

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
    setSearchParam(
      (prev) => {
        prev.set("filterValue", event.target.value);
        return prev;
      },
      { replace: true }
    );
  };

  const handleIsAvailableFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchParam((prev) => {
      prev.set("isAvailableFilter", event.target.value);
      return prev;
    });
  };

  const filteredGames = games.filter((game) => {
    const filterByName =
      game.name.toLowerCase().includes(filterValue.toLowerCase()) ||
      game.hebrewName.toLowerCase().includes(filterValue.toLowerCase());

    if (isAvailableFilter === "available") {
      return filterByName && game.availableCopies > 0;
    } else if (isAvailableFilter === "unavailable") {
      return filterByName && game.availableCopies === 0;
    }

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
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
        <Button
          style={{ marginLeft: "auto" }}
          variant="contained"
          onClick={handleCreateAddGame}
          className="create-game-button"
        >
          Add New Game
        </Button>
      </div>

      <table className="games-table">
        <thead>
          <tr>
            <th></th>
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
                <Button
                  className="order-game-button"
                  onClick={(e) => orderGame(e, game.id)}
                  disabled={game.availableCopies === 0}
                  variant={game.availableCopies > 0 ? "contained" : "outlined"}
                >
                  {" "}
                  order{" "}
                </Button>
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
