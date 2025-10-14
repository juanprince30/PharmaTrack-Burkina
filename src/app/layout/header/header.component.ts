import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  titre = "PharmaTrackBurkina";
  Menu_admin = ["Dashboard", "Medicaments", "Ventes", "Alertes"];
  Menu_user = ["Accueil", "Medicaments"];
  est_connecter = false;
  est_admin = false;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    // Souscrire aux observables pour mettre à jour automatiquement le header
    this.subscriptions.push(
      this.auth.connected$.subscribe(status => this.est_connecter = status),
      this.auth.admin$.subscribe(status => this.est_admin = status)
    );
  }

  logout() {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      this.auth.logout();
      this.router.navigate(['/']);
    }
  }

  goTo(page: string) {
    const route = '/' + page.toLowerCase();
    this.router.navigate([route]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
