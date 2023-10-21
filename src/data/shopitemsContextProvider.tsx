import React, { useEffect, useState } from 'react';
import ShopItemsContext, { ShopItem, TransactionHistory } from "./shopitem-context";
import { shopItems } from "./shopItems.json";
import { 
  updateSessionStorageCart, 
  updateSessionStorageWishlist, 
  updateSessionStorageTransactionHistory 
} from '../utils/sessionStorageUtils';

interface ShopItemsContextProviderProps {
  children: React.ReactNode;
}

const ShopItemsContextProvider: React.FC<ShopItemsContextProviderProps> = ({
  children,
}) => {
  const [items] = useState<ShopItem[]>(shopItems);
  const [cartItems, setCartItems] = useState<ShopItem[]>([...JSON.parse(sessionStorage.getItem("cart") || "[]")]);
  const [wishlistItems, setWishlistItems] = useState<ShopItem[]>([...JSON.parse(sessionStorage.getItem("wishlist") || "[]")]);
  const [transactionHistory, setTransactionHistory] = useState<TransactionHistory[]>([...JSON.parse(sessionStorage.getItem("transactionHistory") || "[]")]);

  const addToCart = (item: ShopItem) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingCartItem) {
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCartItems(updatedCartItems);
      updateSessionStorageCart(updatedCartItems);
    } else {
      const newCartItem = { ...item, quantity: 1 };
      setCartItems([...cartItems, newCartItem]);
      updateSessionStorageCart([...cartItems, newCartItem]);
    }
  };

  const increaseCartItemQuantity = (itemId: String) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === itemId);

    if (existingCartItem) {
        const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
        setCartItems(updatedCartItems);
        updateSessionStorageCart(updatedCartItems);
    } else {
        // If the item is not in the cart, you can choose to handle it as you want
        // In this example, we add a new item to the cart with quantity 1
        const itemToAdd = items.find((item) => item.id === itemId);
        if (itemToAdd) {
        setCartItems([...cartItems, { ...itemToAdd, quantity: 1 }]);
        updateSessionStorageCart([...cartItems, { ...itemToAdd, quantity: 1 }]);
        }
    }
  }


  const decreaseCartItemQuantity = (itemId: string) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === itemId);
    if(existingCartItem){
        if(existingCartItem.quantity > 1)
        {
            const updatedCartItems = cartItems.map((cartItem) =>
            cartItem.id === itemId?{...cartItem,quantity:cartItem.quantity - 1} : cartItem
            );
            setCartItems(updatedCartItems);
            updateSessionStorageCart(updatedCartItems)
        }
        else{
            const updatedCardItems = cartItems.filter((cartItem) => 
            cartItem.id !== itemId
            );
            setCartItems(updatedCardItems);
            updateSessionStorageCart(updatedCardItems)
        }
    }
  };

  const addToWishlist = (item: ShopItem) => {
    const existingWishlistItem = wishlistItems.find((wishlistItem) => wishlistItem.id === item.id);
    if (!existingWishlistItem) {
      setWishlistItems([...wishlistItems, item]);
      updateSessionStorageWishlist([...wishlistItems, item]);
    }
    else{
        alert("already added");
    }
  };

  const removeFromWishlist = (itemId: string) => {
    const updatedWishlistItems = wishlistItems.filter((wishlistItem) => wishlistItem.id !== itemId);
    setWishlistItems(updatedWishlistItems);
    updateSessionStorageWishlist(updatedWishlistItems);
  };

  const addToTransactionHistory = (transactionHistoryItem: TransactionHistory) => {
    setTransactionHistory([...transactionHistory, transactionHistoryItem]);
    updateSessionStorageTransactionHistory([...transactionHistory, transactionHistoryItem]);
  };

  const checkout = (item: ShopItem) => {

    const generateTransactionCode = () => {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numbers = '0123456789';
      let transactionCode = '';
  
      for (let i = 0; i < 3; i++) {
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        transactionCode += randomLetter;
      }
  
      for (let i = 0; i < 3; i++) {
        const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
        transactionCode += randomNumber;
      }
  
      return transactionCode;
    };

    const transactionCode = generateTransactionCode();
    const transactionTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const transactionItems = cartItems.map((item) => ({id: item.id, name: item.name, price: item.price, quantity: item.quantity}));

    
    const transactionHistoryItem = { transactionCode, transactionTotal, transactionItems };

    addToTransactionHistory(transactionHistoryItem);
    // updateSessionStorageTransactionHistory(transactionHistoryItem);

    setCartItems([]);
    updateSessionStorageCart([]);

    alert("Transaction success!");
  };

  return (
    <ShopItemsContext.Provider
      value={{
        items,
        addToCart,
        increaseCartItemQuantity,
        decreaseCartItemQuantity,
        addToWishlist,
        removeFromWishlist,
        cartItems,
        wishlistItems,
        checkout,
        transactionHistory,
        addToTransactionHistory
      }}
    >
      {children}
    </ShopItemsContext.Provider>
  );
};

export default ShopItemsContextProvider;