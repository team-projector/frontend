import { Config, HttpMockService, HttpService } from 'junte-angular';
import { AppConfig } from '../../app-config';
import { salaries_service } from './interface';
import { SalariesMockService } from './service.mock';
import { SalariesService } from './service';

export function SalariesServiceFactory(httpService: HttpService,
                                       httpMockService: HttpMockService,
                                       config: AppConfig) {
  return config.useMocks ?
    new SalariesMockService(httpMockService) :
    new SalariesService(httpService);
}

export const SalariesServiceProvider = {
  provide: salaries_service,
  useFactory: SalariesServiceFactory,
  deps: [HttpService, HttpMockService, Config]
};
