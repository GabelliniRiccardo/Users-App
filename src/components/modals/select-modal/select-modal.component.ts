import {Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {faListUl} from '@fortawesome/free-solid-svg-icons';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'select-modal',
  templateUrl: './select-modal.component.html',
  styleUrls: ['./select-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectModalComponent {

  faListUl = faListUl;

  @Input() selectedFilter: string;

  /**
   * @var {EventEmitter<boolean>} A EventEmitter that is called when user is deleted.
   */
  @Output() selectEvent = new EventEmitter<string>();

  @ViewChild('content') content: ElementRef;


  constructor(private modalService: NgbModal) {
  }

  openVerticallyCentered() {
    this.modalService.open(this.content, {centered: true});
  }

  onSelect(selectedFilter: string) {
    this.selectedFilter = selectedFilter;
    this.selectEvent.emit(selectedFilter);
  }
}
