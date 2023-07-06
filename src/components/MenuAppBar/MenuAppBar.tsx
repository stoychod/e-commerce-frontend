import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
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

const MenuAppBar = () => {
  const navigate = useNavigate();

  const { data: isAuthenticated } = useCheckAuthenticatedQuery();
  const { data: cartItems } = useGetCartQuery();
  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Link
              variant="h5"
              color="inherit"
              underline="none"
              component={RouterLink}
              to="/products"
              sx={{ flexGrow: 1, fontWeight: 700, fontSize: { sm: "1.75rem" } }}
            >
              Eshop
            </Link>
            {isAuthenticated ? (
              <AccountMenu />
            ) : (
              <Button color="inherit" onClick={() => navigate("/auth/login")}>
                Sign-in
              </Button>
            )}
            <IconButton
              onClick={() => navigate("/cart")}
              aria-label="access shopping cart"
              color="inherit"
            >
              <Badge badgeContent={cartItems?.length} color="warning">
                <AddShoppingCartIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        {/* Second toolbar is needed to ofset main content because of the fixed AppBar overlap  */}
        <Toolbar />
      </Box>
    </header>
  );
};

export default MenuAppBar;
