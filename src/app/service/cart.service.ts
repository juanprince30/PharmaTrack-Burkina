import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from './../models/cart';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: Cart[] = [];
  private cart = new BehaviorSubject<Cart[]>([]);
  cart$ = this.cart.asObservable();

  private salesUrl = 'http://localhost:3000/sales';
  private medicinesUrl = 'http://localhost:3000/medicines';
  private alertsUrl = 'http://localhost:3000/alerts';

  constructor(private http: HttpClient) {}

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
    this.cart.next(this.items);
  }

  acheter() {
    const dateAujourdhui = new Date().toISOString().split('T')[0];

    //récupérer toutes les ventes existantes
    this.http.get<any[]>(this.salesUrl).subscribe({
      next: (ventesExistantes) => {
        let dernierIdVente = 0;

        if (ventesExistantes.length > 0) {
          const ids = ventesExistantes.map(v => parseInt(v.id, 10));
          dernierIdVente = Math.max(...ids);
        }

        // récupérer toutes les alertes existantes (pour id auto)
        this.http.get<any[]>(this.alertsUrl).subscribe({
          next: (alertesExistantes) => {
            let dernierIdAlerte = 0;

            if (alertesExistantes.length > 0) {
              const ids = alertesExistantes.map(a => parseInt(a.id, 10));
              dernierIdAlerte = Math.max(...ids);
            }

            // traiter chaque médicament dans le panier
            this.items.forEach((item, index) => {
              const nouvelIdVente = (dernierIdVente + index + 1).toString();
              const vente = {
                id: nouvelIdVente,
                medicineId: item.idMedo,
                quantitySold: item.quantite,
                date: dateAujourdhui,
                total: item.prix * item.quantite,
              };

              //Ajouter la vente
              this.http.post(this.salesUrl, vente).subscribe({
                next: () => console.log(`Vente enregistrée pour ${item.nom} (ID ${nouvelIdVente})`),
                error: (err) => console.error('Erreur en ajoutant la vente :', err),
              });

              //Mettre à jour la quantité du médicament
              this.http.get<any>(`${this.medicinesUrl}/${item.idMedo}`).subscribe({
                next: (medicament) => {
                  const nouvelleQuantite = medicament.quantity - item.quantite;
                  const medicamentMisAJour = {
                    ...medicament,
                    quantity: nouvelleQuantite,
                  };
                  console.log("medicamentMisAJour:"+medicamentMisAJour)

                  this.http.put(`${this.medicinesUrl}/${item.idMedo}`, medicamentMisAJour).subscribe({
                    next: () => {
                      console.log(`Quantité mise à jour pour ${item.nom}`);

                      //Vérifier si le stock est faible → créer une alerte
                      if (nouvelleQuantite < 10) {
                        const nouvelIdAlerte = (dernierIdAlerte + 1).toString();
                        dernierIdAlerte++; // pour ne pas réutiliser le même id s’il y a plusieurs alertes

                        const alerte = {
                          id: nouvelIdAlerte,
                          medicineId: item.idMedo,
                          message: `Stock faible pour ${item.nom} (${nouvelleQuantite} restants)`,
                          type: 'warning',
                        };

                        this.http.post(this.alertsUrl, alerte).subscribe({
                          next: () => console.log(`Alerte créée pour ${item.nom} (ID ${nouvelIdAlerte})`),
                          error: (err) => console.error('Erreur en créant une alerte :', err),
                        });
                      }
                    },
                    error: (err) =>
                      console.error('Erreur en mettant à jour la quantité du médicament :', err),
                  });
                },
                error: (err) =>
                  console.error('Erreur lors de la récupération du médicament :', err),
              });
            });

            // 🧹 Vider le panier après achat
            this.viderPanier();
          },
          error: (err) => console.error('Erreur lors de la récupération des alertes :', err),
        });
      },
      error: (err) => console.error('Erreur lors de la récupération des ventes existantes :', err),
    });
  }


}
