import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useGetCartQuery,
  useAddCartItemMutation,
  useUpdateCartItemMutation,
} from "../../api/apiSlice";

const Product = () => {
  // Keep track of product quantity
  const [quantity, setQuantity] = useState("1");

  // Get the route /products/:productId parameter
  const { id } = useParams();
  const productId = id || "";

  // Get items currently in the cart
  const { data: cartItems } = useGetCartQuery();

  const navigate = useNavigate();

  // Get current product data
  const { data: product } = useGetProductByIdQuery(productId);

  // addCartItem api funtion
  // it takes a productData object - {productId: string, quantity: string}
  const [addCartItem] = useAddCartItemMutation();

  // updateCartItem api function
  // it takes a cartItem object as a parameter - {cartItemId: string, quantity: number}
  const [updateCartItem] = useUpdateCartItemMutation();

  const handleQuantityChange = (event: SelectChangeEvent) => {
    setQuantity(event.target.value);
  };

  const handleAddToBasket = () => {
    // Check if the same product is already in the cart
    const cartItem = cartItems?.find((product) => product.id === Number(id));
    if (cartItem) {
      // if so only update quantity
      const newQuantity = Number(quantity) + cartItem.quantity;
      updateCartItem({
        cartItemId: cartItem.cartItemId,
        quantity: newQuantity,
      });
    } else {
      // else add product to cart
      addCartItem({ productId, quantity });

      // and navigate to cart
      navigate("/cart");
    }
  };

  return (
    <Box padding={3} maxWidth="1500px" marginX="auto">
      <Box>
        <Link component={RouterLink} to="/products">
          ‹ Back to porducts
        </Link>
      </Box>
      <Grid container marginTop="0" spacing={3}>
        <Grid xs={12} md={4}>
          <Box
            component="img"
            sx={{
              maxWidth: "100%",
            }}
            alt="product image"
            src={product?.image}
          ></Box>
        </Grid>
        <Grid xs={12} md={4} lg={5}>
          <Box>
            <Typography variant="h4" component="h2" gutterBottom>
              {product?.name}
            </Typography>
            <Typography variant="body1">{product?.description}</Typography>
          </Box>
        </Grid>
        <Grid xs={12} md={4} lg={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 4,
              border: "1px solid gray",
              borderRadius: 2,
            }}
          >
            <Typography gutterBottom variant="h5">
              {product &&
                (product?.price / 100).toLocaleString("en-GB", {
                  style: "currency",
                  currency: "GBP",
                })}
            </Typography>
            <FormControl
              sx={{ my: 4, minWidth: 120, maxWidth: 120 }}
              size="small"
            >
              <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={quantity}
                label="Quantity"
                onChange={handleQuantityChange}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" onClick={handleAddToBasket}>
              Add to Basket
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Product;
