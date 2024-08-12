import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError((prevError) => ({
      ...prevError,
      [name]: false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    const newError = {
      email: formData.email === "",
      password: formData.password === "",
    };
    setError(newError);

    // If any field is empty, do not proceed
    if (newError.email || newError.password) {
      return;
    }

    // Perform login logic here
    console.log("Login Data Submitted: ", formData);
  };

  const handleCreateAccountButtonOnClick = () => {
    navigate("/create-user");
  }

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{
          mt: 1,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" sx={{ mb: 2 }} fontWeight="bold">
          Already with Us?
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              error={error.email}
              helperText={error.email ? "Please fill out this field" : ""}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              error={error.password}
              helperText={error.password ? "Please fill out this field" : ""}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mb: 2 }}
          >
            Sign in with email
          </Button>

          <Divider>or</Divider>

          <Typography variant="h5" sx={{ mt: 2 }} fontWeight="bold">
          New here?
        </Typography>

          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleCreateAccountButtonOnClick}
          >
            Create an account
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
