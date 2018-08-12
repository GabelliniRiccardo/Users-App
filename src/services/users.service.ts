import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {User} from '../Models/user.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  /**
   * @var {User[]} The list of users.
   */
  private listOfUsers: User[];

  /**
   * @var {Subject<User[]>} A Subject of users: it emits every time users list changes.
   */
  subjectToNotifyUsersListChanges: Subject<User[]> = new Subject<User[]>();

  /**
   * @var {string} the url of the remote API.
   */
  usersUrl: string = 'https://www.usersapi.tk/users';

  constructor(private http: HttpClient) {
  }

  getListOfUsers(): Observable<User[]> {

    return this.http.get<User[]>(this.usersUrl);
  }

  updateListOfUsers(): Observable<{ response: string }> {
    return this.http.post<{ response: string }>(this.usersUrl, this.listOfUsers, {
      responseType: 'json',
      observe: 'body'
    });
  }

  addUser(user: User) {
    this.listOfUsers.push(user);
    this.subjectToNotifyUsersListChanges.next(this.listOfUsers.slice());
  }

  deleteUser(user: User) {
    this.listOfUsers.splice(this.listOfUsers.indexOf(user), 1);
    this.subjectToNotifyUsersListChanges.next(this.listOfUsers.slice());
  }

  setListOfUsers(users: User[]) {
    this.listOfUsers = users;
    this.subjectToNotifyUsersListChanges.next(this.listOfUsers.slice());
  }
}