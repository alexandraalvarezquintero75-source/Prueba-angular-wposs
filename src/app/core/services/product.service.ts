import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs'; // Importamos map
import { Product } from '../../shared/components/models/product.model';

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';

  constructor(private http: HttpClient) {}

  private cleanProductImages(product: any): Product {
    return {
      ...product,
      images: product.images.map((img: string) => {
        let cleanUrl = img.replace(/[\[\]\\"]/g, '');
        if (cleanUrl.includes('placeimg.com')) {
          return 'images/default.webp';
        }
        return cleanUrl;
      }),
    };
  }

  getProducts(): Observable<Product[]> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(map((products) => products.map((p) => this.cleanProductImages(p))));
  }

  getProductById(id: number): Observable<Product> {
    return this.http
      .get<any>(`${this.apiUrl}/${id}`)
      .pipe(map((p) => this.cleanProductImages(p)));
  }

  createProduct(data: CreateProductDTO): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, data);
  }

  updateProduct(
    id: number,
    data: Partial<CreateProductDTO>
  ): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, data);
  }

  deleteProduct(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
