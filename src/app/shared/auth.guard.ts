import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
   // si ca renvoie true ca veut dire que l'user peut acceder a la page demander associé a ce guard 
      return this.authService.isAdmin().then((admin)=>{
        if(admin){
          console.log("Navigation autorise ; vous etes admin");
          return true;

        }else {
          //on revient a la page d'accueil 
          console.log("Navigation echoue ; vous n'ete pas admin");
          this.router.navigate(['/home']);
          return false;
        }
      })
  }
  
}
