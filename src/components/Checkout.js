// Checkout.js

import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Make sure to import your CartContext
import '../styles.css';

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    mobileNumber: '',
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any necessary actions with the form data

    // Assuming that the cartItems represent the products in the cart
    // You may need to adapt this logic based on your actual cart state structure
    if (cartItems.length > 0) {
      clearCart(); // Clear the cart when the order is confirmed
      setShowConfirmation(true);
    }
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="container">
      <header>
        <h1>My E-Commerce Store</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>
      <div className="checkout">
        <h1>Checkout</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Mobile Number:
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Proceed to Confirm Order</button>
        </form>
      </div>

      {showConfirmation && (
        <div className="confirmation-popup">
          <div className="confirmation-content">
            <span className="close" onClick={closeConfirmation}>&times;</span>
            <h2>Thank you for shopping!</h2>
            <p>Have a Great Day!</p>
            <Link to="/">Continue Shopping</Link>
          </div>
        </div>
      )}

      <footer>
        <p>&copy; 2024 My E-Commerce Store</p>
      </footer>
    </div>
  );
}

export default Checkout;
