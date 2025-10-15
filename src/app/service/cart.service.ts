import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from './../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: Cart[] = [];
  private cart = new BehaviorSubject<Cart[]>([]);
  cart$ = this.cart.asObservable();

  ajouterAuPanier(item: Cart) {
    
    if (!item.id) {
      const existingIds = this.items
        .map((i) => i.id)
        .filter((id): id is number => id !== undefined);
      const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
      item.id = newId;
    }

    
    const existant = this.items.find((p) => p.idMedo === item.idMedo);

    if (existant) {
      // Ne pas dépasser la quantité maximale
      if (existant.quantite < existant.quantiteMax) {
        existant.quantite += 1;
      } else {
        console.warn(`Quantité maximale atteinte pour ${existant.nom}`);
      }
    } else {
      // On s'assure que la quantité initiale ne dépasse pas la limite
      item.quantite = Math.min(item.quantite, item.quantiteMax);
      this.items.push(item);
    }

    this.cart.next(this.items);
  }

  supprimerDuPanier(id: number) {
    this.items = this.items.filter((p) => p.id !== id);
    this.cart.next(this.items);
  }

  modifierQuantite(id: number, quantite: number) {
    const produit = this.items.find((p) => p.id === id);
    if (produit) {
      if (quantite > 0 && quantite <= produit.quantiteMax) {
        produit.quantite = quantite;
      } else {
        console.warn(`Quantité invalide pour ${produit.nom}`);
      }
    }
    this.cart.next(this.items);
  }

  getTotal(): number {
    return this.items.reduce((acc, item) => acc + item.prix * item.quantite, 0);
  }

  getItems(): Cart[] {
    return this.items;
  }

  getNombreTotalElements(): number {
    return this.items.reduce((acc, item) => acc + item.quantite, 0);
  }

  viderPanier() {
    this.items = [];
    this.cart.next([]);
  }
}
