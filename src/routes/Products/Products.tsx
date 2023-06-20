import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useGetProductsQuery } from "../../api/apiSlice";
import ProductCard from "../../components/ProductCard/ProductCard";

const Products = () => {
  const { data: products } = useGetProductsQuery();
  return (
    <Container sx={{padding: 2}}>
      <Grid container spacing={2}>
        {products?.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </Grid>
    </Container>
  );
};

export default Products;
