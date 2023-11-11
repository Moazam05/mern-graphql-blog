import { useQuery } from "@apollo/client";
import { GET_BLOGS } from "./graphql/blogQuery";
import Spinner from "../../Components/Spinner";
import { Box } from "@mui/material";
import BlogList from "./components/BlogList";

const Blog = () => {
  const { data, loading, error } = useQuery(GET_BLOGS);

  if (loading) return <Spinner />;
  if (error) return <div>Something Went Wrong...!</div>;

  return (
    <>
      <Box>
        <BlogList blogs={data.blogs} />
      </Box>
    </>
  );
};

export default Blog;
