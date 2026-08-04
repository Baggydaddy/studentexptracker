import { useState } from "react";
import Login from "./Login/login";
import Dashboard from "./dashboard/dashboard";
import Navbar from "./Navbar/Navbar";
import Budget from "./Budget/Budget";
import Transactions from "./Transactions/Transactions";
import Analytics from "./Analytics/Analytics";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("isLoggedIn") === "true";
    }
    return false;
  });
  const [currentRoute, setCurrentRoute] = useState("dashboard");

  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    window.localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.localStorage.removeItem("isLoggedIn");
    setCurrentRoute("dashboard");
  };

  const renderContent = () => {
    switch (currentRoute) {
      case "dashboard":
        return <Dashboard address="0x123...789" balance="2.5" />;
      case "transactions":
        return <Transactions />;
      case "budgets":
        return <Budget />;
      case "analytics":
        return <Analytics />;
      // Add other cases as needed
      default:
        return <Dashboard address="0x123...789" balance="2.5" />;
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Navbar
            walletAddress="0x123...789"
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
          {renderContent()}
        </>
      ) : (
        <Login onLoginSuccess={handleLogin} />
      )}
    </div>
  );
}
export default App;
