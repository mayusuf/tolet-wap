import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Container,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const BookingConfirmation = () => {
  const navigate = useNavigate();

  const [propertyInfo] = useState({
    propertyName: "Beautiful House",
    address: "123 Main St, Anytown",
    sizeAndRoom: "1500 ft², 3 rooms",
    description: "A beautiful house with a great view.",
    rent: "$1500/month",
    availableDate: "2024-09-01",
    imageUrl: "/images/image-1.jpg",
  });

  const [requesterInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    address: "456 Elm St, Othertown",
    phone: "123-456-7890",
    email: "johndoe@example.com",
    imageUrl: "/images/image-2.jpg",
  });

  const [bookingInfo, setBookingInfo] = useState({
    bookingDate: "",
    rentStartDate: "",
    instructions: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo({
      ...bookingInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
            navigate(-1); // Navigate to the previous page
          },
        });
      }
    });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Booking Confirmation
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
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Property Name"
                      value={propertyInfo.propertyName}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Address"
                      value={propertyInfo.address}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Property Size and Room"
                      value={propertyInfo.sizeAndRoom}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box
                  component="img"
                  src={propertyInfo.imageUrl}
                  alt="Property"
                  sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: '8px' }}
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
              Requester Info
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="First Name"
                      value={requesterInfo.firstName}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Last Name"
                      value={requesterInfo.lastName}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Address"
                      value={requesterInfo.address}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Phone"
                      value={requesterInfo.phone}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email"
                      value={requesterInfo.email}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box
                  component="img"
                  src={requesterInfo.imageUrl}
                  alt="Requester"
                  sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: '8px' }}
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
                  label="Booking Date"
                  type="date"
                  name="bookingDate"
                  value={bookingInfo.bookingDate}
                  onChange={handleInputChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
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
              <Grid item xs={12}>
                <TextField
                  label="Instruction to Tenant"
                  name="instructions"
                  value={bookingInfo.instructions}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ textAlign: "right", marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Confirm Booking
            </Button>
          </Box>
        </form>
        <ToastContainer position="bottom-center" />
      </Box>
    </Container>
  );
};

export default BookingConfirmation;
