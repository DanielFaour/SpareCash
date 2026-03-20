import Goods from "./components/goods/Goods.jsx";
import "./App.css";

function App() {

  return (
    <>
      <div id="main_container">
        <div id="title">
          <h1>💸SpareCash Dashboard</h1>
          <h4>Track your repeated spendings.</h4>
        </div>
        <Goods />
      </div>
    </>
  );
}

export default App;
