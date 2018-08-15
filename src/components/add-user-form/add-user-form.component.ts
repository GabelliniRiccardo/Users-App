import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Device} from '../../directives/device-detector/device-detector.directive';
import {DeviceService} from '../../services/device.service';

@Component({
  selector: 'add-user-form',
  templateUrl: './add-user-form.html',
  styleUrls: ['add-user-form.scss']
})

export class AddUserFormComponent implements OnInit {

  /**
   * @var {string} The pattern used to control if password field is correct.
   */
  passwordPattern = '([0-9]+[interval-zA-z]+|[interval-zA-z]+[0-9]+)+([0-9]+[interval-zA-z]*|[interval-zA-z]+[0-9]*)*';

  /**
   * @var {string} The pattern used to control if phone field is correct.
   */
  phonePattern = '[0-9]*';

  /**
   * @var {EventEmitter} An event emitter that emits when a user is added
   */
  @Output() addedUser = new EventEmitter();

  /**
   * @var {EventEmitter<void>} An event emitter that emits when add operation is canceled
   */
  @Output() cancelEvent = new EventEmitter<void>();

  /**
   * @var {boolean} True if screen width < Device.SMALL
   */
  isMobile: boolean;

  constructor(private deviceService: DeviceService) {
  }

  ngOnInit() {
    this.deviceService.deviceChanged$.subscribe((device: Device) => this.isMobile = device === Device.SMALL || device === Device.X_SMALL);
  }

  onSubmit(f: NgForm) {
    const name = f.value.name;
    const surname = f.value.surname;
    const email = f.value.email;
    const phone = f.value.phone;
    const password = f.value.password;

    this.addedUser.emit({email, password, name, surname, phone});
  }

  onCancel() {
    this.cancelEvent.emit();
  }
}
