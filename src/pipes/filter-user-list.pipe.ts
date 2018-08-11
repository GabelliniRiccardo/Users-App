import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../Models/user.model';
import * as _ from 'lodash';

@Pipe({
  name: 'filterby',
  pure: false
})
export class FilterUserListPipe implements PipeTransform {

  /**
   * @function {User[]} A pipe wich filter a users list according to one parameter of the user
   * (typeOfFilter = 'name' | 'surname' | 'phone' | 'email') and value (a string typed on search input field)
   */
  transform(users: User[], typeOfFilter: string, value: string): User[] {
    return users.filter((user: User) => {
      return _.includes(user[typeOfFilter].toLowerCase(), value.toLowerCase());
    });
  }
}
