import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} from "../../api/apiSlice";

const CartItem = ({ cartItem }: { cartItem: CartItem }) => {
  const { cartItemId, quantity, id: productId, name, price, image } = cartItem;

  // Keep track of product quantity
  const [currentQuantity, setCurrentQuantity] = useState(String(quantity));

  // updateCartItem api function
  // it takes a cartItem object as a parameter - {cartItemId: string, quantity: number}
  const [updateCartItem] = useUpdateCartItemMutation();

  // deleteCartItem api function
  // it takes single parameter - cartItemId: string
  const [deleteCartItem] = useDeleteCartItemMutation();

  // Update cartItem whenever current quantity changes
  useEffect(() => {
    updateCartItem({
      cartItemId: cartItemId,
      quantity: Number(currentQuantity),
    });
  }, [currentQuantity]);

  const handleQuantityChange = (event: SelectChangeEvent) => {
    setCurrentQuantity(event.target.value);
  };

  return (
    <Stack
      sx={{
        flexDirection: "row",
        paddingY: 2,
        paddingLeft: 2,
        borderBottom: "1px solid gray",
      }}
    >
      <Box component={RouterLink} to={`/products/${productId}`}>
        <Box
          component="img"
          sx={{
            width: 180,
            height: 180,
          }}
          alt="product image"
          src={image}
        />
      </Box>
      <Stack
        sx={{
          paddingX: 2,
        }}
      >
        <Link
          variant="h6"
          color="inherit"
          underline="none"
          component={RouterLink}
          to={`/products/${productId}`}
        >
          {name}
        </Link>
        <FormControl sx={{ my: 4, minWidth: 120, maxWidth: 120 }} size="small">
          <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentQuantity}
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
        <Button
          variant="contained"
          sx={{ my: 4, minWidth: 120, maxWidth: 120, mt: 0 }}
          onClick={() => deleteCartItem(cartItemId)}
        >
          Delete
        </Button>
      </Stack>
      <Typography
        variant="h6"
        fontWeight={700}
        component="h3"
        align="right"
        flexGrow={1}
      >
        {(price / 100).toLocaleString("en-GB", {
          style: "currency",
          currency: "GBP",
        })}
      </Typography>
    </Stack>
  );
};

export default CartItem;
