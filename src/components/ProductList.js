import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from JSON file
    fetch('/data/product.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => {
        setError(error.message);
        console.error('Error fetching data:', error);
      });
  }, []);

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  return (
    <div className="container">
      <header>
        <h1>My E-Commerce Store</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>
      <h1>Product List</h1>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.productID} className="product-item">
            <Link to={`/product/${product.productID}`}>
              <img
                src={product.productImages[0]}
                alt={product.productName}
                className="product-image"
                loading="lazy"
              />
              <div className="product-details">
                <h3>{product.productName}</h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <footer>
        <p>&copy; 2024 My E-Commerce Store</p>
      </footer>
    </div>
  );
}

export default ProductList;
