import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useGetCartQuery } from "../../api/apiSlice";

const Cart = () => {
  // Get items currently in the cart
  const { data: cartItems } = useGetCartQuery();
  const [subTotal, setSubtotal] = useState(0);

  useEffect(() => {
    // calculate total price
    const total = cartItems?.reduce((total, item) => {
      return (total += (item.price * item.quantity) / 100);
    }, 0);

    setSubtotal(total || 0);
  }, [cartItems]);
  return (
    <Box sx={{ backgroundColor: "#eaeaed", width: "100%" }}>
      <Box padding={3} maxWidth="xl" marginX="auto">
        <Stack direction="row" spacing={3} padding={2}>
          <Paper sx={{ flexGrow: 1, paddingX: 2 }}>
            <Typography variant="h4" component="h1" paddingTop={2}>
              Shopping basket
            </Typography>
            <Typography
              variant="h6"
              component="h3"
              fontWeight={400}
              lineHeight={1.2}
              align="right"
              borderBottom="1px solid gray"
            >
              price
            </Typography>
          </Paper>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 4,
            }}
          >
            <Typography component="div" gutterBottom variant="h6">
              Subtotal ({cartItems?.length} items):{" "}
              <Box fontWeight="bold" display="inline">
                £{subTotal}
              </Box>
            </Typography>
            <Button sx={{ marginTop: 4 }} variant="contained">
              Proceed to ckeckout
            </Button>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
};

export default Cart;
