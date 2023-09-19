import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CustomerAutoComplete from "../CustomerAutoComplete";
import { CustomerData } from "../../types";
import useOrderGameMutation from "../../mutations/use-order-game-mutation";

const OrderGameModal = ({
  onClose,
  gameId,
}: {
  onClose: () => void;
  gameId: string;
}) => {
  const [customer, setCustomer] = useState<CustomerData>();
  const { mutateAsync: orderGame } = useOrderGameMutation();
  const onChange = (selectedCustomer: CustomerData) => {
    setCustomer(selectedCustomer);
  };
  const onSend = async () => {
    if (customer) {
      await orderGame({ gameId, customerId: customer.id });
    }
    onClose();
  };
  return (
    <Modal open={true} onClose={onClose} className="order-game-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
        }}
      >
        <h2>Please choose a customer</h2>
        <CustomerAutoComplete onChange={onChange} value={customer} />
        <div style={{ margin: "8px 0 0 auto", width: "fit-content" }}>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
          <Button onClick={onSend} color="primary" variant="contained">
            Send
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default OrderGameModal;
