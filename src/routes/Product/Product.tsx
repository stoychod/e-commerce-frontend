import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from '../../api/apiSlice'
import Box from "@mui/material/Box";
import { Link, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../api/apiSlice";

const Product = () => {
  const { id } = useParams();
  const productId = id || "";
  const { data: product } = useGetProductByIdQuery(productId);
  return (
    <Box>
      <Box marginTop={1}>
        <Link to={"/products"}> ‹ Back to porducts</Link>
      </Box>
    </Box>
  );
};

export default Product;
