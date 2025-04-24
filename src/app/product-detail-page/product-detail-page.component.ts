import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { CurrencyPipe } from '@angular/common';

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

  product?: Product;

  constructor() {
    const productName = this.route.snapshot.paramMap.get('name');

    if (!productName) {
      this.router.navigate(['products']);
      return;
    }

    // 根据产品名称获取特价状态
    // 在实际应用中，这些数据应该来自服务
    let isDiscounted = false;
    
    // 检查是否是特价产品 (A, C, E 是特价产品)
    if (productName === 'A 產品' || productName === 'C 產品' || productName === 'E 產品') {
      isDiscounted = true;
    }

    // Mock data - in a real app this would come from a service
    this.product = new Product({
      name: productName,
      authors: ['作者 A', '作者 B', '作者 C'],
      company: '博碩文化',
      isDiscounted: isDiscounted, // 使用实际的特价状态
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      price: 1580,
    });
  }

  addToCart(): void {
    if (this.product) {
      this.router.navigate(['product', 'form', this.product.name]);
    }
  }

  goBack(): void {
    this.router.navigate(['products']);
  }
}
