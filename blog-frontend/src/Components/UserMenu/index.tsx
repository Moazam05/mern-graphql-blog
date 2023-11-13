import { useState } from "react";
import { Box, IconButton, MenuItem, Menu } from "@mui/material";
import { FaUserNurse } from "react-icons/fa";
import { selectedUserName, setUser } from "../../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import ProfileModal from "./ProfileModal";
import useTypedSelector from "../../hooks/useTypedSelector";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const dispatch = useDispatch();
  const [profileOpen, setProfileOpen] = useState(false);
  const userName = useTypedSelector(selectedUserName);

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
