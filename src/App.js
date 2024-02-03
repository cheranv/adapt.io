import "./App.css";
import TopNav from "./Components/TopNav";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Router";

function App() {
  return (
    <div className="App">
      <Router>
        <TopNav />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
