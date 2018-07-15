import {DataStorageService} from "./data-storage.service";
import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";

@Injectable()

export class AuthenticationServiceOnHomePage implements CanActivate {

  constructor(private dataStorageService: DataStorageService, private router: Router) {

  }

  canActivate(): boolean {

    // FALSE: home page is not allowed
    // TRUE: home page is allowed
    // router.url : current url on the page


    console.log('user is logged in: ', this.dataStorageService.isUserAutenticated(), 'path ', this.router.url);


    if (!this.dataStorageService.isUserAutenticated()) {
      this.router.navigate(['login']);
      return false;
    }

    else return true;


  }
}