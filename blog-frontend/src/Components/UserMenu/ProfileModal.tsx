import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "6px",
  boxShadow: 24,
  outline: "none",
};

interface ProfileModalProps {
  profileOpen: boolean;
  setProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  profileOpen,
  setProfileOpen,
}) => {
  const handleClose = () => {
    setProfileOpen(false);
  };
  return (
    <div>
      <Modal
        open={profileOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#14539a",
              color: "#fff",
              padding: "4px 8px",
              borderTopRightRadius: "4px",
              borderTopLeftRadius: "4px",
            }}
          >
            <Typography
              sx={{ fontSize: "16px" }}
              id="modal-modal-title"
              variant="h6"
            >
              Profile Details
            </Typography>
            <Box sx={{ cursor: "pointer" }}>
              <IconButton onClick={handleClose}>
                <AiOutlineClose style={{ color: "#fff" }} />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ padding: "18px 10px" }}>
            <Box sx={{ fontSize: "16px" }}>
              Are you sure you want to delete the leave request of{" "}
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModal;
