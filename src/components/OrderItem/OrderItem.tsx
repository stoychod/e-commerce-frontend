import { Link as RouterLink } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";

const OrderItem = ({
  productId,
  name,
  quantity,
  image,
  price,
}: {
  productId: number;
  name: string;
  quantity: number;
  image: string;
  price: number;
}) => {
  return (
    <Stack
      className="order-item-container"
      sx={{
        flexDirection: "row",
        paddingY: "1rem",
      }}
    >
      <Badge
        badgeContent={quantity > 1 ? quantity : 0}
        color="secondary"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        overlap="circular"
      >
        <Box component={RouterLink} to={`/products/${productId}`}>
          <Box
            component="img"
            sx={{
              width: { xs: 70, lg: 90 },
              height: { xs: 70, lg: 90 },
            }}
            alt="product image"
            src={image}
          />
        </Box>
      </Badge>
      <Stack
        sx={{
          paddingLeft: "1rem",
          flexGrow: 1,
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
        <Typography
          variant="body1"
          component="h3"
          flexGrow={1}
          sx={{
            textAlign: { md: "right" },
            marginLeft: "1rem",
          }}
        >
          {(price / 100).toLocaleString("en-GB", {
            style: "currency",
            currency: "GBP",
          })}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default OrderItem;
