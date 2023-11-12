import { BlogType } from "../../../Components/types";
import { Box } from "@mui/material";
import { parseAndFormatTimestamp } from "../../../utils";
import { FcCalendar } from "react-icons/fc";
import "./BlogItem.css";

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
    <>
      <div className="cards">
        <article className="information card">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              background: "#f1eeff",
              width: "fit-content",
              borderRadius: "6px",
              paddingLeft: "5px",
            }}
          >
            <FcCalendar />
            <span className="tag"> {formattedDateTimeString}</span>
          </Box>
          <h2 className="title"> {props.blog.title}</h2>
          <p className="info">{props.blog.content}</p>
          <Box
            sx={{
              display: "flex",
              gap: "7px",
              background: randomBgColor(),
              color: "#fff",
              width: "fit-content",
              padding: "3px 6px",
              borderRadius: "6px",
            }}
          >
            Posted By:
            <Box>{props.blog.user.name}</Box>
          </Box>
        </article>
      </div>
    </>
  );
};

export default BlogItem;
