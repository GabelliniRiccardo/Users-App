import {Component, ElementRef, EventEmitter, Output, ViewChild, ViewEncapsulation} from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DeleteModalComponent {

  /**
   * @var {EventEmitter<boolean>} A EventEmitter that is called when user is deleted.
   */
  @Output() deleteEvent = new EventEmitter<boolean>();

  @ViewChild('content') content: ElementRef;

  constructor(private modalService: NgbModal) {
  }

  openVerticallyCentered() {
    this.modalService.open(this.content, {centered: true});
  }

  onDelete() {
    this.deleteEvent.emit(true);
  }
}
