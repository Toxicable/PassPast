import { PassPastPage } from './app.po';

describe('pass-past App', function() {
  let page: PassPastPage;

  beforeEach(() => {
    page = new PassPastPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
