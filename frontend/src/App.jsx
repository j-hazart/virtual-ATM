import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import "/index.css";
import Dashboard from "./pages/Dashboard";
import Withdraw from "./pages/Withdraw";
import Solde from "./pages/Solde";
import Transfer from "./pages/Transfer";
import Deposit from "./pages/Deposit";
import Pin from "./pages/Pin";
import Settings from "./pages/Settings";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <main>
      <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === "https:"}
      >
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
      </AuthProvider>
      <ToastContainer />
    </main>
  );
}

export default App;
