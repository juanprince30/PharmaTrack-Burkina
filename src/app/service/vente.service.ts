import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Vente } from '../models/vente';

@Injectable({
  providedIn: 'root'
})
export class VenteService {

  private apiUrl = 'http://localhost:3000/sales';

  constructor(private http: HttpClient) {}

  getAllSales(): Observable<Vente[]> {
    return this.http.get<Vente[]>(this.apiUrl);
  }

  addSale(sale: Vente): Observable<Vente> {
    return this.http.post<Vente>(this.apiUrl, sale);
  }

  /** 💰 Chiffre d’affaires du jour */
  getTodayRevenue(): Observable<number> {
    const today = new Date().toISOString().split('T')[0];
    return this.http.get<Vente[]>(`${this.apiUrl}?date=${today}`).pipe(
      map(sales => sales.reduce((sum, s) => sum + s.total, 0))
    );
  }

  /** Nombre total de ventes */
  getSalesCount(): Observable<number> {
    return this.getAllSales().pipe(
      map(sales => sales.length)
    );
  }

  /** Ventes par semaine (7 derniers jours) */
  getWeeklySales(): Observable<{ date: string; total: number }[]> {
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    return this.getAllSales().pipe(
      map(sales => {
        const weeklySales = sales.filter(sale => {
          const saleDate = new Date(sale.date);
          return saleDate >= sevenDaysAgo && saleDate <= now;
        });

        const grouped: { [key: string]: number } = {};
        weeklySales.forEach(sale => {
          grouped[sale.date] = (grouped[sale.date] || 0) + sale.total;
        });

        return Object.entries(grouped).map(([date, total]) => ({ date, total }));
      })
    );
  }

  /** Ventes par mois */
  getMonthlySales(): Observable<{ month: string; total: number }[]> {
    return this.getAllSales().pipe(
      map(sales => {
        const grouped: { [key: string]: number } = {};

        sales.forEach(sale => {
          const month = sale.date.slice(0, 7); // YYYY-MM
          grouped[month] = (grouped[month] || 0) + sale.total;
        });

        return Object.entries(grouped).map(([month, total]) => ({ month, total }));
      })
    );
  }
}
