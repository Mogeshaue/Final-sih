import React, { useState, useEffect } from "react";
import { Box, FormControl, MenuItem, InputLabel, Select, Typography, TextField, Button } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";
import WAFSpikeDetectionGraph from "./spike-detection";
import Footer from "./footer";
// Helper function to generate random data
const generateRealTimeData = (size, interval, unit) => {
  const data = [];
  const currentTime = dayjs();
  for (let i = 0; i < size; i++) {
    data.push({
      value: Math.floor(Math.random() * 100),
      time: currentTime.subtract(size - i, unit).format(interval),
    });
  }
  return data;
};

const OverviewChart = () => {
  const [timeView, setTimeView] = useState("Hourly");
  const [graphType, setGraphType] = useState("line");
  const [lineData, setLineData] = useState([]);
  const [histogramData, setHistogramData] = useState([]);
  const [xAxisCategories, setXAxisCategories] = useState([]);

  useEffect(() => {
    let interval;

    if (timeView === "Real-time") {
      interval = setInterval(() => {
        const newData = generateRealTimeData(1, 'HH:mm:ss', 'second');
        setLineData((prevData) => {
          const updatedData = [...prevData, newData[0].value];
          return updatedData.slice(-10); // Keep last 10 data points
        });
        setHistogramData((prevData) => [...prevData, newData[0].value].slice(-10)); // Keep last 10 data points
        setXAxisCategories((prevCategories) => {
          const updatedCategories = [...prevCategories, newData[0].time];
          return updatedCategories.slice(-10); // Keep last 10 timestamps
        });
      }, 1000);
    } else {
      let size;
      let intervalUnit;
      let intervalFormat;

      if (timeView === "Hourly") {
        size = 24;
        intervalUnit = "hour";
        intervalFormat = "HH:mm";
      } else if (timeView === "Daily") {
        size = 30;
        intervalUnit = "day";
        intervalFormat = "MM-DD";
      } else if (timeView === "30 Days") {
        size = 30;
        intervalUnit = "day";
        intervalFormat = "MM-DD";
      } else if (timeView === "60 Days") {
        size = 60;
        intervalUnit = "day";
        intervalFormat = "MM-DD";
      } else if (timeView === "90 Days") {
        size = 90;
        intervalUnit = "day";
        intervalFormat = "MM-DD";
      }

      const staticData = generateRealTimeData(size, intervalFormat, intervalUnit);
      setLineData(staticData.map((data) => data.value));
      setHistogramData(staticData.map((data) => data.value));
      setXAxisCategories(staticData.map((data) => data.time));
    }

    return () => clearInterval(interval);
  }, [timeView]);

  const handleTimeViewChange = (value) => {
    setTimeView(value);
  };

  // Line chart options
  const lineChartOptions = {
    chart: {
      id: "line-chart",
      type: "line",
      height: 350,
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: { speed: 1000 },
      },
      zoom: { enabled: false },
      toolbar: {
        tools: {
          download: true, // Keep download option
        },
        background: '#000000', // Change toolbar background to black
      },
    },
    xaxis: {
      categories: xAxisCategories,
      labels: {
        style: {
          colors: '#FFFFFF', // X-axis labels white
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#FFFFFF', // Y-axis labels white
        },
      },
    },
    stroke: { curve: "smooth" },
    tooltip: {
      theme: 'dark',
      style: {
        backgroundColor: '#000000', // Black tooltip background
        color: '#FFFFFF', // White tooltip text
      },
    },
  };

  // Histogram chart options
  const histogramOptions = {
    chart: {
      id: "histogram",
      type: "bar",
      height: 350,
      toolbar: {
        tools: {
          download: true, // Enable download feature
        },
        background: '#000000', // Change toolbar background to black
      },
    },
    xaxis: {
      categories: xAxisCategories, // Set categories based on the real-time data
      labels: {
        style: {
          colors: '#FFFFFF', // X-axis labels white
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#FFFFFF', // Y-axis labels white
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <Box m="2rem" sx={{ backgroundColor: "#292929", padding: "1.5rem", borderRadius: "0.75rem", color: "white" }}>
      <Typography variant="h4" gutterBottom>
        DDoS Monitoring
      </Typography>

      <FormControl sx={{ mt: "1rem", minWidth: 120 }}>
        <InputLabel>Time View</InputLabel>
        <Select value={timeView} onChange={(e) => handleTimeViewChange(e.target.value)}>
          <MenuItem value="Real-time">Real-time</MenuItem>
          <MenuItem value="Hourly">Hourly</MenuItem>
          <MenuItem value="Daily">Day</MenuItem>
          <MenuItem value="30 Days">30 Days</MenuItem>
          <MenuItem value="60 Days">60 Days</MenuItem>
          <MenuItem value="90 Days">90 Days</MenuItem>
        </Select>
      </FormControl>

      <Box display="flex" justifyContent="flex-end" sx={{ mt: "1rem" }}>
        <TextField
          label="Graph Type"
          select
          value={graphType}
          onChange={(e) => setGraphType(e.target.value)}
          sx={{ width: "200px", backgroundColor: "#292929", borderRadius: "0.5rem" }}
        >
          <MenuItem value="line">Line Graph</MenuItem>
          <MenuItem value="histogram">Histogram</MenuItem>
          <MenuItem value="spike">Spike Detection</MenuItem>
        </TextField>
      </Box>

      <Box height="75vh" sx={{ mt: "1.5rem" }}>
        {graphType === "line" && (
          <ReactApexChart options={lineChartOptions} series={[{ name: "Requests", data: lineData }]} type="line" height={350} />
        )}
        {graphType === "histogram" && (
          <ReactApexChart options={histogramOptions} series={[{ name: "Blocked Requests", data: histogramData }]} type="bar" height={350} />
        )}
        {graphType === "spike" && (
          <WAFSpikeDetectionGraph timeView={timeView} />

        )}
      </Box>
     
    </Box>
    
  );
};

export default OverviewChart;
