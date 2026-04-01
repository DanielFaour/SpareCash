import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const TypeCostPie = ({ goods }) => {
  const data = goods.goods;

  useEffect(() => {
    const uniqueOptionCost = calculateUniqueOptionCost(data);
    console.log(uniqueOptionCost);
    setState((prev) => ({
      ...prev,
      series: uniqueOptionCost.map((obj) => obj.cost),
      options: {
        ...prev.options,
        labels: uniqueOptionCost.map((obj) => obj.type),
      },
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
    series: [],
    options: {
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "16",
        },
      },
      legend: {
        fontSize: "18px",
      },
      chart: {
        width: 200,
        type: "pie",
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div>
      <div id="typeCostPieChart">
        <Chart
          options={state.options}
          series={state.series}
          type="pie"
          width={450}
        />
      </div>
    </div>
  );
};

export default TypeCostPie;
