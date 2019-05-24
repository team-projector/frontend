import {Config, HttpMockService, HttpService} from 'junte-angular';
import {MilestonesMockService} from './service.mock';
import {MilestonesService} from './service';
import {milestones_service} from './interface';
import {AppConfig} from '../../app-config';

export function MilestonesServiceFactory(httpService: HttpService,
                                         httpMockService: HttpMockService,
                                         config: AppConfig) {
  return config.useMocks ?
    new MilestonesMockService(httpMockService) :
    new MilestonesService(httpService);
}

export const MilestonesServiceProvider = {
  provide: milestones_service,
  useFactory: MilestonesServiceFactory,
  deps: [HttpService, HttpMockService, Config]
};
