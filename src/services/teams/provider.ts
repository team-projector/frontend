import {Config, HttpMockService, HttpService} from 'junte-angular';
import {TeamsMockService} from './service.mock';
import {TeamsService} from './service';
import {teams_service} from './interface';
import {AppConfig} from '../../app-config';

export function TeamsServiceFactory(httpService: HttpService,
                                     httpMockService: HttpMockService,
                                     config: AppConfig) {
  return config.useMocks ?
    new TeamsMockService(httpMockService) :
    new TeamsService(httpService);
}

export const TeamsServiceProvider = {
  provide: teams_service,
  useFactory: TeamsServiceFactory,
  deps: [HttpService, HttpMockService, Config]
};
