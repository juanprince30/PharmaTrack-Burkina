import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Vente } from '../../models/vente';
import { VenteService } from '../../service/vente.service';
import { DrugService } from '../../service/drug.service';
import { Drug } from '../../models/drug';

@Component({
  selector: 'app-ventes',
  imports: [CommonModule],
  templateUrl: './ventes.component.html',
  styleUrl: './ventes.component.css'
})
export class VentesComponent implements OnInit {
  ventes: (Vente & { drug?: Drug })[] = []; // ajouter drug pour chaque vente
  drugs: Drug[] = [];

  constructor(
    private saleService: VenteService,
    private drugService: DrugService
  ) {}

  ngOnInit(): void {
    this.loadVentesWithDrugs();
  }

  loadVentesWithDrugs(): void {
    this.drugService.getAllDrugs().subscribe(drugs => {
      this.drugs = drugs;
      console.log(this.drugs)

      this.saleService.getAllSales().subscribe(ventes => {
        // Associer le médicament correspondant à chaque vente
        this.ventes = ventes.map(v => ({
          ...v,
          drug: this.drugs.find(d => d.id == v.medicineId)
        }));

        console.log('Ventes récupérées avec médicaments :', this.ventes);
      });
    });
  }

  getTotal(): number {
    return this.ventes.reduce((acc, v) => acc + v.total, 0);
  }
}
