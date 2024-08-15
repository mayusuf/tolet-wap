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
import { Api } from "../utils/api";
import { saveToLocalStore } from "../utils/utils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userid: "",
    password: "",
  });

  const [error, setError] = useState({
    userid: false,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    const newError = {
      userid: formData.userid === "",
      password: formData.password === "",
    };
    setError(newError);

    // If any field is empty, do not proceed
    if (newError.userid || newError.password) {
      return;
    }

    try {
      const response = await fetch(Api.Login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        if (!result?.data?.userid) return;
        saveToLocalStore("user-id", result?.data?.userid);
        navigate("/");
      } else {
        const result = await response.json();
        toast.error(result?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Network error. Please try again later.");
    }

    // Perform login logic here
    console.log("Login Data Submitted: ", formData);
  };

  const handleCreateAccountButtonOnClick = () => {
    navigate("/create-user");
  };

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
              label="User ID"
              name="userid"
              required
              value={formData.userid}
              onChange={handleChange}
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
            Sign in
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
          <ToastContainer position="bottom-center" />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
