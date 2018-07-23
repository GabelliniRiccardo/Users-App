import {AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild} from "@angular/core";
import {UserService} from "../../services/user.service";
import {DataStorageService} from "../../services/data-storage.service";
import {Router} from "@angular/router";
import {User} from "../../Models/user.model";
import {HttpResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {range} from "rxjs/internal/observable/range";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})

export class HomePageComponent implements OnInit {

  listOfUsers: User[] = [];
  listOfUSerOfOnePAge: User[] = [];

  editMode: boolean = false;
  loadingCompleted: boolean = false;
  errorHasOccourred: boolean = false;

  interval: any;

  loadingCount = 0;
  numberOfUsersInOnePAge: number = 3;
  currentPage: number = 0;


  constructor(private userService: UserService,
              private dataStorageService: DataStorageService,
              private router: Router) {
  }


  /* ON INIT IT MAKES A REQUEST TO THE API FOR THE USERS LIST.
  A TIMER STARTS TO SIMULATE THE DELAY OF RESPONSE FROM THE API. EVERY 500ms IT COMPLETE 10% OF THE COMPLETE
  LOADING. AS SOON AS LOADING IS COMPLETE TIMER STOP TO CREATE NUMBERS
  */


  ngOnInit() {

    this.executeUsersRequest()

    this.interval = setInterval(() => {
        this.loadingCount++;
        if (this.loadingCount == 11) {
          clearInterval(this.interval);
          this.loadingCompleted = true;
        }
        console.log('Loading time:', this.loadingCount, 'sec')
      }, 500
    )


  }


  /* AS SOON AS THE USER EXIT FROM HOME PAGE HE IS REDIRECTED TO THE LOGIN PAGE
  */

  exit() {
    this.dataStorageService.setUserAsNotAutenticated();
    this.router.navigate(['login'])
  }


  /* THIS IS A METHOD CALLED ON INIT TO FILL USERS LIST */

  private executeUsersRequest() {

    this.userService.getListOfUsers().subscribe(
      (response: User[]) => {
        console.log('Users Received: ', response)
        this.listOfUsers = response;
        this.onPageNumberClick(0);
        this.errorHasOccourred=false;
      },
      (error) => {
        console.log(error)
        this.errorHasOccourred=true;
      }
    )

  }

  /* WHEN THE USER CONFIRM TO DELETE SOMEONE IT DELETE HIM FROM THE ENTIRE LIST */

  onDeleteUser(user: User) {
    let indexOfUser: number = this.listOfUsers.indexOf(user);
    console.log('Clicked on', user.name, user.surname);
    this.listOfUsers.splice(this.listOfUsers.indexOf(user), 1);
    this.onPageNumberClick(0);
  }


  /* WHEN A USER IS CREATED AND CONFIRMED IT ADD HIM TO THE TWO LISTS (PARTIAL AND COMPLETE) */

  addUserToList(user: User) {
    this.listOfUsers.push(user);
    this.editMode = false;
    if (this.listOfUSerOfOnePAge.length < this.numberOfUsersInOnePAge) {
      this.listOfUSerOfOnePAge.push(user)
    } else {
      this.listOfUSerOfOnePAge = [user];
      this.onPageNumberClick(this.currentPage + 1)
    }
  }

  /* WHEN THE BUTTON TO REGISTER A NEW USER IS CLICKED THE COMPONENT SWITCH TO THE EDIT MODE */

  onRegisterUser() {
    this.editMode = true;
  }

  /* WHEN THE USER CONFIRM THE CHANGES THAT HAS DONE IT SENDS DATA TO THE API. IT WILL UPDATE ITS DATA */

  onConfirm() {
    this.userService.updateListOfUsers(this.listOfUsers)
      .subscribe(
        (response: { response: string }) => console.log('Response of Server : ', response),
        (error: any) => console.log('Response of Server : ', error.error)
      )
  }


  /* IT GENERATES A SEQUENCE OF NUMBER CONSIDERING THE NUMBER OF USER THAT THE COMPONENT RENDER FOR ONE PAGE*/
  private generateNumbers() {

    const array: number[] = [];
    for (let i = 0; i < this.listOfUsers.length / this.numberOfUsersInOnePAge; i++)
      array.push(i);

    return array;
  }

  /* ON PAGE CLICK IT COMPI A PART OF THE ENTIRE LIST BASED ON THE NUMBER OF PAGE CLICKED */

  onPageNumberClick(number: number) {
    this.currentPage = number;
    const startFrom: number = number * this.numberOfUsersInOnePAge;
    console.log('current Page : ', this.currentPage)
    this.listOfUSerOfOnePAge = this.listOfUsers.slice(startFrom, startFrom + this.numberOfUsersInOnePAge);

  }
}
