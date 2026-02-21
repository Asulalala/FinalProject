import React from "react";
import { useNavigate } from "react-router-dom";
import { loadUserProfile, saveUserProfile } from "../utils/localStorage";

export default function Cart({ cartItems, setCartItems }) {
  const navigate = useNavigate();
  const [voucherCode, setVoucherCode] = React.useState("");
  const [discount, setDiscount] = React.useState(0);
  const [purchased, setPurchased] = React.useState(false);
  const [purchaseDetails, setPurchaseDetails] = React.useState(null);
  const [paymentMethod, setPaymentMethod] = React.useState("creditCard");
  const [shippingAddress, setShippingAddress] = React.useState("");

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

  const applyVoucher = () => {
    if (voucherCode.toLowerCase() === "acel") {
      setDiscount(10);
    } else {
      alert("Invalid voucher code");
      setDiscount(0);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (total * discount) / 100;
  const finalTotal = total - discountAmount;

  const handlePurchase = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!shippingAddress.trim()) {
      alert("Please enter a shipping address");
      return;
    }

    const receipt = {
      date: new Date().toLocaleString(),
      items: cartItems,
      subtotal: total,
      discount: discount,
      discountAmount: discountAmount,
      finalTotal: finalTotal,
      referenceNumber: `ORD-${Date.now()}`,
      paymentMethod: paymentMethod,
      shippingAddress: shippingAddress,
    };

    // Save purchase to user profile and purchase history
    const userProfile = loadUserProfile();
    const purchase = {
      id: receipt.referenceNumber,
      date: new Date().toLocaleDateString(),
      itemCount: cartItems.length,
      total: finalTotal,
      items: cartItems,
      email: userProfile.email,
      customer: userProfile.name,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      subtotal: total,
      discount: discountAmount,
      status: "Pending",
    };
    
    userProfile.purchaseHistory.push(purchase);
    saveUserProfile(userProfile);

    // Save to purchase history (for OrderManagement)
    const purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    purchaseHistory.push(purchase);
    localStorage.setItem("purchaseHistory", JSON.stringify(purchaseHistory));

    setPurchaseDetails(receipt);
    setPurchased(true);
  };

  const handleCompleteOrder = () => {
    setCartItems([]);
    setPurchased(false);
    setPurchaseDetails(null);
    setDiscount(0);
    setVoucherCode("");
    navigate("/");
  };

  if (cartItems.length === 0 && !purchased) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Shopping Cart</h2>
        <p>Your cart is empty.</p>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "15px",
            padding: "10px 16px",
            backgroundColor: "#0b5ed7",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Back to Homepage
        </button>
      </div>
    );
  }

  if (purchased && purchaseDetails) {
    return (
      <div style={receiptContainer}>
        <div style={receiptBox}>
          <h2 style={{ color: "#0b5ed7", textAlign: "center" }}>Order Receipt</h2>
          <div style={receiptDivider}></div>
          
          <p style={receiptText}>
            <strong>Reference Number:</strong> {purchaseDetails.referenceNumber}
          </p>
          <p style={receiptText}>
            <strong>Date & Time:</strong> {purchaseDetails.date}
          </p>
          
          <div style={receiptDivider}></div>
          <h4>Order Details:</h4>
          
          <table style={receiptTable}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Color</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {purchaseDetails.items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.selectedColor ? item.selectedColor : "-"}</td>
                  <td>{item.quantity}</td>
                  <td>₱{item.price.toFixed(2)}</td>
                  <td>₱{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div style={receiptDivider}></div>
          <div style={receiptSummary}>
            <p><strong>Subtotal:</strong> ₱{purchaseDetails.subtotal.toFixed(2)}</p>
            {purchaseDetails.discount > 0 && (
              <p style={{ color: "#28a745" }}>
                <strong>Discount ({purchaseDetails.discount}%):</strong> -₱{purchaseDetails.discountAmount.toFixed(2)}
              </p>
            )}
            <p style={{ fontSize: "18px", fontWeight: "700", color: "#0b5ed7" }}>
              <strong>Total:</strong> ₱{purchaseDetails.finalTotal.toFixed(2)}
            </p>
          </div>
          
          <div style={receiptDivider}></div>
          <p style={{ textAlign: "center", color: "#666", fontSize: "14px" }}>
            Thank you for your purchase!
          </p>
          
          <button
            onClick={handleCompleteOrder}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "16px",
            }}
          >
            Complete Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h2>Shopping Cart</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ddd" }}>
            <th style={{ textAlign: "left", padding: "10px" }}>Product</th>
            <th style={{ textAlign: "center", padding: "10px" }}>Color</th>
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
              <td style={{ textAlign: "center", padding: "10px" }}>
                {item.selectedColor ? (
                  <span style={{ fontWeight: "600", color: "#0b5ed7" }}>{item.selectedColor}</span>
                ) : (
                  <span style={{ color: "#999" }}>-</span>
                )}
              </td>
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
            <td colSpan="4" style={{ textAlign: "right", padding: "10px", fontWeight: "bold" }}>Subtotal:</td>
            <td style={{ textAlign: "center", padding: "10px", fontWeight: "bold" }}>₱{total.toFixed(2)}</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      {/* Voucher Section */}
      <div style={voucherSection}>
        <h4>Have a Voucher Code?</h4>
        <div style={voucherInputContainer}>
          <input
            type="text"
            placeholder="Enter voucher code (e.g., acel)"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            style={voucherInput}
          />
          <button
            onClick={applyVoucher}
            style={voucherButton}
          >
            Apply
          </button>
        </div>
        {discount > 0 && (
          <p style={{ color: "#28a745", fontWeight: "600" }}>
            ✓ Voucher "acel" applied! {discount}% discount ({-discountAmount.toFixed(2)} PHP)
          </p>
        )}
      </div>

      {/* Shipping Address Section */}
      <div style={shippingSection}>
        <h4>📦 Shipping Address</h4>
        <textarea
          placeholder="Enter your complete shipping address..."
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          rows="3"
          style={shippingInput}
        />
      </div>

      {/* Payment Method Section */}
      <div style={paymentSection}>
        <h4>💳 Payment Method</h4>
        <div style={paymentOptions}>
          <label style={paymentLabel}>
            <input
              type="radio"
              name="payment"
              value="creditCard"
              checked={paymentMethod === "creditCard"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>💳 Credit/Debit Card</span>
          </label>
          <label style={paymentLabel}>
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>🌐 PayPal</span>
          </label>
          <label style={paymentLabel}>
            <input
              type="radio"
              name="payment"
              value="gcash"
              checked={paymentMethod === "gcash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>📱 GCash (Philippines)</span>
          </label>
          <label style={paymentLabel}>
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={paymentMethod === "bank"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>🏦 Bank Transfer</span>
          </label>
        </div>
        <p style={{ fontSize: "13px", color: "#666", marginTop: "10px" }}>
          Selected: <strong>{
            paymentMethod === "creditCard" ? "Credit/Debit Card" :
            paymentMethod === "paypal" ? "PayPal" :
            paymentMethod === "gcash" ? "GCash" :
            "Bank Transfer"
          }</strong>
        </p>
      </div>

      {/* Total Section */}
      <div style={totalSection}>
        <div style={totalRow}>
          <span>Subtotal:</span>
          <span>₱{total.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div style={{ ...totalRow, color: "#28a745" }}>
            <span>Discount ({discount}%):</span>
            <span>-₱{discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div style={{ ...totalRow, fontSize: "18px", fontWeight: "700", borderTop: "2px solid #ddd", paddingTop: "10px", marginTop: "10px" }}>
          <span>Total Amount:</span>
          <span style={{ color: "#0b5ed7" }}>₱{finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 16px",
            backgroundColor: "#0b5ed7",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Back to Homepage
        </button>
        <button
          onClick={() => setCartItems([])}
          style={{
            padding: "10px 16px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Clear Cart
        </button>
        <button
          onClick={handlePurchase}
          style={{
            flex: 1,
            padding: "12px 16px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "700",
            fontSize: "16px",
          }}
        >
          Proceed to Purchase
        </button>
      </div>
    </div>
  );
}

// Styles
const voucherSection = {
  marginTop: "20px",
  padding: "15px",
  backgroundColor: "#f0f4f9",
  borderRadius: "8px",
  border: "1px solid #d1e7f7",
};

const voucherInputContainer = {
  display: "flex",
  gap: "10px",
  marginTop: "10px",
};

const voucherInput = {
  flex: 1,
  padding: "10px 12px",
  border: "1.5px solid #d1e7f7",
  borderRadius: "6px",
  background: "#fff",
  fontSize: "14px",
};

const voucherButton = {
  padding: "10px 16px",
  backgroundColor: "#0b5ed7",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
};

const shippingSection = {
  marginTop: "20px",
  padding: "15px",
  backgroundColor: "#f0f4f9",
  borderRadius: "8px",
  border: "1px solid #d1e7f7",
};

const shippingInput = {
  width: "100%",
  padding: "10px 12px",
  border: "1.5px solid #d1e7f7",
  borderRadius: "6px",
  background: "#fff",
  fontSize: "14px",
  fontFamily: "inherit",
  marginTop: "10px",
  resize: "vertical",
};

const paymentSection = {
  marginTop: "20px",
  padding: "15px",
  backgroundColor: "#f0f4f9",
  borderRadius: "8px",
  border: "1px solid #d1e7f7",
};

const paymentOptions = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "12px",
  marginTop: "12px",
};

const paymentLabel = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px 12px",
  backgroundColor: "#fff",
  borderRadius: "6px",
  border: "1px solid #ddd",
  cursor: "pointer",
  fontSize: "14px",
  transition: "0.2s",
};

const totalSection = {
  marginTop: "20px",
  padding: "16px",
  backgroundColor: "#f8fbfd",
  borderRadius: "8px",
  border: "1px solid #d1e7f7",
};

const totalRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
  fontSize: "16px",
  fontWeight: "600",
};

const receiptContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  padding: "20px",
  backgroundColor: "#f8fbfd",
};

const receiptBox = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "12px",
  maxWidth: "600px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  border: "2px solid #0b5ed7",
};

const receiptDivider = {
  borderTop: "1px dashed #cbd5e0",
  margin: "15px 0",
};

const receiptText = {
  margin: "8px 0",
  fontSize: "14px",
};

const receiptTable = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "10px",
  fontSize: "14px",
};

const receiptSummary = {
  marginTop: "10px",
  fontSize: "16px",
};
