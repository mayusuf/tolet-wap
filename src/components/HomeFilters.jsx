import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const HomeFilters = () => {
  return (
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
        sx={{ flex: "1 1 200px" }}
      />

      <TextField
        label="Max Rent"
        variant="outlined"
        sx={{ flex: "1 1 200px" }}
      />

      <FormControl sx={{ flex: "1 1 200px" }}>
        <InputLabel>Room Number</InputLabel>
        <Select label="Room Number" defaultValue="">
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
  );
};

export default HomeFilters;
