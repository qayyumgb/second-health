import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-view-dashboard-grid',
  standalone: true,
  imports: [NgIf, MatIconModule, MatTooltipModule, MatDialogModule],
  templateUrl: './view-dashboard-grid.component.html',
  styleUrl: './view-dashboard-grid.component.scss'
})
export class ViewDashboardGridComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){

    console.log(data)
  }
}
