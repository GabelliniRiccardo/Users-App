import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {User} from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  /**
   * @var {string} the url of the remote API.
   */
  usersUrl: string = 'https://www.usersapi.tk/users';

  constructor(private http: HttpClient) {
  }

  getListOfUsers(): Observable<User[]> {

    return this.http.get<User[]>(this.usersUrl);
  }

  updateListOfUsers(users: User[]): Observable<{ response: string }> {
    return this.http.post<{ response: string }>(this.usersUrl, users, {
      responseType: 'json',
      observe: 'body'
    });
  }
}
