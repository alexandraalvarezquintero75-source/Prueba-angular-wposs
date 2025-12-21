import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { ProductCardComponent } from '../../products/product-card/product-card.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  private ProductService = inject(ProductService);

  products: any[] = [];

  ngOnInit(): void {
    this.ProductService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log('productos cargados:', this.products);
      },
      error: (err) => console.error('error al cargar productos', err),
    });
  }
}
