import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../shared/components/models/product.model';
import { Category } from '../../shared/components/models/category.model';
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

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.categoryUrl}/${id}`);
  }

  createCategory(data: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(this.categoryUrl, data);
  }

  updateCategory(id: number, data: Partial<Category>): Observable<Category> {
    return this.http.put<Category>(`${this.categoryUrl}/${id}`, data);
  }

  deleteCategory(id: number): Observable<boolean> {
    // Nota: La API de Platzi requiere que la categoría no tenga productos asociados
    // para poder ser eliminada con éxito.
    return this.http.delete<boolean>(`${this.categoryUrl}/${id}`);
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.categoryUrl}/${categoryId}/products`
    );
  }
}
