import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/components/models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr'; // <-- Añadido
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  // private route = inject(ActivatedRoute);
  // private productService = inject(ProductService);
  // private cartService = inject(CartService);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  product?: Product;
  mainImage: string = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(Number(id)).subscribe({
        next: (data) => {
          this.product = data;
          this.mainImage = data.images[0];
        },
        error: (err) => console.error('Error al cargar detalle', err),
      });
    }
  }

  changeImage(url: string) {
    this.mainImage = url;
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
      this.toastr.success(
        `${this.product.title} añadido al carrito`,
        'Carrito'
      );
    }
  }
}
