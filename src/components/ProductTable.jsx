import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductTable({ products, onAddToCart }) {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (id, value, stock) => {
    const qty = Math.max(1, Math.min(value, stock));
    setQuantities({ ...quantities, [id]: qty });
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product.id] || 1;
    onAddToCart({ ...product, quantity: qty });
  };

  return (
    <div style={tableContainer}>
      <table style={tableStyle}>
        <thead>
          <tr style={headerRow}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Quantity</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="5" style={noProductsStyle}>
                No products available.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id} style={rowStyle}>
                <td style={tdStyle}>{product.name}</td>
                <td style={tdStyle}>{product.category}</td>
                <td style={tdStyle}>{formatPrice(product.price)}</td>
                <td style={tdStyle}>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantities[product.id] || 1}
                    onChange={(e) =>
                      handleQuantityChange(
                        product.id,
                        parseInt(e.target.value),
                        product.stock
                      )
                    }
                    style={quantityInputStyle}
                  />
                </td>
                <td style={tdStyle}>
                  <div style={buttonGroup}>
                    <button
                      onClick={() => handleAddToCart(product)}
                      style={addButton}
                    >
                      Add
                    </button>
                    <button
                      onClick={() => navigate(`/product/${product.id}`)}
                      style={detailsButton}
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// Helper function
const formatPrice = (amount) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(amount);

// Styles
const tableContainer = {
  width: "90%",
  margin: "30px auto",
  overflowX: "auto",
  borderRadius: "10px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "14px",
  color: "#333",
};

const headerRow = {
  backgroundColor: "#f8f9fa",
};

const thStyle = {
  padding: "12px 15px",
  textAlign: "left",
  fontWeight: "600",
  color: "#555",
};

const rowStyle = {
  borderBottom: "1px solid #eee",
};

const tdStyle = {
  padding: "12px 15px",
  verticalAlign: "middle",
};

const noProductsStyle = {
  textAlign: "center",
  padding: "20px",
  color: "#888",
  fontStyle: "italic",
};

const quantityInputStyle = {
  width: "60px",
  padding: "4px 6px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  textAlign: "center",
  fontSize: "14px",
};

const buttonGroup = {
  display: "flex",
  gap: "8px",
};

const addButton = {
  padding: "6px 10px",
  backgroundColor: "#007bff",
  border: "none",
  color: "#fff",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "13px",
};

const detailsButton = {
  padding: "6px 10px",
  backgroundColor: "#fff",
  border: "1px solid #007bff",
  color: "#007bff",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "13px",
};
