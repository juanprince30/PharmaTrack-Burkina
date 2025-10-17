import { Component, OnInit } from '@angular/core';
import { Alerte } from '../../models/alerte';
import { AlerteService } from '../../service/alerte.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alertes',
  imports: [CommonModule],
  templateUrl: './alertes.component.html',
  styleUrl: './alertes.component.css'
})
export class AlertesComponent implements OnInit{
    alerts: Alerte[] = [];
  
    constructor(
      private alertService: AlerteService,
    ) {}
  
    ngOnInit(): void {
      this.loadAlerts();
    }
    
    loadAlerts(): void {
      this.alertService.getAllAlerts().subscribe(alerts => {
        this.alerts = alerts.filter(a => a.type === 'warning' || a.type === 'danger');
      });
    }
}
