import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles.css';

function Cart() {
  const { cartItems, removeItem, updateQuantity } = useContext(CartContext);

  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="container">
      <header>
        <h1>My E-Commerce Store</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>
      <div className="cart">
        <h1>Shopping Cart</h1>
        {isCartEmpty ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.productID}>
                <div className="cart-item">
                  <img
                    src={item.productImages[0]}
                    alt={item.productName}
                    className="cart-item-image"
                    loading="lazy"
                  />
                  <div className="cart-item-details">
                    <h3>{item.productName}</h3>
                    <p>
                      Price: ${typeof item.price === 'number' ? item.price.toFixed(2) : 'N/A'}
                    </p>
                    <div className="quantity-controls">
                      <button
                        onClick={() => updateQuantity(item.productID, item.quantity - 1)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productID, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.productID)}>
                      Remove from Cart
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {!isCartEmpty && <Link to="/checkout">Proceed to Checkout</Link>}
      </div>
      <footer>
        <p>&copy; 2024 My E-Commerce Store</p>
      </footer>
    </div>
  );
}

export default Cart;
