import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography, Collapse, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material"; // For down arrow icon
import axios from "axios";

const sampleData = [
  {
    timestamp: "2024-09-10T14:57:48.128Z",
    ipAddress: "::ffff:10.1.75.129",
    userAgent: "Fuzz Faster U Fool v2.1.0-dev",
    geoLocation: "Unknown",
    httpHeaders: '{"host":"10.1.75.201:3000","user-agent":"Fuzz Faster U Fool v2.1.0-dev","accept-encoding":"gzip"}',
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
  // Additional sample logs...
];

const Transactions = () => {
  // State for managing logs, expanded IPs, and search input
  const [logs, setLogs] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null); // Tracks which row is expanded
  const [searchInput, setSearchInput] = useState(""); // For search functionality
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
  

  // Handle search input change
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Toggle expanded state for a specific log entry (using IP address and timestamp)
  const handleToggle = (logId) => {
    setExpandedRows((prevExpanded) => (prevExpanded === logId ? null : logId));
  };

  // Filter logs based on search input
  const filteredLogs = logs.filter((log) =>
    log.ipAddress.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <Box m="1.5rem 2.5rem">
      <Typography variant="h4" gutterBottom>
        IP LOG DATA
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        List of IPs and log details
      </Typography>

      {/* Search Bar */}
      <Box mb="1rem">
        <TextField
          label="Search by IP"
          variant="outlined"
          fullWidth
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </Box>

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>IP Address</TableCell>
                <TableCell>Response Time (ms)</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLogs.map((log) => {
                const logId = `${log.responseTime}`; // Unique identifier

                return (
                  <React.Fragment key={logId}>
                    {/* Main Row */}
                    <TableRow>
                      <TableCell>{log.ipAddress}</TableCell>
                      <TableCell>{log.responseTime}</TableCell>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleToggle(logId)}>
                          {expandedRows === logId ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                      </TableCell>
                    </TableRow>

                    {/* Expanded Row with log details */}
                    <TableRow>
                      <TableCell colSpan={4} style={{ paddingBottom: 0, paddingTop: 0 }}>
                        <Collapse in={expandedRows === logId} timeout="auto" unmountOnExit>
                          <Box margin={2}>
                            <Typography>
                              <strong>User Agent:</strong> {log.userAgent}
                            </Typography>
                            <Typography>
                              <strong>Geo Location:</strong> {log.geoLocation}
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
                            

                              {log.queryParameters && log.queryParameters !=="{}" ? (
                              <Typography>
                                  <strong>Query Parameter:</strong> {log.queryParameters}
                              </Typography>

                              ):null}
                              
                            <Typography>
                              <strong>Connection Duration:</strong> {log.connectionDuration}
                            </Typography>
                            <Typography>
                              <strong>Request Type:</strong> {log.requestMethod}
                            </Typography>
                            <Typography>
                                  <strong>Status Code:</strong> {log.statusCode}
                                </Typography>

                                {log.cookies && log.cookies !== "[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]" ? (
                                  <Typography>
                                    <strong>Cookies:</strong> {log.cookies}
                                  </Typography>
                                ) : null}
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Transactions;
