// MUI Imports
import { Box, Button, Typography } from "@mui/material";

const Footer = () => {
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
