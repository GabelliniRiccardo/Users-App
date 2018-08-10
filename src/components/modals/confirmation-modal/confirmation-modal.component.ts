import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoadingService} from '../../../services/loading.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmationModalComponent implements OnInit, OnDestroy {

  message: string;
  @Output() confirmEvent: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('content') content: ElementRef;
  subscription: Subscription;
  confirmed: boolean = false;

  constructor(private modalService: NgbModal, private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.subscription = this.loadingService.subject.subscribe((response: { message, confirmed }) => {
      this.message = response.message;
      this.confirmed = response.confirmed;
      this.openVerticallyCentered();
    });
  }

  private openVerticallyCentered() {
    if (!!this.message) {
      this.modalService.open(this.content, {centered: true});
    }
  }

  onConfirm() {
    this.confirmEvent.emit();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
