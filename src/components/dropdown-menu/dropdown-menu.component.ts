import {Component, Input} from "@angular/core";
import {User} from "../../Models/user.model";

@Component({
  selector: 'dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})

export class DropdownMenuComponent {

  @Input() user : User;


}