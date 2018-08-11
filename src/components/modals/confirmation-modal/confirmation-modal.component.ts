import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoadingService} from '../../../services/loading.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmationModalComponent implements OnInit, OnDestroy {

  /**
   * @var {string} The response of the server.
   */
  message: string;

  /**
   * @var {EventEmitter<void>} An Event emitter that emits when confirmation button is clicked
   */
  @Output() confirmEvent: EventEmitter<void> = new EventEmitter<void>();

  /**
   * @var {ElementRef} The content that the modal must show.
   */
  @ViewChild('content') content: ElementRef;

  /**
   * @var {Subscription} The subscription to the Loading Service who serves the response of the server
   */
  subscription: Subscription;

  /**
   * @var {bolean} True if the server response is OK (statuscode=200), false otherwise.
   */
  confirmed: boolean = false;

  constructor(private modalService: NgbModal, private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.subscription = this.loadingService.subject.subscribe((response: { message, confirmed, elementRef }) => {
      this.message = response.message;
      this.confirmed = response.confirmed;
      if (this.content === response.elementRef) {
        this.openVerticallyCentered();
      }
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
