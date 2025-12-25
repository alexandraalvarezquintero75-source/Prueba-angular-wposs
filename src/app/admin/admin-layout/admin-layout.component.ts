import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../core/services/auth.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
  constructor(
    public authService: AuthService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ) {}

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
  }

  get currentRouteTitle(): string {
    return this.router.url.includes('products') ? 'Productos' : 'Categorías';
  }
}
