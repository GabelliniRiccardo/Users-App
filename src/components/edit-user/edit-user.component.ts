import {Component, OnInit} from '@angular/core';
import {User} from '../../Models/user.model';
import {UsersService} from '../../services/users.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  id: number;

  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.user = this.usersService.getUser(this.id);
        }
      );
  }

}
