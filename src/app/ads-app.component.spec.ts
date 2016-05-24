import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { AdsAppComponent } from '../app/ads-app.component';

beforeEachProviders(() => [AdsAppComponent]);

describe('App: AdsApp', () => {
  it('should create the app',
      inject([AdsAppComponent], (app: AdsAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'ads-app works!\'',
      inject([AdsAppComponent], (app: AdsAppComponent) => {
    expect(app.title).toEqual('ads-app works!');
  }));
});
