import { Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HomeComponent } from './component/home/home.component';
import { DrugsComponent } from './component/drugs/drugs.component';
import { CartComponent } from './component/cart/cart.component';
import { VentesComponent } from './component/ventes/ventes.component';
import { AlertesComponent } from './component/alertes/alertes.component';
import { AccueilComponent } from './component/accueil/accueil.component';
import { authGuard } from './guard/auth.guard';
import { LoginComponent } from './component/login/login.component';
import { guestGuard } from './guard/guest.guard';
import { MedicamentComponent } from './component/medicament/medicament.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [guestGuard],
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard], 
        data: { adminOnly: true },
    },
    {
        path: 'medicaments',
        component: MedicamentComponent,
        canActivate: [authGuard],
    },
    {
        path: 'cart',
        component: CartComponent,
        canActivate: [authGuard],
        data: { userOnly: true },
    },
    {
        path: 'ventes',
        component: VentesComponent,
        canActivate: [authGuard], 
        data: { adminOnly: true }
    },
    {
        path: 'alertes',
        component: AlertesComponent,
        canActivate: [authGuard], 
        data: { adminOnly: true }
    },
    {
        path: 'accueil',
        component: HomeComponent,
        canActivate: [authGuard],
        data: { userOnly: true },
    },
];
