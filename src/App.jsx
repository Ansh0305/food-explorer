import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Header from "./components/Header.jsx";
import { CartProvider } from "./context/CartContext.jsx";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Header />
          <main className="flex-1 container mx-auto px-4 py-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:barcode" element={<ProductDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
