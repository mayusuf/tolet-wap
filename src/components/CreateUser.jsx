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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Api } from "../utils/api";
import { saveToLocalStore } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();
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
    type: "tenant",
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
      type: "tenant",
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Password confirmation doesn't match");
      return;
    }

    console.log("Form Data Submitted: ", formData);

    // Prepare form data
    const form = new FormData();
    form.append("userid", formData.userId);
    form.append("password", formData.password);
    form.append("role", formData.type);
    form.append("firstname", formData.firstName);
    form.append("lastname", formData.lastName);
    form.append("address", formData.address);
    form.append("phone", formData.phone);
    form.append("email", formData.email);
    form.append("imagelink", formData.photo); // Append file

    try {
      const response = await fetch(Api.CreateUser, {
        method: "POST",
        body: form,
      });
      console.log(response);

      if (response.ok) {
        toast.success("User created successfully");
        const result = await response.json();
        if(!result?.data?.id) return;
        saveToLocalStore("user-id", result?.data?.id)
        navigate("/");
      } else {
        const data = await response.json();
        setError(data.message || "Something went wrong");
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      setError("Network error. Please try again later.");
      toast.error("Network error. Please try again later.");
      console.error("Error:", error);
    }
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
                  value="tenant"
                  control={<Radio />}
                  label="Tenant"
                />
                <FormControlLabel
                  value="owner"
                  control={<Radio />}
                  label="Owner"
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
        <ToastContainer position="bottom-center" />
      </Box>
    </Container>
  );
};

export default CreateUser;
