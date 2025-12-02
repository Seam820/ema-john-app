import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    //const total = cart.reduce( (total, prd) =>total + prd.price , 0)
    let total = 0;
    for(let i=0; i<cart.length; i++){
        const product = cart[i];
        total = total + product.price;
    }

    let shipping = 0;
    if(total > 200){
        shipping = 15;
    } 
    else if(total > 0){
        shipping = 20;
    }
    const tax = (total / 10);
    total = total + shipping + tax;
    
    return (
        <div>
            <h4>Oder Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p><small>Shipping Cost: {shipping}</small></p>
            <p><small>Tax + VAT: {tax.toFixed(2)}</small></p>
            <p>Total Price: {total}</p>
        </div>
    );
};

export default Cart;