import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
//import { ROUTER_PROVIDERS } from '@angular/router';
import { APP_ROUTER_PROVIDERS } from './app/ads-app.routes';
import { AdsAppComponent, environment } from './app/';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

if (environment.production) {
  enableProdMode();
}

                            // other way to pass dependencies
bootstrap(AdsAppComponent, [
    //disableDeprecatedForms(),
    //provideForms(),
    APP_ROUTER_PROVIDERS
]);
