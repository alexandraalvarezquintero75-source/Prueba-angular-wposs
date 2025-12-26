import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  private cartService = inject(CartService);
  private dialog = inject(MatDialog);
  private toastr = inject(ToastrService);

  cartItems = this.cartService.cart;

  total = computed(() =>
    this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );

  removeItem(productId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: '¿Deseas quitar este producto del carrito?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cartService.removeFromCart(productId);
        this.toastr.warning('El producto se ha eliminado', 'Sistema');
      }
    });
  }

  clearCart() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: '¿Estás seguro de que deseas vaciar todo el carrito?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cartService.clearCart();
        this.toastr.info('El carrito se ha vaciado', 'Sistema');
      }
    });
  }
}
