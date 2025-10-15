import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs';
import { Cart } from '../../models/cart';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  titre = "PharmaTrackBurkina";
  Menu_admin = ["Dashboard", "Medicaments", "Ventes", "Alertes"];
  Menu_user = ["Accueil", "Medicaments"];
  est_connecter = false;
  est_admin = false;
  items: Cart[] = [];
  username: String | null = null;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private auth: AuthService, private cartService: CartService) {}  

  ngOnInit() {
    

    this.items = this.cartService.getItems();
    // Souscrire aux observables pour mettre à jour automatiquement le header
    this.subscriptions.push(
      this.auth.connected$.subscribe(status => this.est_connecter = status),
      this.auth.admin$.subscribe(status => this.est_admin = status),
      this.auth.username$.subscribe(name => this.username = name)
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
