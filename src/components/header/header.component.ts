import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() showLinks: boolean = false;
  @Output() onExitEvent: EventEmitter<void> = new EventEmitter();

  constructor() {
  }

  exit() {
    this.onExitEvent.emit();
  }
}
