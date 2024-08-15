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
  Checkbox,
  FormGroup,
  MenuItem,
  Select,
  Avatar,
  Stack,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getFromLocalStore } from "../utils/utils";
import { Api } from "../utils/api";
import { useNavigate } from "react-router-dom";

const CreateProperty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ownerId: getFromLocalStore("user-id"),
    propertyName: "",
    propertyType: "Apartment",
    address: "",
    numberOfRooms: "",
    propertySize: "",
    apartmentNumber: "",
    rent: "",
    description: "",
    petAllowed: "Yes",
    utility: "Included",
    facilities: [],
    propertyImages: [],
    propertyImagePreviews: [],
  });

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => {
        const updatedFacilities = checked
          ? [...prevData.facilities, name]
          : prevData.facilities.filter((facility) => facility !== name);
        return {
          ...prevData,
          facilities: updatedFacilities,
        };
      });
    } else if (name === "propertyImages" && files) {
      const imageFiles = Array.from(files).slice(0, 10);
      const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file));
      setFormData((prevData) => ({
        ...prevData,
        [name]: imageFiles,
        propertyImagePreviews: imagePreviews,
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
      ownerId: getFromLocalStore("user-id"),
      propertyName: "",
      propertyType: "Apartment",
      address: "",
      numberOfRooms: "",
      propertySize: "",
      apartmentNumber: "",
      rent: "",
      description: "",
      petAllowed: "Yes",
      utility: "Included",
      facilities: [],
      propertyImages: [],
      propertyImagePreviews: [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.propertyName ||
      !formData.propertyType ||
      !formData.numberOfRooms ||
      !formData.address ||
      !formData.propertySize ||
      !formData.rent ||
      !formData.description ||
      formData.propertyImages.length === 0
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    console.log("Property Data Submitted: ", formData);
    const dataToSubmit = new FormData();

    dataToSubmit.append("ownerId", formData.ownerId);
    dataToSubmit.append("propertyName", formData.propertyName);
    dataToSubmit.append("propertyType", formData.propertyType);
    dataToSubmit.append("numberOfRooms", formData.numberOfRooms);
    dataToSubmit.append("propertySize", formData.propertySize);
    dataToSubmit.append("apartmentNumber", formData.apartmentNumber);
    dataToSubmit.append("rent", formData.rent);
    dataToSubmit.append("description", formData.description);
    dataToSubmit.append("petAllowed", formData.petAllowed);
    dataToSubmit.append("utility", formData.utility);
    dataToSubmit.append("paddress", formData.address);
    dataToSubmit.append("status", "active");
    dataToSubmit.append("sizeUnit", "SQFT");
    dataToSubmit.append("otherFacilities", formData.facilities?.join(", "));
    formData.propertyImages.forEach((image) => {
      dataToSubmit.append("propertyImages", image);
    });

    try {
      const response = await fetch(Api.CreateProperty, {
        method: "POST",
        body: dataToSubmit,
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result?.message || "Property created successfully!", {
          onClose: () => {
            handleClear();
            navigate("/");
          },
        });
      } else {
        const result = await response.json();
        toast.error(
          result?.message || "Failed to create property. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
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
          Create Property
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Owner ID"
              name="ownerId"
              value={formData.ownerId}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Property Name"
              name="propertyName"
              required
              value={formData.propertyName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <Select
                label="Property Type"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
              >
                <MenuItem value="Apartment">Apartment</MenuItem>
                <MenuItem value="Condo">Condo</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Number of Rooms"
              name="numberOfRooms"
              type="number"
              required
              value={formData.numberOfRooms}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Property Size (sqft)"
              name="propertySize"
              type="number"
              required
              value={formData.propertySize}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Apartment Number"
              name="apartmentNumber"
              value={formData.apartmentNumber}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Rent (USD)"
              name="rent"
              type="number"
              required
              value={formData.rent}
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
              label="Description"
              name="description"
              required
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Pet Allowed</FormLabel>
              <RadioGroup
                row
                name="petAllowed"
                value={formData.petAllowed}
                onChange={handleChange}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Utility</FormLabel>
              <RadioGroup
                row
                name="utility"
                value={formData.utility}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Included"
                  control={<Radio />}
                  label="Included"
                />
                <FormControlLabel
                  value="Not Included"
                  control={<Radio />}
                  label="Not Included"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Other Facilities</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.facilities.includes("pool")}
                      onChange={handleChange}
                      name="pool"
                    />
                  }
                  label="Pool"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.facilities.includes("gym")}
                      onChange={handleChange}
                      name="gym"
                    />
                  }
                  label="Gym"
                />
                {/* Add more facilities as needed */}
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mb: 2 }}
            >
              Upload Property Images
              <input
                type="file"
                name="propertyImages"
                accept="image/jpeg, image/jpg, image/png"
                multiple
                hidden
                onChange={handleChange}
              />
            </Button>
          </Grid>

          {formData.propertyImagePreviews.length > 0 && (
            <Grid item xs={12}>
              <Stack
                direction="row"
                spacing={2}
                sx={{ flexWrap: "wrap", mt: 2 }}
              >
                {formData.propertyImagePreviews.map((preview, index) => (
                  <Avatar
                    key={index}
                    src={preview}
                    alt={`Property Image ${index + 1}`}
                    sx={{ width: 80, height: 80 }}
                  />
                ))}
              </Stack>
            </Grid>
          )}
        </Grid>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ flexGrow: 1, mr: 2 }}
          >
            Create Property
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

export default CreateProperty;
