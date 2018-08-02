import {Component, EventEmitter, Output} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'add-user-form',
  templateUrl: './add-user-form.html'
})

export class AddUserFormComponent {

  /**
   * @var {string} The pattern used to control if password field is correct.
   */
  passwordPattern = '([0-9]+[interval-zA-z]+|[interval-zA-z]+[0-9]+)+([0-9]+[interval-zA-z]*|[interval-zA-z]+[0-9]*)*';

  /**
   * @var {string} The pattern used to control if phone field is correct.
   */
  phonePattern = '[0-9]*';

  @Output() addedUser = new EventEmitter();

  onSubmit(f: NgForm) {
    const name = f.value.name;
    const surname = f.value.surname;
    const email = f.value.email;
    const phone = f.value.phone;
    const password = f.value.password;

    this.addedUser.emit({email, password, name, surname, phone});
  }
}
