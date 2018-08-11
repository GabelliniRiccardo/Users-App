import {Component, ElementRef, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {DataStorageService} from '../../services/data-storage.service';
import {Router} from '@angular/router';
import {User} from '../../Models/user.model';
import {LoadingService} from '../../services/loading.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  /**
   * @var {User[]} The list of users returned from the API.
   */
  listOfUsers: User[] = [];

  /**
   * @var {boolean} True if user want to register another user.
   */
  editMode: boolean = false;

  /**
   * @var {boolean} True if an error from the API occours.
   */
  errorHasOccourred: boolean = false;

  /**
   * @var {string} The string that will be passed to the filter pipe. this string is linked with two way data binding with the search field.
   */
  searchString: string = '';

  /**
   * @var {string} The user attribute that filter pipe has to evaluate.
   */
  searchByParameter: ('name' | 'surname' | 'phone' | 'email') = 'name';

  constructor(private userService: UserService,
              private dataStorageService: DataStorageService,
              private router: Router,
              public loadingService: LoadingService) {
  }

  ngOnInit() {
    this.executeUsersRequest();
  }

  exit() {
    this.dataStorageService.setUserAsNotAutenticated();
    this.router.navigate(['login']);
  }

  private executeUsersRequest() {

    this.loadingService.setLoading();

    this.userService.getListOfUsers().subscribe(
      (response: User[]) => {
        this.loadingService.unsetLoading();
        console.log('Users Received: ', response);
        this.listOfUsers = response;
        this.errorHasOccourred = false;
      },
      (error) => {
        this.loadingService.unsetLoading();
        console.log(error);
        this.errorHasOccourred = true;
      }
    );
  }

  onDeleteUser(user: User) {
    console.log('Clicked on', user.name, user.surname);
    this.listOfUsers.splice(this.listOfUsers.indexOf(user), 1);
  }

  addUserToList(user: User) {
    this.listOfUsers.push(user);
    this.editMode = false;
  }

  onRegisterUser() {
    this.editMode = true;
  }

  onConfirm(contentToShowAfterConfirmation: ElementRef) {

    this.loadingService.setLoading();

    this.userService.updateListOfUsers(this.listOfUsers)
      .subscribe(
        (response: { response: string }) => {
          this.loadingService.unsetLoading();
          this.loadingService.notifyChanges(JSON.parse(JSON.stringify(response)), true, contentToShowAfterConfirmation);
          console.log('Response of Server : ', response);
        },
        (error: any) => {
          this.loadingService.unsetLoading();
          this.loadingService.notifyChanges('Ops, someting went wrong On updating users... :(', false, contentToShowAfterConfirmation);
          console.log('Response of Server : ', error.error);
        }
      );
  }
}
