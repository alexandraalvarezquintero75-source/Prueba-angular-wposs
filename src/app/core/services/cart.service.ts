import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../shared/components/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = JSON.parse(
    localStorage.getItem('cart') || '[]'
  );

  private _cart = new BehaviorSubject<Product[]>(this.cartItems);
  cart$ = this._cart.asObservable();

  addToCart(product: Product) {
    this.cartItems.push(product);
    this.saveCart();
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter((p) => p.id !== productId);
    this.saveCart();
  }

  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this._cart.next(this.cartItems);
  }
}
