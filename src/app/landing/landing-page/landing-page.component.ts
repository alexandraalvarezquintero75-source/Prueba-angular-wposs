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
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, MatChipsModule, MatIconModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];

  constructor(
    private toastr: ToastrService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => (this.categories = data),
      error: (err) => {
        this.toastr.error('No se pudieron cargar las categorías', 'Error');
      },
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => (this.products = data),
      error: (err) => {
        this.toastr.error('No se pudieron cargar los productos', 'Error');
      },
    });
  }

  filterByCategory(id: number): void {
    this.categoryService.getProductsByCategory(id).subscribe({
      next: (data: Product[]) => (this.products = data),
      error: (err) => {
        this.toastr.error('No se pudieron filtrar los productos', 'Error');
      },
    });
  }

  onAddToCart(product: Product) {
    this.toastr.success(`${product.title} se añadió al carrito`, '¡Éxito!');
    this.cartService.addToCart(product);
  }
}
