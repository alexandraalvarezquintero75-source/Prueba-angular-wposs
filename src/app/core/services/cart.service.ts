import { Injectable, signal, computed, effect } from '@angular/core';
import { Product } from '../../shared/components/models/product.model';

// Defino una interfaz que extiende Product y agrega la propiedad quantity
// Esto representa un producto dentro del carrito con su cantidad
export interface CartItem extends Product {
  quantity: number;
}
@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Creo una señal privada que almacena el array de items del carrito
  // El guion bajo indica que es privada y solo se modifica dentro del servicio
  private _cart = signal<CartItem[]>([]);

  // Expongo una versión de solo lectura de la señal del carrito
  // Esto evita que componentes externos modifiquen directamente el carrito
  cart = this._cart.asReadonly();

  // Creo una señal que calcula automáticamente el total de items
  // Se recalcula cada vez que _cart cambia
  readonly cartCount = computed(() => {
    // Sumo todas las cantidades de los productos en el carrito
    return this._cart().reduce(
      //reducimos el array a un numero
      (totalQuantity, cartItem) => totalQuantity + cartItem.quantity,
      0
    );
  });

  constructor() {
    // Al iniciar el servicio, aqui intento recuperar el carrito guardado en localStorage
    const savedCart = localStorage.getItem('cart');
    // Si existe un carrito guardado, lo cargo en la señal
    if (savedCart) {
      this._cart.set(JSON.parse(savedCart));
    }
    // Creo un efecto que se ejecuta automáticamente cada vez que _cart cambia,
    effect(() => {
      // aqui btengo el estado actual del carrito
      const currentCart = this._cart();
      // y aqui guardamos el carrito en localStorage para que los datos se mantengan
      localStorage.setItem('cart', JSON.stringify(currentCart));
    });
  }

  // y aqui es el metodo para agregar un producto al carrito
  addToCart(product: Product): void {
    // Actualizo la señal del carrito usando update
    this._cart.update((cartItems) => {
      // Busco si el producto ya existe en el carrito
      const existingItemIndex = cartItems.findIndex((i) => i.id === product.id);

      // Si el producto ya existe (index >= 0)
      if (existingItemIndex >= 0) {
        // Creo una copia del array para mantener inmutabilidad
        const newItems = [...cartItems];
        // Actualizo el item incrementando su cantidad en 1
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + 1,
        };
        // Retorno el array actualizado
        return newItems;
      }
      // Si el producto no existe, lo agrego al carrito con cantidad 1
      return [...cartItems, { ...product, quantity: 1 }];
    });
  }

  // Método para eliminar un producto del carrito usando su ID
  removeFromCart(productId: number) {
    // Actualizo el carrito filtrando todos los items excepto el que tiene el ID indicado
    this._cart.update((items) =>
      items.filter((product) => product.id !== productId)
    );
  }

  // Método para vaciar completamente el carrito
  clearCart() {
    // Establezco el carrito como un array vacío
    this._cart.set([]);
  }

  // private saveCart() {
  //   localStorage.setItem('cart', JSON.stringify(this._cart()));
  // }
}
