import "./Header.css";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import {
  useCheckAuthenticatedQuery,
  useGetCartQuery,
} from "../../api/apiSlice";
import AccountMenu from "../AccountMenu/AccountMenu";

const Header = () => {
  const navigate = useNavigate();

  const { data: isAuthenticated } = useCheckAuthenticatedQuery();
  const { data: cartItems } = useGetCartQuery();
  return (
    <header>
      <div className="brand">Eshop</div>
      <div>
        {isAuthenticated ? (
          <AccountMenu />
        ) : (
          <Button color="inherit" onClick={() => navigate("/auth/login")}>
            Sign-in
          </Button>
        )}
        <IconButton aria-label="access shopping cart" color="inherit">
          <Badge badgeContent={cartItems?.length} color="primary">
            <AddShoppingCartIcon />
          </Badge>
        </IconButton>
      </div>
    </header>
  );
};

export default Header;
