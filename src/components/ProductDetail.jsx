import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetail({ products, addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  // Find product by ID
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return (
      <div style={centerStyle}>
        <h2>Product not found</h2>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <div style={container}>
      <div style={card}>
        {/* Product Image */}
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name}
          style={imageStyle}
        />

        <div style={content}>
          {/* Name, Category & Price */}
          <h2 style={title}>{product.name}</h2>
          <p style={category}>{product.category}</p>
          <h3 style={price}>₱{Number(product.price).toFixed(2)}</h3>
          <p style={stock}>Stock: {product.stock}</p>

          {/* Quantity Input */}
          <div style={quantityContainer}>
            <label style={quantityLabel}>Quantity:</label>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.min(Math.max(Number(e.target.value), 1), product.stock))
              }
              style={quantityInput}
            />
          </div>

          {/* Details & Features */}
          <div style={detailsContainer}>
            <h4>Details:</h4>
            <p>{product.details || "No details available."}</p>

            {product.features && product.features.length > 0 && (
              <>
                <h4>Features:</h4>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Buttons */}
          <button style={addButton} onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button style={backButton} onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

// ===== Styles =====
const container = {
  display: "flex",
  justifyContent: "center",
  marginTop: "40px",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const card = {
  width: "650px",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  overflow: "hidden",
  backgroundColor: "#fff",
};

const imageStyle = {
  width: "100%",
  height: "350px",
  objectFit: "cover",
};

const content = {
  padding: "20px",
};

const title = { fontSize: "24px", marginBottom: "8px" };
const category = { color: "#6c757d", marginBottom: "10px", fontStyle: "italic" };
const price = { color: "#007bff", marginBottom: "10px" };
const stock = { color: "#555", marginBottom: "15px" };

const quantityContainer = { marginBottom: "20px", display: "flex", alignItems: "center" };
const quantityLabel = { marginRight: "10px", fontWeight: "500" };
const quantityInput = { width: "60px", padding: "4px 6px", borderRadius: "4px", border: "1px solid #ccc", textAlign: "center" };

const detailsContainer = { backgroundColor: "#f9f9f9", padding: "15px", borderRadius: "6px", marginBottom: "20px" };

const addButton = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#007bff",
  border: "none",
  color: "#fff",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
  marginBottom: "10px",
};

const backButton = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#fff",
  border: "1px solid #007bff",
  color: "#007bff",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
};

const centerStyle = { textAlign: "center", marginTop: "50px" };
