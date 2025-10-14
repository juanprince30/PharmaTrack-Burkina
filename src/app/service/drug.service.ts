import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
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

  addDrug(drug: Drug): Observable<Drug> {
    return this.http.post<Drug>(this.apiUrl, drug);
  }


  deleteDrug(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
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
