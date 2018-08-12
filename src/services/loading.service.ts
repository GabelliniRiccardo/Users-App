import {Subject} from 'rxjs';
import {ElementRef} from '@angular/core';

export class LoadingService {

  /**
   * @var {boolean} True when the request is pending.
   */
  private loading: boolean = false;

  /**
   * @var {Subject<{string, boolean, ElementRef}>} This subject notify modals with 3 parameters:
   * 1) message: the response of the server
   * 2) confirmed: true if response is OK (status code 200) false otherwise
   * 3) elementRef: A reference to the content of the modal to open. Without this elementRef all modals will be open
   */
  subjectModals: Subject<{message: string, confirmed: boolean, elementRef: ElementRef}> = new Subject<{message: string, confirmed: boolean, elementRef: ElementRef}>();

  /**
   * @var {Subject<boolean>} This subject notify the app.component of loadingChanges
   */
  subjectForLoadingStatus: Subject<boolean> = new Subject<boolean>();


  isLoading(): boolean {
    return this.loading;
  }

  setLoading() {
    this.loading = true;
    this.subjectForLoadingStatus.next(this.loading);
  }

  unsetLoading() {
    this.loading = false;
    this.subjectForLoadingStatus.next(this.loading);
  }

  notifyChanges(message: string, confirmed: boolean, elementRef: ElementRef) {
    this.subjectModals.next({message, confirmed, elementRef});
  }
}
