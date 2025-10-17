import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Cart } from '../../models/cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  items: Cart[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.items = this.cartService.getItems();
    console.log(this.items);
  }

  incrementer(item: Cart) {
    this.cartService.modifierQuantite(item.id!, item.quantite + 1);
  }

  decrementer(item: Cart) {
    if (item.quantite > 1) {
      this.cartService.modifierQuantite(item.id!, item.quantite - 1);
    }
  }

  supprimer(id: number) {
    this.cartService.supprimerDuPanier(id);
    this.items = this.cartService.getItems();
  }

  getTotal() {
    return this.cartService.getTotal();
  }

  acheter() {
    this.cartService.acheter();
    alert('Achat effectué avec succès !');
  }

}
