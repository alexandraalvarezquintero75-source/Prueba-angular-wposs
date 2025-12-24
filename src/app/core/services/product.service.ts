import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../shared/components/models/product.model';
export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';
  private categoryUrl = 'https://api.escuelajs.co/api/v1/categories';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.categoryUrl);
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/?categoryId=${categoryId}`);
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
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
