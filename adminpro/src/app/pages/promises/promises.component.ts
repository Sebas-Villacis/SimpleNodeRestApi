import { Component, OnInit } from '@angular/core';
import { rejects } from 'assert';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsers().then(users => { 
      console.log(users);
      
    })
    // const promise = new Promise((resolve,reject) => {
      
    //   if (false) {
    //     resolve("Hola mundo");
    //   }
    //   else { 
    //     reject("Somwthing went wrong");
    //   }
      
      
    // });


    // promise.then((message) => {
    //   console.log(message);
      
    // })
    //   .catch(error => console.log('Error in my promise', error));
    
    // console.log("Fin del init");
    
  }

  getUsers() { 

    const promise = new Promise(resolve => {
      fetch('http://localhost:8000/users')
        .then(res => res.json())
        .then(body => console.log(body.data))
    });
    
    return promise;
  }

}
