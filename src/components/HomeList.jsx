import React from "react";
import { Container } from "@mui/material";
import HomeFilters from "./HomeFilters";
import PropertyList from "./PropertyList";

const HomeList = () => {
  return (
    <Container maxWidth="lg">
      <HomeFilters />
      <br></br>
      <PropertyList />
    </Container>
  );
};

export default HomeList;
