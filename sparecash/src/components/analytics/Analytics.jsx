import { Component, useState, useEffect } from "react";
import Chart from "apexcharts";
import "./analytics.css";
import TypeCostPie from "./TypeCostPie.jsx";
import TypeRatoPie from "./TypeRatioPie.jsx";
import SavingsChart from "./SavingsChart.jsx";

function Analytics(goods) {
  return (
    <div id="analytics_container">
      <div className="wideChart">
        <h3>Savings chart:</h3>
        <SavingsChart goods={goods} />
      </div>
      <div className="smallChart">
        <h3>Goods type ratio:</h3>
        <TypeRatoPie goods={goods} />
      </div>
      <div className="smallChart">
        <h3>Cost per goods type:</h3>
        <TypeCostPie goods={goods} />
      </div>
    </div>
  );
}

export default Analytics;
