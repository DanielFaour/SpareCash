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

  // const [types, setTypes] = useState(() => {
  //   const savedTypes = localStorage.getItem("types");
  //   if (savedTypes !== null) {
  //     const parsed = JSON.parse(savedTypes);
  //     return Array.isArray(parsed) ? parsed : [];
  //   }
  //   return [];
  // });

  // useEffect(() => {
  //   localStorage.setItem("types", JSON.stringify(types))
  // }, [types]);

  const [types] = useState(["Nicotine", "Alcohol", "Soda", "Candy"]);
  const [selectedType, setSelectedType] = useState("");

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

  return (
    <div id="goods_container">
      <h2>Consumer Goods</h2>
      {/* <p>Add consumer goods:</p> */}
      <input type="text" placeholder="Name" id="name_input" />
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="" defaultValue hidden>
          Select type
        </option>
        {types.map((type, index) => (
          <option key={index} value={type}>{type}</option>
        ))}
      </select>
      <input type="number" placeholder="Price" id="price_input" />
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
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.price}</td>
              <td onClick={() => removeItem(index)}>X</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>You have {goods.length} items</p>
    </div>
  );
}

export default Goods;
