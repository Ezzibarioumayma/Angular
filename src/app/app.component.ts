import { AuthService } from './shared/auth.service';
import { Component } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment-app';
constructor(private authService: AuthService, 
  private router:Router){}
  login(){
if(!this.authService.loggedIn){
  this.authService.logIn;
 
}else{
  this.authService.logOut;
  this.router.navigate(['/home']);
}
  }
}
