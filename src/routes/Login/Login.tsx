import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Login = () => {
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
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string().password().required("Passowrd is required"),
          })}
          onSubmit={async (values, { resetForm }) => {
            try {
              
              // if response is ok reset the form
              // const response = await registerUser(values);
              resetForm();

              // console.dir(response);
            } catch (error) {
              if (error instanceof Error) {
                // if there is an error set state so it can be displayed to the user
                // setResponseError(error.message);
                console.log(error.message);
              }
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
                Log in
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

                {/* {responseError && ( */}
                {/*   <span className="error-message"> {responseError} </span> */}
                {/* )} */}

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

export default Login;
