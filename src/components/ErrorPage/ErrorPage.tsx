import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ErrorPage = () => {
  return (
    <Stack sx={{ marginX: "auto", justifyContent: "center" }}>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        sx={{
          fontSize: { xs: "2rem", sm: "3rem" },
        }}
      >
        Oops!
      </Typography>
      <Typography variant="subtitle1" component="p">
        Sorry, an unexpected error has occurred.
      </Typography>
    </Stack>
  );
};

export default ErrorPage;
