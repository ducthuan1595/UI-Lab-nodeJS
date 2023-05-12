import React from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ onGetCart, onDelete, onOrder }) => {
  const navigate = useNavigate();
  const getCart = onGetCart();
  console.log(getCart)

  const handleDelete = (id) => {
    console.log(id)
    onDelete(id);
  }

  const handleOrder = () => {
    onOrder();
    navigate('/order');
  }

  return (
    <main>
      <div className="cart">
        {getCart &&
          getCart.carts.map((cart) => {
            console.log('cart', cart)
            return (
              <div key={cart._id} className="cart-item card">
                <div>{cart.productId.title}</div>
                <div>Quantity: {cart.quantity}</div>
                <button className='btn' onClick={handleDelete.bind(null, cart._id)}>Delete</button>
              </div>
            );
          })}
        <button className='btn' onClick={handleOrder}>Order Now</button>
      </div>
    </main>
  );
};

export default Cart;
