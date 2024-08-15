import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { Api } from "../utils/api";
import { getImageDirectory } from "../utils/utils";

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const { propertyId, bookingId } = useParams();

  const [propertyInfo, setPropertyInfo] = useState({
    propertyName: "",
    address: "",
    sizeAndRoom: "",
    description: "",
    rent: "",
    availableDate: "",
    imageUrl: "",
  });

  const [requesterInfo, setRequesterInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    imageUrl: "",
  });

  const [bookingInfo, setBookingInfo] = useState({
    bookingDate: "",
    rentStartDate: "",
    instructions: "",
  });

  useEffect(() => {
    loadBookingConfirmationInfo(bookingId);
  }, [bookingId]);

  const loadBookingConfirmationInfo = async (id) => {
    const response = await fetch(Api.BookingInfoForConfim(id));
    const result = await response.json();
    if (result?.length) {
      const data = result[0];

      setPropertyInfo({
        propertyName: data?.propertyName,
        address: data?.propertyAddress,
        sizeAndRoom: `${data?.propertySize} ft² ${
          data?.numberofRooms ? `, ${data?.numberofRooms} rooms` : ""
        }`,
        description: data?.propertyDescription,
        rent: `$${data?.propertyRent}/month`,
        availableDate: data?.bookingDate?.split("T")[0],
        imageUrl: getImageDirectory(data?.image1),
      });

      setRequesterInfo({
        firstName: data?.tenantfName,
        lastName: data?.lastName,
        address: data?.tenantAddress,
        phone: data?.tenantPhone,
        email: data?.tenantEmail,
        imageUrl: getImageDirectory(data?.tenantPhotoLink),
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo({
      ...bookingInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to confirm the booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        const data = {
          propertyid: propertyId,
          bookingid: bookingId,
          bookingstatus: "confirmed",
          approvalnote: bookingInfo?.instructions,
        };

        const response = await fetch(Api.ConfirmBooking, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        toast.success(
          result?.message || "Booking request submitted successfully!",
          {
            onClose: () => {
              navigate(-1);
            },
          }
        );
      } catch (error) {
        toast.error("Failed to submit booking request.");
      }
    }
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
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
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
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
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
            <Button variant="contained" color="primary" type="submit">
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
