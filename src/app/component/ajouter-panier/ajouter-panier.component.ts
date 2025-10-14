import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ajouter-panier',
  imports: [CommonModule],
  templateUrl: './ajouter-panier.component.html',
  styleUrl: './ajouter-panier.component.css'
})
export class AjouterPanierComponent {
  isAdded = false;

  ajouterAuPanier() {
    this.isAdded = true;

    setTimeout(() => {
      this.isAdded = false;
    }, 2000);
  }
}
