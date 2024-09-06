import React from "react";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import OverviewChart from "components/OverviewChart";
import StatBox from "components/StatBox";
import BlockedRequestsChart from "components/BlockedRequestsChart";
import {  PointOfSale, Traffic } from "@mui/icons-material";
import { DownloadOutlined, QueryStats as QueryStatsIcon, DoDisturbAltRounded as DoDisturbAltRoundedIcon, StorageRounded as StorageRoundedIcon } from "@mui/icons-material";

const generateRandomIP = () => {
  return Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * 256))
    .join(".");
};

const generateRandomData = (count) => {
  const statuses = ["Success", "Failed", "Pending", "Blocked"];
  const getRandomStatus = () => statuses[Math.floor(Math.random() * statuses.length)];

  return Array.from({ length: count }, (_, id) => ({
    _id: id + 1,
    userId: generateRandomIP(),
    createdAt: new Date().toLocaleString(),
    serverIP: generateRandomIP(),
    requestStatus: getRandomStatus(),
    requestedTime: (Math.random() * 1000).toFixed(2),
  }));
};

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const navigate = useNavigate();

  const data = generateRandomData(500);
  const isLoading = false;

  const handleRowClick = (params) => {
    if (params.field === "userId") {
      navigate("/customers", { state: { ipAddress: params.value } });
    }
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User IP",
      flex: 1,
      renderCell: (params) => (
        <Button
          onClick={() => handleRowClick(params)}
          style={{ fontSize: "18px", color: "white" }} // Increased font size
        >
          {params.value}
        </Button>
      ),
    },
    {
      field: "requestStatus",
      headerName: "Request Status",
      flex: 1,
    },
    {
      field: "serverIP",
      headerName: "Server IP",
      flex: 1,
    },
    {
      field: "requestedTime",
      headerName: "Requested Time (ms)",
      flex: 1,
      renderCell: (params) => `${params.value} ms`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title={<Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>CYBER DASHBOARD</Typography>}
          subtitle={<Typography sx={{ fontSize: "18px" }}>Welcome to your Cyber dashboard</Typography>}
        />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "16px",
              fontWeight: "bold",
              padding: "12px 24px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="25px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
        justifyContent="center"
        gridRow="span 2"
      >
        {/* ROW 1 */}
        <Box gridColumn="span 3" display="flex" justifyContent="center">
    <StatBox
      title={<Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>Total Queries</Typography>}
      value={data.length}
      icon={<QueryStatsIcon sx={{ color: theme.palette.secondary[300], fontSize: "32px" }} />}
    />
  </Box>

  <Box gridColumn="span 3" display="flex" justifyContent="center">
    <StatBox
      title={<Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>Queries Blocked</Typography>}
      value={data.filter((row) => row.requestStatus === "Blocked").length}
      icon={<DoDisturbAltRoundedIcon sx={{ color: theme.palette.secondary[300], fontSize: "32px" }} />}
    />
  </Box>
  

  <Box gridColumn="span 3" display="flex" justifyContent="center">
    <StatBox
      title={<Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>Domains On Adlist</Typography>}
      value="15"
      icon={<StorageRoundedIcon sx={{ color: theme.palette.secondary[300], fontSize: "32px" }} />}
    />
  </Box>

  <Box gridColumn="span 3" display="flex" justifyContent="center">
    <StatBox
      title={<Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>Block %</Typography>}
      value="71%"
      icon={<StorageRoundedIcon sx={{ color: theme.palette.secondary[300], fontSize: "32px" }} />}
    />
  </Box>



        {/* Add BlockedRequestsChart here */}
        <Box
          gridColumn="span 15"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <BlockedRequestsChart />
        </Box>

        
      
        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
              fontSize: "16px", // Increased font size for cell text
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
              fontSize: "16px", // Increased font size for header text
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading}
            getRowId={(row) => row._id}
            rows={data}
            columns={columns}
          />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100], mb: "1rem", fontSize: "18px" }}>
            Server Status
          </Typography>

          <StatBox
            title={<Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>Server On Time</Typography>}
            value="123 Hours"
            icon={
              <PointOfSale
                sx={{ color: theme.palette.secondary[300], fontSize: "32px" }} // Increased icon size
              />
            }
          />

          <Box mt="1.5rem">
            <StatBox
              title={<Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>Server Off Time</Typography>}
              value="12 Hours"
              icon={
                <Traffic
                  sx={{ color: theme.palette.secondary[300], fontSize: "32px" }} // Increased icon size
                />
              }
            />
          </Box>
        </Box>

        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
