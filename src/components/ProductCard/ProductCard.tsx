import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";

const ProductCard = ({ product }: { product: Product }) => {
  const { name, description, price, image } = product;
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardActionArea>
          <CardMedia component="img" height="260" image={image} alt={name} />
          <CardContent sx={{ height: 220 }}>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
              }}
              variant="body2"
              color="text.secondary"
            >
              {description}
            </Typography>
            <Typography variant="h5" align="center">£{price / 100}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ProductCard;
