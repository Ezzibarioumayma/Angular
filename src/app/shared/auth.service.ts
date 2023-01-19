import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor() { }
  loggedIn = false;
  //on devrait se connecter au bd 
  logIn(){
    this.loggedIn = true;
  }

  logOut(){
    this.loggedIn = false;
  }

  isAdmin(){
    let promesse = new  Promise((resolve, reject) =>{
      resolve(this.loggedIn);
    });
    return promesse;
   // return this.loggedIn;
  }
}
