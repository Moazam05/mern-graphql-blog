import { useState } from "react";
import { Box, IconButton, MenuItem, Menu } from "@mui/material";
import { FaUserNurse } from "react-icons/fa";
import { setUser } from "../../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} color="inherit">
        <FaUserNurse />
      </IconButton>
      <Menu
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
      >
        <MenuItem
          onClick={() => {
            navigate("/profile");
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
    </Box>
  );
};

export default UserMenu;
