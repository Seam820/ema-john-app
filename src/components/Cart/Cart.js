import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    
    let total = 0;
    for(let i = 0; i < cart.length; i++){
        const product = cart[i];
        
        // FIX: If product.quantity doesn't exist, use 1 as default
        const quantity = product.quantity || 1;

        total = total + product.price * quantity;
    }

    let shipping = 0;
    if(total > 200){
        shipping = 15;
    } 
    else if(total > 0){
        shipping = 20;
    }
    
    // Check if total is a valid number before fixing precision
    const tax = (total / 10);
    const grandTotal = total + shipping + tax;
    
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p><small>Shipping Cost: {shipping}</small></p>
            <p><small>Tax + VAT: {tax.toFixed(2)}</small></p>
            <p>Total Price: {grandTotal.toFixed(2)}</p>
            <br />
          {
            props.children
          }
        </div>
    );
};

export default Cart;