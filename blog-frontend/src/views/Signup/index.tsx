import { useState } from "react";
import { Form, Formik, FormikProps } from "formik";
import { Button, Box } from "@mui/material";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { onKeyDown } from "../../utils";
import PrimaryInput from "../../Components/PrimaryInput/PrimaryInput";
import ToastAlert from "../../Components/ToastAlert/ToastAlert";
import { SubHeading } from "../../Components/Heading";
import { signupSchema } from "./Components/validationSchema";

interface ISSignupForm {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formValues, setFormValues] = useState<ISSignupForm>({
    name: "",
    email: "",
    password: "",
  });
  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const hideShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  const signupHandler = async (data: ISSignupForm) => {
    console.log("payload", data);
  };

  return (
    <>
      <Formik
        initialValues={formValues}
        onSubmit={(values: ISSignupForm) => {
          signupHandler(values);
        }}
        validationSchema={signupSchema}
      >
        {(props: FormikProps<ISSignupForm>) => {
          const { values, touched, errors, handleBlur, handleChange } = props;

          return (
            <Form onKeyDown={onKeyDown}>
              <Box sx={{ marginBottom: "10px", marginTop: "20px" }}>
                <SubHeading sx={{ marginBottom: "5px" }}>Name</SubHeading>
                <PrimaryInput
                  type="text"
                  label=""
                  name="name"
                  placeholder="Name"
                  value={values.name}
                  helperText={errors.name && touched.name ? errors.name : ""}
                  error={errors.name && touched.name ? true : false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Box>
              <Box sx={{ marginBottom: "10px" }}>
                <SubHeading sx={{ marginBottom: "5px" }}>Email</SubHeading>
                <PrimaryInput
                  type="text"
                  label=""
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  helperText={errors.email && touched.email ? errors.email : ""}
                  error={errors.email && touched.email ? true : false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Box>
              <Box sx={{ marginBottom: "10px" }}>
                <SubHeading sx={{ marginBottom: "5px" }}>Password</SubHeading>
                <PrimaryInput
                  type={showPassword ? "text" : "password"}
                  label=""
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  helperText={
                    errors.password && touched.password ? errors.password : ""
                  }
                  error={errors.password && touched.password ? true : false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onClick={hideShowPassword}
                  endAdornment={
                    showPassword ? (
                      <AiOutlineEye color="disabled" />
                    ) : (
                      <AiOutlineEyeInvisible color="disabled" />
                    )
                  }
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  marginTop: "20px",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  // disabled={loadingLoginUser}
                  sx={{
                    padding: "5px 30px",
                    textTransform: "capitalize",
                    margin: "20px 0",
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
      <ToastAlert
        appearence={toast.appearence}
        type={toast.type}
        message={toast.message}
        handleClose={handleCloseToast}
      />
    </>
  );
};

export default Signup;
