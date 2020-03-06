import { Injectable } from "@angular/core";
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private router:Router){}

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean{
        //console.log((localStorage.getItem('user'))==='admin')
        if(localStorage.getItem('user')!=null && 
        (localStorage.getItem('user'))==='admin'){
            return true;
        }
        
            this.router.navigate(['/login']);
            return false;
        
    }
}