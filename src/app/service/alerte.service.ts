import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alerte } from '../models/alerte';

@Injectable({
  providedIn: 'root'
})
export class AlerteService {

  private apiUrl = 'http://localhost:3000/alerts';

  constructor(private http: HttpClient) {}

  getAllAlerts(): Observable<Alerte[]> {
    return this.http.get<Alerte[]>(this.apiUrl);
  }

  getAlertByMedicineId(medicineId: number): Observable<Alerte[]> {
    return this.http.get<Alerte[]>(`${this.apiUrl}?medicineId=${medicineId}`);
  }

  addAlert(alert: Alerte): Observable<Alerte> {
    return this.http.post<Alerte>(this.apiUrl, alert);
  }

  deleteAlert(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deleteAlertsByMedicineId(medicineId: number): void {
    this.getAlertByMedicineId(medicineId).subscribe(alerts => {
      alerts.forEach(alert => {
        if (alert.id) {
          this.deleteAlert(alert.id).subscribe();
        }
      });
    });
  }
}
