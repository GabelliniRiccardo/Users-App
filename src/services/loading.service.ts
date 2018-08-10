import {Subject} from 'rxjs';

export class LoadingService {

  /**
   * @var {boolean} True when the request is pending.
   */
  private loading: boolean = false;

  subject: Subject<{message: string, confirmed: boolean}> = new Subject<{message: string, confirmed: boolean}>();

  isLoading(): boolean {
    return this.loading;
  }

  setLoading() {
    this.loading = true;
  }

  unsetLoading() {
    this.loading = false;
  }

  notifyChanges(message: string, confirmed: boolean) {
    this.subject.next({message, confirmed});
  }
}
