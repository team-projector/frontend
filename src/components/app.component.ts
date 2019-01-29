import {Component} from '@angular/core';
import * as moment from 'moment';
import {HttpMockService, HttpService, InvalidGrantError} from 'junte-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private httpService: HttpService,
              private httpMockService: HttpMockService,
              private router: Router) {
    moment.locale('en', {
      week: {
        doy: 7,
        dow: 1
      }
    });
    moment.locale('en');


    this.httpService.error$.subscribe((err: Error) => {
      if (err instanceof InvalidGrantError) {
        this.router.navigate(['/signup/login']);
      }
    });
  }

}
