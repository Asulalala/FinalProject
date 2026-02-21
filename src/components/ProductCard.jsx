import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Black");

  const clothingColors = ["Black", "White", "Red", "Blue", "Navy", "Gray", "Green", "Brown"];

  const handleAddToCart = () => {
    const qty = Math.max(1, Math.min(quantity || 1, product.stock));
    addToCart({ 
      ...product, 
      quantity: qty,
      selectedColor: product.category === "Clothes" ? selectedColor : null,
    });
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

        {product.category === "Clothes" && (
          <div style={colorContainer}>
            <label htmlFor={`color-${product.id}`} style={colorLabel}>
              Color:
            </label>
            <select
              id={`color-${product.id}`}
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
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
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  overflow: "hidden",
  margin: "20px auto",
  backgroundColor: "#fff",
  minHeight: "300px",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
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
const priceText = { fontSize: "20px", fontWeight: "bold", color: "#0b5ed7", margin: "5px 0" };
const stockText = { fontSize: "14px", color: "#888", margin: "5px 0" };

const quantityContainer = { margin: "15px 0", display: "flex", alignItems: "center", gap: "10px" };
const quantityLabel = { fontWeight: "500" };
const quantityInput = { width: "60px", padding: "7px", borderRadius: "6px", border: "1.5px solid #d1e7f7", textAlign: "center", background: "#f8fbfd", fontSize: "14px", transition: "0.2s" };

const colorContainer = { margin: "10px 0", display: "flex", alignItems: "center", gap: "10px" };
const colorLabel = { fontWeight: "600", fontSize: "14px" };
const colorSelect = { flex: 1, padding: "8px 10px", borderRadius: "6px", border: "1.5px solid #d1e7f7", background: "#f8fbfd", fontSize: "14px", fontWeight: "500", cursor: "pointer" };

const buttonContainer = { display: "flex", gap: "10px", marginTop: "10px" };
const addButton = { 
  flex: 1, 
  padding: "12px", 
  backgroundColor: "#0b5ed7", 
  border: "none", 
  color: "#fff", 
  fontWeight: "600", 
  borderRadius: "8px", 
  cursor: "pointer",
  transition: "all 0.3s",
};
const detailsButton = { 
  flex: 1, 
  padding: "12px", 
  backgroundColor: "#fff", 
  border: "2px solid #0b5ed7", 
  color: "#0b5ed7", 
  fontWeight: "600", 
  borderRadius: "8px", 
  cursor: "pointer",
  transition: "all 0.3s"
};
