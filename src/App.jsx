import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductTable from "./components/ProductTable";
import ProductDetail from "./components/ProductDetail";
import AddProductForm from "./components/AddProductForm";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import UserProfile from "./components/UserProfile";
import CustomerService from "./components/CustomerService";
import OrderManagement from "./components/OrderManagement";

import productsData from "./data/products";

export default function App() {
  // Products state
  const [products, setProducts] = useState(productsData);
  // Cart state
  const [cartItems, setCartItems] = useState([]);
  // View mode: "card" or "table"
  const [view, setView] = useState("card");
  // Search & category filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  // Sort state
  const [sortBy, setSortBy] = useState("name"); // "name", "price-asc", "price-desc"

  // Add product to cart
  const handleAddToCart = (productWithQuantity) => {
    const index = cartItems.findIndex((p) => p.id === productWithQuantity.id);
    if (index > -1) {
      const updatedCart = [...cartItems];
      updatedCart[index].quantity += productWithQuantity.quantity;
      setCartItems(updatedCart);
    } else {
      setCartItems((prev) => [...prev, productWithQuantity]);
    }
  };

  // Add new product
  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  // Filter products by search term and category
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return a.name.localeCompare(b.name); // "name" - A to Z
  });

  return (
    <div>
      <Navbar
        cartCount={cartItems.length}
        onSearch={setSearchTerm}
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      <div style={{ margin: "10px 20px", display: "flex", gap: "15px", alignItems: "center" }}>
        <button 
          onClick={() => setView("card")} 
          style={{ 
            padding: "8px 16px", 
            backgroundColor: view === "card" ? "#0b5ed7" : "#e9ecef",
            color: view === "card" ? "#fff" : "#333",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
            transition: "0.2s"
          }}
        >
          Card View
        </button>
        <button 
          onClick={() => setView("table")}
          style={{ 
            padding: "8px 16px", 
            backgroundColor: view === "table" ? "#0b5ed7" : "#e9ecef",
            color: view === "table" ? "#fff" : "#333",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
            transition: "0.2s"
          }}
        >
          Table View
        </button>
        
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ddd",
            cursor: "pointer",
            fontWeight: "500",
            backgroundColor: "#fff"
          }}
        >
          <option value="name">Sort: A-Z</option>
          <option value="price-asc">Sort: Price (Low-High)</option>
          <option value="price-desc">Sort: Price (High-Low)</option>
        </select>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            view === "card" ? (
              <ProductList products={sortedProducts} onAddToCart={handleAddToCart} />
            ) : (
              <ProductTable products={sortedProducts} onAddToCart={handleAddToCart} />
            )
          }
        />

        <Route
          path="/product/:id"
          element={<ProductDetail products={products} addToCart={handleAddToCart} />}
        />

        <Route
          path="/add-product"
          element={<AddProductForm addProduct={handleAddProduct} />}
        />

        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
        />

        <Route
          path="/profile"
          element={<UserProfile cartItems={cartItems} />}
        />

        <Route
          path="/customer-service"
          element={<CustomerService />}
        />

        <Route
          path="/orders"
          element={<OrderManagement />}
        />
      </Routes>

      <Footer />
    </div>
  );
}
