import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles.css';

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const { addItem, cartItems, updateQuantity } = useContext(CartContext);
  const [buttonLabel, setButtonLabel] = useState('Add to Cart');

  useEffect(() => {
    // Fetch data from JSON file
    fetch('/data/product.json')
      .then((response) => response.json())
      .then((data) => {
        const selectedProduct = data.find(
          (product) => product.productID === productId
        );
        setProduct(selectedProduct);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      const existingItem = cartItems.find(
        (item) => item.productID === product.productID
      );

      if (existingItem) {
        // If the product is already in the cart, update the quantity
        updateQuantity(product.productID, existingItem.quantity + 0);
        // Update the button label to the link
        setButtonLabel('/cart');
      } else {
        // If the product is not in the cart, add it
        addItem(product);
        // Update the button label to the link
        setButtonLabel('/cart');
      }
    }
  };

  if (!product) {
    return <div className="container">Loading...</div>;
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
      <div className="product-detail">
        <h2>{product.productName}</h2>
        <img
          src={product.productImages[0]}
          alt={product.productName}
          className="product-image"
          loading="lazy"
        />
        <p className="product-description">{product.description}</p>
        <p className="product-price">Price: ${product.price.sale}</p>
        <p className="product-category">Category: {product.category}</p>
        <p className="product-reviews">
          Average Review Score: {product.reviews.averageReviewScore}
        </p>
        <p className="product-total-reviews">
          Total Reviews: {product.reviews.numberOfReviews}
        </p>
        <button onClick={handleAddToCart}>
          {buttonLabel.startsWith('/') ? (
            <Link to={buttonLabel}>Go to Cart</Link>
          ) : (
            buttonLabel
          )}
        </button>
      </div>
      <footer>
        <p>&copy; 2024 My E-Commerce Store</p>
      </footer>
    </div>
  );
}

export default ProductDetail;
