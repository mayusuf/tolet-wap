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
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { truncateText } from "../utils/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MyBookingCard = ({ property }) => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = React.useState(0);
  const maxNameLength = 40;

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % property.imageUrl.length);
  };

  const handlePrevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + property.imageUrl.length) % property.imageUrl.length
    );
  };

  const handleCardOnClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No!",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success("Booking cancel request submitted successfully!", {
          onClose: () => {
            navigate("/");
          },
        });
      }
    });
  };

  return (
    <Card
      sx={{ display: "flex", marginBottom: 2, borderRadius: 2, boxShadow: 3 }}
    >
      {/* Left part of the card (Image Slider) */}
      <Box sx={{ position: "relative", width: 300, height: 200 }}>
        <CardMedia
          component="img"
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          image={property.imageUrl[currentImage]}
          alt={property.name}
        />
        {/* Image navigation buttons */}
        {property.imageUrl.length > 1 && (
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
      </Box>

      {/* Right part of the card (Property details) */}
      <CardContent sx={{ flex: 1, paddingLeft: 2 }}>
        <Typography variant="caption" fontWeight="bold">
          {property.size} • {property.type} • {property.roomNumber} bedrooms •{" "}
          {property.guests} guests
        </Typography>
        <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 1 }}>
          {truncateText(property.name, maxNameLength)}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: 0.5 }}
        >
          {property.location}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: 0.5 }}
        >
          {property.distance}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
          <StarIcon sx={{ color: "#fbc02d", marginRight: 0.5 }} />
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{ marginRight: 0.5 }}
          >
            {property.rating} Outstanding
          </Typography>
          <Typography variant="body2" color="textSecondary">
            ({property.reviews} rating{property.reviews > 1 ? "s" : ""})
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            from ${property.price}{" "}
            <Typography variant="body2" component="span">
              per night
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
            Cancel Request
          </Button>
        </Box>
        <ToastContainer position="bottom-center" />
      </CardContent>
    </Card>
  );
};

export default MyBookingCard;
