import React, { useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { ResponsiveBar } from "@nivo/bar";

// Helper function to generate random blocked requests
const generateRandomData = () => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const randomData = months.map((month) => ({
    month,
    blockedRequests: Math.floor(Math.random() * 100) + 1, // Random value between 1 and 100
  }));
  return randomData;
};

const MonthlyBarChart = () => {
  const theme = useTheme();
  const data = generateRandomData(); // Random data for each month

  const formattedData = useMemo(() => {
    if (!data) return [];
    
    // Formatting data for the bar chart
    return data.map(({ month, blockedRequests }) => ({
      month,
      "Blocked Requests": blockedRequests, // Label for x-axis
    }));
  }, [data]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="MONTHLY BLOCKED REQUESTS" subtitle="Bar chart of monthly blocked requests" />
      <Box height="75vh">
        {data ? (
          <ResponsiveBar
            data={formattedData}
            keys={["Blocked Requests"]}
            indexBy="month"
            layout="horizontal" // Horizontal bar chart
            margin={{ top: 50, right: 50, bottom: 70, left: 100 }} // Adjust left margin for Y-axis labels
            padding={0.3}
            colors={{ scheme: "category10" }} // Use different colors for each bar
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: "white", // White color for axis line
                  },
                },
                legend: {
                  text: {
                    fill: "white", // White color for legends
                  },
                },
                ticks: {
                  line: {
                    stroke: "white", // White color for ticks
                    strokeWidth: 1,
                  },
                  text: {
                    fill: "white", // White color for tick labels
                  },
                },
              },
              legends: {
                text: {
                  fill: "white", // White color for legend text
                },
              },
              tooltip: {
                container: {
                  background: theme.palette.background.paper,
                  color: theme.palette.primary.main, // Color for tooltip text
                },
              },
            }}
            borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Blocked Requests",
              legendPosition: "middle",
              legendOffset: 50,
              tickColor: "white", // White color for x-axis tick labels
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Month",
              legendPosition: "middle",
              legendOffset: -70,
              tickColor: "white", // White color for y-axis tick labels
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default MonthlyBarChart;
