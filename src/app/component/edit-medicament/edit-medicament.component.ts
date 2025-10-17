import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DrugService } from '../../service/drug.service';
import { Drug } from '../../models/drug';

@Component({
  selector: 'app-edit-medicament',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './edit-medicament.component.html',
  styleUrl: './edit-medicament.component.css'
})
export class EditMedicamentComponent implements OnInit {
  drug: Drug = {
    name: '',
    category: '',
    price: 0,
    quantity: 0,
    expirationDate: '',
    image: ''
  };

  imagePreview: string | ArrayBuffer | null = null;
  drugId: string = '';

  constructor(
    private drugService: DrugService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.drugId = this.route.snapshot.paramMap.get('id') || '';
    if (this.drugId) {
      this.loadDrug();
    }
  }

  loadDrug(): void {
    this.drugService.getDrugById(Number(this.drugId)).subscribe({
      next: (d) => {
        this.drug = { ...d };
        this.imagePreview = d.image|| null;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du médicament :', err);
        alert('Impossible de charger les informations du médicament.');
      }
    });
  }

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

    // Mettre à jour le médicament
    this.drugService.editDrug(Number(this.drugId), this.drug).subscribe({
      next: () => {
        alert('Médicament modifié avec succès !');
        this.router.navigate(['/medicaments']);
      },
      error: (err) => {
        console.error('Erreur lors de la modification du médicament :', err);
        alert('Une erreur est survenue lors de la modification du médicament.');
      }
    });
  }
}
