import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "/index.css";
import Dashboard from "./pages/Dashboard";
import Withdraw from "./pages/Withdraw";
import Solde from "./pages/Solde";
import Transfer from "./pages/Transfer";
import Deposit from "./pages/Deposit";
import Pin from "./pages/Pin";
import Settings from "./pages/Settings";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/withdraw" element={<Withdraw />} />
        <Route path="/dashboard/solde" element={<Solde />} />
        <Route path="/dashboard/transfer" element={<Transfer />} />
        <Route path="/dashboard/deposit" element={<Deposit />} />
        <Route path="/dashboard/pin" element={<Pin />} />
        <Route path="/dashboard/settings" element={<Settings />} />
      </Routes>
    </main>
  );
}

export default App;
