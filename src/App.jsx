import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/features" element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;
