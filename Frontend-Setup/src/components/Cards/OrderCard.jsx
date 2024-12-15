import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Divider,
  Box,
  Avatar,
  Chip,
  Button,
  useTheme,
  Stack,
} from "@mui/material";
import { getAllOrdersAction, updateOrdersAction } from "../../feature/orders/orders.action";
import { useDispatch, useSelector } from "react-redux";
import useNotification from "../../hooks/useNotification";

export const OrderCard = ({ order }) => {
  console.log("orderssss", order);
  const dispatch = useDispatch();
 const showNotification = useNotification()
  const theme = useTheme();
  const {user} = useSelector((state) => state.user);

  const handleCancelOrder = async(orderId) => {
    // Function to handle order cancellation
    console.log(`Canceling order with ID: ${orderId}`);
    try {
      const data={order_status:"cancelled"}
      const res = await dispatch(updateOrdersAction({data, id : orderId}));
      if (res?.meta?.requestStatus === "fulfilled") {
          showNotification("Order status updated successfully", "success");
          dispatch(getAllOrdersAction({ pagination: { page: 1, limit: 100 },customer_id:user.uuid }));

      }
      if (res?.meta?.requestStatus === "rejected") {
          showNotification(res?.payload?.response?.data || "Error", "error");
      }
  } catch (error) {
      showNotification("Error", "error");
      console.log('error: ', error);
  }

  };
  return (
    <Card variant="outlined" sx={{ margin: 2, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2} gap={4}>
          <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
            {order?.order_id?.slice(0, 2)?.toUpperCase()}
          </Avatar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Order ID: {order.order_id}
          </Typography>
          <Chip
            label={order?.order_status?.toUpperCase()}
            color={order?.order_status === "pending" ? "warning" : "success"}
            variant="outlined"
          />
        </Box>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Box>
            <Typography variant="h6">Restaurant</Typography>
            <Typography variant="body2">Name: {order?.restaurant?.name}</Typography>
            <Typography variant="body2">Address: {order?.restaurant?.address}</Typography>
            <Typography variant="body2">Pin Code: {order?.restaurant?.pin_code}</Typography>
            {/* <Typography variant="body2">Food Type: {order.restaurant.food_type.join(", ")}</Typography> */}
          </Box>
          <Box mt={1} mr={3}>
            <Typography variant="body2" color="text.secondary">
              Ordered At: {new Date(order?.created_at).toLocaleString()}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              Updated At: {new Date(order.updated_at).toLocaleString()}
            </Typography> */}
            <Typography variant="body2" color="text.secondary">
              Delivery Address: {order?.delivery_address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone Number: {order?.phone_number}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pin Code: {order?.pin_code}
            </Typography>
          </Box>
        </Stack>
        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Items</Typography>
        <List>
          {Array.isArray(order.items) && order.items.map((orderItem, index) => (
            <ListItem key={index}>
              <Stack direction={"row"} gap={50}>
                <Stack direction={"row"} gap={5}>
                 <img
                  src={`http://localhost:8080/${orderItem?.item?.image_url}`}
                  height={90}
                  width={90}
                  alt={orderItem?.item?.name}
                 />
                  <Stack>
                    <Typography>{orderItem?.item?.name}</Typography>
                    <Typography>{orderItem?.item?.category}</Typography>
                    <Typography>{orderItem?.item?.description}</Typography>
                  </Stack>
                  {/* <Box>
                    Quantity: {orderItem.quantity}, Price: ${orderItem.item.price}
                    </Box> */}
                </Stack>
                <Stack>
                  <Typography>Qty: {orderItem?.quantity}</Typography>
                  <Typography>₹{orderItem?.item?.price}</Typography>
                </Stack>
              </Stack>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Box>
            <Typography variant="h6">Total Price</Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            ₹{order?.total_price}
            </Typography>
          </Box>
          <Box>
            {order.order_status === "pending" && (
              <Box mt={2} textAlign="center">
                <Button variant="contained" color="error" onClick={() => handleCancelOrder(order?.order_id)}>
                  Cancel Order
                </Button>
              </Box>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
