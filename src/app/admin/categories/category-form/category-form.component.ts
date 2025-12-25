import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  form!: FormGroup;
  isEdit: boolean = false;
  categoryId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      image: ['', [Validators.required, Validators.pattern('https?://.*')]],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEdit = true;
      this.categoryId = Number(idParam);
      this.loadCategoryData(this.categoryId);
    }
  }

  loadCategoryData(id: number): void {
    this.productService.getCategoryById(id).subscribe({
      next: (category: Category) => {
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

  saveCategory(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const categoryData: Partial<Category> = this.form.value;

    if (this.isEdit && this.categoryId) {
      this.productService
        .updateCategory(this.categoryId, categoryData)
        .subscribe({
          next: () => this.handleSuccess(),
          error: (err: Error) => console.error('Error al actualizar:', err),
        });
    } else {
      this.productService.createCategory(categoryData).subscribe({
        next: () => this.handleSuccess(),
        error: (err: Error) => console.error('Error al crear:', err),
      });
    }
  }

  private handleSuccess(): void {
    this.router.navigate(['/admin/categories']);
  }
}
