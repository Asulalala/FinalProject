import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductTable from "./components/ProductTable";
import ProductDetail from "./components/ProductDetail";
import AddProductForm from "./components/AddProductForm";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

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

  return (
    <div>
      <Navbar
        cartCount={cartItems.length}
        onSearch={setSearchTerm}
        onCategorySelect={setSelectedCategory}
      />

      <div style={{ margin: "10px 20px" }}>
        <button onClick={() => setView("card")} style={{ marginRight: "10px" }}>
          Card View
        </button>
        <button onClick={() => setView("table")}>Table View</button>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            view === "card" ? (
              <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
            ) : (
              <ProductTable products={filteredProducts} onAddToCart={handleAddToCart} />
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
      </Routes>

      <Footer />
    </div>
  );
}
