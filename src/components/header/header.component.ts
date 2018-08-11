import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  /**
   * @var {boolean} True if user stays on registration page or login page. true on login page.
   */
  @Input() showLinks: boolean = false;

  /**
   * @var {EventEmitter<void>} It emit an event when user exits from home page.
   */
  @Output() onExitEvent: EventEmitter<void> = new EventEmitter();

  constructor() {
  }

  exit() {
    this.onExitEvent.emit();
  }
}
