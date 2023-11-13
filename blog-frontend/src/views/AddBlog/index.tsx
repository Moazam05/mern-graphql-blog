import { useState } from "react";
import { Form, Formik, FormikProps } from "formik";
import { addBlogSchema } from "./Components/validationSchema";
import { Button, Box } from "@mui/material";
import ToastAlert from "../../Components/ToastAlert/ToastAlert";
import { onKeyDown } from "../../utils";
import { SubHeading } from "../../Components/Heading";
import PrimaryInput from "../../Components/PrimaryInput/PrimaryInput";
import { useMutation } from "@apollo/client";
import { ADD_BLOG } from "./Components/graphql/addBlogMutation";
import { useNavigate } from "react-router-dom";
import useTypedSelector from "../../hooks/useTypedSelector";
import { selectedUserId } from "../../redux/auth/authSlice";
import { AiOutlineBulb } from "react-icons/ai";
import { GET_BLOGS } from "../Blog/graphql/blogQuery";

interface IsAddBlogForm {
  title: string;
  content: string;
}

const AddBlog = () => {
  const navigate = useNavigate();
  const userID = useTypedSelector(selectedUserId);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formValues, setFormValues] = useState<IsAddBlogForm>({
    title: "",
    content: "",
  });
  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  const [addBlog, { loading }] = useMutation(ADD_BLOG, {
    onError(error) {
      setToast({
        message: error.message,
        appearence: true,
        type: "error",
      });
    },
    refetchQueries: [{ query: GET_BLOGS }],
  });

  const addBlogHandler = async (data: IsAddBlogForm) => {
    try {
      const response = await addBlog({
        variables: {
          title: data.title,
          content: data.content,
          userId: userID,
        },
      });
      if (response.data) {
        setToast({
          message: "Blog added successfully",
          appearence: true,
          type: "success",
        });
        setTimeout(() => {
          navigate("/blogs");
        }, 1500);
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
            width: 400,
            padding: 2,
            background: "#fff",
            borderRadius: "6px",
          }}
        >
          <Formik
            initialValues={formValues}
            onSubmit={(values: IsAddBlogForm) => {
              addBlogHandler(values);
            }}
            validationSchema={addBlogSchema}
          >
            {(props: FormikProps<IsAddBlogForm>) => {
              const { values, touched, errors, handleBlur, handleChange } =
                props;

              return (
                <Form onKeyDown={onKeyDown}>
                  <Box sx={{ marginBottom: "10px" }}>
                    <SubHeading sx={{ marginBottom: "5px" }}>Title</SubHeading>
                    <PrimaryInput
                      type="text"
                      label=""
                      name="title"
                      placeholder="Title"
                      value={values.title}
                      helperText={
                        errors.title && touched.title ? errors.title : ""
                      }
                      error={errors.title && touched.title ? true : false}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Box>
                  <Box sx={{ marginBottom: "10px" }}>
                    <SubHeading sx={{ marginBottom: "5px" }}>
                      Content
                    </SubHeading>
                    <PrimaryInput
                      maxRows={10}
                      multiline={true}
                      type="text"
                      label=""
                      name="content"
                      placeholder="Content"
                      value={values.content}
                      helperText={
                        errors.content && touched.content ? errors.content : ""
                      }
                      error={errors.content && touched.content ? true : false}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      marginTop: "20px",
                    }}
                  >
                    {userID === undefined ? (
                      <Box
                        sx={{
                          background: "#dbe8e6",
                          padding: "12px 18px",
                          borderRadius: "6px",
                          border: "1px solid #2a9d8f",
                          fontSize: "13px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "10px",
                          width: "100%",
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
                        Please Login To Published Your Blog...!
                      </Box>
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{
                          padding: "5px 30px",
                          textTransform: "capitalize",
                          margin: "20px 0",
                        }}
                      >
                        {loading ? "Published Blog..." : "Published Blog"}
                      </Button>
                    )}
                  </Box>
                </Form>
              );
            }}
          </Formik>
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

export default AddBlog;
