import React, { useState } from "react";
import {  Box } from "@mui/material";
import Header from "components/Header";
import OverviewChart from "components/OverviewChart";
import Daily from "components/notification";

const Overview = () => {
  const [view, setView] = useState("Real-time");

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="VISUAL REPRESENTATION"

      />
      <Box height="75vh">
        
      
        <OverviewChart view={view} setView={setView}  />
        <Daily />

        
      </Box>
    </Box>
  );
};

export default Overview;
