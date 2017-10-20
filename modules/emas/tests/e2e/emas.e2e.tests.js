'use strict';

describe('Emas E2E Tests:', function () {
  describe('Test Emas page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/emas');
      expect(element.all(by.repeater('ema in emas')).count()).toEqual(0);
    });
  });
});
