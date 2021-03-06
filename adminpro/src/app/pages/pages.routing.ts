import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { HospitalComponent } from './maintenance/hospital/hospital.component';
//import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { OktaAuthGuard } from '@okta/okta-angular';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    //canActivate: [OktaAuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,

        data: { title: 'Dashboard' },
      },
      {
        path: 'progress',
        component: ProgressComponent,

        data: { title: 'ProgressBar' },
      },
      {
        path: 'graphic1',
        component: Grafica1Component,
        data: { title: 'Graphic' },
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { title: 'Account Settings' },
      },
      {
        path: 'promises',
        component: PromisesComponent,
        data: { title: 'Promises' },
      },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RXJS' } },
      //Maintenance

      {
        path: 'hospitals',
        component: HospitalComponent,
        data: { title: 'Maintenace of Hospitals' },
      },
      // {
      //   path: 'doctors',
      //   component: DoctorsComponent,
      //   data: { title: 'Doctors' },
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class PagesRoutingModule {}
