import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getwishCartNo } from "../../Services/Products/ProductsApi";
import { selectedLoggerInUser } from "../../Redux/Auth/authSlice";
import { useSelector } from "react-redux";
const pages = ["Products", "About", "Contact Us"];
const settings = ["Profile"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = useSelector(selectedLoggerInUser);
  const navigate = useNavigate();
  const moveto = (name) => {};
  const handleLogout =() =>{
    navigate('/login');
    localStorage.removeItem('token');
    window.location.reload();
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const OpenWish = () =>{
    navigate("/wishlist");
  }
  const OpenCart = () => {
    navigate("/viewcart");
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography variant="h6" noWrap component="a">
            <Link
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={`/${page}`}>{page}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => moveto(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={`/${page}`}
                >
                  {page}
                </Link>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, m: 1 }}>
            {user.token ? (
              <Button
                variant="contained"
                color="error"
                startIcon={<FavoriteIcon />}
                onClick={(e) => {
                  OpenWish();
                }}
              >
                {user.wishlist}
              </Button>
            ) : null}
          </Box>

          <Box sx={{ flexGrow: 0, m: 3 }}>
            {user.token ? (
              <Button
                variant="contained"
                color="success"
                startIcon={<ShoppingCartCheckoutIcon />}
                onClick={(e) => {
                  OpenCart();
                }}
              >
                {user.cart}
              </Button>
            ) : null}
          </Box>

                
          <Box sx={{ flexGrow: 0, mr: 3 }}>
            {user.token ? (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<LogoutIcon/>}
                onClick={(e) => {
                  handleLogout();
                }}
              >
                Logout
              </Button>
            ) : null}
          </Box>

          {user.token ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
              {settings.map((setting) => (
              setting !== "Profile" ?
                  <MenuItem key={setting} onClick={(e)=>handleLogout()}>
        <Typography>Logout</Typography>
      </MenuItem>
                :
        <MenuItem key={setting} onClick={handleCloseUserMenu}>
        
            <Typography textAlign="center">
              <Link to={`/${setting}`}>{setting}</Link>
            </Typography>
           
  
         
        </MenuItem>

      ))}
      
    

              </Menu>
              
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Button variant="contained" color="error" onClick={(e) => navigate('/login')}>
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
