import { Box, Button, Divider, Tooltip } from "@mui/material";
import { Heading } from "../../../Components/Heading";
import { useMutation, useQuery } from "@apollo/client";
import { GET_BLOG } from "./graphql/addBlogQuery";
import Spinner from "../../../Components/Spinner";
import { useParams } from "react-router-dom";
import {
  getInitials,
  onKeyDown,
  parseAndFormatTimestamp,
} from "../../../utils";
import { FaRegComments } from "react-icons/fa6";
import PrimaryInput from "../../../Components/PrimaryInput/PrimaryInput";
import { Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineEditCalendar } from "react-icons/md";
import {
  ADD_COMMENT_TO_BLOG,
  DELETE_COMMENT_TO_BLOG,
} from "./graphql/addBlogMutation";
import ToastAlert from "../../../Components/ToastAlert/ToastAlert";
import { GET_BLOGS } from "../../Blog/graphql/blogQuery";
import { selectedUserId } from "../../../redux/auth/authSlice";
import useTypedSelector from "../../../hooks/useTypedSelector";
import { AiOutlineBulb } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

interface ISAddCommentForm {
  text: string;
}

const commentSchema = Yup.object().shape({
  text: Yup.string()
    .required("Comment is required")
    .min(10, "Comment must be at least 10 characters long")
    .nullable(),
});

