import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

 const handleLogout = () => {
  localStorage.removeItem("token");   // ⭐ Token हट गया
  navigate("/Login");                 // ⭐ Redirect to Login
};


  return (
    <nav className="glass-navbar custom-nav">
      <div className="nav-left">

        {/* Mobile Hamburger */}
        <button
          className="header-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div className="brand-name text-white fw-bold"><h4>Adesh Web</h4></div>
      </div>

      {/* Desktop + Mobile menu */}
      <div className={`header-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="nav-text">Home</Link>
        <Link to="/Contact" className="nav-text">Contact</Link>
        <Link to="/Login" className="nav-text">Login Another</Link>
      </div>

      <button className="btn bg-danger logout-btn" onClick={handleLogout}>
        Log Out
      </button>
    </nav>
  );
}

export default Header;
