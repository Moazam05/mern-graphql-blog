import { useQuery } from "@apollo/client";
import { GET_BLOGS } from "./graphql/blogQuery";
import Spinner from "../../Components/Spinner";
import { Box } from "@mui/material";
import BlogList from "./components/BlogList";
import { Heading } from "../../Components/Heading";

const Blog = () => {
  const { data, loading, error } = useQuery(GET_BLOGS);

  if (loading)
    return (
      <Box sx={{ height: "50vh", marginTop: "25vh" }}>
        <Spinner />
      </Box>
    );
  if (error) return <div>Something Went Wrong...!</div>;

  return (
    <>
      <Box>
        {data?.blogs?.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "50px auto",
            }}
          >
            <Box
              sx={{
                borderRadius: "6px",
                padding: 2,
                background: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "300px",
              }}
            >
              <Heading>No Blogs added Yet!</Heading>
            </Box>
          </Box>
        ) : (
          <>
            <BlogList blogs={data.blogs} />
          </>
        )}
      </Box>
    </>
  );
};

export default Blog;
