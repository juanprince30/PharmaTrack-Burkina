import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-ajouter-panier',
  imports: [CommonModule],
  templateUrl: './ajouter-panier.component.html',
  styleUrl: './ajouter-panier.component.css'
})
export class AjouterPanierComponent implements OnInit {
  items: Cart[] = [];

  ngOnInit() {
    this.items = this.cartService.getItems();
  }

  @Input() is_enable: Boolean = false;
  @Input() nom: string = '';    
  @Input() image: string = '';     
  @Input() prix: string = ''; 
  @Input() idMedoc: number = 0;     
  @Input() qteMax: number = 0; 

  isAdded = false;

  constructor(private cartService: CartService) {}

  ajouterAuPanier(nom:string, prix:string, image:string, qteMax:number, idMedoc:number) {
    const item: Cart = {
      nom: nom,
      prix: Number(prix),
      image: image,
      quantite: 1,
      idMedo: idMedoc,
      quantiteMax: qteMax
    };
    this.cartService.ajouterAuPanier(item);
    this.isAdded = true;

    console.log(item);

    setTimeout(() => {
      this.isAdded = false;
    }, 2000);
  }
}
