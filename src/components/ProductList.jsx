import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductList({ products, onAddToCart }) {
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {})
  );

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, Math.min(value, products.find(p => p.id === id).stock)),
    }));
  };

  const handleAdd = (product) => {
    onAddToCart({ ...product, quantity: quantities[product.id] });
  };

  return (
    <div style={listStyle}>
      {products.length === 0 && <h3>No products found.</h3>}

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
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "25px",
  padding: "20px",
};

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  border: "1px solid #ccc",
  borderRadius: "8px",
  overflow: "hidden",
  backgroundColor: "#fff",
  padding: "10px",
  alignItems: "center",
  minHeight: "400px",
};

const imageStyle = {
  width: "100%",
  height: "250px",
  objectFit: "cover",
  borderRadius: "6px",
  marginBottom: "10px",
};

const infoContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "6px",
  width: "100%",
};

const nameStyle = { margin: 0, fontSize: "16px", fontWeight: "600" };
const priceStyle = { margin: 0, fontSize: "14px", fontWeight: "500", color: "#007bff" };
const stockStyle = { margin: 0, fontSize: "13px", color: "#555" };

const quantityContainer = { display: "flex", alignItems: "center", gap: "5px", marginTop: "5px" };
const quantityLabel = { fontSize: "13px" };
const quantityInput = {
  width: "50px",
  padding: "3px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  textAlign: "center",
};

const buttonContainer = { display: "flex", gap: "10px", marginTop: "10px", width: "100%" };

const addButton = {
  flex: 1,
  padding: "8px 12px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
};

const detailsButton = {
  flex: 1,
  padding: "8px 12px",
  backgroundColor: "#fff",
  color: "#007bff",
  border: "1px solid #007bff",
  borderRadius: "4px",
  textAlign: "center",
  textDecoration: "none",
  fontSize: "14px",
  display: "inline-block",
};
