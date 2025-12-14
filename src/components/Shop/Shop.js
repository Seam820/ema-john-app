import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData/products.json';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getStoredCart } from '../../utilities/fakedb'
import { Link } from 'react-router-dom';
const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setProduct]= useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        const savedCart = getStoredCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map( pdKey => {
            const product = fakeData.find( pd => pd.id === pdKey);
            product.quantity = savedCart[pdKey];
            return product;
        })
        setCart(previousCart);
        },[])

    const handleAddProduct = (product) => {
        console.log('product added', product);
        const newCart = [...cart, product];
        setCart(newCart)
        addToDb(product.id);
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                
                {
                products.map(pd => <Product
                    showAddToCart={true}
                    handleAddProduct={handleAddProduct} 
                    product={pd}
                    ></Product>)
                }
                
            </div>
            <div className="cart-container">
               <Cart cart={cart}>
                <Link to="/review">
                    <button className='main-button'>Review Your Order</button>
                  </Link>
               </Cart>
            </div>
            
        </div>
    );
};

export default Shop;