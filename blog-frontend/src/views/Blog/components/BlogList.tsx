import { BlogType } from "../../../Components/types";
import { Box, Button } from "@mui/material";
import { FcCalendar } from "react-icons/fc";
import { Grid } from "@mui/material";
import { parseAndFormatTimestamp } from "../../../utils";
import { Heading } from "../../../Components/Heading";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import useTypedSelector from "../../../hooks/useTypedSelector";
import { selectedUserId } from "../../../redux/auth/authSlice";
import { useMutation } from "@apollo/client";
import { DELETE_BLOG } from "../../AddBlog/Components/graphql/addBlogMutation";
import { useState } from "react";
import { GET_BLOGS } from "../graphql/blogQuery";
import ToastAlert from "../../../Components/ToastAlert/ToastAlert";

type Props = {
  blogs: BlogType[];
};

const BlogList = (props: Props) => {
  const navigate = useNavigate();
  const userId = useTypedSelector(selectedUserId);
  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  // mutation of delete blog
  const [deleteBlog, { loading }] = useMutation(DELETE_BLOG, {
    onError(error) {
      setToast({
        message: error.message,
        appearence: true,
        type: "error",
      });
    },
    refetchQueries: [{ query: GET_BLOGS }],
  });

  const deleteBlogHandler = async (id: string) => {
    try {
      const response = await deleteBlog({
        variables: {
          id,
        },
      });
      if (response.data) {
        setToast({
          message: "Blog deleted successfully",
          appearence: true,
          type: "success",
        });
      }
    } catch (error) {
      setToast({
        message: "Something went wrong.",
        appearence: true,
        type: "error",
      });
    }
  };

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

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  margin: "25px 0 0 0",
                  width: "fit-content",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontWeight: 500,
                }}
              >
                <Box
                  sx={{
                    minWidth: "50px",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <IoPersonOutline /> <Box>Author</Box>
                </Box>
                <Box>{post.user.name}</Box>
              </Box>

              <Box sx={{ margin: "20px 0 10px 0" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Button
                    onClick={() => {
                      navigate(`/blogs/${post.id}`);
                    }}
                    fullWidth
                    variant="outlined"
                    startIcon={<MdOutlineFeaturedPlayList />}
                    sx={{ textTransform: "capitalize" }}
                  >
                    Learn More
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<MdDeleteOutline />}
                    sx={{ textTransform: "capitalize" }}
                    disabled={userId !== post.user.id || loading}
                    onClick={() => {
                      deleteBlogHandler(post.id);
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <ToastAlert
        appearence={toast.appearence}
        type={toast.type}
        message={toast.message}
        handleClose={handleCloseToast}
      />
    </>
  );
};

export default BlogList;
