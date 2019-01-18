import {Config, HttpMockService, HttpService} from 'junte-angular';
import {SignupMockService} from './service.mock';
import {SignupService} from './service';
import {signup_service} from './interface';
import {AppConfig} from '../../app-config';

export function SignupServiceFactory(httpService: HttpService,
                                     httpMockService: HttpMockService,
                                     config: AppConfig) {
  return config.useMocks ?
    new SignupMockService(httpMockService) :
    new SignupService(httpService);
}

export const SignupServiceProvider = {
  provide: signup_service,
  useFactory: SignupServiceFactory,
  deps: [HttpService, HttpMockService, Config]
};
