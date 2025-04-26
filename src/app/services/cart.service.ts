import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  addToCart(product: Product): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItemIndex = currentItems.findIndex((item) => item.product.name === product.name);

    if (existingItemIndex !== -1) {
      // Product already exists in cart, increment quantity
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + 1,
      };
      this.cartItemsSubject.next(updatedItems);
    } else {
      // Add new product to cart
      this.cartItemsSubject.next([...currentItems, { product, quantity: 1 }]);
    }
  }

  removeFromCart(index: number): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter((_, i) => i !== index);
    this.cartItemsSubject.next(updatedItems);
  }

  updateQuantity(index: number, quantity: number): void {
    if (quantity <= 0) return;

    const currentItems = this.cartItemsSubject.value;
    const updatedItems = [...currentItems];
    updatedItems[index] = {
      ...updatedItems[index],
      quantity,
    };
    this.cartItemsSubject.next(updatedItems);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
}
