import { Injectable, signal, computed, effect } from '@angular/core';
import { Product } from '../../shared/components/models/product.model';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cart = signal<CartItem[]>([]);

  // señal pública (solo lectura)
  cart = this._cart.asReadonly();

  // señal derivada
  readonly cartCount = computed(() => {
    return this._cart().reduce((acc, item) => acc + item.quantity, 0);
  });

  constructor() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this._cart.set(JSON.parse(savedCart));
    }
    effect(() => {
      const currentCart = this._cart();
      localStorage.setItem('cart', JSON.stringify(currentCart));
    });
  }

  addToCart(product: Product): void {
    this._cart.update((items) => {
      const index = items.findIndex((i) => i.id === product.id);

      if (index >= 0) {
        const newItems = [...items];
        newItems[index] = {
          ...newItems[index],
          quantity: newItems[index].quantity + 1,
        };
        return newItems;
      }
      return [...items, { ...product, quantity: 1 }];
    });
  }

  removeFromCart(productId: number) {
    this._cart.update((items) => items.filter((p) => p.id !== productId));
  }

  clearCart() {
    this._cart.set([]);
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this._cart()));
  }
}
