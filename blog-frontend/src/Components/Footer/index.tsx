import { Box, Button, Typography } from "@mui/material";
import useTypedSelector from "../../hooks/useTypedSelector";
import { userPath } from "../../redux/auth/authSlice";

const Footer = () => {
  const userLocation = useTypedSelector(userPath);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "20vh",
          gap: 20,
          bgcolor: "#404040",
          // position: userLocation === "/blogs" ? "fixed" : "unset",
          // width: userLocation === "/blogs" ? "100%" : "unset",
          // bottom: userLocation === "/blogs" ? 0 : "unset",
        }}
      >
        <Button variant="contained" sx={{ borderRadius: 10, width: 200 }}>
          View Articles
        </Button>
        <Typography
          sx={{
            fontFamily: "Work Sans",
            fontWeight: "500",
            fontSize: 20,
            color: "#fff",
          }}
        >
          Made With &#x1F498; By Muazam
        </Typography>
        <Button variant="contained" sx={{ borderRadius: 10, width: 200 }}>
          Published One
        </Button>
      </Box>
    </>
  );
};

export default Footer;
