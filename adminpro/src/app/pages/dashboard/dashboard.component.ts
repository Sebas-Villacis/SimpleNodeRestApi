import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  isAuthenticated: boolean;
  //resourceServerExamples: Array<ResourceServerExample>;
  userName: string;

  constructor(public oktaAuth: OktaAuthService) {
    // this.resourceServerExamples = [
    //   {
    //     label: 'Node/Express Resource Server Example',
    //     url:
    //       'https://github.com/okta/samples-nodejs-express-4/tree/master/resource-server',
    //   },
    //   {
    //     label: 'Java/Spring MVC Resource Server Example',
    //     url:
    //       'https://github.com/okta/samples-java-spring-mvc/tree/master/resource-server',
    //   },
    // ];
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated) => (this.isAuthenticated = isAuthenticated)
    );
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    console.log(this.isAuthenticated);

    if (this.isAuthenticated) {
      const userClaims = await this.oktaAuth.getUser();
      this.userName = userClaims.name;
    }
  }
}
