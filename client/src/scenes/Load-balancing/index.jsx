import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, TextField, Select, MenuItem, Slider } from '@mui/material';
import Chart from 'react-apexcharts';  // ApexCharts React wrapper
import Footer from 'components/footer';
const LoadBalancingRateLimiter = () => {
  const time_url = '';  // Add your API endpoint here
  const [ruleName, setRuleName] = useState('');
  const [serverUptime, setServerUptime] = useState(656);  // Dummy initial values
  const [serverDowntime, setServerDowntime] = useState(26);
  const [maxRequests, setMaxRequests] = useState(30);

  const handleRuleChange = (event) => {
    setRuleName(event.target.value);
    console.log(`Selected rule: ${event.target.value}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timeResponse = await fetch(time_url);
        const resolvedTimeData = await timeResponse.json();
        setServerUptime(Math.round(resolvedTimeData.uptime / 60));  // Convert from seconds to minutes
        setServerDowntime(Math.round(resolvedTimeData.downtime / 60));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Mock data for data distribution (replace this with actual API data)
  const dataDistributionSeries = [70, 60, 50, 90];  // Example percentages for data distribution
  const dataDistributionLabels = ['Database', 'Cache', 'App Server', 'Web Server'];

  // Radial chart options for data distribution
  const radialOptions = {
    series: dataDistributionSeries,
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
            color: '#00E5FF',  // Main heading color
          },
          value: {
            fontSize: '16px',
            color: '#FFFFFF',  // Subtitle color (white)
          },
          total: {
            show: true,
            label: 'Total Distribution',
            formatter: function () {
              return dataDistributionSeries.reduce((acc, curr) => acc + curr, 0); // Sum of all series
            },
            color: '#FFFFFF',  // Total label color (white)
          },
        },
      },
    },
    labels: dataDistributionLabels,
    colors: ['#00E5FF', '#FFBB28', '#FF8042', '#0088FE'],  // Color scheme for the radial chart
  };

  // Line chart (mock data, can be replaced)
  const lineOptions = {
    series: [{
      name: 'Server Load',
      data: [400, 300, 300, 200],
    }],
    chart: {
      height: 400,
      type: 'line',
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: ['Server 1', 'Server 2', 'Server 3', 'Server 4'],
      labels: {
        style: {
          colors: ['#FFFFFF', '#FFFFFF','#FFFFFF','#FFFFFF',],  // White for Server 1, black for others
        },
      },
    },
    
    title: {
      text: 'Server Load Over Time',
      align: 'center',
      style: {
        color: '#00E5FF', // Main heading color
        fontSize: '22px',
      },
    },
    yaxis: {
      labels: {
          style: {
              colors: ['#FFFFFF'],  // Y-axis labels color set to white
          },
      },
  },
    tooltip: {
      theme: 'dark',
    },
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={4}>

        {/* Load Balancer Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '30px', height: '100%' }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontSize: '22px', fontWeight: 'bold', color: '#00E5FF' }}  // Updated to #00E5FF
            >
              Load Balancing Settings
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '18px', color: '#FFFFFF' }}>
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
            <Typography sx={{ marginTop: '20px', fontSize: '16px', color: '#FFFFFF' }}>
              Selected Rule: {ruleName || 'None'}
            </Typography>
          </Paper>
        </Grid>

        {/* Rate Limiter Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '30px', height: '100%' }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontSize: '22px', fontWeight: 'bold', color: '#00E5FF' }}  // Updated to #00E5FF
            >
              Rate Limiting Settings
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '18px', color: '#FFFFFF' }}>
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
                sx={{ fontSize: '20px', fontWeight: 'bold', color: '#00E5FF' }}  // Updated to #00E5FF
              >
                Server Uptime
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.5rem', color: '#FFFFFF' }}>
                Uptime: {serverUptime} minutes
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: '30px', height: '100%' }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontSize: '20px', fontWeight: 'bold', color: '#00E5FF' }}  // Updated to #00E5FF
              >
                Server Downtime
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.5rem', color: '#FFFFFF' }}>
                Downtime: {serverDowntime} minutes
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Data Distribution Radial Chart */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: '30px', height: '100%' }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontSize: '22px', fontWeight: 'bold', color: '#00E5FF' }}  // Updated to #00E5FF
            >
              Data Distribution
            </Typography>
            <Chart options={radialOptions} series={radialOptions.series} type="radialBar" height={350} />
          </Paper>
        </Grid>

        {/* Server Load Line Chart */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: '30px', height: '100%' }}>
            <Chart options={lineOptions} series={lineOptions.series} type="line" height={400} />
          </Paper>
        </Grid>

      </Grid>
      <Footer />
    </Box>
  );
};

export default LoadBalancingRateLimiter;
