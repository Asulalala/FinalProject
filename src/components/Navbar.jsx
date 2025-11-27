
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
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

// Styles
const navbarWrapper = {
  width: "100%",
  backgroundColor: "#007bff",
  color: "#fff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
};

const logoStyle = {
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "22px",
};

const logoLinkStyle = {
  color: "#fff",
  textDecoration: "none",
};

const searchBarStyle = {
  flex: "1",
  maxWidth: "300px",
  margin: "0 20px",
  padding: "6px 10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const linksStyle = {
  display: "flex",
  gap: "20px",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "500",
};

const categoryContainer = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  padding: "8px 0",
  backgroundColor: "#f8f9fa",
  gap: "10px",
};

const categoryButton = {
  padding: "6px 14px",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "500",
  transition: "0.2s",
};
