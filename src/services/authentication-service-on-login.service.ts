import {DataStorageService} from "./data-storage.service";
import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";

@Injectable()

export class AuthenticationServiceOnLogin implements CanActivate {

  constructor(private dataStorageService: DataStorageService, private router: Router) {

  }

  canActivate(): boolean {

    // FALSE: login page is not allowed
    // TRUE: login page is allowed
    // router.url : current url on the page


    console.log('user is logged In', this.dataStorageService.isUserAutenticated(), 'path ', this.router.url)


    if (this.dataStorageService.isUserAutenticated()) {
      this.router.navigate(['home']);
      return false;
    }

    else return true;


  }
}