import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const ConfirmationModal = ({
  onClose,
  onApprove,
  title,
  closeButtonText,
  ApproveButtonText,
}: {
  onClose: () => void;
  onApprove: () => void;
  title: string;
  closeButtonText: string;
  ApproveButtonText: string;
}) => {
  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: " 300px",
          height: "100px",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
        }}
      >
        <h2>{title}</h2>
        <div style={{ margin: "8px 0 0 auto", width: "fit-content" }}>
          <Button onClick={onClose} color="primary">
            {closeButtonText}
          </Button>
          <Button onClick={onApprove} color="primary" variant="contained">
            {ApproveButtonText}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
