import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
  private _cart = new BehaviorSubject<any[]>(this.cartItems);

  cart$ = this._cart.asObservable();

  addToCart(product: any) {
    this.cartItems.push(product);
    this.saveCart();
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this._cart.next(this.cartItems);
  }
}
