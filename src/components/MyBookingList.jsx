import React, { useEffect } from "react";
import { Box, Container, Pagination, Typography } from "@mui/material";
import { getProperties } from "../utils/utils";
import MyBookingCard from "./MyBookingCard";
// import { Api } from "../utils/api";

const MyBookingList = () => {
  const properties = getProperties();
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    // loadProperties();
  }, []);

  // const loadProperties = async () => {
  //   const response = await fetch(Api.GetPropertyList);
  //   const result = await response.json();
  //   console.log(result);

  // }

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
            <MyBookingCard key={property.id} property={property} />
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
