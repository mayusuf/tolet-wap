import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";

const BookingList = () => {
  const navigate = useNavigate();

  const [properties] = useState([
    {
      id: 1,
      name: "Luxury Condo @ 3055 Main ST",
      isConfirmed: false,
      bookings: [
        {
          id: 101,
          firstName: "John",
          lastName: "Doe",
          address: "123 Street",
          email: "john@example.com",
          phone: "123-456-7890",
          image: "/images/image-1.jpg",
        },
        {
          id: 102,
          firstName: "Jane",
          lastName: "Smith",
          address: "456 Avenue",
          email: "jane@example.com",
          phone: "987-654-3210",
          image: "/images/image-2.jpg",
        },
      ],
    },
    {
      id: 2,
      name: "Luxury Apartment @ 44 Campus Drive",
      isConfirmed: false,
      bookings: [
        {
          id: 201,
          firstName: "Alice",
          lastName: "Johnson",
          address: "789 Boulevard",
          email: "alice@example.com",
          phone: "111-222-3333",
          image: "/images/image-1.jpg",
        },
      ],
    },
  ]);

  const handleBookingClick = (propertyId, bookingId) => {
    navigate(`/booking-confirmation/${propertyId}/${bookingId}`, {
      state: { previousRoute: "/booking-list" },
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 1 }}>
      <Typography variant="h4" gutterBottom>
        Booking List
      </Typography>
      <Box>
        {properties.map((property) => {
          if (property.isConfirmed) return null;

          return (
            <Card
              key={property.id}
              sx={{ mb: 4, borderRadius: 2, boxShadow: 3 }}
            >
              <CardContent sx={{ padding: 2 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ marginBottom: 2 }}
                >
                  {property.name}
                </Typography>
                {property.bookings.map((booking, index) => (
                  <>
                    <Box
                      key={booking.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 2,
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={booking.image}
                        alt={`${booking.firstName} ${booking.lastName}`}
                        sx={{
                          width: 100,
                          height: 100,
                          borderRadius: "8px",
                          objectFit: "cover",
                          marginRight: 2,
                        }}
                      />
                      <Box
                        sx={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          cursor: "pointer",
                          "&:hover": { backgroundColor: "#f5f5f5" },
                          padding: 1,
                          borderRadius: 2,
                        }}
                        onClick={() =>
                          handleBookingClick(property.id, booking.id)
                        }
                      >
                        <Typography variant="body1" fontWeight="bold">
                          {booking.firstName} {booking.lastName}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ marginTop: 0.5 }}
                        >
                          {booking.address}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ marginTop: 0.5 }}
                        >
                          {booking.email}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ marginTop: 0.5 }}
                        >
                          {booking.phone}
                        </Typography>
                      </Box>
                    </Box>
                    {index < property.bookings.length - 1 && <Divider sx={{ my: 2 }} />}
                  </>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Container>
  );
};

export default BookingList;
