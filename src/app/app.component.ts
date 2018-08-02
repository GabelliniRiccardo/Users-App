import {Component} from '@angular/core';
import {LoadingService} from '../services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.template.html'
})

// Application entry point
export class AppComponent {

  constructor(public loadingService: LoadingService) {
  }
}
