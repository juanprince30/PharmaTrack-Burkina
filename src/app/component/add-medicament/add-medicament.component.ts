import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Drug } from '../../models/drug';
import { DrugService } from '../../service/drug.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-medicament',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-medicament.component.html',
  styleUrls: ['./add-medicament.component.css']
})
export class AddMedicamentComponent {
  drug: Drug = {
    name: '',
    category: '',
    price: 0,
    quantity: 0,
    expirationDate: '',
    image: ''
  };

  imagePreview: string | ArrayBuffer | null = null;

  constructor(private drugService: DrugService, private router: Router) {}

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.imagePreview = base64String;
        this.drug.image = base64String;
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmit(): void {
    if (!this.drug.name || !this.drug.category || !this.drug.price || !this.drug.quantity || !this.drug.expirationDate) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    
    if (this.drug.price <= 0) {
      alert('Le prix unitaire doit être strictement supérieur à 0.');
      return;
    }

    
    if (this.drug.quantity <= 10) {
      alert('La quantité doit être strictement supérieure à 10.');
      return;
    }

    
    const today = new Date();
    const expiration = new Date(this.drug.expirationDate);
    if (expiration <= today) {
      alert("La date d'expiration doit être postérieure à la date du jour.");
      return;
    }

    
    this.drugService.getAllDrugs().subscribe({
      next: (drugs) => {
        const newId = drugs.length > 0 ? drugs.length + 1 : 1; 
        this.drug.id = String(newId);

        
        this.drugService.addDrug(this.drug).subscribe({
          next: () => {
            alert('Médicament ajouté avec succès !');
            this.router.navigate(['/medicaments']);
          },
          error: (err) => {
            console.error('Erreur lors de l’ajout du médicament :', err);
            alert('Une erreur est survenue lors de l’ajout du médicament.');
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des médicaments :', err);
        alert('Impossible de générer un ID pour le médicament.');
      }
    });
  }
}
