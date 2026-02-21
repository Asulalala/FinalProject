import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTruck, FaBox, FaDownload, FaUndo } from "react-icons/fa";

export default function OrderManagement() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("purchaseHistory")) || []
  );
  const [activeTab, setActiveTab] = useState("orders"); // "orders", "delivered", "returns", "refunds"
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [returnRequests, setReturnRequests] = useState(
    JSON.parse(localStorage.getItem("returnRequests")) || []
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <FaCheck style={{ color: "#28a745", marginRight: "8px" }} />;
      case "Shipped":
        return <FaTruck style={{ color: "#0b5ed7", marginRight: "8px" }} />;
      case "Pending":
        return <FaBox style={{ color: "#ffc107", marginRight: "8px" }} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "#28a745";
      case "Shipped":
        return "#0b5ed7";
      case "Pending":
        return "#ffc107";
      default:
        return "#6c757d";
    }
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    const updated = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
    localStorage.setItem("purchaseHistory", JSON.stringify(updated));
    setSelectedOrder(
      selectedOrder.id === orderId ? { ...selectedOrder, status: newStatus } : selectedOrder
    );
  };

  const handleRequestReturn = (order) => {
    const returnRequest = {
      id: Date.now(),
      orderId: order.id,
      reason: "Product issue",
      status: "Pending",
      items: order.items,
      createdAt: new Date().toLocaleDateString(),
    };
    const updated = [...returnRequests, returnRequest];
    setReturnRequests(updated);
    localStorage.setItem("returnRequests", JSON.stringify(updated));
    alert("Return request submitted successfully!");
  };

  const downloadInvoice = (order) => {
    let invoiceContent = `
=====================================
              INVOICE
=====================================
Order ID: #${order.id}
Date: ${order.date}
Customer: ${order.customer}
Email: ${order.email}

ITEMS ORDERED:
-------------------------------------`;

    order.items.forEach((item) => {
      invoiceContent += `
${item.name}
  Quantity: ${item.quantity}
  Price: ₱${Number(item.price).toFixed(2)}
  Color: ${item.selectedColor || "N/A"}
  Subtotal: ₱${(item.quantity * item.price).toFixed(2)}`;
    });

    invoiceContent += `

-------------------------------------
Subtotal: ₱${order.subtotal.toFixed(2)}
Discount: ₱${(order.discount || 0).toFixed(2)}
Total: ₱${order.total.toFixed(2)}

Payment Method: ${order.paymentMethod || "Credit Card"}
Shipping Address: ${order.shippingAddress || "N/A"}
Status: ${order.status}

Thank you for your purchase!
=====================================`;

    const blob = new Blob([invoiceContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Invoice_${order.id}.txt`;
    link.click();
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1>Order Management & Tracking</h1>
        <button style={backButtonStyle} onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>

      {/* Navigation Tabs */}
      <div style={tabsContainerStyle}>
        <button
          style={{
            ...tabButtonStyle,
            backgroundColor: activeTab === "orders" ? "#0b5ed7" : "#e9ecef",
            color: activeTab === "orders" ? "#fff" : "#000",
          }}
          onClick={() => setActiveTab("orders")}
        >
          📦 Active Orders ({orders.filter(o => o.status !== "Delivered").length})
        </button>
        <button
          style={{
            ...tabButtonStyle,
            backgroundColor: activeTab === "delivered" ? "#0b5ed7" : "#e9ecef",
            color: activeTab === "delivered" ? "#fff" : "#000",
          }}
          onClick={() => setActiveTab("delivered")}
        >
          ✅ Delivered ({orders.filter(o => o.status === "Delivered").length})
        </button>
        <button
          style={{
            ...tabButtonStyle,
            backgroundColor: activeTab === "returns" ? "#0b5ed7" : "#e9ecef",
            color: activeTab === "returns" ? "#fff" : "#000",
          }}
          onClick={() => setActiveTab("returns")}
        >
          🔄 Returns ({returnRequests.length})
        </button>
        <button
          style={{
            ...tabButtonStyle,
            backgroundColor: activeTab === "tracking" ? "#0b5ed7" : "#e9ecef",
            color: activeTab === "tracking" ? "#fff" : "#000",
          }}
          onClick={() => setActiveTab("tracking")}
        >
          🚚 Tracking
        </button>
      </div>

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div style={contentStyle}>
          <h2>Active Orders (Pending & Shipped)</h2>
          {orders.filter(o => o.status !== "Delivered").length === 0 ? (
            <p style={{ color: "#666", fontSize: "16px" }}>
              No active orders. All orders delivered!
            </p>
          ) : (
            <div style={ordersGridStyle}>
              {orders.filter(o => o.status !== "Delivered").map((order) => (
                <div key={order.id} style={orderCardStyle}>
                  <div style={orderHeaderStyle}>
                    <h3>Order #{order.id}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {getStatusIcon(order.status)}
                      <span
                        style={{
                          ...statusBadgeStyle,
                          backgroundColor: getStatusColor(order.status),
                        }}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <p>
                    <strong>Date:</strong> {order.date}
                  </p>
                  <p>
                    <strong>Total:</strong> ₱{Number(order.total).toFixed(2)}
                  </p>
                  <p>
                    <strong>Payment Method:</strong> {order.paymentMethod || "Credit Card"}
                  </p>

                  <div style={{ marginTop: "15px", borderTop: "1px solid #eee", paddingTop: "10px" }}>
                    <h4>Items ({order.items.length}):</h4>
                    <ul style={{ marginLeft: "20px", marginTop: "10px" }}>
                      {order.items.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: "5px", fontSize: "13px" }}>
                          {item.name} x{item.quantity} 
                          {item.selectedColor && ` (${item.selectedColor})`}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {order.status !== "Delivered" && (
                    <div style={statusUpdateStyle}>
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                        style={statusSelectStyle}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  )}

                  <div style={buttonsContainerStyle}>
                    <button
                      style={viewButtonStyle}
                      onClick={() => setSelectedOrder(order)}
                    >
                      View Details
                    </button>
                    <button
                      style={downloadButtonStyle}
                      onClick={() => downloadInvoice(order)}
                    >
                      <FaDownload style={{ marginRight: "8px" }} />
                      Invoice
                    </button>
                    {order.status === "Delivered" && (
                      <button
                        style={returnButtonStyle}
                        onClick={() => handleRequestReturn(order)}
                      >
                        <FaUndo style={{ marginRight: "8px" }} />
                        Request Return
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Order Details Modal */}
          {selectedOrder && (
            <div style={modalOverlayStyle} onClick={() => setSelectedOrder(null)}>
              <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                <h2>Order Details #{selectedOrder.id}</h2>
                <table style={detailsTableStyle}>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Date:</strong>
                      </td>
                      <td>{selectedOrder.date}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Customer:</strong>
                      </td>
                      <td>{selectedOrder.customer}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Email:</strong>
                      </td>
                      <td>{selectedOrder.email}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Shipping Address:</strong>
                      </td>
                      <td>{selectedOrder.shippingAddress || "N/A"}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Status:</strong>
                      </td>
                      <td style={{ color: getStatusColor(selectedOrder.status), fontWeight: "600" }}>
                        {selectedOrder.status}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Payment Method:</strong>
                      </td>
                      <td>{selectedOrder.paymentMethod || "Credit Card"}</td>
                    </tr>
                  </tbody>
                </table>

                <h3 style={{ marginTop: "20px" }}>Items Ordered:</h3>
                <table style={itemsTableStyle}>
                  <thead>
                    <tr style={{ backgroundColor: "#f8f9fa", fontWeight: "600" }}>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Color</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td align="center">{item.quantity}</td>
                        <td>₱{Number(item.price).toFixed(2)}</td>
                        <td>{item.selectedColor || "N/A"}</td>
                        <td>₱{(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={summaryStyle}>
                  <p>
                    <strong>Subtotal:</strong> ₱{Number(selectedOrder.subtotal).toFixed(2)}
                  </p>
                  {selectedOrder.discount > 0 && (
                    <p>
                      <strong>Discount:</strong> -₱{Number(selectedOrder.discount).toFixed(2)}
                    </p>
                  )}
                  <p style={{ fontSize: "18px", fontWeight: "700", color: "#0b5ed7" }}>
                    <strong>Total:</strong> ₱{Number(selectedOrder.total).toFixed(2)}
                  </p>
                </div>

                <button style={closeButtonStyle} onClick={() => setSelectedOrder(null)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Delivered Orders Tab */}
      {activeTab === "delivered" && (
        <div style={contentStyle}>
          <h2>Delivered Orders</h2>
          {orders.filter(o => o.status === "Delivered").length === 0 ? (
            <p style={{ color: "#666", fontSize: "16px" }}>
              No delivered orders yet.
            </p>
          ) : (
            <div style={ordersGridStyle}>
              {orders.filter(o => o.status === "Delivered").map((order) => (
                <div key={order.id} style={orderCardStyle}>
                  <div style={orderHeaderStyle}>
                    <h3>Order #{order.id}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {getStatusIcon(order.status)}
                      <span
                        style={{
                          ...statusBadgeStyle,
                          backgroundColor: getStatusColor(order.status),
                        }}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <p>
                    <strong>Date:</strong> {order.date}
                  </p>
                  <p>
                    <strong>Total:</strong> ₱{Number(order.total).toFixed(2)}
                  </p>
                  <p>
                    <strong>Payment Method:</strong> {order.paymentMethod || "Credit Card"}
                  </p>

                  <div style={{ marginTop: "15px", borderTop: "1px solid #eee", paddingTop: "10px" }}>
                    <h4>Items ({order.items.length}):</h4>
                    <ul style={{ marginLeft: "20px", marginTop: "10px" }}>
                      {order.items.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: "5px", fontSize: "13px" }}>
                          {item.name} x{item.quantity} 
                          {item.selectedColor && ` (${item.selectedColor})`}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={buttonsContainerStyle}>
                    <button
                      style={viewButtonStyle}
                      onClick={() => setSelectedOrder(order)}
                    >
                      View Details
                    </button>
                    <button
                      style={downloadButtonStyle}
                      onClick={() => downloadInvoice(order)}
                    >
                      <FaDownload style={{ marginRight: "8px" }} />
                      Invoice
                    </button>
                    <button
                      style={returnButtonStyle}
                      onClick={() => handleRequestReturn(order)}
                    >
                      <FaUndo style={{ marginRight: "8px" }} />
                      Request Return
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Order Details Modal */}
          {selectedOrder && (
            <div style={modalOverlayStyle} onClick={() => setSelectedOrder(null)}>
              <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                <h2>Order Details #{selectedOrder.id}</h2>
                <table style={detailsTableStyle}>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Date:</strong>
                      </td>
                      <td>{selectedOrder.date}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Customer:</strong>
                      </td>
                      <td>{selectedOrder.customer}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Email:</strong>
                      </td>
                      <td>{selectedOrder.email}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Shipping Address:</strong>
                      </td>
                      <td>{selectedOrder.shippingAddress || "N/A"}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Status:</strong>
                      </td>
                      <td style={{ color: getStatusColor(selectedOrder.status), fontWeight: "600" }}>
                        {selectedOrder.status}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Payment Method:</strong>
                      </td>
                      <td>{selectedOrder.paymentMethod || "Credit Card"}</td>
                    </tr>
                  </tbody>
                </table>

                <h3 style={{ marginTop: "20px" }}>Items Ordered:</h3>
                <table style={itemsTableStyle}>
                  <thead>
                    <tr style={{ backgroundColor: "#f8f9fa", fontWeight: "600" }}>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Color</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td align="center">{item.quantity}</td>
                        <td>₱{Number(item.price).toFixed(2)}</td>
                        <td>{item.selectedColor || "N/A"}</td>
                        <td>₱{(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={summaryStyle}>
                  <p>
                    <strong>Subtotal:</strong> ₱{Number(selectedOrder.subtotal).toFixed(2)}
                  </p>
                  {selectedOrder.discount > 0 && (
                    <p>
                      <strong>Discount:</strong> -₱{Number(selectedOrder.discount).toFixed(2)}
                    </p>
                  )}
                  <p style={{ fontSize: "18px", fontWeight: "700", color: "#0b5ed7" }}>
                    <strong>Total:</strong> ₱{Number(selectedOrder.total).toFixed(2)}
                  </p>
                </div>

                <button style={closeButtonStyle} onClick={() => setSelectedOrder(null)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Returns Tab */}
      {activeTab === "returns" && (
        <div style={contentStyle}>
          <h2>Return Requests</h2>
          {returnRequests.length === 0 ? (
            <p style={{ color: "#666", fontSize: "16px" }}>
              No return requests yet.
            </p>
          ) : (
            <div style={returnsGridStyle}>
              {returnRequests.map((request) => (
                <div key={request.id} style={returnCardStyle}>
                  <div style={returnHeaderStyle}>
                    <h3>Return #{request.id}</h3>
                    <span
                      style={{
                        ...statusBadgeStyle,
                        backgroundColor:
                          request.status === "Pending"
                            ? "#ffc107"
                            : request.status === "Approved"
                            ? "#0b5ed7"
                            : "#28a745",
                      }}
                    >
                      {request.status}
                    </span>
                  </div>

                  <p>
                    <strong>Order ID:</strong> #{request.orderId}
                  </p>
                  <p>
                    <strong>Reason:</strong> {request.reason}
                  </p>
                  <p>
                    <strong>Requested:</strong> {request.createdAt}
                  </p>

                  <h4 style={{ marginTop: "15px" }}>Items to Return:</h4>
                  <ul style={{ marginLeft: "20px" }}>
                    {request.items.map((item, idx) => (
                      <li key={idx} style={{ fontSize: "14px", marginBottom: "5px" }}>
                        {item.name} x{item.quantity}
                      </li>
                    ))}
                  </ul>

                  {request.status === "Approved" && (
                    <div style={{ marginTop: "15px", backgroundColor: "#e8f5e9", padding: "10px", borderRadius: "5px" }}>
                      <p style={{ marginBottom: "5px" }}>
                        <strong>Refund Amount:</strong> ₱{request.refundAmount?.toFixed(2) || "TBD"}
                      </p>
                      <p style={{ fontSize: "13px", color: "#555" }}>
                        Return shipping label has been sent to your email.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tracking Tab */}
      {activeTab === "tracking" && (
        <div style={contentStyle}>
          <h2>Order Tracking</h2>
          <div style={trackingInfoStyle}>
            <h3>📦 Track Your Shipments</h3>
            <p>
              View your orders above and check the status for real-time tracking information. Your order will go through
              these stages:
            </p>

            <div style={stagesContainerStyle}>
              <div style={stageStyle}>
                <FaBox style={{ fontSize: "24px", color: "#ffc107" }} />
                <h4>Pending</h4>
                <p>Your order has been placed and is being prepared for shipment.</p>
              </div>

              <div style={arrowStyle}>→</div>

              <div style={stageStyle}>
                <FaTruck style={{ fontSize: "24px", color: "#0b5ed7" }} />
                <h4>Shipped</h4>
                <p>Your order is on its way to you. Tracking number sent via email.</p>
              </div>

              <div style={arrowStyle}>→</div>

              <div style={stageStyle}>
                <FaCheck style={{ fontSize: "24px", color: "#28a745" }} />
                <h4>Delivered</h4>
                <p>Your order has arrived! Please check the package for any damage.</p>
              </div>
            </div>

            <div style={trackingNotesStyle}>
              <h4>📧 Tracking Updates</h4>
              <ul>
                <li>You'll receive email notifications at each stage of your order</li>
                <li>Typical delivery: 3-5 days within Metro Manila, 5-7 days provincial</li>
                <li>For issues, visit our Customer Service page or submit a support ticket</li>
                <li>If not received within 10 days, contact us immediately</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== Styles =====
const containerStyle = {
  maxWidth: "1000px",
  margin: "30px auto",
  padding: "20px",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
  paddingBottom: "15px",
  borderBottom: "2px solid #0b5ed7",
};

const backButtonStyle = {
  padding: "8px 16px",
  backgroundColor: "#6c757d",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
};

const tabsContainerStyle = {
  display: "flex",
  gap: "10px",
  marginBottom: "30px",
  borderBottom: "2px solid #e9ecef",
  overflowX: "auto",
};

const tabButtonStyle = {
  padding: "12px 20px",
  border: "none",
  borderRadius: "5px 5px 0 0",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  transition: "0.3s",
  whiteSpace: "nowrap",
};

const contentStyle = {
  backgroundColor: "#f8f9fa",
  padding: "30px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const ordersGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const orderCardStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
};

const orderHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "15px",
  paddingBottom: "10px",
  borderBottom: "1px solid #eee",
};

const statusBadgeStyle = {
  padding: "5px 12px",
  color: "#fff",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
};

const statusUpdateStyle = {
  marginTop: "15px",
  paddingTop: "10px",
  borderTop: "1px solid #eee",
};

const statusSelectStyle = {
  padding: "8px 12px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  fontSize: "13px",
  cursor: "pointer",
};

const buttonsContainerStyle = {
  display: "flex",
  gap: "10px",
  marginTop: "15px",
  flexWrap: "wrap",
};

const viewButtonStyle = {
  flex: "1",
  minWidth: "100px",
  padding: "8px 12px",
  backgroundColor: "#0b5ed7",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "600",
};

const downloadButtonStyle = {
  flex: "1",
  minWidth: "100px",
  padding: "8px 12px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const returnButtonStyle = {
  flex: "1",
  minWidth: "100px",
  padding: "8px 12px",
  backgroundColor: "#ffc107",
  color: "#000",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modalOverlayStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "1000",
};

const modalContentStyle = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "10px",
  maxWidth: "700px",
  maxHeight: "90vh",
  overflowY: "auto",
  boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
};

const detailsTableStyle = {
  width: "100%",
  marginTop: "15px",
  borderCollapse: "collapse",
};

const itemsTableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "15px",
  fontSize: "14px",
};

const summaryStyle = {
  marginTop: "20px",
  paddingTop: "15px",
  borderTop: "1px solid #ddd",
};

const closeButtonStyle = {
  marginTop: "20px",
  padding: "10px 20px",
  backgroundColor: "#6c757d",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
};

const returnsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const returnCardStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
};

const returnHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "15px",
  paddingBottom: "10px",
  borderBottom: "1px solid #eee",
};

const trackingInfoStyle = {
  backgroundColor: "#fff",
  padding: "25px",
  borderRadius: "8px",
};

const stagesContainerStyle = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  marginTop: "30px",
  paddingBottom: "30px",
  flexWrap: "wrap",
};

const stageStyle = {
  textAlign: "center",
  padding: "20px",
  minWidth: "150px",
};

const arrowStyle = {
  fontSize: "24px",
  color: "#0b5ed7",
  margin: "0 10px",
};

const trackingNotesStyle = {
  backgroundColor: "#e7f1f8",
  padding: "20px",
  borderRadius: "8px",
  borderLeft: "4px solid #0b5ed7",
  marginTop: "20px",
};
