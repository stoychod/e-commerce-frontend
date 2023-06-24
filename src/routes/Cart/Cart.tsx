import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
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
    <Box padding={3} maxWidth="1500px" marginX="auto">
      <Grid container marginTop="0" spacing={3}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 4,
            border: "1px solid gray",
            borderRadius: 2,
          }}
        >
          <Typography gutterBottom variant="h6">
            Subtotal ({cartItems?.length} items): £{subTotal}
          </Typography>
          <Button variant="contained">Proceed to ckeckout</Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default Cart;
