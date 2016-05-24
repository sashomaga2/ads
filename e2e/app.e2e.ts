import { AddsAppPage } from './app.po';

describe('adds-app App', function() {
  let page: AddsAppPage;

  beforeEach(() => {
    page = new AddsAppPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('adds-app works!');
  });
});
