import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Signal } from '@angular/core';
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
    MatDialogModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public authService = inject(AuthService);
  private cartService = inject(CartService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private dialog = inject(MatDialog);

  cartCount = 0;

  constructor() {
    this.cartService.cart$.subscribe(
      (items) => (this.cartCount = items.length)
    );
  }

  // constructor() {
  //   this.cartService.cart$.subscribe((items) => {
  //     this.cartCount.set(items.length);
  //   });
  // }

  onLogout() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',

      data: { message: '¿Estás seguro de cerrar sesión' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authService.logout();
        this.router.navigate(['/login']);
        this.toastr.info('Sesion cerrada con exito', 'Sistema');
      }
    });
    // this.authService.logout();
    // this.router.navigate(['/login']);
  }
}
