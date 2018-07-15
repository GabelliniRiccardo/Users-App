import {Component, EventEmitter, Output} from "@angular/core";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'add-user-form',
  templateUrl: './add-user-form.html',
  styleUrls: ['./add-user-form.scss']
})

export class AddUserForm{

  passwordPattern    = "([0-9]+[interval-zA-z]+|[interval-zA-z]+[0-9]+)+([0-9]+[interval-zA-z]*|[interval-zA-z]+[0-9]*)*";
  phonePattern = "[0-9]*";

  @Output() addedUser = new EventEmitter();



  onSubmit(f : NgForm){
    const name = f.value.name;
    const surname = f.value.surname;
    const email = f.value.email;
    const phone = f.value.phone;
    const password = f.value.password;



    this.addedUser.emit({email,password,name,surname,phone});
  }
}
