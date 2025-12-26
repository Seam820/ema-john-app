import { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';

import {
  BrowserRouter as Router,
  Routes, 
  Route,
} from "react-router-dom";
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();


function App(props) {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h3>login email:{loggedInUser.email}</h3>
      
      <Router>
        <Header></Header>
        <Routes>      
          
          <Route path="/shop" element={<Shop />} />
          <Route path="/review" element={<Review />} />
          <Route path="/" element={<Shop />} />
          <Route path="/shipment" element={
                   <PrivateRoute>
                   <Shipment />
                   </PrivateRoute>
                  } />
          <Route path="/login" element={<Login />} />
          <Route path="/manage" element={
            <PrivateRoute>
              <Inventory />
            </PrivateRoute>
          } />
          <Route path="/product/:productKey" element={<ProductDetail/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>

      </Router>


    </UserContext.Provider>
  );
}

export default App;
