import React from "react";
import { BlogType } from "../../../Components/types";
import { Card, Box, Typography } from "@mui/material";
import { parseAndFormatTimestamp } from "../../../utils/utils";
import { FcCalendar } from "react-icons/fc";

const colors = [
  "#FF9800",
  "#FF5722",
  "#607D8B",
  "#2196F3",
  "#9C27B0",
  "#4CAF50",
  "#E91E63",
  "#795548",
  "#3F51B5",
  "#009688",
  "#FFC107",
];

export function randomBgColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

type Props = {
  blog: BlogType;
};

const BlogItem = (props: Props) => {
  const timestampString = props.blog.date;
  const formattedDateTimeString = parseAndFormatTimestamp(timestampString);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "50vh",
        width: "500px",
        transition: "transform 1s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "10px 10px 25px #ccc",
        },
      }}
    >
      <Box
        sx={{
          fontFamily: "Work Sans",
          fontSize: "72px",
          height: "35%",
          padding: 1,
          bgcolor: randomBgColor(),
        }}
      >
        <Box>
          <Typography>
            <FcCalendar /> {new Date(Number(props.blog.date)).toDateString()}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontWeight: "500",
            m: 1,
            color: "#fff",
            transform: "uppercase",
            textDecoration: "underline",
            textUnderlineOffset: "5px",
            fontFamily: "Work Sans",
          }}
          variant="h4"
        >
          {props.blog.title}
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            fontSize: "20px",
            fontWeight: "500",
          }}
        ></Box>
        <Typography sx={{ padding: 2, fontSize: "20px", fontWeight: "500" }}>
          {props.blog.content}
        </Typography>
      </Box>
    </Card>
  );
};

export default BlogItem;
