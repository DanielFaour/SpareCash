import Goods from "./components/goods/Goods.jsx";
import Analytics from "./components/analytics/Analytics.jsx";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [goods, setGoods] = useState(() => {
    const savedGoods = localStorage.getItem("goods");
    if (savedGoods !== null) {
      const parsed = JSON.parse(savedGoods);
      return Array.isArray(parsed) ? parsed : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("goods", JSON.stringify(goods));
  }, [goods]);

  // Currencies
  const [currencies] = useState(["NOK", "USD", "EUR", "GBP"]);

  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    const savedCurrencySelection = localStorage.getItem("selectedCurrency");
    return savedCurrencySelection ?? "";
  });

  useEffect(() => {
    localStorage.setItem("selectedCurrency", selectedCurrency);
  }, [selectedCurrency]);

  // Savings input
  const [salary, setSalary] = useState(() => {
    const savedSalary = localStorage.getItem("salary");
    return savedSalary ?? "";
  });

  useEffect(() => {
    localStorage.setItem("salary", salary);
  }, [salary]);

  return (
    <>
      <div id="main_container">
        <div id="title">
          <h1>💸SpareCash Dashboard</h1>
          <h4>Track your repeated spendings.</h4>
        </div>
        <div id="data_container">
          <Analytics goods={goods} salary={salary} setSalary={setSalary} />
          <Goods goods={goods} setGoods={setGoods} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} currencies={currencies} />
        </div>
      </div>
    </>
  );
}

export default App;