import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../shared/components/models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
// responsabilidad
// Mostrar el producto
// Avisar al padre cuando se quiere agregar al carrito
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCard = new EventEmitter<Product>();

  onAddToCart() {
    this.addToCard.emit(this.product);
    console.log('Producto añadido:', this.product.title);
  }
}
