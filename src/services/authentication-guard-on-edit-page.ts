import {DataStorageService} from './data-storage.service';
import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UsersService} from './users.service';

@Injectable()

export class AuthenticationGuardOnEditPage implements CanActivate {

  constructor(private usersService: UsersService, private router: Router) {
  }

  canActivate(): boolean {

    if (!this.usersService.hasDefinedList()) {
      this.router.navigate(['home']);
      return false;
    }

    else return true;
  }
}
