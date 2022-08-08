import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";

import {
  About,
  Cart,
  Checkout,
  Error,
  Home,
  Private,
  Products,
  SingleProd,
  AuthWrapper,
} from "./pages";

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route exact path="products" element={<Products />} />

          <Route exact path="products/:id" element={<SingleProd />} />

          <Route path="cart" element={<Cart />} />

          <Route
            path="checkout"
            element={
              <Private>
                <Checkout />
              </Private>
            }
          />

          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
