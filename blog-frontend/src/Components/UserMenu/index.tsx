// React Imports
import { useState } from "react";
// MUI Imports
import { Box, IconButton, MenuItem, Menu } from "@mui/material";
// React Icons
import { FaUserNurse } from "react-icons/fa";
// Redux Imports
import { selectedUserName, setUser } from "../../redux/auth/authSlice";
import { useDispatch } from "react-redux";
// Custom Imports
import ProfileModal from "./ProfileModal";
// Hooks Imports
import useTypedSelector from "../../hooks/useTypedSelector";

const UserMenu = () => {
  const dispatch = useDispatch();
  const userName = useTypedSelector(selectedUserName);
  // state
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {userName}
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          color="inherit"
        >
          <FaUserNurse />
        </IconButton>
      </Box>
      <Menu
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
      >
        <MenuItem
          onClick={() => {
            setProfileOpen(true);
            setAnchorEl(null);
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(setUser(null));
            localStorage.removeItem("user");
            setAnchorEl(null);
          }}
        >
          Logout
        </MenuItem>
      </Menu>
      <ProfileModal profileOpen={profileOpen} setProfileOpen={setProfileOpen} />
    </Box>
  );
};

export default UserMenu;
