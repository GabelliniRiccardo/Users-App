import {Component, OnInit} from '@angular/core';
import {User} from '../../Models/user.model';
import {UsersService} from '../../services/users.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LoadingService} from '../../services/loading.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  /**
   * @var {string} The pattern used to control if password field is correct.
   */
  passwordPattern = '([0-9]+[interval-zA-z]+|[interval-zA-z]+[0-9]+)+([0-9]+[interval-zA-z]*|[interval-zA-z]+[0-9]*)*';

  /**
   * @var {string} The pattern used to control if phone field is correct.
   */
  phonePattern = '[0-9]*';

  user: User;
  userBeforeEdit: User;
  newPassword: string;

  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              private router: Router,
              private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          const id: number = +params['id'];
          this.user = this.usersService.getUser(id);
          !!this.user ? this.userBeforeEdit = this.user : this.router.navigate(['home']);
        }
      );
  }

  onCancel() {
    this.router.navigate(['home']);
  }

  onSubmit() {
    this.user.password = this.newPassword;
    this.usersService.deleteUser(this.userBeforeEdit);
    this.usersService.addUser(this.user);

    this.loadingService.setLoading();

    this.usersService.updateListOfUsers()
      .subscribe(
        (response: { response: string }) => {
          this.loadingService.unsetLoading();
          this.loadingService.notifyChanges(JSON.parse(JSON.stringify(response)), true);
          this.router.navigate(['home']);
        },
        (error: any) => {
          this.loadingService.unsetLoading();
          this.loadingService.notifyChanges('Ops, someting went wrong On updating users... :(', false);
          this.router.navigate(['home']);
        }
      );
  }
}
