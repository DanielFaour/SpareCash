import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const SavingsChart = ({ goods }) => {
  const data = goods.goods;

  useEffect(() => {
    const uniqueOptionCost = calculateUniqueOptionCost(data);
    console.log(uniqueOptionCost);
    setState((prev) => ({
      options: {
        ...prev.options,
        xaxis: {
          ...prev.options.xaxis,
          categories: uniqueOptionCost.map((obj) => obj.type),
        },
      },
      series: [
        {
          name: "Cost by Type",
          data: uniqueOptionCost.map((obj) => obj.cost),
        },
      ],
    }));
  }, [goods]);

  function calculateUniqueOptionCost(data) {
    const options = data.map((items) => items.type);
    const uniqueOptions = [...new Set(options)];

    return uniqueOptions.map((type) => {
      const totalTypeCost = data
        .filter((item) => item.type === type)
        .reduce((sum, item) => sum + (item.price || 0), 0);
      return { type, cost: totalTypeCost };
    });
  }

  const [state, setState] = React.useState({
    
  options: {
    tooltip: {
      style: {
        fontSize: "18px",
      }
    },
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      labels: {
        style: {
          fontSize: "18px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "18px",
        },
      },
    },
    dataLabels: {
      style: {
        fontSize: "18px",
      },
    },
  },
  series: [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ],
});


  return (
    <div>
      <div id="SavingsChartChart">
        <Chart
          options={state.options}
          series={state.series}
          type="line"
          width="1000"
          height={"500px"}
        />
      </div>
    </div>
  );
};

export default SavingsChart;
