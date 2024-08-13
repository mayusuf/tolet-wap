import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Checkbox,
  Typography,
  FormControlLabel,
  Container,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const BookingProperty = () => {
  const navigate = useNavigate();

  const [propertyInfo] = useState({
    propertyName: "Beautiful House",
    address: "123 Main St, Anytown",
    sizeAndRoom: "1500 ft², 3 rooms",
    description: "A beautiful house with a great view.",
    rent: "$1500/month",
    availableDate: "2024-09-01",
  });

  const [bookingInfo, setBookingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    rentStartDate: "",
  });

  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo({
      ...bookingInfo,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isChecked) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to proceed with the booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, book it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {

        toast.success("Booking request submitted successfully!", {
            onClose: () => {
                navigate("/");
            }
        });
      }
    });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Booking the property
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Property Info
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Property Name"
                  value={propertyInfo.propertyName}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Address"
                  value={propertyInfo.address}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Property Size and Room"
                  value={propertyInfo.sizeAndRoom}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Description"
                  value={propertyInfo.description}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Rent"
                  value={propertyInfo.rent}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Available Date"
                  value={propertyInfo.availableDate}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Booking Info
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={bookingInfo.firstName}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={bookingInfo.lastName}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Address"
                  name="address"
                  value={bookingInfo.address}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
                  name="phone"
                  value={bookingInfo.phone}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  value={bookingInfo.email}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Rent Start Date"
                  type="date"
                  name="rentStartDate"
                  value={bookingInfo.rentStartDate}
                  onChange={handleInputChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
            </Grid>
          </Box>

          <FormControlLabel
            control={
              <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
            }
            label="I have carefully checked the property details. I accept the terms and conditions of the property and will start paying the rent if my booking is approved."
          />

          <Box sx={{ textAlign: "right", marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!isChecked}
            >
              Booking
            </Button>
          </Box>
        </form>
        <ToastContainer position="bottom-center" />
      </Box>
    </Container>
  );
};

export default BookingProperty;
