import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { Api } from "../utils/api";
import { currentDate, getDate, getFromLocalStore } from "../utils/utils";

const BookingProperty = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [propertyInfo, setPropertyInfo] = useState({
    propertyName: "",
    address: "",
    sizeAndRoom: "",
    description: "",
    rent: "",
    availableDate: "",
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

  useEffect(() => {
    const loadProperty = async () => {
      const response = await fetch(Api.GetProperty(id));
      const result = await response.json();
      if (result?.length) {
        const firstValue = result[0];
        const modifiedValue = {
          propertyName: firstValue?.aspropertyname,
          address: firstValue?.paddress,
          sizeAndRoom: `${firstValue?.propertysize ?? ""} ft², ${
            firstValue?.numberofroom ?? ""
          } rooms`,
          description: firstValue?.description,
          rent: `$${firstValue?.rent}/month`,
          availableDate: getDate(),
          ownerid: firstValue?.ownerid,
          propertyid: firstValue?.propertyid,
        };
        setPropertyInfo(modifiedValue);
      }
    };

    loadProperty(id);
  }, [id]);

  useEffect(() => {
    let userId = getFromLocalStore("user-id") ?? null;
    if (!userId) return;

    loadUser(userId);
  }, []);

  const loadUser = async (id) => {
    const response = await fetch(Api.GetUser(id));
    const result = await response.json();
    if (result?.length) {
      const data = result[0];
      setBookingInfo({
        firstName: data?.firstname,
        lastName: data?.lastname,
        address: data?.address,
        phone: data?.phone,
        email: data?.email,
        rentStartDate: "",
        bookedby: data?.userid,
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

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to proceed with the booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, book it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        const data = {
          propertyid: propertyInfo?.propertyid,
          ownerid: propertyInfo?.ownerid,
          bookingdate: currentDate(),
          bookedby: bookingInfo?.bookedby,
          bookingstatus: "requested",
          requestnote: "",
          approvalnote: "",
        };
        const response = await fetch(Api.CreateBooking, {
          method: "POST",
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
              navigate("/");
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
