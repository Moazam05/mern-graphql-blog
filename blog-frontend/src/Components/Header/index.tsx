import { useState } from "react";
import { Box, AppBar, Toolbar, Tabs, Tab, Button } from "@mui/material";
import { ImBlogger } from "react-icons/im";
import { BiLogInCircle } from "react-icons/bi";

const Header = () => {
  const [value, setValue] = useState(0);
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
              <Tab label="Home" />
              <Tab label="Blogs" />
            </Tabs>
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
            >
              Log In
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
