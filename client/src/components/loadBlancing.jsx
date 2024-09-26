import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, TextField, Select, MenuItem, Slider } from '@mui/material';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LoadBalancingRateLimiter = () => {
  const time_url = "";  // Add your API endpoint here
  const [ruleName, setRuleName] = useState('');
  const [serverUptime, setServerUptime] = useState(656);  // Dummy initial values
  const [serverDowntime, setServerDowntime] = useState(26);
  const [maxRequests, setMaxRequests] = useState(30);

  // Dummy data for graphs
  const data = [
    { name: 'Server 1', traffic: 400 },
    { name: 'Server 2', traffic: 300 },
    { name: 'Server 3', traffic: 300 },
    { name: 'Server 4', traffic: 200 },
  ];

  const handleRuleChange = (event) => {
    setRuleName(event.target.value);
    console.log(`Selected rule: ${event.target.value}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch uptime and downtime from the API
        const timeResponse = await fetch(time_url);
        const resolvedTimeData = await timeResponse.json();
        setServerUptime(Math.round(resolvedTimeData.uptime / 60));  // Convert from seconds to minutes
        setServerDowntime(Math.round(resolvedTimeData.downtime / 60));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={4}>

        {/* Load Balancer Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '30px', height: '100%' }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontSize: '22px', fontWeight: 'bold', color: '#FF5733' }} // Custom font size, weight, and color
            >
              Load Balancing Settings
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: '18px', fontWeight: '500', color: '#3498DB' }} // Custom styling
            >
              Traffic Distribution Rules:
            </Typography>
            <TextField
              fullWidth
              label="Rule Name"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              sx={{ marginBottom: '20px' }}
            />
            <Select fullWidth value={ruleName} onChange={handleRuleChange}>
              <MenuItem value="roundRobin">Round Robin</MenuItem>
              <MenuItem value="leastConnections">Least Connections</MenuItem>
            </Select>
            <Typography sx={{ marginTop: '20px', fontSize: '16px', color: '#2ECC71' }}>
              Selected Rule: {ruleName || "None"}
            </Typography>
          </Paper>
        </Grid>

        {/* Rate Limiter Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '30px', height: '100%' }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontSize: '22px', fontWeight: 'bold', color: '#FF5733' }} // Updated font style
            >
              Rate Limiting Settings
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: '18px', color: '#3498DB' }} // Updated font style
            >
              Set Max Requests per Second:
            </Typography>
            <Slider
              value={maxRequests}
              onChange={(e, value) => setMaxRequests(value)}
              aria-label="Rate Limit"
              valueLabelDisplay="auto"
              step={10}
              marks
              min={10}
              max={100}
              sx={{ marginTop: '20px' }}
            />
          </Paper>
        </Grid>

        {/* Uptime and Downtime Section */}
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: '30px', height: '100%' }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontSize: '20px', fontWeight: 'bold', color: '#E74C3C' }} // Updated font style
              >
                Server Uptime
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.5rem', color: '#2ECC71' }}>
                Uptime: {serverUptime} minutes
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: '30px', height: '100%' }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontSize: '20px', fontWeight: 'bold', color: '#E74C3C' }} // Updated font style
              >
                Server Downtime
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.5rem', color: '#E74C3C' }}>
                Downtime: {serverDowntime} minutes
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Traffic Distribution Graph */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: '30px', height: '100%' }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontSize: '22px', fontWeight: 'bold', color: '#FF5733' }} // Updated font style
            >
              Traffic Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie dataKey="traffic" data={data} fill="#8884d8" label>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#00C49F' : '#FFBB28'} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Server Load Graph */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: '30px', height: '100%' }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontSize: '22px', fontWeight: 'bold', color: '#FF5733' }} // Updated font style
            >
              Server Load Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="traffic" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
};

export default LoadBalancingRateLimiter;