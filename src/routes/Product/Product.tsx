import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../api/apiSlice";
import { useState } from "react";
import { Button, Typography } from "@mui/material";

const Product = () => {
  const [quantity, setQuantity] = useState("1");

  const { id } = useParams();
  const productId = id || "";

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target);
    setQuantity(event.target.value);
  };

  const { data: product } = useGetProductByIdQuery(productId);

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
              £{product && product?.price / 100}
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
                onChange={handleChange}
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
            <Button variant="contained">Add to Basket</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Product;
