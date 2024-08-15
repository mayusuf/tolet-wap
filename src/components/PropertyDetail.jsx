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
import { getFromLocalStore, getImageDirectory } from "../utils/utils";
import { Api } from "../utils/api";

// {
//   apartmentnumber: "4B";
//   aspropertyname: "Sunset Villa";
//   description: "A cozy apartment with a great view";
//   image1: "http://localhost:3000/uploads/1723584641813.jpg";
//   image2: "http://localhost:3000/uploads/1723584641818.jpeg";
//   image3: "http://localhost:3000/uploads/1723584641819.jpg";
//   image4: "http://localhost:3000/uploads/1723584641820.jpg";
//   image5: "http://localhost:3000/uploads/1723584641821.jpg";
//   image6: "http://localhost:3000/uploads/1723584641821.jpg";
//   image7: "http://localhost:3000/uploads/1723584641822.jpeg";
//   image8: "http://localhost:3000/uploads/1723584641822.jpg";
//   image9: "http://localhost:3000/uploads/1723584641823.jpeg";
//   image10: "http://localhost:3000/uploads/1723584641823.jpg";
//   numberofroom: 3;
//   otherfacilities: "Pool, Gym";
//   ownerid: "mmh1bd";
//   paddress: "123 Main St";
//   petallowed: "Yes";
//   propertyid: 2;
//   propertysize: 1200;
//   propertytype: "Apartment";
//   rent: "1000";
//   sizeunit: "sqft";
//   status: "active";
//   utility: "Included";
// }

// --form 'ownerId="mmh1bd"' \
// --form 'paddress="8888 S Main ST, Fairfield, Iowa, 52556"' \
// --form 'propertyName="Dream House2"' \
// --form 'propertyType="Apartment"' \
// --form 'numberOfRooms="5"' \
// --form 'propertySize="1750"' \
// --form 'sizeUnit="SQFT"' \
// --form 'apartmentNumber="B"' \
// --form 'description="Recently renovated, all kitchen utils are new"' \
// --form 'petAllowed="No"' \
// --form 'utility="Included"' \
// --form 'otherFacilities="Pool, Gym"' \
// --form 'rent="1350"' \
// --form 'propertyImages=@"/Volumes/Documents/MIU/Web Programming/Project/images/h9.jpeg"' \
// --form 'propertyImages=@"/Volumes/Documents/MIU/Web Programming/Project/images/h3.jpg"' \
// --form 'propertyImages=@"/Volumes/Documents/MIU/Web Programming/Project/images/h4.jpg"' \
// --form 'propertyImages=@"/Volumes/Documents/MIU/Web Programming/Project/images/h5.jpg"' \
// --form 'propertyImages=@"/Volumes/Documents/MIU/Web Programming/Project/images/h7.jpeg"' \
// --form 'status="active"

const PropertyDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const [currentImage, setCurrentImage] = useState(0);
  const imageUrl =
    [
      property?.image1,
      property?.image2,
      property?.image3,
      property?.image3,
      property?.image4,
      property?.image5,
      property?.image6,
      property?.image7,
      property?.image8,
      property?.image9,
      property?.image10,
    ] || [];

  useEffect(() => {
    const loadProperty = async () => {
      const response = await fetch(Api.GetProperty(id));
      const result = await response.json();
      if (result?.length) {
        setProperty(result[0]);
      }
      console.log(result);
    };

    loadProperty(id);
  }, [id]);

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % imageUrl.length);
  };

  const handlePrevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + (imageUrl?.length || 1)) % (imageUrl?.length || 1)
    );
  };

  const handleBookNowOnClick = () => {
    const userid = getFromLocalStore("user-id");
    if (!userid) {
      navigate("/login");
    } else {
      navigate(`/booking-property/${property?.propertyid}`);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ padding: "20px" }}>
        {property?.propertyid ? (
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
                src={getImageDirectory(imageUrl[currentImage])}
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
              {imageUrl.map((image, index) => (
                <img
                  key={index}
                  src={getImageDirectory(image)}
                  alt={`${property.name} ${index + 1}`}
                  onClick={() => setCurrentImage(index)}
                  style={{
                    width: "65px",
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
                  {property?.aspropertyname}
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
                  {property?.numberofroom}
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
                  UTILITIES
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#666", paddingBottom: "16px" }}
                >
                  {property?.utility}
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
                  {property?.propertysize} sq ft
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
                  LOCATION
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#666", paddingBottom: "16px" }}
                >
                  {property?.paddress}
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
                  DESCRIPTION
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#666", paddingBottom: "16px" }}
                >
                  {property?.description}
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
                  OTHER FACILITIES
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#666", paddingBottom: "16px" }}
                >
                  {property?.otherfacilities}
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
                  ${property?.rent}
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
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleBookNowOnClick}
              >
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
