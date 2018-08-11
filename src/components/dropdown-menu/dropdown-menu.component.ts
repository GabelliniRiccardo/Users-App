import {Component, Input} from '@angular/core';
import {User} from '../../Models/user.model';

@Component({
  selector: 'dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.style.scss']
})

export class DropdownMenuComponent {

  /**
   * @var {User} A variable thant contains the phone number of user.
   */
  @Input() user: User;

}
