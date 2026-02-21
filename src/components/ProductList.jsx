import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductList({ products, onAddToCart }) {
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {})
  );

  const [selectedColors, setSelectedColors] = React.useState(
    products.reduce((acc, product) => {
      acc[product.id] = "Black";
      return acc;
    }, {})
  );

  const clothingColors = ["Black", "White", "Red", "Blue", "Navy", "Gray", "Green", "Brown"];

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, Math.min(value, products.find(p => p.id === id).stock)),
    }));
  };

  const handleColorChange = (id, color) => {
    setSelectedColors((prev) => ({
      ...prev,
      [id]: color,
    }));
  };

  const handleAdd = (product) => {
    onAddToCart({ 
      ...product, 
      quantity: quantities[product.id],
      selectedColor: product.category === "Clothes" ? selectedColors[product.id] : null,
    });
  };

  return (
    <div style={listStyle}>
      {products.length === 0 && (
        <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px 20px" }}>
          <h3 style={{ color: "#666", fontSize: "20px" }}>No products found.</h3>
          <p style={{ color: "#999" }}>Try adjusting your filters or search.</p>
        </div>
      )}

      {products.map((product) => (
        <div key={product.id} style={cardStyle}>
          <img
            src={product.image || "https://via.placeholder.com/200"}
            alt={product.name}
            style={imageStyle}
          />

          <div style={infoContainer}>
            <h3 style={nameStyle}>{product.name}</h3>
            <p style={priceStyle}>₱{product.price.toFixed(2)}</p>
            <p style={stockStyle}>Stock: {product.stock}</p>

            <div style={quantityContainer}>
              <label style={quantityLabel}>Qty:</label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantities[product.id]}
                onChange={(e) =>
                  handleQuantityChange(product.id, parseInt(e.target.value) || 1)
                }
                style={quantityInput}
              />
            </div>

            {product.category === "Clothes" && (
              <div style={colorContainer}>
                <label style={colorLabel}>Color:</label>
                <select
                  value={selectedColors[product.id]}
                  onChange={(e) => handleColorChange(product.id, e.target.value)}
                  style={colorSelect}
                >
                  {clothingColors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div style={buttonContainer}>
              <button onClick={() => handleAdd(product)} style={addButton}>
                Add to Cart
              </button>
              <Link to={`/product/${product.id}`} style={detailsButton}>
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// -------------------- Styles --------------------
const listStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "25px",
  padding: "30px 20px",
  maxWidth: "1400px",
  margin: "0 auto",
};

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  border: "2px solid #0b5ed7",
  borderRadius: "12px",
  overflow: "hidden",
  backgroundColor: "#fff",
  padding: "14px",
  alignItems: "center",
  minHeight: "420px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
};

const imageStyle = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
  borderRadius: "8px",
  marginBottom: "14px",
  transition: "transform 0.3s",
};

const infoContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "6px",
  width: "100%",
};

const nameStyle = { margin: 0, fontSize: "16px", fontWeight: "700", color: "#1a202c" };
const priceStyle = { margin: 0, fontSize: "18px", fontWeight: "700", color: "#0b5ed7" };
const stockStyle = { margin: 0, fontSize: "13px", color: "#718096" };

const quantityContainer = { display: "flex", alignItems: "center", gap: "8px", marginTop: "8px", width: "100%" };
const quantityLabel = { fontSize: "13px", fontWeight: "600" };
const quantityInput = {
  flex: 1,
  maxWidth: "70px",
  padding: "6px 8px",
  borderRadius: "6px",
  border: "1.5px solid #d1e7f7",
  textAlign: "center",
  background: "#f8fbfd",
  fontSize: "14px",
  transition: "0.2s",
};

const buttonContainer = { display: "flex", gap: "10px", marginTop: "12px", width: "100%" };

const addButton = {
  flex: 1,
  padding: "10px 12px",
  backgroundColor: "#0b5ed7",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  transition: "all 0.3s",
};

const detailsButton = {
  flex: 1,
  padding: "10px 12px",
  backgroundColor: "#fff",
  color: "#0b5ed7",
  border: "2px solid #0b5ed7",
  borderRadius: "8px",
  textAlign: "center",
  textDecoration: "none",
  fontSize: "14px",
  display: "inline-block",
  fontWeight: "600",
  transition: "all 0.3s",
};

const colorContainer = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "8px",
  width: "100%",
};

const colorLabel = {
  fontSize: "13px",
  fontWeight: "600",
  minWidth: "45px",
};

const colorSelect = {
  flex: 1,
  padding: "6px 8px",
  borderRadius: "6px",
  border: "1.5px solid #d1e7f7",
  background: "#f8fbfd",
  fontSize: "13px",
  cursor: "pointer",
  fontWeight: "500",
};
