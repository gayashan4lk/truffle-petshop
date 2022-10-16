import { EthProvider } from "./contexts/EthContext";
import "./App.css";
import Body from "./components/Body";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <h1 style={{ textAlign: "center" }}>PetShop</h1>
          <div className="petcontainer">
            <Body />
          </div>
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
