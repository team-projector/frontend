import {Config, HttpMockService, HttpService} from 'junte-angular';
import {MetricsMockService} from './service.mock';
import {MetricsService} from './service';
import {metrics_service} from './interface';
import {AppConfig} from '../../app-config';

export function MetricsServiceFactory(httpService: HttpService,
                                      httpMockService: HttpMockService,
                                      config: AppConfig) {
  return config.useMocks ?
    new MetricsMockService(httpMockService) :
    new MetricsService(httpService);
}

export const MetricsServiceProvider = {
  provide: metrics_service,
  useFactory: MetricsServiceFactory,
  deps: [HttpService, HttpMockService, Config]
};
