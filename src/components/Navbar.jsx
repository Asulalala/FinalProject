
import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa"; // small icon

export default function Navbar({ cartCount, onSearch, onCategorySelect, selectedCategory }) {
  const categories = ["All", "Food", "Clothes", "Drinks", "Snacks", "Gadgets"];

  return (
    <div style={navbarWrapper}>
      {/* Top Navbar */}
      <nav style={navStyle}>
        {/* Logo + Name */}
        <div style={logoStyle}>
          <FaShoppingBag style={{ marginRight: "8px" }} />
          <Link to="/" style={logoLinkStyle}>Product Management App</Link>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => onSearch(e.target.value)}
          style={searchBarStyle}
        />

        {/* Links */}
        <div style={linksStyle}>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/profile" style={linkStyle}>Profile</Link>
          <Link to="/customer-service" style={linkStyle}>💬 Support</Link>
          <Link to="/orders" style={linkStyle}>📦 Orders</Link>
          <Link to="/add-product" style={linkStyle}>Add Product</Link>
          <Link to="/cart" style={linkStyle}>Cart ({cartCount})</Link>
        </div>
      </nav>

     {/* Category Filter */}
      <div style={categoryContainer}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategorySelect(cat)}
            style={{
              ...categoryButton,
              backgroundColor: selectedCategory === cat ? "#007bff" : "#e6f0ff",
              color: selectedCategory === cat ? "#fff" : "#000",
              fontWeight: selectedCategory === cat ? "600" : "500",
              transform: selectedCategory === cat ? "scale(1.05)" : "scale(1)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

// Styles remain mostly the same
const navbarWrapper = {
  width: "100%",
  backgroundColor: "#0b5ed7",
  color: "#fff",
  boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
};

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 24px",
};

const logoStyle = {
  display: "flex",
  alignItems: "center",
  fontWeight: "700",
  fontSize: "24px",
};

const logoLinkStyle = {
  color: "#fff",
  textDecoration: "none",
};

const searchBarStyle = {
  flex: "1",
  maxWidth: "350px",
  margin: "0 20px",
  padding: "8px 14px",
  borderRadius: "8px",
  border: "none",
  fontSize: "14px",
  transition: "0.2s",
};

const linksStyle = {
  display: "flex",
  gap: "15px",
  flexWrap: "wrap",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "600",
  transition: "0.2s",
};

const categoryContainer = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  padding: "12px 0",
  backgroundColor: "#f0f4f9",
  gap: "10px",
  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)",
};

const categoryButton = {
  padding: "8px 16px",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "600",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  fontSize: "14px",
};