import {DataStorageService} from './data-storage.service';
import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()

export class AuthenticationGuardAfterLogin implements CanActivate {

  constructor(private dataStorageService: DataStorageService, private router: Router) {
  }

  canActivate(): boolean {

    console.log('user is logged in: ', this.dataStorageService.isUserAutenticated(), 'path ', this.router.url);

    if (!this.dataStorageService.isUserAutenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    else return true;
  }
}
