import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);

    const addToCart = (product) => {
        setItems((prev) => {
            const existing = prev.find((p) => p.code === product.code);
            if (existing) {
                return prev.map((p) =>
                    p.code === product.code ? { ...p, quantity: p.quantity + 1 } : p
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (code) => {
        setItems((prev) => prev.filter((p) => p.code !== code));
    };

    const clearCart = () => setItems([]);

    const totalItems = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

    return (
        <CartContext.Provider
            value={{ items, addToCart, removeFromCart, clearCart, totalItems }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) {
        throw new Error("useCart must be used inside CartProvider");
    }
    return ctx;
}
