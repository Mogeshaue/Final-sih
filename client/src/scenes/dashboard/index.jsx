import React from "react";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import OverviewChart from "components/OverviewChart";
import StatBox from "components/StatBox";
import BlockedRequestsChart from "components/BlockedRequestsChart";
import { Email, PointOfSale, Traffic } from "@mui/icons-material";
import { DownloadOutlined } from "@mui/icons-material";

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
        <Button onClick={() => handleRowClick(params)}>{params.value}</Button>
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
        <Header title="CYBER DASHBOARD" subtitle="Welcome to your Cyber dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
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
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Queries"
          value={data.length}
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Queries Blocked"
          value={data.filter((row) => row.requestStatus === "Blocked").length}
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* Add BlockedRequestsChart here */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <BlockedRequestsChart />
        </Box>

        <StatBox
          title="Domains On Adlist"
          value="15"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

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
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100], mb: "1rem" }}>
            Server Status
          </Typography>

          <StatBox
            title="Server On Time"
            value="123 Hours"
            icon={
              <PointOfSale
                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
              />
            }
          />

          <Box mt="1.5rem">
            <StatBox
              title="Server Off Time"
              value="12 Hours"
              icon={
                <Traffic
                  sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Box>

        {/* Moved OverviewChart to the desired box */}
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
