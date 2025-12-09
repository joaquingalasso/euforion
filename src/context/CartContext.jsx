import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const stored = localStorage.getItem('euforion_cart');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('euforion_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, size, price) => {
        setCart(prev => {
            // Check if item with same ID and Size exists
            const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id && item.selectedSize === size
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, {
                ...product,
                selectedSize: size,
                priceStr: price, // Store original string '$15.000'
                priceVal: parsePrice(price), // Store numeric 15000
                quantity: 1
            }];
        });
    };

    const removeFromCart = (id, size) => {
        setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
    };

    const clearCart = () => setCart([]);

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.priceVal * item.quantity), 0);
    };

    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    // Helper to parse "$25.000" -> 25000
    const parsePrice = (str) => {
        if (!str) return 0;
        return parseInt(str.replace('$', '').replace(/\./g, '').trim()) || 0;
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal, getCartCount }}>
            {children}
        </CartContext.Provider>
    );
};
