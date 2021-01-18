import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import config from '../../app.config';
interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [],
})
export class PromisesComponent implements OnInit {
  failed: Boolean;
  messages: Array<User>[];

  constructor(public oktaAuth: OktaAuthService, private http: HttpClient) {
    this.messages = [];
  }

  async ngOnInit() {
    const accessToken = this.oktaAuth.getAccessToken();
    console.log(accessToken);

    this.http
      .get(config.resourceServer.messagesUrl, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .subscribe(
        (data: any) => {
          console.log(data);
          console.log(data.users);

          const messages = data.users.map((message) => {
            // const id = new Date(message.date);
            // const day = date.toLocaleDateString();
            // const time = date.toLocaleTimeString();
            return {
              email: message.email,
              name: message.name,
              id: message.id,
            };
          });
          [].push.apply(this.messages, messages);
        },
        (err) => {
          console.error(err);
          this.failed = true;
        }
      );
  }

  // getUsers() {

  //   const promise = new Promise(resolve => {
  //     fetch('http://localhost:8000/users')
  //       .then(res => res.json())
  //       .then(body => console.log(body.data))
  //   });

  //   return promise;
  // }
}
