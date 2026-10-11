import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import ContactoForm from './components/ContactoForm.jsx';
import './style.css';

// RAÍZ 1: la tienda completa (productos + carrito + categorías)
createRoot(document.getElementById('raiz-tienda')).render(
    <StrictMode>
        <App />
    </StrictMode>
);

// RAÍZ 2: formulario de contacto (nombre, email, mensaje), independiente de la tienda
createRoot(document.getElementById('raiz-contacto')).render(
    <StrictMode>
        <ContactoForm />
    </StrictMode>
);