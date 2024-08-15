import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { getImageDirectory, truncateText } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = React.useState(0);
  const maxNameLength = 40;
  const imageUrl = [
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

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % imageUrl.length);
  };

  const handlePrevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + imageUrl.length) % imageUrl.length
    );
  };

  const handleCardOnClick = () => {
    navigate(`property/${property?.propertyid}`);
  };

  console.log(getImageDirectory(imageUrl[currentImage]));

  return (
    <Card
      sx={{ display: "flex", marginBottom: 2, borderRadius: 2, boxShadow: 3 }}
    >
      {/* Left part of the card (Image Slider) */}
      <Box sx={{ position: "relative", width: 300, height: 200 }}>
        <CardMedia
          component="img"
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          image={getImageDirectory(imageUrl[currentImage])}
          alt={property.name}
        />
        {/* Image navigation buttons */}
        {imageUrl.length > 1 && (
          <>
            <IconButton
              onClick={handlePrevImage}
              sx={{
                position: "absolute",
                top: "50%",
                left: 8,
                transform: "translateY(-50%)",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton
              onClick={handleNextImage}
              sx={{
                position: "absolute",
                top: "50%",
                right: 8,
                transform: "translateY(-50%)",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </>
        )}
        {/* Heart Icon */}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <FavoriteIcon />
        </IconButton>
      </Box>

      {/* Right part of the card (Property details) */}
      <CardContent sx={{ flex: 1, paddingLeft: 2 }}>
        <Typography variant="caption" fontWeight="bold">
          {property.propertysize} sqft • {property.propertytype} • {property.numberofroom} bedrooms
        </Typography>
        <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 1 }}>
          {truncateText(property.aspropertyname, maxNameLength)}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: 0.5 }}
        >
          {property.paddress}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: 0.5 }}
        >
          {property.description}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: 0.5 }}
        >
          other facilities: {property.otherfacilities}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            from ${property.rent}{" "}
            <Typography variant="body2" component="span">
              per month
            </Typography>
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              backgroundColor: "#673ab7",
              borderRadius: "20px",
              padding: "8px 16px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#512da8",
              },
            }}
            onClick={handleCardOnClick}
          >
            View deal
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
