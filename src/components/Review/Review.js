import React, { useEffect, useState } from 'react';
import { getStoredCart, deleteFromDb, clearTheCart } from '../../utilities/fakedb';
import fakeData from '../../fakeData/products.json';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { useNavigate } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);    
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useNavigate();

    const handleProceedCheckout = () => {
        history('/shipment');
    }
    useEffect(()=>{
      const savedCart = getStoredCart();
        const productKeys = Object.keys(savedCart);
      const cartProducts =  productKeys.map( key => {
            const product = fakeData.find( pd => pd.id === key);
            product.quantity = savedCart[key];
            return product;
      });
        setCart(cartProducts);
        
    },[])

    const removeProduct = (productKey) => {
        console.log("Removing:", productKey);
        
        // 1. Remove from the UI (State)
        const newCart = cart.filter(pd => pd.id !== productKey);
        setCart(newCart);

        // 2. Remove from Local Storage (Database)
        deleteFromDb(productKey);
    }
    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt="Thank You"/>
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                <div className="review-container">
            <div className="review-items">
                {
                    cart.map(pd => (
                        <div key={pd.id} style={{borderBottom: '1px solid lightgray', marginBottom: '20px', paddingBottom: '20px', marginLeft: '200px'}}>
                            <h4 className="product-name">{pd.name}</h4>
                            <p>Quantity: {pd.quantity}</p>
                            <p>Price: ${pd.price}</p>
                            <br/>
                            <button 
                            className="main-button"
                            onClick={() => removeProduct(pd.id)}
                        >
                            Remove
                        </button>
                        </div>
                    ))
                }
                {thankYou}
            </div>
        </div>

            </div>
            
            <div className="cart-container">
               <Cart cart={cart}>
                <button onClick={handleProceedCheckout} className='main-button'>Place Order</button>
               </Cart>
            </div>
        </div>

    );
};

export default Review;