import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-form-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form-page.component.html',
  styleUrl: './product-form-page.component.scss',
})
export class ProductFormPageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  product?: Product;
  quantity = 1;

  name = '';
  address = '';
  phone = '';

  constructor() {
    const productName = this.route.snapshot.paramMap.get('name');

    if (!productName) {
      this.router.navigate(['products']);
      return;
    }

    this.product = new Product({
      name: productName,
      authors: ['作者 A', '作者 B', '作者 C'],
      company: '博碩文化',
      isDiscounted: true,
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      price: 1580,
    });
  }

  getTotalAmount(): number {
    return (this.product?.price || 0) * this.quantity;
  }

  removeProduct(): void {
    this.router.navigate(['products']);
  }

  submitOrder(): void {
    if (this.validateForm()) {
      alert('訂單已送出！');
      this.router.navigate(['products']);
    }
  }

  private validateForm(): boolean {
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
