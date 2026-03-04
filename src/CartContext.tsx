import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

// --- Types ---
export interface CartProduct {
    id: number;
    name: string;
    collection: string;
    price: number;
    image: string;
    season: string;
    description?: string;
}

export interface CartItem {
    product: CartProduct;
    quantity: number;
}

export interface OrderResult {
    orderId: string;
    transactionDate: string;
    estimatedDelivery: string;
    items: CartItem[];
    subtotal: number;
    tax: number;
    shipping: number;
    grandTotal: number;
    customerName: string;
    customerEmail: string;
}

interface CartContextType {
    items: CartItem[];
    lastOrder: OrderResult | null;
    addToCart: (product: CartProduct) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    setLastOrder: (order: OrderResult) => void;
    totalItems: number;
    subtotal: number;
    tax: number;
    shipping: number;
    grandTotal: number;
}

const CART_STORAGE_KEY = 'hearthHomeCart';
const TAX_RATE = 0.08;
const SHIPPING_FEE = 5.99;
const FREE_SHIPPING_THRESHOLD = 100;

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        if (typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem(CART_STORAGE_KEY);
                return saved ? JSON.parse(saved) : [];
            } catch {
                return [];
            }
        }
        return [];
    });

    const [lastOrder, setLastOrder] = useState<OrderResult | null>(null);

    // Persist cart to localStorage
    useEffect(() => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        } catch { }
    }, [items]);

    const addToCart = useCallback((product: CartProduct) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((productId: number) => {
        setItems((prev) => prev.filter((item) => item.product.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId: number, quantity: number) => {
        if (quantity < 1) return;
        setItems((prev) =>
            prev.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
    const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [items]);
    const tax = useMemo(() => subtotal * TAX_RATE, [subtotal]);
    const shipping = useMemo(() => (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE), [subtotal]);
    const grandTotal = useMemo(() => subtotal + tax + shipping, [subtotal, tax, shipping]);

    return (
        <CartContext.Provider
            value={{
                items, lastOrder, addToCart, removeFromCart, updateQuantity,
                clearCart, setLastOrder, totalItems, subtotal, tax, shipping, grandTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
