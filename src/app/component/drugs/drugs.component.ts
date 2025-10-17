import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AjouterPanierComponent } from '../ajouter-panier/ajouter-panier.component';
import { AuthService } from '../../service/auth.service';
import { DrugService } from '../../service/drug.service';

@Component({
  selector: 'app-drugs',
  imports: [CommonModule, RouterModule,AjouterPanierComponent],
  templateUrl: './drugs.component.html',
  styleUrl: './drugs.component.css'
})
export class DrugsComponent { 
  @Input() tag: string = ''; 
  @Input() tague: string = '';    
  @Input() image: string = '';     
  @Input() titre: string = '';     
  @Input() prix: string = '';
  @Input() qte: number = 0;     
  @Input() id: String = '';

  @Output() drugDeleted = new EventEmitter<String>();

  
  est_connecter=false;
  est_admin=false;

  constructor(private router: Router, private auth: AuthService, private drugService:DrugService) {}

  ngOnInit() {
    this.est_connecter = this.auth.isConnected();
    this.est_admin = this.auth.isAdmin();
  }

  editer(){
    this.router.navigate(['/medicaments/edit',this.id]);
  }

  deleteDrug(id: String): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce médicament ?')) {
      this.drugService.deleteDrug(id).subscribe({
        next: () => {
          alert('Médicament supprimé avec succès !');
          this.drugDeleted.emit(this.id);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du médicament :', err);
          alert('Une erreur est survenue lors de la suppression.');
        }
      });
    }
  }



}
