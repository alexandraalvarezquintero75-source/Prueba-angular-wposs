import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/components/models/product.model';
import { Category } from '../../shared/components/models/category.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[] = [];
  isEditMode = false;
  productId?: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required]],
      categoryId: [null, [Validators.required]],
      images: [['https://placebear.com/640/480']],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.productId = Number(id);
      this.loadProductData(this.productId);
    }
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.log('Error cargando categorias'),
    });
  }

  loadProductData(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product: Product) => {
        this.productForm.patchValue({
          title: product.title,
          price: product.price,
          description: product.description,
          categoryId: product.category.id,
        });
      },
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    const productData = this.productForm.value;

    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(this.productId, productData).subscribe({
        next: () => this.router.navigate(['/admin/products']),
        error: (err: Error) => {
          console.error(err);
          alert('Error al actualizar');
        },
      });
    } else {
      this.productService.createProduct(productData).subscribe({
        next: () => this.router.navigate(['/admin/products']),
        error: (err: Error) => {
          console.error(err);
          alert('Error al crear');
        },
      });
    }
  }
}
