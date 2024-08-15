import React, { useEffect, useState } from "react";
import { Box, Container, Pagination, Typography } from "@mui/material";
import { getFromLocalStore } from "../utils/utils";
import MyBookingCard from "./MyBookingCard";
import { Api } from "../utils/api";

const MyBookingList = () => {
  const id = getFromLocalStore("user-id");
  const [properties, setProperties] = useState([]);
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    loadProperties(id);
  }, [id]);

  const loadProperties = async (id) => {
    const response = await fetch(Api.MyBookings(id));
    const result = await response.json();
    setProperties(result || []);
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 1 }}>
      <Typography variant="h4" gutterBottom>
        My Bookings
      </Typography>
      <Box>
        {/* Property Cards */}
        {properties
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((property) => (
            <MyBookingCard key={property.propertyID} property={property} />
          ))}

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default MyBookingList;
