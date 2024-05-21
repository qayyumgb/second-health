import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ProjectService } from 'app/modules/admin/dashboards/project/project.service';
import { DashboardComponent } from './dashboard.component';

export default [
    {
        path     : '',
        component: DashboardComponent
    }
] as Routes;
