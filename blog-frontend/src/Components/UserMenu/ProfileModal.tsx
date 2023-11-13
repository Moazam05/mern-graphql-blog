import * as React from "react";
import Box from "@mui/material/Box";
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

  const userData: string = localStorage.getItem("user") as string;
  const user = JSON.parse(userData);

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
                <AiOutlineClose style={{ color: "#fff", fontSize: "20px" }} />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ padding: "18px 10px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <Box sx={{ minWidth: "200px" }}>Name</Box>
              <Box sx={{ fontSize: "16px", fontWeight: 600 }}>
                {user?.login?.name}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <Box sx={{ minWidth: "200px" }}>Email</Box>
              <Box sx={{ fontSize: "16px", fontWeight: 600 }}>
                {user?.login?.email}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <Box sx={{ minWidth: "200px" }}>Blogs Created</Box>
              <Box sx={{ fontSize: "16px", fontWeight: 600 }}>
                {user?.login?.blogs?.length === 0
                  ? "No Blogs Created Yet"
                  : user?.login?.blogs?.length}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <Box sx={{ minWidth: "200px" }}>Comments On Blogs</Box>
              <Box sx={{ fontSize: "16px", fontWeight: 600 }}>
                {user?.login?.comments?.length === 0
                  ? "No Comments Posted Yet"
                  : user?.login?.comments?.length}
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModal;
