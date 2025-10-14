import { Component, OnInit } from '@angular/core';
import { DrugsComponent } from '../drugs/drugs.component';
import { CommonModule } from '@angular/common';
import { DrugService } from '../../service/drug.service';
import { Drug } from '../../models/drug';


@Component({
  selector: 'app-drugs-list',
  imports: [DrugsComponent, CommonModule],
  templateUrl: './drugs-list.component.html',
  styleUrl: './drugs-list.component.css'
})
export class DrugsListComponent implements OnInit{
  produits: Drug[] = [];
  loading = true;
  errorMessage = '';

  constructor(private drugService: DrugService) {}

  ngOnInit() {
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
}
