import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useGetOrderItemsQuery } from "../../api/apiSlice";
import OrderItem from "../../components/OrderItem/OrderItem";

const OrderCard = ({
  orderId,
  total,
  orderDate,
}: {
  orderId: number;
  total: number;
  orderDate: string;
}) => {
  const { data: orderItems, isSuccess } = useGetOrderItemsQuery(orderId);
    return (
    <Paper
      className="order-card"
      sx={{
        marginTop: "2rem",
      }}
    >
      <Stack
        className="order-card-header"
        sx={{
          backgroundColor: "#eaeaed",
          flexDirection: "row",
          padding: "0.5rem",
        }}
      >
        <Stack className="order-number" marginRight="3rem">
          <Typography variant="subtitle1" component="h3">
            ORDER
          </Typography>
          <Typography variant="subtitle1" component="h3">
            {"# "}
            {orderId}
          </Typography>
        </Stack>
        <Stack className="order-date">
          <Typography variant="subtitle1" component="h3">
            OREDER PLACED
          </Typography>
          <Typography variant="subtitle1" component="h3">
            {new Date(orderDate).toLocaleString("en-gb", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Typography>
        </Stack>
        <Stack
          className="order-total"
          sx={{
            flexGrow: 1,
            alignItems: "flex-end",
          }}
        >
          <Typography variant="subtitle1" component="h3">
            TOTAL
          </Typography>
          <Typography variant="subtitle1" component="h3">
            {(total / 100).toLocaleString("en-GB", {
              style: "currency",
              currency: "GBP",
            })}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        className="order-card-body"
        sx={{
          paddingX: "1rem",
        }}
      >
        {isSuccess &&
          orderItems.map((orderItem, index) => {
            const {
              product_id: productId,
              name,
              quantity,
              image,
              price,
            } = orderItem;
            return (
              <>
                <OrderItem
                  key={productId}
                  productId={productId}
                  name={name}
                  quantity={quantity}
                  image={image}
                  price={price}
                />
                {orderItems.length - index > 1 && <Divider />}
              </>
            );
          })}
      </Stack>
    </Paper>
  );
};

export default OrderCard;
