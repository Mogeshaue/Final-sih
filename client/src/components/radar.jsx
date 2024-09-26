import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box } from '@mui/material';

const WAFVisualization = () => {
    // Function to generate timestamps for the past 5 hours
    const getLastFiveHours = () => {
        const currentTime = new Date();
        const timeStamps = [];

        for (let i = 5; i >= 0; i--) {
            const time = new Date(currentTime);
            time.setHours(currentTime.getHours() - i);
            timeStamps.push(time.toISOString()); // Convert to ISO string for chart x-axis
        }

        return timeStamps;
    };

    // Function to generate random data for UDP, HTTP, and TCP
    const generateRandomData = () => {
        return Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 20); // Random data between 20 and 120
    };

    const [areaSeries, setAreaSeries] = useState([]);

    const areaOptions = {
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: true,
                tools: {
                    download: true,  // Enable download feature
                },
            },
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            type: 'datetime',
            categories: getLastFiveHours(),  // Set the past 5 hours timestamps dynamically
            labels: {
                style: {
                    colors: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],  // X-axis labels color set to white
                },
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
            theme: 'dark',  // Dark theme tooltip
            x: {
                format: 'HH:mm',  // Format the x-axis time for tooltip
            },
            style: {
                backgroundColor: '#FFFFFF',  // Tooltip background color set to white
                color: '#000000',  // Tooltip text color set to black for readability
            },
        },
        title: {
            text: 'Network Layer Protection',
            align: 'center',
            style: {
                color: '#FFFFFF',  // Title color set to white
                fontSize: '22px',
            },
        },
        legend: {
            labels: {
                colors: ['#FFFFFF','#FFFFFF','#FFFFFF',],  // Legend labels color set to white (front color of graph)
            },
        },
        grid: {
            borderColor: '#90A4AE',  // Adjust grid color if necessary
        },
        fill: {
            opacity: 0.8,  // Set fill opacity for better visibility of chart data
        },
        colors: ['#FF5733', '#33FF57', '#3357FF'],  // Custom colors for UDP, HTTP, and TCP
    };

    useEffect(() => {
        // Set the series data with random data for UDP, HTTP, and TCP
        setAreaSeries([
            {
                name: 'UDP',
                data: generateRandomData(),
            },
            {
                name: 'HTTP',
                data: generateRandomData(),
            },
            {
                name: 'TCP',
                data: generateRandomData(),
            }
        ]);
    }, []);  // Fetch new data only on component mount

    return (
        <Box sx={{ boxShadow: 3, padding: 2 }}>
            {/* Apex Area Chart */}
            <ReactApexChart options={areaOptions} series={areaSeries} type="area" height={350} />
        </Box>
    );
};

export default WAFVisualization;
