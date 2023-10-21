import { ShopItem } from "../data/shopitem-context";

export function updateSessionStorageCart(cartItems: ShopItem[]): void {
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
  }

export function updateSessionStorageWishlist(wishlistItems: ShopItem[]): void {
    sessionStorage.setItem('wishlist', JSON.stringify(wishlistItems));
}

export function updateSessionStorageTransactionHistory(transactionHistory: any): void {
    sessionStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));
}


