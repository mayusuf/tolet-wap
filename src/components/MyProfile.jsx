import React, { useEffect, useState } from "react";
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
import { getFromLocalStore, getImageDirectory } from "../utils/utils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Api } from "../utils/api";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const navigate = useNavigate();
  let userId = getFromLocalStore("user-id") ?? null;
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    photo: null,
    photoPreview: null,
    role: "tenant",
  });

  useEffect(() => {
    if (!userId) return;

    loadUser(userId);
  }, [userId]);

  const loadUser = async (id) => {
    const response = await fetch(Api.GetUser(id));
    const result = await response.json();
    if (result?.length) {
      const data = result[0];
      let photoFile = null;
      const imageDirectory = getImageDirectory(data?.imagelink);
      if (imageDirectory) {
        const imageResponse = await fetch(imageDirectory);
        const imageBlob = await imageResponse.blob();
        photoFile = new File([imageBlob], data?.imagelink, {
          type: imageBlob.type,
        });
      }
      // imagelink
      setFormData({
        userId: data?.userid,
        email: data?.email,
        firstName: data?.firstname,
        lastName: data?.lastname,
        address: data?.address,
        phone: data?.phone,
        photo: photoFile,
        photoPreview: imageDirectory,
        role: data?.role,
      });
    }
  };

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
  };

  const handleClear = () => {
    setFormData({
      userId: "",
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      photo: null,
      photoPreview: null,
      role: "tenant",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);

    const form = new FormData();
    form.append("userid", formData.userId);
    form.append("firstname", formData.firstName);
    form.append("lastname", formData.lastName);
    form.append("address", formData.address);
    form.append("phone", formData.phone);
    form.append("email", formData.email);
    form.append("imagelink", formData.photo); // Append file

    try {
      const response = await fetch(Api.UpdateUser, {
        method: "PUT",
        body: form,
      });
      console.log(response);

      if (response.ok) {
        toast.success("User updated successfully", {
          onClose: () => {
            navigate("/");
          },
        });
      } else {
        const data = await response.json();
        toast.error(data.message || data.error || "Something went wrong");
      }
    } catch (error) {
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
          My Profile
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="User ID"
              name="userId"
              required
              value={formData.userId}
              InputProps={{
                readOnly: true,
              }}
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
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Avatar
                src={formData.photoPreview}
                alt="Uploaded Photo"
                sx={{ width: 100, height: 100, objectFit: "cover" }}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <FormControl component="fieldset" inputPo>
              <FormLabel component="legend">Role</FormLabel>
              <RadioGroup
                row
                name="role"
                value={formData.role}
                inputprops={{
                  readOnly: true,
                }}
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

export default MyProfile;
