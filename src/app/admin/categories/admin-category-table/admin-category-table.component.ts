import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

// Material Modules
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';

// Models & Services
import { Category } from '../../../shared/components/models/category.model';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-admin-category-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  templateUrl: './admin-category-table.component.html',
  styleUrls: ['./admin-category-table.component.scss'],
})
export class AdminCategoryTableComponent implements OnInit {
  private productService = inject(ProductService);

  dataSource = new MatTableDataSource<Category>([]);
  displayedColumns: string[] = ['id', 'image', 'name', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.dataSource.data = data;
        // Timeout ligero para asegurar que el DOM del paginador esté listo
        setTimeout(() => this.dataSource.paginator = this.paginator);
      },
      error: (err: Error) => console.error('Error cargando categorías', err),
    });
  }

  onDelete(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.productService.deleteCategory(id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter((c) => c.id !== id);
        },
        error: () => alert('No se pudo eliminar. Verifique si tiene productos asociados.'),
      });
    }
  }
}
