import { Box, Button } from "@mui/material";
import { Heading } from "../../../Components/Heading";
import { useQuery } from "@apollo/client";
import { GET_BLOG } from "./graphql/addBlogQuery";
import Spinner from "../../../Components/Spinner";
import { useParams } from "react-router-dom";
import { onKeyDown, parseAndFormatTimestamp } from "../../../utils";
import { FaRegComments } from "react-icons/fa6";
import PrimaryInput from "../../../Components/PrimaryInput/PrimaryInput";
import { Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineEditCalendar } from "react-icons/md";

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formValues, setFormValues] = useState<ISAddCommentForm>({
    text: "",
  });

  const { data, loading, error } = useQuery(GET_BLOG, {
    variables: {
      id,
    },
  });

  if (loading)
    return (
      <Box sx={{ height: "50vh", marginTop: "25vh" }}>
        <Spinner />
      </Box>
    );
  if (error) return <div>Something Went Wrong...!</div>;

  console.log("data", data);

  const AddCommentHandler = async (data: ISAddCommentForm) => {
    console.log("payload", data);
  };

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
              onSubmit={(values: ISAddCommentForm) => {
                AddCommentHandler(values);
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
                          // disabled={loading}
                          sx={{
                            padding: "5px 30px",
                            textTransform: "capitalize",
                            margin: "20px 0",
                            width: "200px",
                          }}
                        >
                          Add Comment
                        </Button>
                      </Box>
                    </Box>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UpdateBlog;
