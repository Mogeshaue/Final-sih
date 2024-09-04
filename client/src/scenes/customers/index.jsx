import React from "react";
import { useLocation } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// Example mock data for demonstration
const mockData = Array.from({ length: 500 }, (_, id) => ({
  _id: id + 1,
  userId: `192.168.1.${id % 256}`,
  createdAt: new Date().toLocaleString(),
  serverIP: `10.0.0.${id % 256}`,
  requestStatus: id % 2 === 0 ? "Blocked" : "Allowed",
  requestedTime: (Math.random() * 1000).toFixed(2),
}));

const Customers = () => {
  const theme = useTheme();
  const location = useLocation();
  const { ipAddress } = location.state || {};

  const filteredData = mockData.filter(row => row.userId === ipAddress);

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "userId", headerName: "Requested IP", flex: 1 },
    { field: "serverIP", headerName: "Server IP", flex: 1 },
    { field: "requestStatus", headerName: "Request Status", flex: 1 },
    { field: "requestedTime", headerName: "Requested Time (ms)", flex: 1 },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Requested IP Details" subtitle={`Details for IP: ${ipAddress}`} />
      </FlexBetween>
      <Box
        mt="20px"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            borderRadius: "5rem",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.background.alt,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
        }}
      >
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </Box>
    </Box>
  );
};

export default Customers;
