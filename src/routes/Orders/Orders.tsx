import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { useGetOrdersQuery } from "../../api/apiSlice";
import OrderCard from "../../components/OrderCard/OrderCard";

const Orders = () => {
  const { data: orders, isSuccess } = useGetOrdersQuery();

  return (
    <Box className="body-container" sx={{ width: "100%" }}>
      <Box
        className="centering-container"
        padding={3}
        maxWidth="xl"
        marginX="auto"
      >
        <Stack className="vertical-stack">
          <Typography
            variant="h4"
            component="h1"
            paddingTop="1rem"
            gutterBottom
          >
            Your Orders
          </Typography>
          <Divider />
          {isSuccess &&
            orders.map((order) => {
              const { id: orderId, total, created_at: orderDate } = order;
              return (
                <OrderCard
                  key={orderId}
                  orderId={orderId}
                  total={total}
                  orderDate={orderDate}
                />
              );
            })}
        </Stack>
        {/* <OrderCard /> */}
      </Box>
    </Box>
  );
};

export default Orders;
