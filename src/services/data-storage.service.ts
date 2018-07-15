import {AfterViewInit} from "@angular/core";


export class DataStorageService {

  // local storage of the browser
  private storage = window.localStorage;



  // EMAIL

  getEmail(): string {
    return this.storage.getItem('email');
  }

  setEmail(email: string) {
    this.storage.setItem('email', email);
  }

  clearMail() {
      this.storage.removeItem('email');
  }


  // AUTENTICATION OF USER


  setUserAsAutenticated(){
    this.storage.setItem('autenticated', 'true');
  }

  setUserAsNotAutenticated(){
    this.storage.setItem('autenticated', 'false');
  }

  isUserAutenticated() : boolean {
    return this.storage.getItem('autenticated')==='true';
  }


}
