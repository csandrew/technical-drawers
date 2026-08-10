import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';  // ← Changed from Navbar
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import About from './pages/About';
import Contact from './pages/Contact';

// Blog Components
import BlogIndex from './pages/blog';
import CalculatorGuide from './pages/blog/CalculatorGuide';
import DrawingKitGuide from './pages/blog/DrawingKitGuide';
import EngineeringTools from './pages/blog/EngineeringTools';
import LabCoatGuide from './pages/blog/LabCoatGuide';
import LifeSciences from './pages/blog/LifeSciences';
import SetSquaresGuide from './pages/blog/SetSquaresGuide';
import UrbanPlanning from './pages/blog/UrbanPlanning';

function App() {
    return (
        <CartProvider>
            <Router>
                <Header />  {/* ← Changed from Navbar */}
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order-confirmation" element={<OrderConfirmation />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        
                        {/* Blog Routes */}
                        <Route path="/blog" element={<BlogIndex />} />
                        <Route path="/blog/calculator-guide" element={<CalculatorGuide />} />
                        <Route path="/blog/drawing-kit" element={<DrawingKitGuide />} />
                        <Route path="/blog/engineering-tools" element={<EngineeringTools />} />
                        <Route path="/blog/lab-coat-guide" element={<LabCoatGuide />} />
                        <Route path="/blog/life-sciences" element={<LifeSciences />} />
                        <Route path="/blog/set-squares" element={<SetSquaresGuide />} />
                        <Route path="/blog/urban-planning" element={<UrbanPlanning />} />
                    </Routes>
                </main>
                <Footer />
                <WhatsAppButton />
                <Toaster position="bottom-right" />
            </Router>
        </CartProvider>
    );
}

export default App;