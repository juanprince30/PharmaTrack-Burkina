import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  titre="PharmaTrackBurkina";

  est_connecter=false;
  est_admin=false;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.est_connecter = this.auth.isConnected();
    this.est_admin = this.auth.isAdmin();
  }
}
