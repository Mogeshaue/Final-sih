import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Footer from "../../components/footer"

import StatBox from "components/StatBox";
import BlockedRequestsChart from "components/BlockedRequestsChart";
import { PointOfSale, Traffic } from "@mui/icons-material";
import { QueryStats as QueryStatsIcon, DoDisturbAltRounded as DoDisturbAltRoundedIcon, StorageRounded as StorageRoundedIcon, PanTool } from "@mui/icons-material";

const Health_url = "";
//const speed_url = "";
const time_url = "";
const top_url = "";

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

  const [data] = useState(generateRandomData(500));
  const [isLoading, setIsLoading] = useState(false);
  const [serverUptime, setServerUptime] = useState("656");
  const [serverDowntime, setServerDowntime] = useState("26");
  const [serverHealth, setServerHealth] = useState("Healthy");

  // State for the new data you want to show
  const [totalRequestsData, setTotalRequestsData] = useState("560");
  const [blockedRequestsData, setBlockedRequestsData] = useState("457");
  const [blockedPercentage, setBlockedPercentage] = useState("70 ");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch uptime and downtime
        const timeResponse = await fetch(time_url);
        const resolvedTimeData = await timeResponse.json();

        setServerUptime(Math.round(resolvedTimeData.uptime / 60));
        setServerDowntime(Math.round(resolvedTimeData.downtime / 60));

        // Fetch server health
        const healthResponse = await fetch(Health_url);
        const healthStatus = await healthResponse.json();
        setServerHealth(healthStatus.status);

        // Fetch network speed
        // const speedResponse = await fetch(speed_url);
        // const speedData = await speedResponse.json();

        // Fetch top data (total requests, blocked requests)
        const topResponse = await fetch(top_url);
        const topData = await topResponse.json();
        const { total_requests, blocked_requests } = topData;

        setTotalRequestsData(total_requests);
        setBlockedRequestsData(blocked_requests);

        // Calculate blocked percentage
        const percentage = ((blocked_requests / total_requests) * 100).toFixed(2);
        setBlockedPercentage(percentage);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);



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
          style={{ fontSize: "14px", color: "white" }}
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
          title={<Typography sx={{ fontSize: "34px", fontWeight: "bold" }}>CYBER DASHBOARD</Typography>}
          subtitle={<Typography sx={{ fontSize: "18px" }}>Welcome to your Cyber dashboard</Typography>}
        />

       
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="16px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
        justifyContent="center"
      >
        {/* Aligning the stat boxes in a single row */}
        <Box gridColumn="span 3" display="flex" justifyContent="center">
          <StatBox
            title={<Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>Total Queries</Typography>}
            value={
              <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
                {totalRequestsData}
              </Typography>
            }
            icon={<QueryStatsIcon sx={{ color: theme.palette.secondary[300], fontSize: "65px" }} />}
          />
        </Box>
        

        <Box gridColumn="span 3" display="flex" justifyContent="center">
          <StatBox
            title={<Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>Queries Blocked</Typography>}
            value={
              <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
                {blockedRequestsData}
              </Typography>
            }
            icon={<DoDisturbAltRoundedIcon sx={{ color: theme.palette.secondary[300], fontSize: "55px" }} />}
          />
        </Box>
        <Box gridColumn="span 3" display="flex" justifyContent="center">
          <StatBox
            title={<Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>Domains On Add list</Typography>}
            value={
              <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
                15
              </Typography>
            }
            icon={<StorageRoundedIcon sx={{ color: theme.palette.secondary[300], fontSize: "55px" }} />}
          />
        </Box>

        <Box gridColumn="span 3" display="flex" justifyContent="center">
          <StatBox
            title={<Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>Block %</Typography>}
            value={
              <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
                {blockedPercentage}%
              </Typography>
            }
            icon={<PanTool sx={{ color: theme.palette.secondary[300], fontSize: "55px" }} />}
          />
        </Box>
        {/* BlockedRequestsChart with updated styling */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          gridLineColor="white"
          backgroundColor="#292929"
          p="1rem"
          borderRadius="0.55rem"
        >
          <BlockedRequestsChart
            gridLineColor="white"
          />
        </Box>

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
              fontSize: "16px",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
              fontSize: "16px",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#292929",
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
            value={`${serverUptime} Hours`}
            icon={
              <PointOfSale
                sx={{ color: theme.palette.secondary[300], fontSize: "32px" }}
              />
            }
          />

          <Box mt="1.5rem">
            <StatBox
              title={<Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>Server Off Time</Typography>}
              value={`${serverDowntime} Hours`}
              icon={
                <Traffic
                  sx={{ color: theme.palette.secondary[300], fontSize: "32px" }}
                />
              }
            />
            <Box mt="1.5rem">
              <Typography variant="h6" sx={{ color: theme.palette.secondary[100], mb: "1rem", fontSize: "16px" }}>
                Server Health
              </Typography>
              <StatBox
                title={<Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>Health Status</Typography>}
                value={serverHealth}
                icon={
                  <PointOfSale
                    sx={{ color: theme.palette.secondary[300], fontSize: "32px" }}
                  />
                }
              />
            </Box>
          </Box>
          
         
        </Box>
       
      </Box>  
      <Footer  />
    </Box>

    
         
   
  
  );
};

export default Dashboard;
