import {Injectable} from '@angular/core';
import {Config} from 'junte-angular';

const APP_VERSION = '1.0.0';

@Injectable()
export class AppConfig extends Config {

  version = APP_VERSION;

  backendEndpoint = 'https://tp.junte.it/api';
}
