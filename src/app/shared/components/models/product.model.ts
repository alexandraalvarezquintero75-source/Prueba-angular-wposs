import { Category } from './category.model'; // Importante para el CRUD de categorías

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category; // Requerido para mostrar la categoría en el detalle y para filtrar
  creationAt?: string; // Opcional, útil para auditoría en las tablas admin
  updatedAt?: string; // Opcional
}
