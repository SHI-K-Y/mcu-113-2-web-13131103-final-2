import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
  // Mock cart data - in a real app this would come from a service
  cartItems: { product: Product; quantity: number }[] = [
    {
      product: new Product({
        name: 'C 產品',
        authors: ['作者 A', '作者 B', '作者 C'],
        company: '博碩文化',
        isDiscounted: true,
        photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
        price: 1580,
      }),
      quantity: 1,
    },
  ];

  // Form fields for customer information
  name = '';
  address = '';
  phone = '';

  getTotalAmount(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
  }

  updateQuantity(index: number, quantity: number): void {
    if (quantity > 0) {
      this.cartItems[index].quantity = quantity;
    }
  }

  submitOrder(): void {
    if (this.validateForm()) {
      alert('訂單已送出！');
      this.cartItems = [];
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
