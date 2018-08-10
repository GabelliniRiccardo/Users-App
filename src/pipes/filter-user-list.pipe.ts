import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../Models/user.model';
import * as _ from 'lodash';

@Pipe({
  name: 'filterby',
  pure: false
})
export class FilterUserListPipe implements PipeTransform {
  transform(users: User[], typeOfFilter: string, value: string) {
    return users.filter((user: User) => {
      return _.includes(user[typeOfFilter], value);
    });
  }
}
