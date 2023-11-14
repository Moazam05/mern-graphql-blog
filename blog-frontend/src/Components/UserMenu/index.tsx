// React Imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// MUI Imports
import { Box, IconButton, MenuItem, Menu } from "@mui/material";
// React Icons
import { FaUserNurse } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { IoLogOutOutline } from "react-icons/io5";
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
  const navigate = useNavigate();
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
          sx={{ width: "125px", gap: 2 }}
        >
          <ImProfile />
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(setUser(null));
            localStorage.removeItem("user");
            setAnchorEl(null);
            navigate("/");
          }}
          sx={{ width: "125px", gap: 2 }}
        >
          <IoLogOutOutline />
          Logout
        </MenuItem>
      </Menu>
      <ProfileModal profileOpen={profileOpen} setProfileOpen={setProfileOpen} />
    </Box>
  );
};

export default UserMenu;
