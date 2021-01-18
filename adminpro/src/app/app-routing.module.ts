import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

//Modules
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';

//
import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard,
} from '@okta/okta-angular';
const config = {
  issuer: 'https://dev-2586981.okta.com/oauth2/default',
  redirectUri: window.location.origin + '/dashboard',
  clientId: '0oa3vowlatFC5oa4L5d6',
  pkce: true,
};

export function onAuthRequired(oktaAuth, injector) {
  const router = injector.get(Router);

  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

const routes: Routes = [
  // path: '/dashboard' PagesRouting
  // path: '/auth' authRouting
  {
    path: 'dashboard',
    component: OktaCallbackComponent,
  },
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
    OktaAuthModule,
  ],
  providers: [{ provide: OKTA_CONFIG, useValue: config }],
  exports: [RouterModule],
})
export class AppRoutingModule {}
