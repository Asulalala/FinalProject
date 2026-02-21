// localStorage utilities for data persistence

export const loadWishlist = () => {
  const data = localStorage.getItem("wishlist");
  return data ? JSON.parse(data) : [];
};

export const saveWishlist = (wishlist) => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

export const loadReviews = () => {
  const data = localStorage.getItem("reviews");
  return data ? JSON.parse(data) : [];
};

export const saveReviews = (reviews) => {
  localStorage.setItem("reviews", JSON.stringify(reviews));
};

export const loadUserProfile = () => {
  const data = localStorage.getItem("userProfile");
  return data ? JSON.parse(data) : {
    name: "Guest User",
    email: "guest@example.com",
    role: "Customer",
    joinDate: new Date().toLocaleDateString(),
    purchaseHistory: [],
    preferences: { newsletter: true, notifications: true },
  };
};

export const saveUserProfile = (profile) => {
  localStorage.setItem("userProfile", JSON.stringify(profile));
};

export const loadUserRole = () => {
  const data = localStorage.getItem("userRole");
  return data ? JSON.parse(data) : "Customer";
};

export const saveUserRole = (role) => {
  localStorage.setItem("userRole", JSON.stringify(role));
};
