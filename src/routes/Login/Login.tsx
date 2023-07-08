import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useLoginUserMutation,
  useCreateCartMutation,
} from "../../api/apiSlice";
import { isApiError, isErrorWithMessage } from "../../api/helpers/errors";

const Login = () => {
  const [loginUser, { error: loginError }] = useLoginUserMutation();

  const [createCart] = useCreateCartMutation();
  const navigate = useNavigate();
  // if the user was redirected to the login page because authentication
  // was required, get the location they came from so they can be redirected
  // back to the desired location after successful authentication
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const renderError = (err: unknown) => {
    if (isApiError(err)) {
      // you can access all properties of `FetchBaseQueryError` here
      return <span className="error-message"> {err.data.message} </span>;
    } else if (isErrorWithMessage(err)) {
      // you can access a string 'message' property here
      <span className="error-message"> {err.message} </span>;
    }
  };

  return (
    <Box marginTop={10} marginX="auto">
      <Box
        sx={{
          padding: "4rem 2rem",
          border: "1px solid grey",
          borderRadius: "4px",
        }}
      >
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string()
              .password()
              // disable password requirements
              .min(0)
              .minLowercase(0)
              .minUppercase(0)
              .minNumbers(0)
              .minSymbols(0)
              .required("Passowrd is required"),
          })}
          onSubmit={async (values, { resetForm }) => {
            try {
              // you need the unwrap() call to get any error which will go in the catch block
              await loginUser(values).unwrap();

              // create a user cart if does not exist on login. The server checks if a cart
              // exist for tha currently logged user and creates one if not
              await createCart().unwrap();

              // if response is ok reset the form
              resetForm();
              navigate(from, { replace: true });
            } catch (error) {
              console.error("Error:", error);
            }
          }}
        >
          {({ isSubmitting }) => (
            <>
              <Typography
                variant="h5"
                style={{ fontWeight: "500", marginBottom: "24px" }}
                component="h1"
              >
                Sign in
              </Typography>
              <Form className="form">
                <Field
                  name="email"
                  placeholder="Email"
                  as={TextField}
                  label="Email"
                />
                <ErrorMessage
                  component="span"
                  className="error-message"
                  name="email"
                />

                <Field
                  name="password"
                  type="password"
                  as={TextField}
                  label="Passowrd"
                />
                <ErrorMessage
                  component="span"
                  className="error-message"
                  name="password"
                />

                {renderError(loginError)}

                <Button
                  variant="contained"
                  style={{ opacity: isSubmitting ? 0.5 : 1 }}
                  type="submit"
                >
                  Submit
                </Button>
                <Divider sx={{ color: "grey" }}>New to Eshop?</Divider>
              </Form>
              <Button
                variant="outlined"
                fullWidth
                sx={{ marginTop: "1.5rem" }}
                onClick={() => navigate("/auth/register")}
              >
                Create an account
              </Button>
            </>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
