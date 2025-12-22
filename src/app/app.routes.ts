import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './cart/cart/cart.component';
import { AdminProductTableComponent } from './products/admin-product-table/admin-product-table.component';
import { AdminCategoryTableComponent } from './categories/admin-category-table/admin-category-table.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { ProductDetailComponent } from './products/product-detail/product-detail/product-detail.component';
// Nota: Según tus comandos 'ng g c landing/landing-page', el componente se llama LandingPageComponent
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Rutas Públicas
  { path: 'home', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product/:id', component: ProductDetailComponent },

  // Rutas Administrativas Protegidas
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      { path: 'products', component: AdminProductTableComponent }, 
      { path: 'products/new', component: ProductFormComponent },
      { path: 'products/edit/:id', component: ProductFormComponent },
      { path: 'categories', component: AdminCategoryTableComponent },
      { path: 'categories/new', component: CategoryFormComponent },
      { path: 'categories/edit/:id', component: CategoryFormComponent },
    ],
  },


  { path: '**', redirectTo: 'home' },
];
