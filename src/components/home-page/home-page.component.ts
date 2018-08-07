import {Component, OnInit} from '@angular/core';
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
   * @var {User[]} The partial list of user that contains one page.
   */
  listOfUSerOfOnePAge: User[] = [];

  /**
   * @var {boolean} True if user want to register another user.
   */
  editMode: boolean = false;

  /**
   * @var {boolean} True if an error from the API occours.
   */
  errorHasOccourred: boolean = false;

  /**
   * @var {number} The number of users to show in one single page.
   */
  numberOfUsersInOnePAge: number = 3;

  /**
   * @var {number} The current page number.
   */
  currentPage: number = 0;

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
        this.onPageNumberClick(0);
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
    const indexOfUser: number = this.listOfUsers.indexOf(user);
    console.log('Clicked on', user.name, user.surname);
    this.listOfUsers.splice(this.listOfUsers.indexOf(user), 1);
    this.onPageNumberClick(0);
  }

  addUserToList(user: User) {
    this.listOfUsers.push(user);
    this.editMode = false;
    if (this.listOfUSerOfOnePAge.length < this.numberOfUsersInOnePAge) {
      this.listOfUSerOfOnePAge.push(user);
    } else {
      this.listOfUSerOfOnePAge = [user];
      this.onPageNumberClick(this.currentPage + 1);
    }
  }

  onRegisterUser() {
    this.editMode = true;
  }

  onConfirm() {

    this.loadingService.setLoading();

    this.userService.updateListOfUsers(this.listOfUsers)
      .subscribe(
        (response: { response: string }) => {
          this.loadingService.unsetLoading();
          this.loadingService.notifyChanges(JSON.parse(JSON.stringify(response)), true);
          console.log('Response of Server : ', response);
        },
        (error: any) => {
          this.loadingService.unsetLoading();
          this.loadingService.notifyChanges('Ops, someting went wrong On updating users... :(', false);
          console.log('Response of Server : ', error.error);
        }
      );
  }

  generateNumbers() {

    const array: number[] = [];
    for (let i = 0; i < this.listOfUsers.length / this.numberOfUsersInOnePAge; i++) {
      array.push(i);
    }

    return array;
  }

  onPageNumberClick(number: number) {

    this.currentPage = number;
    const startFrom: number = number * this.numberOfUsersInOnePAge;
    console.log('current Page : ', this.currentPage);
    this.listOfUSerOfOnePAge = this.listOfUsers.slice(startFrom, startFrom + this.numberOfUsersInOnePAge);
  }
}
