import React, { useState } from "react";
import Button from "@mui/material/Button";
import dateFormat from "dateformat";
import "./Orders.css";
import { OrdersData, Status } from "../../types";
import useFetchOrdersQuery from "../../queries/use-fetch-orders-query";
import ConfirmationModal from "../../Components/ConfirmationModal";
import useCloseOrderMutation from "../../mutations/use-close-order-mutation";

const Orders = () => {
  const [filterValue, setFilterValue] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [orderToClose, setOrderToClose] = useState<OrdersData | null>();
  const [orderStatusFilter, setOrderStatusFilter] = useState("All");
  const { data: orders = [] } = useFetchOrdersQuery();
  const { mutateAsync: closeCustomerOrder } =
    useCloseOrderMutation();

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };

  const closeOrder = (order: OrdersData) => {
    setOrderToClose(order);
    setIsConfirmationModalOpen(true);
  };
  const onApprove = async () => {
    if (orderToClose) {
      setIsConfirmationModalOpen(false);
      await closeCustomerOrder({
        orderId: orderToClose.id,
        gameId: orderToClose.gameId,
      });
    }
    setOrderToClose(null);
  };
  const onClose = async () => {
    setIsConfirmationModalOpen(false);
    setOrderToClose(null);
  };

  const handleOrderStatusFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setOrderStatusFilter(event.target.value);
  };

  const filteredOrders = orders?.filter((order) => {
    const filterByStatus =
      order.status === orderStatusFilter || orderStatusFilter === "All";
    const filterByName =
      order.customer?.firstName
        .toLowerCase()
        .includes(filterValue.toLowerCase()) ||
      order.customer?.lastName
        .toLowerCase()
        .includes(filterValue.toLowerCase()) ||
      order.game?.name.toLowerCase().includes(filterValue.toLowerCase()) ||
      order.game?.hebrewName.toLowerCase().includes(filterValue.toLowerCase());

    return filterByName && filterByStatus;
  });

  return (
    <div className="orders-container">
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
          id="orderStatusFilter"
          value={orderStatusFilter}
          onChange={handleOrderStatusFilterChange}
          className="filter-select"
        >
          <option value="">All</option>
          <option value={Status.Ongoing}>Ongoing</option>
          <option value={Status.Returned}>Returned</option>
        </select>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th></th>
            <th>Game Name</th>
            <th>Borrowed Date</th>
            <th>Returned Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders?.map((order) => {
            return (
              <tr
                key={order.id}
                className={order.status ? "ongoing-row" : "returned-row"}
              >
                <td>{`${order.customer?.firstName} ${order.customer?.lastName}`}</td>
                <td>
                  <img
                    src={order.game?.imageUrl}
                    alt={order.game?.name}
                    className="game-image"
                  />
                </td>
                <td>{order.game?.name}</td>
                <td>{dateFormat(order.borrowedDate, "isoDateTime")}</td>
                <td>{dateFormat(order.returnedDate, "isoDateTime")}</td>
                <td>{order.status}</td>
                <td>
                  <Button
                    onClick={() => closeOrder(order)}
                    disabled={order.status === Status.Returned}
                    variant={
                      order.status === Status.Ongoing ? "contained" : "outlined"
                    }
                  >
                    Close Order
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isConfirmationModalOpen && (
        <ConfirmationModal
          onClose={onClose}
          onApprove={onApprove}
          title="Are you Sure?"
          ApproveButtonText="Approve Order"
          closeButtonText="Close"
        />
      )}
    </div>
  );
};

export default Orders;
