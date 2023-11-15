// MUI Imports
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  size?: number;
}

const Spinner = (props: Props) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress size={props.size} />
    </Box>
  );
};

export default Spinner;
