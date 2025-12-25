import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CartService } from '../../core/services/cart.service';
import { Product } from '../../shared/components/models/product.model';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule, MatDialogModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  // private dialog = inject(MatDialog);
  // private cartService = inject(CartService);
  // private toastr = inject(ToastrService);

  cartItems: Product[] = [];

  constructor(
    private dialog: MatDialog,
    private cartService: CartService,
    private toastr: ToastrService
  ) {
    this.cartService.cart$
      .pipe(takeUntilDestroyed())
      .subscribe((items) => (this.cartItems = items));
  }

  ngOnInit(): void {}

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

  get total(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }
}
