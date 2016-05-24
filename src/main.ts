import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router';
import { AdsAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

                            // other way to pass dependencies
bootstrap(AdsAppComponent, [ROUTER_PROVIDERS]);
