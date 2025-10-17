export interface Alerte {
  id?: string;
  medicineId: number;
  message: string;
  type: 'warning' | 'info' | 'danger';
}
