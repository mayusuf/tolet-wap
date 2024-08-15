import React, { useEffect, useState } from "react";
import { Box, Container, Pagination } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import PropertyCard from "./PropertyCard";
import { Api } from "../utils/api";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  const [filters, setFilters] = useState({
    maxSize: "",
    maxRent: "",
    roomNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilter = () => {
    loadProperties(filters);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async (filters = {}) => {
    const response = await fetch(
      Api.GetPropertyList(
        filters?.maxSize ?? "",
        filters?.roomNumber ?? "",
        filters?.maxRent ?? ""
      )
    );
    const result = await response.json();

    if(result?.length) {
      setProperties(result);
    } else {
      setProperties([]);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "space-between",
          marginTop: 2,
          alignItems: "center",
        }}
      >
        <TextField
          label="Max Size"
          variant="outlined"
          name="maxSize"
          value={filters.maxSize}
          onChange={handleChange}
          sx={{ flex: "1 1 200px" }}
        />

        <TextField
          label="Max Rent"
          variant="outlined"
          name="maxRent"
          value={filters.maxRent}
          onChange={handleChange}
          sx={{ flex: "1 1 200px" }}
        />

        <FormControl sx={{ flex: "1 1 200px" }}>
          <InputLabel>Room Number</InputLabel>
          <Select
            label="Room Number"
            name="roomNumber"
            value={filters.roomNumber}
            onChange={handleChange}
            defaultValue=""
          >
            {[...Array(10).keys()].map((num) => (
              <MenuItem key={num + 1} value={num + 1}>
                {num + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Filter Button */}
        <Button
          variant="contained"
          onClick={handleFilter}
          sx={{
            backgroundColor: "#000000",
            color: "#FFFFFF",
            borderRadius: "30px",
            padding: "10px 20px",
            flex: "1 1 150px",
            textTransform: "none",
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "#333333",
            },
          }}
        >
          Filter
        </Button>
      </Box>

      <br></br>

      <Box>
        {/* Property Cards */}
        {properties
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((property) => (
            <PropertyCard key={property.propertyid} property={property} />
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

export default PropertyList;
