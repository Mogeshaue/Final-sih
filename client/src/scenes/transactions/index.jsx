import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography, Collapse } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material"; // For down arrow icon
import axios from "axios";

const sampleData = [
  {
    timestamp: "2024-09-10T14:57:48.128Z",
    ipAddress: "::ffff:10.1.75.129",
    userAgent: "Fuzz Faster U Fool v2.1.0-dev",
    geoLocation: "Unknown",
    httpHeaders:
      '{"host":"10.1.75.201:3000","user-agent":"Fuzz Faster U Fool v2.1.0-dev","accept-encoding":"gzip"}',
    urlPath: "/_config.php",
    queryParameters: "{}",
    connectionDuration: "2149ms",
    referrer: "",
    cookies: "[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]",
    protocolType: "http",
    portNumber: "3000",
    trafficVolume: 0,
    sessionId: "",
    requestMethod: "GET",
    responseTime: 2149,
    statusCode: 302,
    requestPayloadSize: 0,
  },
  // Additional sample logs can be added here...
];

const Transactions = () => {
  // State for managing logs and expanded IPs
  const [logs, setLogs] = useState([]);
  const [expandedRows, setExpandedRows] = useState({}); // Tracks which rows are expanded
  const [isLoading, setIsLoading] = useState(true);

  // Fetch logs from the API (with error handling and fallback to sample data)
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("https://api.pradyun.me/logs");
        setLogs(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching logs, using sample data instead:", error);
        setLogs(sampleData); // Use sample data in case of error
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  // Toggle expanded state for a row
  const handleToggle = (ipAddress) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [ipAddress]: !prevExpandedRows[ipAddress],
    }));
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Typography variant="h4" gutterBottom>
        IP LOG DATA
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        List of IPs and log details
      </Typography>

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        logs.map((log) => (
          <Box
            key={log.ipAddress}
            mt="1rem"
            p="1rem"
            border="1px solid #ccc"
            borderRadius="8px"
          >
            {/* IP Address with toggle button */}
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="body1">
                <strong>IP Address:</strong> {log.ipAddress}
              </Typography>
              <IconButton onClick={() => handleToggle(log.ipAddress)}>
                {expandedRows[log.ipAddress] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>

            {/* Toggleable log details */}
            <Collapse in={expandedRows[log.ipAddress]}>
              <Box mt="1rem">
                <Typography>
                  <strong>Timestamp:</strong> {log.timestamp}
                </Typography>
                <Typography>
                  <strong>User Agent:</strong> {log.userAgent}
                </Typography>
                <Typography>
                  <strong>Geo Location:</strong> {log.geoLocation}
                </Typography>
                <Typography>
                  <strong>Response Time:</strong> {log.responseTime} ms
                </Typography>
                <Typography>
                  <strong>Request Method:</strong> {log.requestMethod}
                </Typography>
                <Typography>
                  <strong>Status Code:</strong> {log.statusCode}
                </Typography>
                <Typography>
                  <strong>URL Path:</strong> {log.urlPath}
                </Typography>
              </Box>
            </Collapse>
          </Box>
        ))
      )}
    </Box>
  );
};

export default Transactions;
