import {Component, Inject} from '@angular/core';
import {Config, HttpMockService, HttpService, InvalidGrantError} from 'junte-angular';
import {Router} from '@angular/router';
import {AppConfig} from '../app-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(@Inject(Config) private config: AppConfig,
              private httpService: HttpService,
              private httpMockService: HttpMockService,
              private router: Router) {

    this.httpService.error$.subscribe((err: Error) => {
      if (err instanceof InvalidGrantError) {
        this.config.authorization = null;
        this.router.navigate(['/signup/login']);
      }
    });
  }

}
