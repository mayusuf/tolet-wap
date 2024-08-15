import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import { Link, useNavigate } from "react-router-dom";
import { getFromLocalStore, saveToLocalStore } from "../utils/utils";
import { Api } from "../utils/api";

const Header = () => {
  let userId = getFromLocalStore("user-id") ?? null;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState({ role: "tenant" });

  useEffect(() => {
    if (!userId) return;

    loadUser(userId);
  }, [userId]);

  const loadUser = async (id) => {
    const response = await fetch(Api.GetUser(id));
    const result = await response.json();
    if (result?.length) {
      setUser(result[0]);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMyProfile = () => {
    handleClose();
    navigate("/my-profile");
  };

  const handleMyBookings = () => {
    handleClose();
    navigate("/my-bookings");
  };

  const handleBookingList = () => {
    handleClose();
    navigate("/booking-list");
  };

  const handleCreateProperty = () => {
    handleClose();
    navigate("/create-property");
  };

  const handleLogout = () => {
    handleClose();
    saveToLocalStore("user-id", null);
    setUser({});
    // Add your logout logic here
  };

  const handleLogin = () => {
    handleClose();
    navigate("/login");
    // Add your logout logic here
  };

  const handleCreateAccount = () => {
    handleClose();
    navigate("/create-user");
    // Add your logout logic here
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="/images/logo.jpg"
              alt="Logo"
              style={{ height: "40px", marginRight: "16px", cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
          </Box>

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "black",
              fontWeight: "bold",
              fontSize: "24px",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            Rent a Home
          </Typography>

          <Box>
            <Button
              variant="contained"
              endIcon={<ArrowDropDownIcon />}
              sx={{
                backgroundColor: "#000000",
                color: "#FFFFFF",
                borderRadius: "30px",
                padding: "8px 20px",
                textTransform: "none",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "#333333",
                },
              }}
              onClick={handleClick}
            >
              {user?.userid ?? "Guest"}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
            >
              {user?.userid ? (
                <MenuItem onClick={handleMyProfile}>
                  <ListItemIcon>
                    <AccountBoxIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="My Profile" />
                </MenuItem>
              ) : null}

              {user?.userid ? <Divider /> : null}

              {user?.userid && user?.role === "tenant" ? (
                <MenuItem onClick={handleMyBookings}>
                  <ListItemIcon>
                    <AssignmentIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="My Bookings" />
                </MenuItem>
              ) : null}

              {user?.userid && user?.role === "tenant" ? <Divider /> : null}

              {user?.userid && user?.role === "owner" ? (
                <MenuItem onClick={handleBookingList}>
                  <ListItemIcon>
                    <AssignmentIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Booking List" />
                </MenuItem>
              ) : null}

              {user?.userid && user?.role === "owner" ? <Divider /> : null}

              {user?.userid && user?.role === "owner" ? (
                <MenuItem onClick={handleCreateProperty}>
                  <ListItemIcon>
                    <AddIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Create Property" />
                </MenuItem>
              ) : null}

              {user?.userid && user?.role === "owner" ? <Divider /> : null}

              {user?.userid ? (
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              ) : null}

              {!user?.userid ? (
                <MenuItem onClick={handleLogin}>
                  <ListItemIcon>
                    <LoginIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </MenuItem>
              ) : null}

              {!user?.userid ? <Divider /> : null}

              {!user?.userid ? (
                <MenuItem onClick={handleCreateAccount}>
                  <ListItemIcon>
                    <CreateIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Create Account" />
                </MenuItem>
              ) : null}
            </Menu>
          </Box>
        </Toolbar>
        <hr></hr>
      </Container>
    </AppBar>
  );
};

export default Header;
