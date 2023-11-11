import { SxProps } from "@mui/material";

type Styles = {
  [key: string]: SxProps;
};

export const homePageStyles: Styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    padding: 6,
  },
  text: {
    fontFamily: "Work Sans",
    fontSize: { lg: 50, md: 40, sm: 35, xs: 20 },
    textShadow: "12px 10px 10px #ccc",
  },
  image: {
    boxShadow: "10px 5px 25px #000",
    borderRadius: 20,
  },
};
