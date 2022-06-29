import React from 'react';
import Nav from "./Components/Navbar/Nav";
import Products from "./Feauters/Products/products";
import {Routes, Route} from "react-router-dom";
import Product from "./Feauters/Product/product";

function App(props) {
    return (
        <>
            <Nav/>
            {
                <Routes>
                    <Route path="/" element={<Products/>}/>
                    <Route path="/product/:id" element={<Product/>}/>
                </Routes>
            }
        </>
    );
}

export default App;