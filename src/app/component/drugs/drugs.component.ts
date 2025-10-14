import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AjouterPanierComponent } from '../ajouter-panier/ajouter-panier.component';
import { AuthService } from '../../service/auth.service';

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
  
  est_connecter=false;
  est_admin=false;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.est_connecter = this.auth.isConnected();
    this.est_admin = this.auth.isAdmin();
  }
}
