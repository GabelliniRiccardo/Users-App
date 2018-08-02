export class DataStorageService {

  private storage = window.localStorage;

  getEmail(): string {
    return this.storage.getItem('email');
  }

  setEmail(email: string) {
    this.storage.setItem('email', email);
  }

  clearMail() {
    this.storage.removeItem('email');
  }

  setUserAsAutenticated() {
    this.storage.setItem('autenticated', 'true');
  }

  setUserAsNotAutenticated() {
    this.storage.setItem('autenticated', 'false');
  }

  isUserAutenticated(): boolean {
    return this.storage.getItem('autenticated') === 'true';
  }
}
