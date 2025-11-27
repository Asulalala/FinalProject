import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const qty = Math.max(1, Math.min(quantity || 1, product.stock));
    addToCart({ ...product, quantity: qty });
  };

  return (
    <div style={cardWrapper}>
      <div style={imageContainer}>
        <img
          src={product.image || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={product.name}
          onError={(e) =>
            (e.target.src = "https://via.placeholder.com/400x300?text=No+Image")
          }
          style={imageStyle}
        />
      </div>

      <div style={infoContainer}>
        <div>
          <h5 style={productName}>{product.name}</h5>
          <p style={categoryText}>{product.category}</p>
          <p style={priceText}>₱{product.price.toFixed(2)}</p>
          <p style={stockText}>Stock: {product.stock}</p>
        </div>

        <div style={quantityContainer}>
          <label htmlFor={`qty-${product.id}`} style={quantityLabel}>
            Qty:
          </label>
          <input
            id={`qty-${product.id}`}
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            style={quantityInput}
          />
        </div>

        <div style={buttonContainer}>
          <button style={addButton} onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button
            style={detailsButton}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

// Styles
const cardWrapper = {
  width: "100%",
  maxWidth: "800px",
  display: "flex",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  overflow: "hidden",
  margin: "20px auto",
  backgroundColor: "#fff",
  minHeight: "300px",
};

const imageContainer = { width: "40%", minWidth: "300px", height: "100%", overflow: "hidden" };
const imageStyle = { width: "100%", height: "100%", objectFit: "cover" };

const infoContainer = {
  width: "60%",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const productName = { fontSize: "22px", fontWeight: "600", margin: "5px 0" };
const categoryText = { fontSize: "16px", color: "#666", margin: "5px 0" };
const priceText = { fontSize: "20px", fontWeight: "bold", color: "#007bff", margin: "5px 0" };
const stockText = { fontSize: "14px", color: "#888", margin: "5px 0" };

const quantityContainer = { margin: "15px 0", display: "flex", alignItems: "center", gap: "10px" };
const quantityLabel = { fontWeight: "500" };
const quantityInput = { width: "60px", padding: "5px", borderRadius: "4px", border: "1px solid #ccc", textAlign: "center" };

const buttonContainer = { display: "flex", gap: "10px", marginTop: "10px" };
const addButton = { flex: 1, padding: "12px", backgroundColor: "#007bff", border: "none", color: "#fff", fontWeight: "500", borderRadius: "6px", cursor: "pointer" };
const detailsButton = { flex: 1, padding: "12px", backgroundColor: "#fff", border: "1px solid #007bff", color: "#007bff", fontWeight: "500", borderRadius: "6px", cursor: "pointer" };
