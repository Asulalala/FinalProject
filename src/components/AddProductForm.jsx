import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProductForm({ addProduct }) {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageMode, setImageMode] = useState("url"); // "url" or "upload"

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    details: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!form.name.trim()) newErrors.name = "Product name is required";
    if (!form.category.trim()) newErrors.category = "Category is required";
    if (!form.price || parseFloat(form.price) <= 0) newErrors.price = "Price must be greater than 0";
    if (!form.stock || parseInt(form.stock) <= 0) newErrors.stock = "Stock must be greater than 0";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and submit
    setErrors({});
    const newProduct = {
      ...form,
      id: Date.now(),
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
    };

    addProduct(newProduct);
    setShowSuccess(true);
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div style={container}>
      {showSuccess && (
        <div style={successMessage}>
          ✓ Product added successfully! Redirecting...
        </div>
      )}
      <h2 style={headerStyle}>Add New Product</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>Product Name</label>
        <input
          name="name"
          className="form-control"
          placeholder="Enter product name"
          value={form.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        {errors.name && <p style={errorStyle}>{errors.name}</p>}

        <label style={labelStyle}>Category</label>
        <input
          name="category"
          className="form-control"
          placeholder="Ex: Food, Gadgets, Clothes"
          value={form.category}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        {errors.category && <p style={errorStyle}>{errors.category}</p>}

        <label style={labelStyle}>Price</label>
        <input
          name="price"
          type="number"
          className="form-control"
          placeholder="₱0.00"
          value={form.price}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        {errors.price && <p style={errorStyle}>{errors.price}</p>}

        <label style={labelStyle}>Stock</label>
        <input
          name="stock"
          type="number"
          className="form-control"
          placeholder="Quantity available"
          value={form.stock}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        {errors.stock && <p style={errorStyle}>{errors.stock}</p>}

        <label style={labelStyle}>Product Image</label>
        <div style={imageModeTabs}>
          <button
            type="button"
            onClick={() => setImageMode("url")}
            style={{
              ...imageTabButton,
              backgroundColor: imageMode === "url" ? "#0b5ed7" : "#e9ecef",
              color: imageMode === "url" ? "#fff" : "#333",
            }}
          >
            Image URL
          </button>
          <button
            type="button"
            onClick={() => setImageMode("upload")}
            style={{
              ...imageTabButton,
              backgroundColor: imageMode === "upload" ? "#0b5ed7" : "#e9ecef",
              color: imageMode === "upload" ? "#fff" : "#333",
            }}
          >
            Upload File
          </button>
        </div>

        {imageMode === "url" ? (
          <input
            name="image"
            className="form-control"
            placeholder="Paste image URL"
            value={form.image}
            onChange={handleChange}
            style={{ ...inputStyle, marginTop: "10px" }}
          />
        ) : (
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ ...inputStyle, marginTop: "10px", padding: "8px" }}
          />
        )}

        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              marginTop: "12px",
              borderRadius: "8px",
              border: "2px solid #0b5ed7",
            }}
          />
        )}

        <label style={{ marginTop: "15px", ...labelStyle }}>Details / Description</label>
        <textarea
          name="details"
          className="form-control"
          placeholder="Enter product description..."
          value={form.details}
          onChange={handleChange}
          rows="4"
          style={{ ...inputStyle, minHeight: "90px" }}
        />

        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button type="submit" style={{ ...primaryButton, ...actionButton }}>
            Add Product
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            style={{ ...secondaryButton, ...actionButton }}
          >
            Back to Homepage
          </button>
        </div>
      </form>
    </div>
  );
}

const container = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "22px",
  borderRadius: "12px",
  background: "linear-gradient(180deg, #f7fbff 0%, #ffffff 100%)",
  boxShadow: "0 4px 18px rgba(17, 51, 85, 0.08)",
  border: "1px solid rgba(15, 76, 129, 0.06)",
  borderLeft: "5px solid #0b5ed7",
};

const headerStyle = {
  color: "#0b5ed7",
  marginBottom: "8px",
};

const inputStyle = {
  border: "1.5px solid #d1e7f7",
  padding: "10px 12px",
  borderRadius: "8px",
  background: "#f8fbfd",
  boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.04)",
  fontSize: "14px",
};

const primaryButton = {
  background: "linear-gradient(90deg,#0d6efd,#0b5ed7)",
  border: "none",
  boxShadow: "0 2px 6px rgba(11,94,215,0.18)",
};

const secondaryButton = {
  background: "#f1f3f5",
  border: "1px solid #dfe6ee",
  color: "#333",
};

const actionButton = {
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
};

const labelStyle = {
  fontSize: "14px",
  color: "#274060",
  fontWeight: "600",
  marginBottom: "4px",
};

const errorStyle = {
  color: "#dc3545",
  fontSize: "12px",
  marginTop: "-8px",
  marginBottom: "4px",
  fontWeight: "500",
};

const successMessage = {
  backgroundColor: "#d4edda",
  color: "#155724",
  padding: "12px 16px",
  borderRadius: "8px",
  marginBottom: "16px",
  fontWeight: "600",
  animation: "slideDown 0.3s ease-in-out",
};

const imageModeTabs = {
  display: "flex",
  gap: "10px",
  marginBottom: "10px",
};

const imageTabButton = {
  flex: 1,
  padding: "8px 12px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px",
  transition: "all 0.3s",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};
