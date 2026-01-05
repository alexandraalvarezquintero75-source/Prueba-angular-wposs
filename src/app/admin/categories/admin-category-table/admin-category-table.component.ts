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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CategoryService } from '../../../core/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

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
    MatTooltipModule,
    MatDialogModule,
  ],
  templateUrl: './admin-category-table.component.html',
  styleUrls: ['./admin-category-table.component.scss'],
})
export class AdminCategoryTableComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  dataSource = new MatTableDataSource<Category>([]);
  displayedColumns: string[] = ['id', 'image', 'name', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.dataSource.data = data;
        setTimeout(() => (this.dataSource.paginator = this.paginator));
      },
      error: () => {
        this.toastr.error('Error al cargar categorias', 'Error');
      },
    });
  }

  onDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: '¿Estas seguro de eliminar esta categoría?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.deleteCategory(id).subscribe({
          next: () => {
            this.dataSource.data = this.dataSource.data.filter(
              (p) => p.id !== id
            );
            this.toastr.success('categoría eliminada correctamente', 'Sistema');
          },
          error: () => {
            this.toastr.error(
              'No se pudo eliminarla categoría, Verifique si tiene productos asociados',
              'Error'
            );
          },
        });
      }
    });
  }
}
