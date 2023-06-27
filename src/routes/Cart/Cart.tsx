import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useGetCartQuery } from "../../api/apiSlice";
import CartItem from "../CartItem/CartItem";

const Cart = () => {
  // Get items currently in the cart
  const { data: cartItems } = useGetCartQuery();

  // Keep track of subtotal amount
  const [subTotal, setSubtotal] = useState(0);

  useEffect(() => {
    // calculate total price
    const total = cartItems?.reduce((total, item) => {
      return (total += (item.price * item.quantity) / 100);
    }, 0);

    setSubtotal(total || 0);
  }, [cartItems]);

  const renderCartItems = () => {
    if (cartItems && cartItems?.length > 0) {
      const items = cartItems?.map((cartItem) => {
        return <CartItem key={cartItem.cartItemId} cartItem={cartItem} />;
      });
      return items;
    }

    return (
      <Typography
        variant="h5"
        align="center"
        component="h3"
        sx={{
          borderBottom: "1px solid gray",
          paddingY: "6rem",
        }}
      >
        Your basket is empty
      </Typography>
    );
  };

  return (
    <Box sx={{ backgroundColor: "#eaeaed", width: "100%" }}>
      <Box padding={3} maxWidth="xl" marginX="auto">
        <Stack
          padding="1rem"
          sx={{
            flexDirection: { md: "row" },
            alignItems: { md: "flex-start" },
          }}
        >
          <Paper sx={{ flexGrow: 1, paddingX: 2 }}>
            <Typography variant="h4" component="h1" paddingTop="1rem">
              Shopping basket
            </Typography>
            <Typography
              variant="h6"
              component="h3"
              fontWeight={400}
              lineHeight={1.2}
              align="right"
              borderBottom="1px solid gray"
              sx={{
                display: {xs: "none", md: "block"}
              }}
            >
              price
            </Typography>
            {renderCartItems()}
            <Typography
              component="div"
              gutterBottom
              variant="h6"
              align="right"
              marginBottom="3rem"
            >
              Subtotal ({cartItems?.length}{" "}
              {cartItems?.length === 1 ? "item" : "items"}):{" "}
              <Box fontWeight="bold" display="inline">
                {subTotal.toLocaleString("en-GB", {
                  style: "currency",
                  currency: "GBP",
                })}
              </Box>
            </Typography>
          </Paper>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "2rem",
              marginTop: { xs: "1.5rem", md: 0 },
              marginLeft: { md: "0.75rem", lg: "1.5rem" },
            }}
          >
            <Typography component="div" gutterBottom variant="h6">
              Subtotal ({cartItems?.length}{" "}
              {cartItems?.length === 1 ? "item" : "items"}):{" "}
              <Box fontWeight="bold" display="inline">
                {subTotal.toLocaleString("en-GB", {
                  style: "currency",
                  currency: "GBP",
                })}
              </Box>
            </Typography>
            <Button sx={{ marginTop: "2rem" }} variant="contained">
              Proceed to ckeckout
            </Button>
            <Button
              sx={{ marginTop: "2rem" }}
              variant="contained"
              color="secondary"
              href="/products"
            >
              {" "}
              Continue shopping
            </Button>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
};

export default Cart;
