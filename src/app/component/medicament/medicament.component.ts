import { Component } from '@angular/core';
import { DrugsListComponent } from '../drugs-list/drugs-list.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-medicament',
  imports: [DrugsListComponent, CommonModule,RouterModule],
  templateUrl: './medicament.component.html',
  styleUrl: './medicament.component.css'
})
export class MedicamentComponent {

  est_connecter=false;
  est_admin=false;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.est_connecter = this.auth.isConnected();
    this.est_admin = this.auth.isAdmin();
  }

}
