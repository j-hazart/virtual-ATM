import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";
import { RequireAuth } from "react-auth-kit";
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
          <Route
            path={"/dashboard"}
            element={
              <RequireAuth loginPath={"/"}>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path={"/dashboard/withdraw"}
            element={
              <RequireAuth loginPath={"/"}>
                <Withdraw />
              </RequireAuth>
            }
          />
          <Route
            path={"/dashboard/solde"}
            element={
              <RequireAuth loginPath={"/"}>
                <Solde />
              </RequireAuth>
            }
          />
          <Route
            path={"/dashboard/transfer"}
            element={
              <RequireAuth loginPath={"/"}>
                <Transfer />
              </RequireAuth>
            }
          />
          <Route
            path={"/dashboard/deposit"}
            element={
              <RequireAuth loginPath={"/"}>
                <Deposit />
              </RequireAuth>
            }
          />
          <Route
            path={"/dashboard/pin"}
            element={
              <RequireAuth loginPath={"/"}>
                <Pin />
              </RequireAuth>
            }
          />
          <Route
            path={"/dashboard/settings"}
            element={
              <RequireAuth loginPath={"/"}>
                <Settings />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
      <ToastContainer />
    </main>
  );
}

export default App;
