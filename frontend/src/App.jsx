import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./styles/index.css";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  );
}

export default App;
