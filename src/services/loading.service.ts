export class LoadingService {

  /**
   * @var {boolean} True when the request is pending.
   */
  private loading: boolean = false;

  isLoading(): boolean {
    return this.loading;
  }

  setLoading() {
    this.loading = true;
  }

  unsetLoading() {
    this.loading = false;
  }
}
