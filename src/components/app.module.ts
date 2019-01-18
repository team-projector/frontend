import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Config, HttpMockService, HttpService} from 'junte-angular';
import {AppConfig} from '../app-config';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: Config,
      useClass: AppConfig,
    },
    HttpClient,
    HttpService,
    HttpMockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
