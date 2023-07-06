import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Completion = () => {
  return (
    <Box sx={{ marginX: "auto", marginTop: "5rem" }}>
      <Typography variant="h4" component="h1" sx={{
        fontSize: {xs: "2rem", sm: "3rem"}
      }}>
        Thank you for shopping
      </Typography>
      <Link
        variant="h6"
        underline="none"
        component={RouterLink}
        to={"/orders"}
        sx={{
          display: "block",
          textAlign: "center",
        }}
      >
        {"Review your recent orders"}
      </Link>
    </Box>
  );
};

export default Completion;
