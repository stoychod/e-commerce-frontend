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
