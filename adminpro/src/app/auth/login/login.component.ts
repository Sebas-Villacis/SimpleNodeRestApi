import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';
import config from '../../app.config';

const DEFAULT_ORIGINAL_URI = window.location.origin;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signIn: any;
  constructor(public oktaAuth: OktaAuthService) {
    this.signIn = new OktaSignIn({
      /**
       * Note: when using the Sign-In Widget for an OIDC flow, it still
       * needs to be configured with the base URL for your Okta Org. Here
       * we derive it from the given issuer for convenience.
       */
      baseUrl: config.oidc.issuer.split('/oauth2')[0],
      clientId: config.oidc.clientId,
      redirectUri: config.oidc.redirectUri,
      i18n: {
        en: {
          'primaryauth.title': 'Sign in to Angular & Company',
        },
      },
      authParams: {
        issuer: config.oidc.issuer,
      },
    });
  }

  ngOnInit() {
    this.signIn
      .showSignInToGetTokens({
        el: '#sign-in-widget',
      })
      .then((tokens) => {
        // When navigating to a protected route, the route path will be saved as the `originalUri`
        // If no `originalUri` has been saved, then redirect back to the app root
        const originalUri = this.oktaAuth.getOriginalUri();
        if (originalUri === DEFAULT_ORIGINAL_URI) {
          this.oktaAuth.setOriginalUri('/dashboard');
        }

        // Remove the widget
        this.signIn.remove();

        // In this flow the redirect to Okta occurs in a hidden iframe
        this.oktaAuth.handleLoginRedirect(tokens);
      })
      .catch((err) => {
        // Typically due to misconfiguration
        throw err;
      });
  }
}
