import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup); // extend yup
import "./Register.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const RegisterForm = () => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
            setTimeout(() => {
              console.log(values);
              resetForm();
            }, 4000);
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
                <ErrorMessage name="firstName" />

                <Field name="lastName" as={TextField} label="Last Name" />
                <ErrorMessage name="lastName" />

                <Field
                  name="email"
                  placeholder="Email"
                  as={TextField}
                  label="Email"
                />
                <ErrorMessage name="email" />

                <Field
                  name="password"
                  type="password"
                  as={TextField}
                  label="Passowrd"
                />
                <ErrorMessage name="password" />

                <Button
                  variant="contained"
                  style={{ opacity: isSubmitting ? 0.5 : 1 }}
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default RegisterForm;
