import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        "& .text-danger": {
          color: "red", // Customize the color as needed
        },
        "& h1": {
          fontSize: "3rem", // Customize the font size as needed
        },
        "& .lead": {
          fontSize: "1.5rem", // Customize the font size as needed
        },
      }}
    >
      <FaExclamationTriangle className="text-danger" size="5em" />
      <h1>404</h1>
      <p className="lead">Sorry, this page does not exist</p>

      <Button
        onClick={() => {
          navigate("/");
        }}
        variant="outlined"
        sx={{ borderRadius: 10, width: 200, marginBottom: 15 }}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default NotFoundPage;
