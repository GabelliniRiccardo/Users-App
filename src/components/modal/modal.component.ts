import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../Models/user.model";

@Component({
  selector: 'modal-basic',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {
  closeResult: string;

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