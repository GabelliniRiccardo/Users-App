export class LoadingService {

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