const UpdateBlog = () => {
  const { id } = useParams();
  const clientId = useTypedSelector(selectedUserId);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formValues, setFormValues] = useState<ISAddCommentForm>({
    text: "",
  });
  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  const { data, loading, error } = useQuery(GET_BLOG, {
    variables: {
      id,
    },
  });

  // Add Comment API Bind
  const [addCommentToBlog, { loading: commentLoading }] = useMutation(
    ADD_COMMENT_TO_BLOG,
    {
      onError(error) {
        setToast({
          message: error.message,
          appearence: true,
          type: "error",
        });
      },
      refetchQueries: [{ query: GET_BLOGS }],
    }
  );

  const AddCommentHandler = async (
    formData: ISAddCommentForm,
    resetForm: any
  ) => {
    try {
      const response = await addCommentToBlog({
        variables: {
          text: formData.text,
          date: String(Date.now()),
          blogId: id,
          userId: clientId,
        },
      });
      if (response.data) {
        setToast({
          message: "Comment added successfully",
          appearence: true,
          type: "success",
        });
        resetForm();
      }
    } catch (error) {
      setToast({
        message: "Something went wrong.",
        appearence: true,
        type: "error",
      });
    }
  };

  // Delete Comment API Bind
  const [deleteComment, { loading: deleteCommentLoading }] = useMutation(
    DELETE_COMMENT_TO_BLOG,
    {
      onError(error) {
        setToast({
          message: error.message,
          appearence: true,
          type: "error",
        });
      },
      refetchQueries: [{ query: GET_BLOG }],
    }
  );

  const deleteCommentHandler = async (id: string) => {
    try {
      const response = await deleteComment({
        variables: {
          id,
        },
      });
      if (response.data) {
        setToast({
          message: "Comment deleted successfully",
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

  if (loading)
    return (
      <Box sx={{ height: "50vh", marginTop: "25vh" }}>
        <Spinner />
      </Box>
    );
  if (error) return <div>Something Went Wrong...!</div>;

  console.log("data", data?.blog?.user?.id);
  console.log("clientid", clientId);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "25px 0",
        }}
      >
        <Box
          sx={{
            width: 900,
            padding: "24px 32px",
            background: "#fff",
            borderRadius: "6px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              marginBottom: "10px",
            }}
          >
            <Box
              sx={{
                minWidth: "100px",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <IoPersonOutline /> <Box>Author</Box>
            </Box>
            <Box sx={{ fontWeight: 400 }}>{data?.blog?.user?.name}</Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              margin: "15px 0 0 0",
            }}
          >
            <Box
              sx={{
                minWidth: "100px",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <MdOutlineEmail /> <Box>Email</Box>
            </Box>
            <Box sx={{ fontWeight: 400 }}>{data?.blog?.user?.email}</Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              margin: "15px 0 0 0",
            }}
          >
            <Box
              sx={{
                minWidth: "100px",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <MdOutlineEditCalendar /> <Box>Date</Box>
            </Box>
            <Box sx={{ fontWeight: 400 }}>
              {parseAndFormatTimestamp(data?.blog?.date)}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "30px 0 0 0",
            }}
          >
            <Heading>{data.blog.title}</Heading>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "30px 0 0 0",
            }}
          >
            <Box sx={{ color: "#a0a0a0" }}>{data.blog.content}</Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              margin: "30px 0 0 0",
              gap: 1,
            }}
          >
            <Box sx={{ fontWeight: 700 }}>Comments</Box>
            <FaRegComments style={{ fontSize: "20px" }} />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              marginBottom: "20px",
            }}
          >
            <Formik
              initialValues={formValues}
              onSubmit={(values: ISAddCommentForm, { resetForm }) => {
                AddCommentHandler(values, resetForm);
              }}
              validationSchema={commentSchema}
            >
              {(props: FormikProps<ISAddCommentForm>) => {
                const { values, touched, errors, handleBlur, handleChange } =
                  props;

                return (
                  <Form onKeyDown={onKeyDown} style={{ width: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Box sx={{ height: "50px", width: "100%" }}>
                        <PrimaryInput
                          type="text"
                          label=""
                          name="text"
                          placeholder="Comment"
                          fullWidth
                          value={values.text}
                          helperText={
                            errors.text && touched.text ? errors.text : ""
                          }
                          error={errors.text && touched.text ? true : false}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Box>
                      <Box sx={{ height: "70px" }}>
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={commentLoading || clientId === undefined}
                          sx={{
                            padding: "5px 30px",
                            textTransform: "capitalize",
                            margin: "20px 0",
                            width: "200px",
                          }}
                        >
                          {commentLoading ? "Adding Comment..." : "Add Comment"}
                        </Button>
                      </Box>
                    </Box>
                  </Form>
                );
              }}
            </Formik>
          </Box>
          {clientId === undefined && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  background: "#dbe8e6",
                  padding: "12px 18px",
                  borderRadius: "6px",
                  border: "1px solid #2a9d8f",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ marginTop: "5px", marginRight: "3px" }}>
                  <AiOutlineBulb
                    style={{
                      color: "#2a9d8f",
                      fontSize: "15px",
                    }}
                  />
                </span>
                Please Login To Post Your Comment...!
              </Box>
            </Box>
          )}
          {data?.blog?.comments?.length > 0 &&
            data?.blog?.comments?.map((comment: any, id: number) => (
              <Box key={id}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "20px 0 0 0",
                    gap: 1,
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Tooltip title={`${comment?.user?.name}`} placement="top">
                      <Box
                        sx={{
                          fontWeight: 700,
                          minWidth: "50px",
                        }}
                      >
                        {getInitials(comment?.user?.name)}
                      </Box>
                    </Tooltip>

                    <Box>{comment?.text}</Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        minWidth: "50px",
                        fontSize: "12px",
                        color: "#a0a0a0",
                        fontWeight: 500,
                      }}
                    >
                      {parseAndFormatTimestamp(comment.date)}
                    </Box>
                    <Box
                      sx={{
                        display:
                          clientId === comment?.user?.id ? "block" : "none",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        deleteCommentHandler(comment.id);
                      }}
                    >
                      <MdDeleteOutline
                        style={{ color: "#d32f2f", fontSize: "18px" }}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    marginTop: "15px",
                  }}
                ></Box>
                <Divider />
              </Box>
            ))}
        </Box>
      </Box>
      <ToastAlert
        appearence={toast.appearence}
        type={toast.type}
        message={toast.message}
        handleClose={handleCloseToast}
      />
    </>
  );
};

export default UpdateBlog;
