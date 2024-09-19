import React, { useMemo, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Daily = () => {
  const [startDate, setStartDate] = useState(new Date("2021-02-01"));
  const [endDate, setEndDate] = useState(new Date("2021-03-01"));
  
  const data = {
    dailyData: [
      { date: "2021-02-01", blockedRequests: 120 },
      { date: "2021-02-02", blockedRequests: 80 },
      { date: "2021-02-03", blockedRequests: 110 },
      { date: "2021-02-04", blockedRequests: 90 },
      { date: "2021-02-05", blockedRequests: 70 },
      { date: "2021-02-06", blockedRequests: 100 },
      { date: "2021-02-07", blockedRequests: 130 }
    ]
  };

  const chartData = useMemo(() => {
    const { dailyData } = data;

    const filteredData = dailyData.filter(({ date }) => {
      const dateFormatted = new Date(date);
      return dateFormatted >= startDate && dateFormatted <= endDate;
    });

    return filteredData.map(({ date, blockedRequests }) => ({
      x: new Date(date),
      y: blockedRequests
    }));
  }, [data, startDate, endDate]);

  const options = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Blocked Requests Over Time"
    },
    axisX: {
      valueFormatString: "DD MMM",
      intervalType: "day",
      interval: 1,
      title: "Time",
      labelFontColor: "white",
    },
    axisY: {
      title: "Blocked Requests",
      labelFontColor: "white",
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      itemclick: function (e) {
        if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      }
    },
    data: [{
      type: "line",
      name: "Blocked Requests",
      showInLegend: true,
      yValueFormatString: "#,### requests",
      dataPoints: chartData,
      lineColor: "#4F81BC", // Same color as in your previous chart
      color: "#4F81BC",
    }]
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default Daily;
