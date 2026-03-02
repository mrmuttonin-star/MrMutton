import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // or your main CSS file
import App from './App';
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from './contexts/CartContext'; // correct path

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
