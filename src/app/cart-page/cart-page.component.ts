import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product } from '../models/product';
import { CartService, CartItem } from '../services/cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent implements OnInit {
  cartItems: CartItem[] = [];

  name = '';
  address = '';
  phone = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  getTotalAmount(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  removeItem(index: number): void {
    this.cartService.removeFromCart(index);
  }

  updateQuantity(index: number, quantity: number): void {
    if (quantity > 0) {
      this.cartService.updateQuantity(index, quantity);
    }
  }

  submitOrder(): void {
    if (this.validateForm()) {
      alert('訂單已送出！');
      this.cartService.clearCart();
    }
  }

  private validateForm(): boolean {
    if (this.cartItems.length === 0) {
      alert('購物車是空的！');
      return false;
    }

    if (!this.name) {
      alert('請輸入姓名');
      return false;
    }
    if (!this.address) {
      alert('請輸入地址');
      return false;
    }
    if (!this.phone) {
      alert('請輸入電話');
      return false;
    }
    return true;
  }
}
