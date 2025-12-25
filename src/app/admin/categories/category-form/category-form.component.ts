import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

// Importación de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Importación de Modelos y Servicio
import { Category } from '../../../shared/components/models/category.model';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  // Definición de propiedades con tipado estricto
  form!: FormGroup;
  isEdit: boolean = false;
  categoryId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    // Obtenemos el ID de la ruta de forma segura
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEdit = true;
      this.categoryId = Number(idParam);
      this.loadCategoryData(this.categoryId);
    }
  }

  /**
   * Construye la estructura del formulario reactivo
   */
  private buildForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      image: ['', [Validators.required, Validators.pattern('https?://.*')]],
    });
  }

  /**
   * Carga los datos de la categoría cuando estamos en modo edición
   * @param id Identificador numérico de la categoría
   */
  private loadCategoryData(id: number): void {
    this.productService.getCategoryById(id).subscribe({
      next: (category: Category) => {
        // Llenamos el formulario con los datos recibidos de la API
        this.form.patchValue({
          name: category.name,
          image: category.image,
        });
      },
      error: (err: Error) => {
        console.error('Error al cargar la categoría:', err);
      },
    });
  }

  /**
   * Ejecuta la acción de guardar (Crear o Actualizar)
   */
  saveCategory(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Muestra errores visuales si el usuario intenta enviar vacío
      return;
    }

    // Obtenemos una copia de los valores del formulario
    const categoryData: Partial<Category> = this.form.value;

    if (this.isEdit && this.categoryId) {
      // Lógica para Actualizar
      this.productService
        .updateCategory(this.categoryId, categoryData)
        .subscribe({
          next: () => this.handleSuccess(),
          error: (err: Error) => console.error('Error al actualizar:', err),
        });
    } else {
      // Lógica para Crear
      this.productService.createCategory(categoryData).subscribe({
        next: () => this.handleSuccess(),
        error: (err: Error) => console.error('Error al crear:', err),
      });
    }
  }

  /**
   * Redirección tras éxito en la operación
   */
  private handleSuccess(): void {
    this.router.navigate(['/admin/categories']);
  }
}
