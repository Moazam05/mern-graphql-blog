import { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { ImBlogger } from "react-icons/im";
import { BiLogInCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { selectedUserId } from "../../redux/auth/authSlice";
import useTypedSelector from "../../hooks/useTypedSelector";
import UserMenu from "../UserMenu";

const Header = () => {
  const navigate = useNavigate();
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              position: "absolute",
              right: "40%",
              width: "300px",
              padding: "5px",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.1)",
                borderRadius: 10,
                cursor: "pointer",
              },
            }}
            onClick={() => {
              navigate("/addBlog");
            }}
          >
            <Typography sx={{ fontFamily: "Work Sans", fontSize: "18px" }}>
              Post New Blog
              <IconButton color="inherit">
                <ImBlogger style={{ fontSize: "20px" }} />
              </IconButton>
            </Typography>
          </Box>
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
                }}
              />
              <Tab
                label="Blogs"
                onClick={() => {
                  navigate("/blogs");
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
