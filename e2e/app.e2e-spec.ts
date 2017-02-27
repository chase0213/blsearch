import { BlsearchPage } from './app.po';

describe('blsearch App', () => {
  let page: BlsearchPage;

  beforeEach(() => {
    page = new BlsearchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
