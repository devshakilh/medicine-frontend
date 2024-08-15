// src/redux/slices/cartSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    photos?: string[]; // Optional if not available in cart item
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

// Load cart from local storage or use an empty array if not available
const loadCartFromLocalStorage = (): CartItem[] => {
    if (typeof window !== 'undefined') {
        const cartData = localStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : [];
    }
    return [];
};

const saveCartToLocalStorage = (cartItems: CartItem[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: loadCartFromLocalStorage(),
    },
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
            saveCartToLocalStorage(state.items);
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload);
            saveCartToLocalStorage(state.items);
        },
        updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
            saveCartToLocalStorage(state.items);
        },
        clearCart(state) {
            state.items = [];
            saveCartToLocalStorage(state.items);
        },
    },
});

export const { addToCart, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
