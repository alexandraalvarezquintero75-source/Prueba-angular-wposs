import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { CartService } from '../../core/services/cart.service';
import { Product } from '../../shared/components/models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  private cartService = inject(CartService);
  cartItems: Product[] = [];

  ngOnInit(): void {
    
    this.cartService.cart$.subscribe((items) => (this.cartItems = items));
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  get total(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }
}
