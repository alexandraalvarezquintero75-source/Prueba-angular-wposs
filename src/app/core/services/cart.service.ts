import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../shared/components/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = [];
  private _cart = new BehaviorSubject<Product[]>([]);
  cart$ = this._cart.asObservable();

  constructor() {
    // Inicializar desde localStorage al cargar el servicio
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this._cart.next([...this.cartItems]); // Enviamos copia inicial
    }
  }

  addToCart(product: Product) {
    // Usamos el operador spread [...] para crear una nueva referencia
    this.cartItems = [...this.cartItems, product];
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
    // IMPORTANTE: Enviamos una copia nueva del arreglo
    this._cart.next([...this.cartItems]);
  }
}
