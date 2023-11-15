import { useState } from "react";
import { Form, Formik, FormikProps } from "formik";
import { loginSchema } from "./components/validationSchema";
import { Button, ToggleButton, ToggleButtonGroup, Box } from "@mui/material";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { onKeyDown } from "../../utils";
import PrimaryInput from "../../Components/PrimaryInput/PrimaryInput";
import { SubHeading } from "../../Components/Heading";
import ToastAlert from "../../Components/ToastAlert/ToastAlert";
import { CiLock } from "react-icons/ci";
import Signup from "../Signup";
import { LOGIN_USER } from "./graphql/loginMutation";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/auth/authSlice";

interface ISLoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [selectedForm, setSelectedForm] = useState("login");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formValues, setFormValues] = useState<ISLoginForm>({
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

  const handleFormToggle = (event: any, newForm: any) => {
    if (newForm !== null) {
      setSelectedForm(newForm);
    }
  };

  const [login, { loading }] = useMutation(LOGIN_USER, {
    onError(error) {
      setToast({
        message: error.message,
        appearence: true,
        type: "error",
      });
    },
  });

  const LoginHandler = async (data: ISLoginForm) => {
    try {
      const response = await login({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
      if (response.data) {
        setToast({
          message: "User logged in successfully",
          appearence: true,
          type: "success",
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
        dispatch(setUser(response.data));
        localStorage.setItem("user", JSON.stringify(response.data));
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
    <div>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Box
              sx={{
                background: "#f50057",
                color: "#fff",
                fontSize: "30px",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CiLock />
            </Box>
          </Box>
          <Box sx={{ margin: "30px 0" }}>
            <ToggleButtonGroup
              value={selectedForm}
              exclusive
              onChange={handleFormToggle}
              aria-label="login-signup-toggle"
              sx={{ width: "100%" }}
            >
              <ToggleButton
                value="login"
                aria-label="login"
                sx={{
                  width: "50%",
                  textTransform: "Capitalize",
                  "&.Mui-selected": {
                    backgroundColor: "#f50057",
                    color: "#fff",
                  },
                }}
              >
                Login
              </ToggleButton>
              <ToggleButton
                value="signup"
                aria-label="signup"
                sx={{
                  width: "50%",
                  textTransform: "Capitalize",
                  "&.Mui-selected": {
                    backgroundColor: "#f50057",
                    color: "#fff",
                  },
                }}
              >
                Signup
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {selectedForm === "login" && (
            <>
              <Formik
                initialValues={formValues}
                onSubmit={(values: ISLoginForm) => {
                  LoginHandler(values);
                }}
                validationSchema={loginSchema}
              >
                {(props: FormikProps<ISLoginForm>) => {
                  const { values, touched, errors, handleBlur, handleChange } =
                    props;

                  return (
                    <Form onKeyDown={onKeyDown}>
                      <Box sx={{ marginBottom: "10px", marginTop: "20px" }}>
                        <SubHeading sx={{ marginBottom: "5px" }}>
                          Email
                        </SubHeading>
                        <PrimaryInput
                          type="text"
                          label=""
                          name="email"
                          placeholder="Email"
                          value={values.email}
                          helperText={
                            errors.email && touched.email ? errors.email : ""
                          }
                          error={errors.email && touched.email ? true : false}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Box>
                      <Box sx={{ marginBottom: "10px" }}>
                        <SubHeading sx={{ marginBottom: "5px" }}>
                          Password
                        </SubHeading>
                        <PrimaryInput
                          type={showPassword ? "text" : "password"}
                          label=""
                          name="password"
                          placeholder="Password"
                          value={values.password}
                          helperText={
                            errors.password && touched.password
                              ? errors.password
                              : ""
                          }
                          error={
                            errors.password && touched.password ? true : false
                          }
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
                          disabled={loading}
                          sx={{
                            padding: "5px 30px",
                            textTransform: "capitalize",
                            margin: "20px 0",
                          }}
                        >
                          {loading ? "Login..." : "Login"}
                        </Button>
                      </Box>
                    </Form>
                  );
                }}
              </Formik>
            </>
          )}
          {selectedForm === "signup" && (
            <>
              <Signup setSelectedForm={setSelectedForm} />
            </>
          )}
        </Box>
      </Box>
      <ToastAlert
        appearence={toast.appearence}
        type={toast.type}
        message={toast.message}
        handleClose={handleCloseToast}
      />
    </div>
  );
};

export default Login;
