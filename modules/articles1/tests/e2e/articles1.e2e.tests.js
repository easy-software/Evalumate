'use strict';

describe('Articles1 E2E Tests:', function () {
  describe('Test articles1 page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/articles1');
      expect(element.all(by.repeater('article1 in articles1')).count()).toEqual(0);
    });
  });
});
