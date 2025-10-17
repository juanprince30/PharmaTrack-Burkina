import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Alerte } from '../../models/alerte';
import { VenteService } from '../../service/vente.service';
import { AlerteService } from '../../service/alerte.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  alerts: Alerte[] = [];
  revenueToday: number = 0;
  salesCount: number = 0;
  weeklySales: { date: string, total: number }[] = [];
  monthlySales: { month: string, total: number }[] = [];

  constructor(
    private alertService: AlerteService,
    private saleService: VenteService
  ) {}

  ngOnInit(): void {
    this.loadAlerts();
    this.loadSalesData();
  }

  ngAfterViewInit(): void {
    // attendre que les données soient chargées avant d’afficher les graphiques
    setTimeout(() => {
      if (this.weeklySales.length > 0) this.renderWeeklyChart();
      if (this.monthlySales.length > 0) this.renderMonthlyChart();
    }, 500);
  }

  /** Charger les alertes */
  loadAlerts(): void {
    this.alertService.getAllAlerts().subscribe(alerts => {
      this.alerts = alerts.filter(a => a.type === 'warning' || a.type === 'danger');
    });
  }

  /** Charger les ventes, CA, graphiques */
  loadSalesData(): void {
    this.saleService.getTodayRevenue().subscribe(rev => this.revenueToday = rev);
    this.saleService.getSalesCount().subscribe(count => this.salesCount = count);

    this.saleService.getWeeklySales().subscribe(data => {
      this.weeklySales = data;
      this.renderWeeklyChart();
    });

    this.saleService.getMonthlySales().subscribe(data => {
      this.monthlySales = data;
      this.renderMonthlyChart();
    });
  }

  /** Graphique des ventes hebdomadaires */
  renderWeeklyChart(): void {
    const ctx = document.getElementById('weeklyChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.weeklySales.map(s => s.date),
        datasets: [{
          label: 'Ventes (7 derniers jours)',
          data: this.weeklySales.map(s => s.total),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  /** Graphique des ventes mensuelles */
  renderMonthlyChart(): void {
    const ctx = document.getElementById('monthlyChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.monthlySales.map(s => s.month),
        datasets: [{
          label: 'Ventes par mois',
          data: this.monthlySales.map(s => s.total),
          borderWidth: 2,
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}
