import {Config, HttpMockService, HttpService} from 'junte-angular';
import {DeveloperMockService} from './service.mock';
import {DeveloperService} from './service';
import {developer_service} from './interface';
import {AppConfig} from '../../app-config';

export function DeveloperServiceFactory(httpService: HttpService,
                                     httpMockService: HttpMockService,
                                     config: AppConfig) {
  return config.useMocks ?
    new DeveloperMockService(httpMockService) :
    new DeveloperService(httpService);
}

export const DeveloperServiceProvider = {
  provide: developer_service,
  useFactory: DeveloperServiceFactory,
  deps: [HttpService, HttpMockService, Config]
};
