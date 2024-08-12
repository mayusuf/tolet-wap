import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Avatar,
} from "@mui/material";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    photo: null,
    photoPreview: null,
    type: "Tenor",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files[0]) {
      const photoURL = URL.createObjectURL(files[0]);
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
        photoPreview: photoURL,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    setError("");
  };

  const handleClear = () => {
    setFormData({
      userId: "",
      password: "",
      confirmPassword: "",
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      photo: null,
      photoPreview: null,
      type: "Tenor",
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Password confirmation doesn't match");
      return;
    }

    // Submit form logic here
    console.log("Form Data Submitted: ", formData);
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
          Create an account
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="User ID"
              name="userId"
              required
              value={formData.userId}
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
              error={!!error && formData.password !== formData.confirmPassword}
              helperText={
                !!error && formData.password !== formData.confirmPassword
                  ? error
                  : ""
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!error && formData.password !== formData.confirmPassword}
              helperText={
                !!error && formData.password !== formData.confirmPassword
                  ? error
                  : ""
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mb: 2 }}
            >
              Upload Photo
              <input
                type="file"
                name="photo"
                accept="image/jpeg,image/png"
                hidden
                onChange={handleChange}
              />
            </Button>
          </Grid>

          {formData.photoPreview && (
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
              <Avatar
                src={formData.photoPreview}
                alt="Uploaded Photo"
                sx={{ width: 100, height: 100, objectFit: "cover" }}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Type</FormLabel>
              <RadioGroup
                row
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Tenor"
                  control={<Radio />}
                  label="Tenor"
                />
                <FormControlLabel
                  value="Property Owner"
                  control={<Radio />}
                  label="Property Owner"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ flexGrow: 1, mr: 2 }}
          >
            Save/Submit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClear}
            sx={{ flexGrow: 1 }}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateUser;
