import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'; // ✅ Admin icon

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // ✅ state to track admin
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserName('');
    setIsAdmin(false);
    handleClose();
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserName(user?.name || '');
        setIsAdmin(user?.role === 'admin'); // ✅ set admin state
      } catch {
        setUserName('');
        setIsAdmin(false);
      }
    } else {
      setUserName('');
      setIsAdmin(false);
    }
  }, [location.pathname]);
  const [drawerOpen, setDrawerOpen] = useState(false);
const toggleDrawer = (open) => () => {
  setDrawerOpen(open);
};

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#7e57c2' }}>
        <Toolbar>
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
  <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
    <Typography variant="h6" sx={{ m: 2, color: '#7e57c2', fontWeight: 'bold' }}>
      Browse Categories
    </Typography>
    <List>
      <ListItem button component={Link} to="/">
        <ListItemIcon><HomeIcon /></ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={Link} to="/pets">
        <ListItemIcon><PetsIcon /></ListItemIcon>
        <ListItemText primary="Dogs & Cats" />
      </ListItem>
      <ListItem button component={Link} to="/category/other-animals">
        <ListItemIcon><PetsIcon /></ListItemIcon>
        <ListItemText primary="Other Animals" />
      </ListItem>
      <ListItem button component={Link} to="/category/shelters">
        <ListItemIcon><HomeIcon /></ListItemIcon>
        <ListItemText primary="Shelters" />
      </ListItem>
      <ListItem button component={Link} to="/category/favorites">
        <ListItemIcon><FavoriteIcon /></ListItemIcon>
        <ListItemText primary="Favorites" />
      </ListItem>
    </List>
  </Box>
</Drawer>

        <IconButton
  size="large"
  edge="start"
  color="inherit"
  onClick={toggleDrawer(true)}
  sx={{ mr: 2 }}
>
  <MenuIcon />
</IconButton>

        

          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontFamily: 'Pacifico, cursive',
              fontSize: '1.8rem',
              color: '#fff',
              textAlign: 'left',
            }}
          >
            HappyPaws <PetsIcon />
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Tooltip title="Home">
              <IconButton component={Link} to="/" color="inherit">
                <HomeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Favorites">
              <IconButton component={Link} to="/category/favorites" color="inherit">
                <FavoriteIcon />
              </IconButton>
            </Tooltip>

            {/* ✅ Admin Panel (only visible if user is admin) */}
            {isAdmin && (
              <Tooltip title="Admin Dashboard">
                <IconButton component={Link} to="/admin" color="inherit">
                  <AdminPanelSettingsIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          {/* User name + account icon */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {userName && (
              <Typography sx={{ fontWeight: 'bold' }}>
                Hello, {userName}
              </Typography>
            )}
            <IconButton
              size="large"
              color="inherit"
              onClick={handleMenu}
              aria-label="account"
            >
              <AccountCircle />
            </IconButton>
          </Box>

          {/* Account Menu */}
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
                  Sign Up
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
