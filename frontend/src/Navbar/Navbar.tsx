import React from "react";
import "./Navbar.css";

type NavbarProps = {
  walletAddress?: string;
  avatarUrl?: string;
  onNavigate: (route: string) => void;
  onLogout?: () => void;
};

const Navbar: React.FC<NavbarProps> = ({
  walletAddress,
  avatarUrl,
  onNavigate,
  onLogout,
}) => {
  const [active, setActive] = React.useState("dashboard");

  const short = (addr?: string) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "Not connected";

  const handleNav = (route: string) => {
    setActive(route);
    onNavigate(route);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <div className="navbar-logo">Logo</div>

        <nav className="navbar-links">
          {["dashboard", "transactions", "budgets", "analytics"].map((item) => (
            <button
              key={item}
              className={active === item ? "active" : ""}
              onClick={() => handleNav(item)}>
              <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="navbar-right">
        {avatarUrl ? (
          <img src={avatarUrl} alt="avatar" className="navbar-avatar" />
        ) : (
          <div className="avatar-placeholder" />
        )}
        <div className="wallet-address">{short(walletAddress)}</div>
        {onLogout && (
          <button className="navbar-logout-btn" onClick={onLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
