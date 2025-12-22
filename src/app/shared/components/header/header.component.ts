import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public authService = inject(AuthService);
  private cartService = inject(CartService);
  private router = inject(Router);

  cartCount = 0;

  constructor() {
  
    this.cartService.cart$.subscribe(
      (items) => (this.cartCount = items.length)
    );
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
