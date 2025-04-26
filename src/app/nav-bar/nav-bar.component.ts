import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  standalone: true,
})
export class NavBarComponent implements OnInit {
  cartItemCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      // Calculate the total quantity of items in the cart
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }
}
