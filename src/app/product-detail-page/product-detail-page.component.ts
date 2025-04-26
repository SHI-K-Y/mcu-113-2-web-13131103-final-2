import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-detail-page',
  imports: [CurrencyPipe],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss',
  standalone: true,
})
export class ProductDetailPageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cartService = inject(CartService);

  product?: Product;

  constructor() {
    const productName = this.route.snapshot.paramMap.get('name');

    if (!productName) {
      this.router.navigate(['products']);
      return;
    }

    let isDiscounted = false;

    if (productName === 'A 產品' || productName === 'C 產品' || productName === 'E 產品') {
      isDiscounted = true;
    }

    this.product = new Product({
      name: productName,
      authors: ['作者 A', '作者 B', '作者 C'],
      company: '博碩文化',
      isDiscounted: isDiscounted,
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      price: 1580,
    });
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
      alert(`已將 ${this.product.name} 加入購物車`);
    }
  }

  goBack(): void {
    this.router.navigate(['products']);
  }
}
