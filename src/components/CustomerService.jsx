import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function CustomerService() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(
    JSON.parse(localStorage.getItem("supportTickets")) || []
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [activeTab, setActiveTab] = useState("submit"); // "submit" or "view"

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert("Please fill all required fields");
      return;
    }

    const newTicket = {
      id: Date.now(),
      ...formData,
      status: "Open",
      priority: "Normal",
      createdAt: new Date().toLocaleDateString(),
      response: "",
    };

    const updated = [...tickets, newTicket];
    setTickets(updated);
    localStorage.setItem("supportTickets", JSON.stringify(updated));

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    alert("✓ Ticket submitted successfully! Ticket ID: #" + newTicket.id);
  };

  const handleDeleteTicket = (id) => {
    const updated = tickets.filter((t) => t.id !== id);
    setTickets(updated);
    localStorage.setItem("supportTickets", JSON.stringify(updated));
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1>Customer Service & Support</h1>
        <button style={backButtonStyle} onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>

      {/* Navigation Tabs */}
      <div style={tabsContainerStyle}>
        <button
          style={{
            ...tabButtonStyle,
            backgroundColor: activeTab === "submit" ? "#0b5ed7" : "#e9ecef",
            color: activeTab === "submit" ? "#fff" : "#000",
          }}
          onClick={() => setActiveTab("submit")}
        >
          Submit Support Ticket
        </button>
        <button
          style={{
            ...tabButtonStyle,
            backgroundColor: activeTab === "view" ? "#0b5ed7" : "#e9ecef",
            color: activeTab === "view" ? "#fff" : "#000",
          }}
          onClick={() => setActiveTab("view")}
        >
          Your Tickets ({tickets.length})
        </button>
        <button
          style={{
            ...tabButtonStyle,
            backgroundColor: activeTab === "faq" ? "#0b5ed7" : "#e9ecef",
            color: activeTab === "faq" ? "#fff" : "#000",
          }}
          onClick={() => setActiveTab("faq")}
        >
          FAQ
        </button>
      </div>

      {/* Submit Ticket Tab */}
      {activeTab === "submit" && (
        <div style={contentStyle}>
          <h2>Submit a Support Ticket</h2>
          <form onSubmit={handleSubmitTicket} style={formStyle}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                style={inputStyle}
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                style={inputStyle}
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+63 9XX XXX XXXX"
                style={inputStyle}
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Subject *</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                style={inputStyle}
              >
                <option value="">-- Select Subject --</option>
                <option value="Order Issue">Order Issue</option>
                <option value="Shipping/Delivery">Shipping/Delivery</option>
                <option value="Product Quality">Product Quality</option>
                <option value="Refund Request">Refund Request</option>
                <option value="Technical Issue">Technical Issue</option>
                <option value="Payment Issue">Payment Issue</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Describe your issue in detail..."
                rows="6"
                style={textareaStyle}
              />
            </div>

            <button type="submit" style={submitButtonStyle}>
              Submit Ticket
            </button>
          </form>
        </div>
      )}

      {/* View Tickets Tab */}
      {activeTab === "view" && (
        <div style={contentStyle}>
          <h2>Your Support Tickets</h2>
          {tickets.length === 0 ? (
            <p style={{ color: "#666", fontSize: "16px" }}>
              No support tickets yet. Submit one if you need assistance!
            </p>
          ) : (
            <div style={ticketsContainerStyle}>
              {tickets.map((ticket) => (
                <div key={ticket.id} style={ticketCardStyle}>
                  <div style={ticketHeaderStyle}>
                    <h3>Ticket #{ticket.id}</h3>
                    <span
                      style={{
                        ...statusBadgeStyle,
                        backgroundColor:
                          ticket.status === "Open"
                            ? "#ffc107"
                            : ticket.status === "In Progress"
                            ? "#0b5ed7"
                            : "#28a745",
                      }}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  <p>
                    <strong>Subject:</strong> {ticket.subject}
                  </p>
                  <p>
                    <strong>Priority:</strong> {ticket.priority}
                  </p>
                  <p>
                    <strong>Created:</strong> {ticket.createdAt}
                  </p>
                  <p>
                    <strong>Your Message:</strong>
                  </p>
                  <p style={{ backgroundColor: "#f8f9fa", padding: "10px", borderLeft: "4px solid #0b5ed7", borderRadius: "4px" }}>
                    {ticket.message}
                  </p>

                  {ticket.response && (
                    <div style={{ marginTop: "15px" }}>
                      <p>
                        <strong>Support Response:</strong>
                      </p>
                      <p
                        style={{
                          backgroundColor: "#e8f5e9",
                          padding: "10px",
                          borderLeft: "4px solid #28a745",
                          borderRadius: "4px",
                        }}
                      >
                        {ticket.response}
                      </p>
                    </div>
                  )}

                  <button
                    style={deleteButtonStyle}
                    onClick={() => handleDeleteTicket(ticket.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* FAQ Tab */}
      {activeTab === "faq" && (
        <div style={contentStyle}>
          <h2>Frequently Asked Questions</h2>
          <div style={faqContainerStyle}>
            <div style={faqItemStyle}>
              <h4>How long does delivery take?</h4>
              <p>
                Delivery typically takes 3-5 business days within Metro Manila and 5-7 business days for provincial areas.
              </p>
            </div>

            <div style={faqItemStyle}>
              <h4>How can I track my order?</h4>
              <p>You can track your order by visiting the Orders page and checking the status updates for each order.</p>
            </div>

            <div style={faqItemStyle}>
              <h4>What is your return policy?</h4>
              <p>
                We accept returns within 14 days of purchase if the product is in original condition. Visit the Orders
                page to request a return.
              </p>
            </div>

            <div style={faqItemStyle}>
              <h4>What payment methods do you accept?</h4>
              <p>
                We accept Credit Card, Debit Card, PayPal, GCash, and other local payment methods. All payments are
                secured and encrypted.
              </p>
            </div>

            <div style={faqItemStyle}>
              <h4>How do I contact customer service?</h4>
              <p>
                You can reach us via email, phone, or by submitting a support ticket using the form above. We aim to
                respond within 24 hours.
              </p>
            </div>

            <div style={faqItemStyle}>
              <h4>Do you offer discounts or promo codes?</h4>
              <p>
                Yes! We regularly offer discounts and promotional codes. Follow our social media channels for the latest
                deals.
              </p>
            </div>
          </div>

          <div style={contactInfoStyle}>
            <h3>📞 Contact Information</h3>
            <div style={contactItemStyle}>
              <FaEnvelope style={{ marginRight: "10px", color: "#0b5ed7" }} />
              <span>
                <strong>Email:</strong> support@productapp.com
              </span>
            </div>
            <div style={contactItemStyle}>
              <FaPhone style={{ marginRight: "10px", color: "#0b5ed7" }} />
              <span>
                <strong>Phone:</strong> +63 (2) 1234-5678
              </span>
            </div>
            <div style={contactItemStyle}>
              <FaMapMarkerAlt style={{ marginRight: "10px", color: "#0b5ed7" }} />
              <span>
                <strong>Address:</strong> 123 Business St, Manila, Philippines
              </span>
            </div>
            <p style={{ marginTop: "15px", fontSize: "14px", color: "#666" }}>
              <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM (PST)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== Styles =====
const containerStyle = {
  maxWidth: "900px",
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
};

const tabButtonStyle = {
  padding: "12px 20px",
  border: "none",
  borderRadius: "5px 5px 0 0",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  transition: "0.3s",
};

const contentStyle = {
  backgroundColor: "#f8f9fa",
  padding: "30px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginTop: "20px",
};

const formGroupStyle = {
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  marginBottom: "5px",
  fontWeight: "600",
  color: "#333",
};

const inputStyle = {
  padding: "10px 12px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  fontSize: "14px",
  fontFamily: "inherit",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
};

const submitButtonStyle = {
  padding: "12px 20px",
  backgroundColor: "#0b5ed7",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "600",
  transition: "0.3s",
  marginTop: "10px",
};

const ticketsContainerStyle = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "20px",
  marginTop: "20px",
};

const ticketCardStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
};

const ticketHeaderStyle = {
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
};

const deleteButtonStyle = {
  marginTop: "15px",
  padding: "8px 16px",
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "13px",
};

const faqContainerStyle = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "15px",
  marginTop: "20px",
};

const faqItemStyle = {
  backgroundColor: "#fff",
  padding: "15px",
  borderRadius: "5px",
  borderLeft: "4px solid #0b5ed7",
};

const contactInfoStyle = {
  marginTop: "30px",
  backgroundColor: "#e7f1f8",
  padding: "20px",
  borderRadius: "8px",
  borderLeft: "4px solid #0b5ed7",
};

const contactItemStyle = {
  display: "flex",
  alignItems: "center",
  margin: "10px 0",
  fontSize: "15px",
};
