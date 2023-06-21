import { useParams } from "react-router-dom";

const Product = () => {
  const params = useParams();
  console.log(params);
  return <p>Product {params.id}</p>;
};

export default Product;
