import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingService} from '../services/loading.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.template.html'
})

// Application entry point
export class AppComponent implements OnInit, OnDestroy {

  /**
   * @var {boolean} True if loading is shown
   */
  showLoading: boolean = false;

  /**
   * @var {Subscription} A subscription to the showLoadingChanges
   */
  subscription: Subscription;

  constructor(public loadingService: LoadingService) {
  }

  ngOnInit() {
    this.subscription = this.loadingService.subjectForLoadingStatus
      .subscribe((loadingValue: boolean) => this.showLoading = loadingValue);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
