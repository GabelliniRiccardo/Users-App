import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoadingService} from '../../../services/loading.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

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
   * @var {ElementRef} The content that the modal must show.
   */
  @ViewChild('content') content: ElementRef;

  /**
   * @var {bolean} True if the server response is OK (statuscode=200), false otherwise.
   */
  confirmed: boolean = false;

  /**
   * @var {Subscription} A subscription to the response of server: when loading is finished, loading Service get the response of server
   */
  subscriptionToResponseOfServer: Subscription;

  /**
   * @var {string} The url where router has to navigate when user confirm the modal.
   */
  @Input() urlToNavigateAfterConfirmation: string;

  constructor(private modalService: NgbModal,
              private loadingService: LoadingService,
              private router: Router) {
  }

  ngOnInit() {
    this.subscriptionToResponseOfServer = this.loadingService.subjectModals.subscribe((response: { message, confirmed }) => {
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

  ngOnDestroy() {
    this.subscriptionToResponseOfServer.unsubscribe();
  }

  onConfirmationModal() {
    if (!!this.urlToNavigateAfterConfirmation) {
      this.router.navigate([this.urlToNavigateAfterConfirmation]);
    }
  }

}
