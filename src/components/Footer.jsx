import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Select, MenuItem } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import "./Footer.css";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', padding: '40px 0', marginTop: "10px" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom className="footer-color">
              Rent a Home
            </Typography>
            <Link href="#" underline="none" color="inherit" display="block" gutterBottom className="footer-color">
              About us
            </Link>
            <Link href="#" underline="none" color="inherit" display="block" gutterBottom className="footer-color">
              Careers
            </Link>
            <Link href="#" underline="none" color="inherit" display="block" gutterBottom className="footer-color">
              Investors
            </Link>
            <Link href="#" underline="none" color="inherit" display="block" gutterBottom className="footer-color">
              Rent a Home stock
            </Link>
            <Link href="#" underline="none" color="inherit" display="block" gutterBottom className="footer-color">
              App
            </Link>
            <Link href="#" underline="none" color="inherit" display="block" gutterBottom className="footer-color">
              Product features
            </Link>
            <Link href="#" underline="none" color="inherit" display="block" gutterBottom className="footer-color">
              Insights
            </Link>
            <Link href="#" underline="none" color="inherit" display="block" gutterBottom className="footer-color">
              Inspiration
            </Link>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom className="footer-color">
              Contact
            </Typography>
            <Link href="#" underline="none" color="inherit" display="block" gutterBottom className="footer-color">
              Help Center and contact
            </Link>
            <Link href="#" underline="none" color="inherit" display="block" gutterBottom className="footer-color">
              List your home
            </Link>
            <Link href="#" underline="none" color="inherit" display="block" gutterBottom className="footer-color">
              Become an affiliate partner
            </Link>
            <Link href="#" underline="none" color="inherit" display="block" gutterBottom className="footer-color">
              Press
            </Link>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom className="footer-color">
              Legal policies
            </Typography>
            <Link href="#" underline="none" color="inherit" display="block" gutterBottom className="footer-color">
              Terms of Service
            </Link>
            <Link href="#" underline="none" color="inherit" display="block" gutterBottom className="footer-color">
              Privacy Policy
            </Link>
            <Link href="#" underline="none" color="inherit" display="block" gutterBottom className="footer-color">
              Legal
            </Link>
            <Link href="#" underline="none" color="inherit" display="block" gutterBottom className="footer-color">
              How the platform works
            </Link>
            <Link href="#" underline="none" color="inherit" display="block" gutterBottom className="footer-color">
              Security
            </Link>
            <Link href="#" underline="none" color="inherit" display="block" gutterBottom className="footer-color">
              Content Guidelines
            </Link>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom className="footer-color">
              Follow us
            </Typography>
            <IconButton aria-label="Instagram" sx={{ color: '#E1306C' }}>
              <InstagramIcon />
            </IconButton>
            <IconButton aria-label="Facebook" sx={{ color: '#1877F2' }}>
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="LinkedIn" sx={{ color: '#0A66C2' }}>
              <LinkedInIcon />
            </IconButton>
            <Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom className="footer-color">
                Download our apps
              </Typography>
              <Box display="flex" alignItems="center">
                <IconButton aria-label="App Store" sx={{ color: '#000000', }}>
                  <AppleIcon />
                </IconButton>
                <Typography variant="body2" sx={{ marginRight: 2 }}>
                  App Store
                </Typography>
                <IconButton aria-label="Google Play" sx={{ color: '#000000' }}>
                  <AndroidIcon />
                </IconButton>
                <Typography variant="body2">Google Play</Typography>
              </Box>
            </Box>
            <Select
              variant="outlined"
              defaultValue="en"
              sx={{
                width: 150,
                backgroundColor: 'white',
                '& .MuiSelect-outlined': {
                  paddingRight: '8px',
                },
              }}
            >
              <MenuItem value="en">English (US)</MenuItem>
              <MenuItem value="fr">Français (FR)</MenuItem>
              <MenuItem value="es">Español (ES)</MenuItem>
              <MenuItem value="de">Deutsch (DE)</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
