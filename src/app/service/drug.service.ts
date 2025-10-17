import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Drug } from '../models/drug';

@Injectable({
  providedIn: 'root'
})
export class DrugService {

  private apiUrl = 'http://localhost:3000/medicines';

  constructor(private http: HttpClient) {}

  getAllDrugs(): Observable<Drug[]> {
    return this.http.get<Drug[]>(this.apiUrl).pipe(
      map((drugs: Drug[]) =>
        drugs.map((drug) => ({
          ...drug,
          tague: this.defineTag(drug)
        }))
      )
    );
  }

  getDrugById(id: number): Observable<Drug> {
    return this.http.get<Drug>(`${this.apiUrl}/${id}`).pipe(
      map((drug: Drug) => ({
        ...drug,
        tague: this.defineTag(drug)
      }))
    );
  }

  editDrug(id: number, updatedDrug: Drug): Observable<Drug> {
    return this.http.put<Drug>(`${this.apiUrl}/${id}`, updatedDrug).pipe(
      map((drug: Drug) => ({
        ...drug,
        tague: this.defineTag(drug)
      })),
      tap((drug: Drug) => {
        this.http.get<any[]>('http://localhost:3000/alerts').subscribe((alerts) => {
          const alertsToDelete = alerts.filter(a => Number(a.medicineId) === Number(id));
          alertsToDelete.forEach(alert => {
            if (alert.id !== undefined && alert.id !== null) {
              this.http.delete(`http://localhost:3000/alerts/${alert.id}`).subscribe({
                next: () => console.log(`Alerte ${alert.id} supprimée pour medicineId=${id}`),
                error: (err) => console.error(`Erreur suppression alerte ${alert.id}:`, err)
              });
            }
          });
        }, err => console.error('Erreur récupération alertes :', err));
      })
    );
  }


  addDrug(drug: Drug): Observable<Drug> {
    return this.http.post<Drug>(this.apiUrl, drug);
  }


  deleteDrug(id: String): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchDrugs(term: string): Observable<Drug[]> {
    console.log(`${this.apiUrl}?name_like=${term}`)
    return this.http.get<Drug[]>(`${this.apiUrl}?name_like=${term}`).pipe(
      map((drugs: Drug[]) =>
        drugs.map((drug) => ({
          ...drug,
          tague: this.defineTag(drug)
        }))
      )
    );
  }


  private defineTag(drug: Drug): string {
    const today = new Date();
    const expiration = new Date(drug.expirationDate);

    if (drug.quantity <= 0) {
      return 'Épuisé';
    }

    if (expiration < today) {
      return 'Expiré';
    }

    return 'À vendre';
  }
}
