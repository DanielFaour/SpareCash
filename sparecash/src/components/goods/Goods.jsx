import { useState, useEffect } from "react";
import "./goods.css";

class GoodsItem {
  constructor(name, type, price) {
    this.name = name;
    this.type = type;
    this.price = price;
  }
}

function Goods() {
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

  const [types] = useState(["Nicotine", "Alcohol", "Soda", "Candy"]);
  const [selectedType, setSelectedType] = useState("");

  const [currencies] = useState(["NOK", "USD", "EUR", "GBP"]);

  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    const savedCurrencySelection = localStorage.getItem("selectedCurrency");
    return savedCurrencySelection ?? "";
  });

  useEffect(() => {
    localStorage.setItem("selectedCurrency", selectedCurrency);
  }, [selectedCurrency]);

  function addItem() {
    const nameInput = document.getElementById("name_input");
    const priceInput = document.getElementById("price_input");
    const name = nameInput.value.trim();
    const type = selectedType;
    const price = parseFloat(priceInput.value);
    if (name === "" || type === "" || isNaN(price)) {
      alert("Please fill in all fields with valid values.");
      return;
    }
    const newItem = new GoodsItem(name, type, price);
    setGoods([...goods, newItem]);
    clearInputs();
  }

  function clearInputs() {
    const nameInput = document.getElementById("name_input");
    const priceInput = document.getElementById("price_input");

    nameInput.value = "";
    setSelectedType("");
    priceInput.value = "";
  }

  function removeItem(index) {
    setGoods(goods.filter((_, i) => i !== index));
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function sumItems(goods){
    let sum = 0;
    goods.map((items) => {
      sum += items.price;
    });
    return sum;
  }

  return (
    <div id="goods_container">
      <h2>Consumer Goods Overview</h2>
      {/* <p>Add consumer goods:</p> */}
      <input type="text" placeholder="Item name" id="name_input" />
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="" defaultValue hidden>
          Select type
        </option>
        {types.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
      <input type="number" placeholder="Weekly cost" id="price_input" />
      <select
        value={selectedCurrency}
        onChange={(e) => setSelectedCurrency(e.target.value)}
      >
        <option value="" defaultValue hidden>
          Select currency
        </option>
        {currencies.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          addItem();
        }}
      >
        Add Item
      </button>
      <br></br>
      <br></br>
      {/* Goods Table */}
      <table id="items_table">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
          {goods.map((item, index) => (
            <tr key={index}>
              <td>{capitalizeFirstLetter(item.name)}</td>
              <td>{item.type}</td>
              <td>
                {item.price} {selectedCurrency ? selectedCurrency : ""}
              </td>
              <td onClick={() => removeItem(index)}>X</td>
            </tr>
          ))}
          <tr>
            <td>Overall weekly cost</td>
            <td></td>
            <td>
              {sumItems(goods)} {selectedCurrency ? selectedCurrency : ""}
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <p>You have {goods.length} items.</p>
    </div>
  );
}

export default Goods;
