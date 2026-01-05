import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../shared/components/models/category.model';
import { Product } from '../../shared/components/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryUrl = 'https://api.escuelajs.co/api/v1/categories';

  constructor(private http: HttpClient) {}

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
    return this.http.delete<boolean>(`${this.categoryUrl}/${id}`);
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.categoryUrl}/${categoryId}/products`
    );
  }
}
