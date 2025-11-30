import React, { useState } from 'react';
import fakeData from '../../fakeData/products.JSON';
const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setProduct]= useState(first10)
    return (
        <div>
            <h3>this is</h3>
            <h2> {products.length}</h2>
            
        </div>
    );
};

export default Shop;