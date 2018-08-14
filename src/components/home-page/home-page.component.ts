import {Component, ElementRef, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {DataStorageService} from '../../services/data-storage.service';
import {Router} from '@angular/router';
import {User} from '../../Models/user.model';
import {LoadingService} from '../../services/loading.service';
import {Subscription} from 'rxjs';
import {DeviceService} from '../../services/device.service';
import {Device} from '../../directives/device-detector/device-detector.directive';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  /**
   * @var {User[]} The list of users returned from Users Service.
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

  /**
   * @var {string} The list of users is sort according to this parameter
   */
  orderByParameter: ('id' | 'name' | 'surname' | 'phone' | 'email') = 'id';

  /**
   * @var {Subscription} A subscription to the list of users changes according to the users service.
   */
  subscriptionToUsersListChanges: Subscription;

  /**
   * @var {boolean} True if screen width < Device.SMALL
   */
  isMobile: boolean;

  constructor(private userService: UsersService,
              private dataStorageService: DataStorageService,
              private router: Router,
              public loadingService: LoadingService,
              private deviceService: DeviceService) {
  }

  ngOnInit() {
    this.deviceService.deviceChanged$.subscribe((device: Device) => this.isMobile = device === Device.SMALL || device === Device.X_SMALL);
    this.subscriptionToUsersListChanges = this.userService.subjectToNotifyUsersListChanges
      .subscribe((users: User[]) => {
        this.listOfUsers = users;
        this.orderListAccordingToParameter();
      });
    this.executeUsersRequest();
  }

  private executeUsersRequest() {

    this.loadingService.setLoading();

    this.userService.getListOfUsers().subscribe(
      (response: User[]) => {
        this.loadingService.unsetLoading();
        console.log('Users Received: ', response);
        this.userService.setListOfUsers(response);
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
    this.userService.deleteUser(user);
  }

  addUserToList(user: User) {
    this.userService.addUser(user);
    this.editMode = false;
  }

  onRegisterUser() {
    this.editMode = true;
  }

  onConfirm() {

    this.loadingService.setLoading();

    this.userService.updateListOfUsers()
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

  orderListAccordingToParameter() {
    this.listOfUsers.sort((user1: User, user2: User) => {
      if (this.orderByParameter === 'id') {
        if (user1[this.orderByParameter] < user2[this.orderByParameter]) return -1; else {
          return 1;
        }
      } else {
        if (user1[this.orderByParameter].toLowerCase() < user2[this.orderByParameter].toLowerCase()) return -1; else {
          return 1;
        }
      }
    });
  }
}
