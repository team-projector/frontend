import {Config, HttpMockService, HttpService} from 'junte-angular';
import {TimeExpensesMockService} from './service.mock';
import {TimeExpensesService} from './service';
import {time_expenses_service} from './interface';
import {AppConfig} from '../../app-config';

export function TimeExpensesServiceFactory(httpService: HttpService,
                                           httpMockService: HttpMockService,
                                           config: AppConfig) {
  return config.useMocks ?
    new TimeExpensesMockService(httpMockService) :
    new TimeExpensesService(httpService);
}

export const TimeExpensesServiceProvider = {
  provide: time_expenses_service,
  useFactory: TimeExpensesServiceFactory,
  deps: [HttpService, HttpMockService, Config]
};
