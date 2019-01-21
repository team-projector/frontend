import {Config, HttpMockService, HttpService} from 'junte-angular';
import {MeMockService} from './service.mock';
import {MeService} from './service';
import {me_service} from './interface';
import {AppConfig} from '../../app-config';

export function MeServiceFactory(httpService: HttpService,
                                     httpMockService: HttpMockService,
                                     config: AppConfig) {
  return config.useMocks ?
    new MeMockService(httpMockService) :
    new MeService(httpService);
}

export const MeServiceProvider = {
  provide: me_service,
  useFactory: MeServiceFactory,
  deps: [HttpService, HttpMockService, Config]
};
