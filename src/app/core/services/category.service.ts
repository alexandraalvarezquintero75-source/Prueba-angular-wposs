import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../shared/components/models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryUrl = 'https://api.escuelajs.co/api/v1/categories';
  constructor(private http: HttpClient) {}

  createCategory(data: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(this.categoryUrl, data);
  }

  updateCategory(id: number, data: Partial<Category>): Observable<Category> {
    return this.http.put<Category>(`${this.categoryUrl}/${id}`, data);
  }

  deleteCategory(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.categoryUrl}/${id}`);
  }
}
