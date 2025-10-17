import { Component, OnInit } from '@angular/core';
import { DrugsComponent } from '../drugs/drugs.component';
import { CommonModule } from '@angular/common';
import { DrugService } from '../../service/drug.service';
import { Drug } from '../../models/drug';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-drugs-list',
  imports: [DrugsComponent, CommonModule,FormsModule],
  templateUrl: './drugs-list.component.html',
  styleUrl: './drugs-list.component.css'
})
export class DrugsListComponent implements OnInit{
  produits: Drug[] = [];
  loading = true;
  errorMessage = '';
  searchTerm: string = '';

  constructor(private drugService: DrugService) {}

  ngOnInit() {
    this.loadDrugs();
  }

  loadDrugs(){
    this.drugService.getAllDrugs().subscribe({
      next: (data) => {
        this.produits = data;
        this.loading = false;
        console.log('Medicaments récupérés :', data);
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des médicaments';
        console.error(err);
        this.loading = false;
      }
    });
  }

  onDrugDeleted(deletedId: String) {
    // Recharge la liste après suppression
    this.loadDrugs();
  }

  onSearch(): void {
    console.log('Recherche :', this.searchTerm);
    this.drugService.searchDrugs(this.searchTerm).subscribe((data) => {
      console.log('Résultats trouvés :', data);
      this.produits = data;
    });
  }
}
