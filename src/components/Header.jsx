import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/images/logo.jpg"
              alt="Logo"
              style={{ height: '40px', marginRight: '16px' }}
            />
          </Box>

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'black',
              fontWeight: 'bold',
              fontSize: '24px',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            Rent a Home
          </Typography>

          <Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#000000',
                color: '#FFFFFF',
                borderRadius: '30px',
                padding: '8px 20px',
                textTransform: 'none',
                fontSize: '16px',
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
              component={Link}
              to="/guest"
            >
              Guest
            </Button>
          </Box>
        </Toolbar>
        <hr></hr>
      </Container>
    </AppBar>
  );
}

export default Header;
