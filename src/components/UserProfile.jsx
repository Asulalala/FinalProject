import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadUserProfile, saveUserProfile, loadUserRole, saveUserRole } from "../utils/localStorage";

export default function UserProfile({ cartItems }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(loadUserProfile());
  const [userRole, setUserRole] = useState(loadUserRole());
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(profile);

  const roleOptions = ["Customer", "Admin", "Manager", "Staff"];

  const handleSaveProfile = () => {
    saveUserProfile(formData);
    setProfile(formData);
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  const handleRoleChange = (newRole) => {
    setUserRole(newRole);
    saveUserRole(newRole);
  };

  const totalSpent = profile.purchaseHistory.reduce((sum, purchase) => sum + purchase.total, 0);

  return (
    <div style={container}>
      <h2>User Profile & Dashboard</h2>

      <div style={gridContainer}>
        {/* Profile Card */}
        <div style={card}>
          <h3>Profile Information</h3>
          {editMode ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={inputStyle}
                placeholder="Full Name"
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={inputStyle}
                placeholder="Email"
              />
              <button onClick={handleSaveProfile} style={saveButton}>
                Save Changes
              </button>
              <button onClick={() => setEditMode(false)} style={cancelButton}>
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Member Since:</strong> {profile.joinDate}</p>
              <button onClick={() => setEditMode(true)} style={editButton}>
                Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* User Role Card */}
        <div style={card}>
          <h3>User Role & Permissions</h3>
          <div style={{ marginBottom: "15px" }}>
            <label><strong>Current Role:</strong></label>
            <select
              value={userRole}
              onChange={(e) => handleRoleChange(e.target.value)}
              style={selectStyle}
            >
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Detailed Role Permissions */}
          <div style={{ marginTop: "15px", borderTop: "1px solid #ddd", paddingTop: "15px" }}>
            <p style={{ fontWeight: "600", marginBottom: "10px", color: "#0b5ed7" }}>
              {userRole} Capabilities:
            </p>
            <ul style={{ fontSize: "13px", lineHeight: "1.8", color: "#555" }}>
              {userRole === "Admin" && (
                <>
                  <li>✓ View all orders and sales analytics</li>
                  <li>✓ Manage products (add, edit, delete)</li>
                  <li>✓ Manage user accounts and roles</li>
                  <li>✓ Update order status and tracking</li>
                  <li>✓ Process refunds and returns</li>
                  <li>✓ View financial reports</li>
                  <li>✓ Manage discount codes and vouchers</li>
                  <li>✓ Access system settings</li>
                </>
              )}
              {userRole === "Manager" && (
                <>
                  <li>✓ View orders and sales reports</li>
                  <li>✓ Manage products (add, edit)</li>
                  <li>✓ Update order status and tracking</li>
                  <li>✓ View customer analytics</li>
                  <li>✓ Process returns with approval</li>
                  <li>✗ Cannot delete products</li>
                  <li>✗ Cannot manage user accounts</li>
                  <li>✗ Cannot access system settings</li>
                </>
              )}
              {userRole === "Staff" && (
                <>
                  <li>✓ Add and edit products</li>
                  <li>✓ View assigned orders</li>
                  <li>✓ Update order status</li>
                  <li>✓ Process shipments</li>
                  <li>✓ Respond to customer inquiries</li>
                  <li>✗ Cannot delete products</li>
                  <li>✗ Cannot view sales analytics</li>
                  <li>✗ Cannot manage user accounts</li>
                </>
              )}
              {userRole === "Customer" && (
                <>
                  <li>✓ Browse and search products</li>
                  <li>✓ Add products to cart</li>
                  <li>✓ Place orders and checkout</li>
                  <li>✓ Track order status</li>
                  <li>✓ Leave product reviews</li>
                  <li>✓ Request returns and refunds</li>
                  <li>✓ Submit support tickets</li>
                  <li>✓ Access profile and order history</li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Statistics Card */}
        <div style={card}>
          <h3>Purchase Statistics</h3>
          <div style={statItem}>
            <span>Total Orders:</span>
            <strong style={{ fontSize: "24px", color: "#0b5ed7" }}>
              {profile.purchaseHistory.length}
            </strong>
          </div>
          <div style={statItem}>
            <span>Total Spent:</span>
            <strong style={{ fontSize: "24px", color: "#28a745" }}>
              ₱{totalSpent.toFixed(2)}
            </strong>
          </div>
        </div>

        {/* Preferences Card */}
        <div style={card}>
          <h3>Preferences</h3>
          <label style={checkboxLabel}>
            <input
              type="checkbox"
              checked={formData.preferences.newsletter}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  preferences: { ...formData.preferences, newsletter: e.target.checked },
                })
              }
            />
            Subscribe to Newsletter
          </label>
          <label style={checkboxLabel}>
            <input
              type="checkbox"
              checked={formData.preferences.notifications}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  preferences: { ...formData.preferences, notifications: e.target.checked },
                })
              }
            />
            Enable Notifications
          </label>
          <button onClick={handleSaveProfile} style={saveButton}>
            Save Preferences
          </button>
        </div>
      </div>

      {/* Purchase History */}
      <div style={card}>
        <h3>Purchase History</h3>
        {profile.purchaseHistory.length === 0 ? (
          <p style={{ color: "#999" }}>No purchases yet.</p>
        ) : (
          <table style={historyTable}>
            <thead>
              <tr style={{ borderBottom: "2px solid #ddd" }}>
                <th>Order #</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {profile.purchaseHistory.map((purchase, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                  <td>{purchase.id}</td>
                  <td>{purchase.date}</td>
                  <td>{purchase.itemCount}</td>
                  <td>₱{purchase.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button onClick={() => navigate("/")} style={homeButton}>
          Back to Homepage
        </button>
        <button onClick={() => navigate("/customer-service")} style={serviceButton}>
          Customer Support
        </button>
        <button onClick={() => navigate("/orders")} style={ordersButton}>
          My Orders
        </button>
      </div>
    </div>
  );
}

const container = {
  padding: "30px 20px",
  maxWidth: "1200px",
  margin: "0 auto",
};

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  gap: "20px",
  marginBottom: "30px",
};

const card = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "10px",
  border: "2px solid #e5e9f0",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
};

const inputStyle = {
  padding: "8px 12px",
  border: "1.5px solid #d1e7f7",
  borderRadius: "6px",
  fontSize: "14px",
  background: "#f8fbfd",
};

const selectStyle = {
  width: "100%",
  padding: "8px 12px",
  border: "1.5px solid #d1e7f7",
  borderRadius: "6px",
  fontSize: "14px",
  background: "#f8fbfd",
  cursor: "pointer",
};

const editButton = {
  marginTop: "10px",
  padding: "8px 12px",
  backgroundColor: "#0b5ed7",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
};

const saveButton = {
  padding: "10px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
};

const cancelButton = {
  padding: "10px",
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
};

const statItem = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0",
  borderBottom: "1px solid #eee",
};

const checkboxLabel = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "10px",
  cursor: "pointer",
};

const historyTable = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "10px",
};

const homeButton = {
  padding: "10px 16px",
  backgroundColor: "#0b5ed7",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
};

const serviceButton = {
  padding: "10px 16px",
  backgroundColor: "#6c757d",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
};

const ordersButton = {
  padding: "10px 16px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
};
