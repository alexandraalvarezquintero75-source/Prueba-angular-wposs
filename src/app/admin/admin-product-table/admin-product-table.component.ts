import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/components/models/product.model';

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-product-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './admin-product-table.component.html',
  styleUrls: ['./admin-product-table.component.scss'],
})
export class AdminProductTableComponent implements OnInit {
  products: Product[] = [];
  // Definimos las columnas que queremos mostrar
  displayedColumns: string[] = [
    'id',
    'image',
    'title',
    'price',
    'category',
    'actions',
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => console.error('Error al cargar productos', err),
    });
  }

  onDelete(id: number): void {
    // Requerimiento: Mostrar confirmación antes de eliminar
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          // Filtramos la lista local para que desaparezca visualmente
          this.products = this.products.filter((p) => p.id !== id);
          alert('Producto eliminado correctamente');
        },
        error: (err) => alert('No se pudo eliminar el producto'),
      });
    }
  }
}
