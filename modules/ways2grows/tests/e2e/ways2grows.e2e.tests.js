'use strict';

describe('Ways2grows E2E Tests:', function () {
  describe('Test Ways2grows page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/ways2grows');
      expect(element.all(by.repeater('ways2grow in ways2grows')).count()).toEqual(0);
    });
  });
});
