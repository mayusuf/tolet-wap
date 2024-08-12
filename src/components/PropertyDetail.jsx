import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Divider,
  Container,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getProperties } from "../utils/utils";

const PropertyDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const propertyId = parseInt(id, 10);
    const properties = getProperties();
    const foundProperty = properties.find((p) => p.id === propertyId);
    setProperty(foundProperty);
  }, [id]);

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % property?.imageUrl.length);
  };

  const handlePrevImage = () => {
    setCurrentImage(
      (prev) =>
        (prev - 1 + (property?.imageUrl?.length || 1)) %
        (property?.imageUrl?.length || 1)
    );
  };

  const handleBookNowOnClick = () => {
    const isUserLoggedIn = false;
    if(!isUserLoggedIn) {
        navigate("/login");
    } else {
        //
    }
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ padding: "20px" }}>
        {property?.id ? (
          <>
            {/* Image Carousel */}
            <Box
              sx={{
                position: "relative",
                maxWidth: "100%",
                overflow: "hidden",
                height: "400px",
                marginBottom: "20px",
              }}
            >
              <img
                src={property?.imageUrl[currentImage]}
                alt={property?.name}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
              <IconButton
                onClick={handlePrevImage}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  transform: "translateY(-50%)",
                  color: "#fff",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                  },
                }}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton
                onClick={handleNextImage}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  color: "#fff",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                  },
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              {property.imageUrl.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${property.name} ${index + 1}`}
                  onClick={() => setCurrentImage(index)}
                  style={{
                    width: "100px",
                    height: "60px",
                    margin: "0 5px 5px 5px",
                    cursor: "pointer",
                    border: currentImage === index ? "2px solid #000" : "none",
                    borderRadius: "5px",
                  }}
                />
              ))}
            </Box>

            {/* Property Details */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    paddingBottom: "8px",
                  }}
                >
                  NAME
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#666", paddingBottom: "16px" }}
                >
                  {property?.name}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    paddingBottom: "8px",
                  }}
                >
                  ROOM NUMBER
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#666", paddingBottom: "16px" }}
                >
                  {property?.roomNumber}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    paddingBottom: "8px",
                  }}
                >
                  AVAILABLE FROM
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#666", paddingBottom: "16px" }}
                >
                  {property?.availableFrom}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    paddingBottom: "8px",
                  }}
                >
                  SIZE
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#666", paddingBottom: "16px" }}
                >
                  {property?.size} sq ft
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    paddingBottom: "8px",
                  }}
                >
                  GUESTS
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#666", paddingBottom: "16px" }}
                >
                  {property?.guests}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    paddingBottom: "8px",
                  }}
                >
                  LOCATION
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#666", paddingBottom: "16px" }}
                >
                  {property?.location}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    paddingBottom: "8px",
                  }}
                >
                  DISTANCE
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#666", paddingBottom: "16px" }}
                >
                  {property?.distance} km
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    paddingBottom: "8px",
                  }}
                >
                  PRICE
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#333",
                    fontWeight: "bold",
                    paddingBottom: "16px",
                  }}
                >
                  ${property?.price}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Booking Button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <Button variant="contained" color="primary" size="large" onClick={handleBookNowOnClick}>
                Book Now
              </Button>
            </Box>
          </>
        ) : null}
      </Box>
    </Container>
  );
};

export default PropertyDetail;
