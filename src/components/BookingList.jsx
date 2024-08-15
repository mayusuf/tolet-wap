import React, { useEffect, useState } from "react";
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
import { convertArray, getFromLocalStore, getImageDirectory } from "../utils/utils";
import { Api } from "../utils/api";

const BookingList = () => {
  const navigate = useNavigate();
  const userId = getFromLocalStore("user-id") ?? null;

  const [properties, setProperties] = useState([]);
  console.log(properties);

  useEffect(() => {
    loadBookingList(userId);
  }, [userId]);

  const loadBookingList = async (id) => {
    const response = await fetch(Api.BookingList(id));
    const result = await response.json();
    console.log(result);
    if(!result?.length) return;
    const modified = convertArray([...result]);
    setProperties(modified);
  };

  const handleBookingClick = (propertyId, bookingId) => {
    navigate(`/booking-confirmation/${propertyId}/${bookingId}`, {
      state: { previousRoute: "/booking-list" },
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 1 }}>
      <Typography variant="h4" gutterBottom>
        {properties?.length ? "Booking List" : "No Booking found!"}
      </Typography>
      <Box>
        {properties.map((property) => {

          return (
            <Card
              key={property.propertyID}
              sx={{ mb: 4, borderRadius: 2, boxShadow: 3 }}
            >
              <CardContent sx={{ padding: 2 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ marginBottom: 2 }}
                >
                  {`${property?.propertyName} ${property?.propertyType} @ ${property?.propertyAddress}`}
                </Typography>
                {property.bookings.map((booking, index) => (
                  <>
                    <Box
                      key={booking.bookingId}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 2,
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={getImageDirectory(booking.tenantPhotoLink)}
                        alt={`${booking.tenantfName} ${booking.lastName}`}
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
                          handleBookingClick(property.propertyID, booking.bookingId)
                        }
                      >
                        <Typography variant="body1" fontWeight="bold">
                          {booking.tenantfName} {booking.lastName}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ marginTop: 0.5 }}
                        >
                          {booking.tenantAddress}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ marginTop: 0.5 }}
                        >
                          {booking.tenantEmail}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ marginTop: 0.5 }}
                        >
                          {booking.tenantPhone}
                        </Typography>
                      </Box>
                    </Box>
                    {index < property.bookings.length - 1 && (
                      <Divider sx={{ my: 2 }} />
                    )}
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
