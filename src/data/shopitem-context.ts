import React from 'react';

export interface ShopItem {
  id: string;
  imageURL: string;
  name: string;
  price: number;
  quantity: number;
}

export interface TransactionHistory {
    transactionCode: string;
    transactionTotal: number;
    transactionItems: {
      id: string;
      name: string;
      price: number;
      quantity: number;
    }[];
}


interface Context {
  items: ShopItem[];
  cartItems: ShopItem[];
  addToCart: (item: ShopItem) => void;
  increaseCartItemQuantity: (id: string) => void;
  decreaseCartItemQuantity: (id: string) => void;
  wishlistItems: ShopItem[];
  addToWishlist: (item: ShopItem) => void;
  removeFromWishlist: (id: string) => void;
  checkout: (item: ShopItem) => void;
  transactionHistory: TransactionHistory[];
  addToTransactionHistory: (transaction: TransactionHistory) => void;
}

const ShopItemsContext = React.createContext<Context>({
  items: [],
  addToCart: () => {},
  increaseCartItemQuantity: () => {},
  decreaseCartItemQuantity: () => {},
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  cartItems: [],
  wishlistItems: [],
  checkout: () => {},
  transactionHistory: [],
  addToTransactionHistory: () => {},
});

export default ShopItemsContext;