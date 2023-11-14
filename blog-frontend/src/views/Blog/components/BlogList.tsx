import { BlogType } from "../../../Components/types";
import { Box } from "@mui/material";
import { FcCalendar } from "react-icons/fc";
import { Grid } from "@mui/material";
import { parseAndFormatTimestamp } from "../../../utils";
import { Heading } from "../../../Components/Heading";
import { RxUpdate } from "react-icons/rx";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type Props = {
  blogs: BlogType[];
};

const iconStyle = {
  background: "#f0f0f0",
  width: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 1,
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};

const BlogList = (props: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <Grid container spacing={3}>
        {props.blogs.map((post) => (
          <Grid
            item
            xs={12}
            sm={6}
            key={post.id}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "500px",
                margin: "35px 0",
                background: "#fff",
                padding: "14px 18px",
                borderRadius: "6px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  background: "rgba(102, 90, 211, 0.75)",
                  color: "#fff",
                  width: "fit-content",
                  margin: "5px 0",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                <FcCalendar style={{ fontSize: "18px" }} />
                <Box>{parseAndFormatTimestamp(post.date)}</Box>
              </Box>
              <Box sx={{ margin: "15px 0" }}>
                <Heading>{post.title}</Heading>
              </Box>
              <Box sx={{ margin: "15px 0" }}>
                <Box sx={{ color: "#a0a0a0" }}>{post.content}</Box>
              </Box>

              <Box sx={{ margin: "30px 0 10px 0" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Box
                    sx={iconStyle}
                    onClick={() => {
                      navigate(`/blogs/${post.id}`);
                    }}
                  >
                    <RxUpdate /> <Box>Update</Box>
                  </Box>
                  <Box sx={iconStyle}>
                    <MdDeleteOutline /> <Box>Delete</Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default BlogList;
