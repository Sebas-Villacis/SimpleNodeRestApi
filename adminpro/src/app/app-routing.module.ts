import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

//Modules
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';
import { HttpClientModule } from '@angular/common/http';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

//
import config from './app.config';
import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard,
} from '@okta/okta-angular';

const oktaConfig = Object.assign(
  {
    onAuthRequired: (oktaAuth, injector) => {
      const router = injector.get(Router);
      // Redirect the user to your custom login page
      router.navigate(['/login']);
    },
  },
  config.oidc
);

const routes: Routes = [
  // path: '/dashboard' PagesRouting
  // path: '/auth' authRouting
  {
    path: 'login/callback',
    component: OktaCallbackComponent,
  },
  // {
  //   path: 'dashboard/promises',
  //   component: PromisesComponent,
  //   canActivate: [ OktaAuthGuard ],
  // },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '**',
    component: NopagefoundComponent,
  },
];

@NgModule({
  imports: [
    //Parent Root
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule,
    HttpClientModule,
    OktaAuthModule,
  ],
  providers: [{ provide: OKTA_CONFIG, useValue: oktaConfig }],
  exports: [RouterModule],
})
export class AppRoutingModule {}
