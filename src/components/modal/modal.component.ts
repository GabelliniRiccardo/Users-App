import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-basic',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {

  @Output() deleteEvent = new EventEmitter<boolean>();

  constructor(private modalService: NgbModal) {
  }


  openVerticallyCentered(content: any) {
    this.modalService.open(content, {centered: true});
  }

  onDelete() {
    this.deleteEvent.emit(true);
  }

}