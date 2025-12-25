import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { ProductCardComponent } from '../../products/product-card/product-card.component';
import { Product } from '../../shared/components/models/product.model';
import { Category } from '../../shared/components/models/category.model';
import { CartService } from '../../core/services/cart.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, MatChipsModule, MatIconModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  // private productService = inject(ProductService);
  // private cartService = inject(CartService);

  products: Product[] = [];
  categories: Category[] = [];

  constructor(
    private toastr: ToastrService,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (data: Category[]) => (this.categories = data),
      error: (err) => console.error('Error al cargar categorías', err),
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => (this.products = data),
      error: (err) => console.error('Error al cargar productos', err),
    });
  }

  filterByCategory(id: number): void {
    this.productService.getProductsByCategory(id).subscribe({
      next: (data: Product[]) => (this.products = data),
      error: (err) => console.error('Error al filtrar productos', err),
    });
  }

  onAddToCart(product: Product) {
    this.toastr.success(`${product.title} se añadió al carrito`, '¡Éxito!');
    this.cartService.addToCart(product);
  }
}
