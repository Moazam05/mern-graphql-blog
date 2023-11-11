import { BlogType } from "../../../Components/types";
import { Box } from "@mui/material";
import BlogItem from "./BlogItem";

type Props = {
  blogs: BlogType[];
};

const BlogList = (props: Props) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          mt: 1,
          mb: 1,
        }}
      >
        {props.blogs.map((blog: BlogType) => (
          <BlogItem blog={blog} key={blog.id} />
        ))}
      </Box>
    </>
  );
};

export default BlogList;
