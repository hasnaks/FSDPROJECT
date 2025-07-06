import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite'; // ❤️ icon

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    handleClose();
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: '#7e57c2', color: '#fff' }}
      >
        <Toolbar>
          {/* App Logo */}
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontFamily: 'Pacifico, cursive',
              fontSize: '1.8rem',
              color: '#fff',
            }}
            style={{ textAlign: 'left' }}
          >
            HappyPaws <PetsIcon />
          </Typography>

          {/* Nav Icons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Tooltip title="Home">
              <IconButton component={Link} to="/" color="inherit">
                <HomeIcon />
              </IconButton>
            </Tooltip>

            {/* 🔁 Removed Pets icon and added Favorites instead */}
            <Tooltip title="Favorites">
              <IconButton component={Link} to="/category/favorites" color="inherit">
                <FavoriteIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Add Pets">
              <IconButton component={Link} to="/Addpets" color="inherit">
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Auth Menu */}
          <IconButton
            size="large"
            color="inherit"
            onClick={handleMenu}
            aria-label="account"
          >
            <AccountCircle />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {isLoggedIn ? (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            ) : (
              <>
                <MenuItem onClick={handleClose} component={Link} to="/login">
                  Login
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/signup">
                  Sign up
                </MenuItem>
              </>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
