import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup); // extend yup
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useRegisterUserMutation } from "../../api/apiSlice";
import { isApiError, isErrorWithMessage } from "../../api/helpers/errors";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [registerUser, { error }] = useRegisterUserMutation();

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
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("First name is required"),
            lastName: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Last name is required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string().password().required("Passowrd is required"),
          })}
          onSubmit={async (values, { resetForm }) => {
            try {
              // you need the unwrap() call to get any error which will go in the catch block
              await registerUser(values).unwrap();
              // if response is ok reset the form
              resetForm();
              navigate("/auth/login");
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
                Create account
              </Typography>
              <Form className="form">
                <Field name="firstName" as={TextField} label="First Name" />
                <ErrorMessage
                  component="span"
                  className="error-message"
                  name="firstName"
                />

                <Field name="lastName" as={TextField} label="Last Name" />
                <ErrorMessage
                  component="span"
                  className="error-message"
                  name="lastName"
                />

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

                {renderError(error)}

                <Button
                  variant="contained"
                  style={{ opacity: isSubmitting ? 0.5 : 1 }}
                  type="submit"
                >
                  Submit
                </Button>
                <Divider sx={{ color: "grey" }}>Already a customer?</Divider>
              </Form>
              <Button variant="outlined" fullWidth sx={{ marginTop: "1.5rem" }} onClick={() => navigate("/auth/login")}>
                Sign in
              </Button>
            </>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Register;
