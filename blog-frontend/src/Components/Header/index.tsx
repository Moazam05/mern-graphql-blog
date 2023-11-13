import { useState } from "react";
import { Box, AppBar, Toolbar, Tabs, Tab, Button } from "@mui/material";
import { ImBlogger } from "react-icons/im";
import { BiLogInCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { selectedUserId, setPathName } from "../../redux/auth/authSlice";
import useTypedSelector from "../../hooks/useTypedSelector";
import UserMenu from "../UserMenu";
import { useDispatch } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const clientId = useTypedSelector(selectedUserId);

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "#404040 " }}>
        <Toolbar>
          <ImBlogger
            size={"30px"}
            style={{
              borderRadius: "50%",
              padding: "10px",
              background: "#6c5252",
            }}
          />
          <Box
            sx={{
              width: "100%",
              marginLeft: "auto",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Tabs
              textColor="inherit"
              TabIndicatorProps={{ style: { background: "#fff" } }}
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab
                label="Home"
                onClick={() => {
                  navigate("/");
                  dispatch(setPathName("/"));
                  localStorage.setItem("path", JSON.stringify("/"));
                }}
              />
              <Tab
                label="Blogs"
                onClick={() => {
                  navigate("/blogs");
                  dispatch(setPathName("/blogs"));
                  localStorage.setItem("path", JSON.stringify("/blogs"));
                }}
              />
            </Tabs>
            {clientId ? (
              <UserMenu />
            ) : (
              <Button
                sx={{
                  marginLeft: 2,
                  bgcolor: "#d27e20",
                  color: "#fff",
                  borderRadius: 20,
                  width: 95,
                  "&:hover": {
                    bgcolor: "#ff9400",
                  },
                }}
                endIcon={<BiLogInCircle />}
                onClick={() => {
                  navigate("/login");
                  dispatch(setPathName("/login"));
                  localStorage.setItem("path", JSON.stringify("/login"));
                }}
              >
                Log In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
