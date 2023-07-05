interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

interface CartItem {
  cartItemId: string;
  quantity: number;
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

interface PartialCartItem {
  cartItemId: string;
  quantity: number;
}

interface Order {
  id: number;
  users_id: number;
  total: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface OrderItem {
  id: number;
  orders_id: number;
  product_id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  created_at: string;
  image: string;
}
