import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const SavingsInput = ({ goods, salary, setSalary }) => {
  const data = goods.goods;

  useEffect(() => {

  }, [salary]);

  function setSalary(salary) {
    setSalary = salary;
  }

  return (
    <div>
        <input
          type="int"
          placeholder="Write your monthly salary"
          className="salary_input"
          onChange={setSalary()}
        />
    </div>
  );
};

export default SavingsInput;
