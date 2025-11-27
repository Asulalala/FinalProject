import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProductForm({ addProduct }) {
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make sure price and stock are numbers
    const newProduct = {
      ...form,
      id: Date.now(),
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
    };

    addProduct(newProduct);
    alert("Product added successfully!");
    navigate("/"); // redirect to home
  };

  return (
    <div style={container}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label>Product Name</label>
        <input
          name="name"
          className="form-control"
          placeholder="Enter product name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Category</label>
        <input
          name="category"
          className="form-control"
          placeholder="Ex: Food, Gadgets, Clothes"
          value={form.category}
          onChange={handleChange}
          required
        />

        <label>Price</label>
        <input
          name="price"
          type="number"
          className="form-control"
          placeholder="₱0.00"
          value={form.price}
          onChange={handleChange}
          required
        />

        <label>Stock</label>
        <input
          name="stock"
          type="number"
          className="form-control"
          placeholder="Quantity available"
          value={form.stock}
          onChange={handleChange}
          required
        />

        <label>Image URL</label>
        <input
          name="image"
          className="form-control"
          placeholder="Paste image URL"
          value={form.image}
          onChange={handleChange}
        />

        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              marginTop: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        )}

        <label style={{ marginTop: "15px" }}>Details / Description</label>
        <textarea
          name="details"
          className="form-control"
          placeholder="Enter product description..."
          value={form.details}
          onChange={handleChange}
          rows="4"
        />

        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

const container = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "20px",
  borderRadius: "10px",
  background: "#ffffff",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};
