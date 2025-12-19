// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopNavigation from "./components/TopNavigation";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderHistory from "./pages/OrderHistoryPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { UserProvider } from "./context/UserProvider";
import { CartProvider } from "./context/CartProvider";
import CartSidebar from "./components/CartSideNav";
import StripeWrapper from "./components/StripeWrapper";
import CompletionPage from "./pages/CompletionPage";
import { useState } from "react";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Toggle cart sidebar open/close
  const toggleCart = () => setIsCartOpen((open: boolean) => !open);

  // Close cart sidebar explicitly
  const closeCart = () => setIsCartOpen(false);

  return (
    <UserProvider>
      <CartProvider>
        <Router>
          {/* Pass the toggleCart function so TopNavigation can open/close cart */}
          <TopNavigation onCartToggle={toggleCart} />

          {/* Cart sidebar controlled by isCartOpen */}
          <CartSidebar isOpen={isCartOpen} onClose={closeCart} />

          {/* Page content wrapper */}
          <div
            style={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
              // maxWidth: "1200px",
              margin: "0 auto",
              paddingTop: "24px", // Optional: vertical spacing from nav
            }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/order-history" element={<OrderHistory />} />
              <Route path="/sign-up" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />

              <Route element={<StripeWrapper />}>
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/complete" element={<CompletionPage />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

export default App;
