import { useState, useEffect } from "react";
import "./goods.css";

class GoodsItem {
  constructor(name, type, price) {
    this.name = name;
    this.type = type;
    this.price = price;
  }
}
// Goods
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

  // Types
  const [types] = useState(["Nicotine", "Alcohol", "Soda", "Candy"]);
  const [selectedType, setSelectedType] = useState("");

  // Currencies
  const [currencies] = useState(["NOK", "USD", "EUR", "GBP"]);

  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    const savedCurrencySelection = localStorage.getItem("selectedCurrency");
    return savedCurrencySelection ?? "";
  });

  useEffect(() => {
    localStorage.setItem("selectedCurrency", selectedCurrency);
  }, [selectedCurrency]);

  // Goods handling
  function addItem() {
    const nameInput = document.getElementById("name_input");
    const priceInput = document.getElementById("price_input");
    const name = nameInput.value.trim();
    const type = selectedType;
    const price = parseFloat(priceInput.value);
    if (name === "" || type === "" || isNaN(price) || price < 0) {
      alert("Please fill in all fields with valid values.");
      return;
    }
    const newItem = new GoodsItem(name, type, price);
    setGoods([...goods, newItem]);
    clearInputs();
  }

  function removeItem(index) {
    setGoods(goods.filter((_, i) => i !== index));
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function sumItems(goods) {
    let sum = 0;
    goods.map((items) => {
      sum += items.price;
    });
    return sum;
  }

  // input clearing
  function clearInputs() {
    const nameInput = document.getElementById("name_input");
    const priceInput = document.getElementById("price_input");

    nameInput.value = "";
    setSelectedType("");
    priceInput.value = "";
  }

  // Sorting
  const [nameSortState, setNameSortState] = useState(() => {
    const savedNameState = localStorage.getItem("nameSortState");
    if (savedNameState !== null) {
      return savedNameState ?? "";
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("nameSortState", JSON.stringify(nameSortState));
  }, [nameSortState]);

  function sortGoods(sortValue) {
    let sorted = null;

    switch (sortValue) {
      case "nSort":
        if (nameSortState === "asc") {
          sorted = [...goods].sort((a, b) => b.name.localeCompare(a.name));
          setNameSortState("desc");
          sortButton();
        } else {
          sorted = [...goods].sort((a, b) => a.name.localeCompare(b.name));
          setNameSortState("asc");
          sortButton();
        }
    }
    setGoods(sorted);
  }

  function sortButton() {
    const sortButton = document.getElementById("sortNameButton");
    if (nameSortState === "asc") {
      sortButton.innerText = "▲";
    } else {
      sortButton.innerText = "▼";
    }
  }

  return (
    <div id="goods_container">
      <h2>Consumer Goods Overview</h2>
      {/* <p>Add consumer goods:</p> */}
      <div id="goodsInputContainer">
        <input
          type="text"
          placeholder="Item name"
          id="name_input"
          className="goods_input"
        />
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="goods_input"
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
        <input
          type="number"
          placeholder="Weekly cost"
          id="price_input"
          className="goods_input"
        />
        <button
          onClick={() => {
            addItem();
          }}
          className="goods_input"
        >
          Add Item
        </button>
        <div id="currencyContainer">
          <p>Select currency:</p>
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="goods_input"
            id="currency_input"
          >
            <option value="" defaultValue hidden>
             
            </option>
            {currencies.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table id="items_table">
        <tbody>
          <tr>
            <th>
              Name{" "}
              <span
                id="sortNameButton"
                className="sortButton"
                onClick={() => sortGoods("nSort")}
              >
                ◆ 
              </span>
            </th>
            <th>Type</th>
            <th>Price</th>
            <th></th>
          </tr>
          {goods.map((item, index) => (
            <tr key={index}>
              <td>{capitalizeFirstLetter(item.name)}</td>
              <td>{item.type}</td>
              <td>
                {item.price} {selectedCurrency ? selectedCurrency : ""}
              </td>
              <td>
                <button id="deleteButton" onClick={() => removeItem(index)}>
                  <span id="delete_icon"></span>
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td>Overall weekly cost:</td>
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
