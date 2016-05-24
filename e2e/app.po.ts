export class AddsAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('adds-app-app h1')).getText();
  }
}
