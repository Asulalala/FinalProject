import React from "react";
import ProductCard from "./ProductCard";

export default function Home({ products, addToCart }) {
  return (
    <div className="container mt-4 d-flex flex-wrap">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
}
