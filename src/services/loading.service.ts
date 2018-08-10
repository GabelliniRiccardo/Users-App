import {Subject} from 'rxjs';
import {ElementRef} from '@angular/core';

export class LoadingService {

  /**
   * @var {boolean} True when the request is pending.
   */
  private loading: boolean = false;

  subject: Subject<{message: string, confirmed: boolean, elementRef: ElementRef}> = new Subject<{message: string, confirmed: boolean, elementRef: ElementRef}>();

  isLoading(): boolean {
    return this.loading;
  }

  setLoading() {
    this.loading = true;
  }

  unsetLoading() {
    this.loading = false;
  }

  notifyChanges(message: string, confirmed: boolean, elementRef: ElementRef) {
    this.subject.next({message, confirmed, elementRef});
  }
}
