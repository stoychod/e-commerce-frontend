import "./Header.css";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCheckAuthenticatedQuery } from "../../api/apiSlice";

const Header = () => {
  const { data: isAuthenticated } = useCheckAuthenticatedQuery();
  return (
    <header>
      <div className="brand">Eshop</div>
      <div>
        <Button aria-label="sign-in-out" color="inherit">
          {isAuthenticated ? "Sign out" : "Sign in"}
        </Button>
        <IconButton aria-label="access shopping cart" color="inherit">
          <Badge badgeContent={2} color="primary">
            <AddShoppingCartIcon />
          </Badge>
        </IconButton>
      </div>
    </header>
  );
};

export default Header;
