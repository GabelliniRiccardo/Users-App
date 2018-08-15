import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataStorageService} from '../../services/data-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /**
   * @var {boolean} True if user stays on registration page or login page. true on login page.
   */
  @Input() showLinks: boolean = false;

  selectedButton: string;

  constructor(private dataStorageService: DataStorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.selectedButton = this.router.url;
  }

  exit() {
    this.dataStorageService.setUserAsNotAutenticated();
    this.router.navigate(['login']);
  }
}
