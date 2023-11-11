import { SxProps } from "@mui/material";

type Styles = {
  [key: string]: SxProps;
};

export const homePageStyles: Styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 6,
    gap: 10,
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  text: {
    fontSize: { lg: 50, md: 40, sm: 35, xs: 20 },
  },
  image: {
    boxShadow: "10px 10px 25px #000",
    borderRadius: 20,
  },
};
