import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from '@mui/material';
import { generateMockData } from "../utils/mockData";

const BlockedRequestsChart = () => {
  const theme = useTheme();
  const data = generateMockData();

  // Process the data to be used in the chart
  const chartData = data.reduce((acc, curr) => {
    const date = new Date(curr.time).toLocaleDateString(); // Use date in YYYY-MM-DD format
    if (!acc[date]) acc[date] = 0;
    if (curr.blocked) acc[date] += 1; // Count blocked requests

    return acc;
  }, {});

  const chartDataFormatted = Object.keys(chartData).map((key) => ({
    x: key,
    y: chartData[key],
  }));

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ResponsiveLine
        data={[
          {
            id: "Blocked Requests",
            data: chartDataFormatted,
          },
        ]}
        margin={{ top: 20, right: 20, bottom: 50, left: 60 }} // Adjusted margin to reduce height
        xScale={{ type: "point" }}
        yScale={{ type: "linear", stacked: false, min: "auto", max: "auto" }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 5,
          legend: '',
          legendOffset: 0,
          format: d => d, // Show date on x-axis
          tickRotation: -45, // Rotate x-axis labels for better readability
          style: {
            fontSize: 12,
            fill: '#4cc9f0', // Coolors color
          },
        }}
        axisLeft={{
          tickValues: 5,
          tickSize: 5,
          tickPadding: 5,
          legend: 'Number of Blocked Requests',
          legendPosition: 'middle',
          legendOffset: -40, // Reduced height of y-axis
          style: {
            fontSize: 12,
            fill: '#f72585', // Coolors color
          },
        }}
        colors={{ scheme: 'nivo' }} // Using Nivo color scheme
        pointSize={8} // Reduced point size
        pointColor={theme.palette.primary.main}
        pointBorderWidth={2}
        pointBorderColor={theme.palette.background.paper}
        pointLabelYOffset={-10}
        enableArea={true}
        enableSlices="x"
        areaOpacity={0.1}
        lineWidth={2} // Reduced line width
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 120,
            translateY: -40,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#7209b7', // Coolors color
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#4361ee', // Coolors color
                },
              },
            ],
          },
        ]}
        theme={{
          axis: {
            ticks: {
              text: {
                fontSize: 12,
                fill: '#4cc9f0', // Coolors color for tick labels
              },
            },
            legend: {
              text: {
                fontSize: 14,
                fill: '#4cc9f0', // Coolors color for legends
              },
            },
          },
          grid: {
            line: {
              stroke: '#3a0ca3', // Coolors color
            },
          },
        }}
      />
    </div>
  );
};

export default BlockedRequestsChart;
