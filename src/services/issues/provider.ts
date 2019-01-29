import {Config, HttpMockService, HttpService} from 'junte-angular';
import {IssuesMockService} from './service.mock';
import {IssuesService} from './service';
import {issues_service} from './interface';
import {AppConfig} from '../../app-config';

export function IssuesServiceFactory(httpService: HttpService,
                                     httpMockService: HttpMockService,
                                     config: AppConfig) {
  return config.useMocks ?
    new IssuesMockService(httpMockService) :
    new IssuesService(httpService);
}

export const IssuesServiceProvider = {
  provide: issues_service,
  useFactory: IssuesServiceFactory,
  deps: [HttpService, HttpMockService, Config]
};
