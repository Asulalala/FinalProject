import React from "react";

export default function Cart({ cartItems, setCartItems }) {
  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, qty) => {
    setCartItems(prev =>
      prev.map(item => 
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Shopping Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Shopping Cart</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ddd" }}>
            <th style={{ textAlign: "left", padding: "10px" }}>Product</th>
            <th style={{ textAlign: "center", padding: "10px" }}>Price</th>
            <th style={{ textAlign: "center", padding: "10px" }}>Quantity</th>
            <th style={{ textAlign: "center", padding: "10px" }}>Subtotal</th>
            <th style={{ textAlign: "center", padding: "10px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px" }}>{item.name}</td>
              <td style={{ textAlign: "center", padding: "10px" }}>₱{item.price.toFixed(2)}</td>
              <td style={{ textAlign: "center", padding: "10px" }}>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  style={{ width: "60px", textAlign: "center", padding: "4px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
              </td>
              <td style={{ textAlign: "center", padding: "10px" }}>₱{(item.price * item.quantity).toFixed(2)}</td>
              <td style={{ textAlign: "center", padding: "10px" }}>
                <button
                  onClick={() => removeItem(item.id)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="3" style={{ textAlign: "right", padding: "10px", fontWeight: "bold" }}>Total:</td>
            <td style={{ textAlign: "center", padding: "10px", fontWeight: "bold" }}>₱{total.toFixed(2)}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
