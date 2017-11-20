'use strict';

describe('Redflags E2E Tests:', function () {
  describe('Test Redflags page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/redflags');
      expect(element.all(by.repeater('redflag in redflags')).count()).toEqual(0);
    });
  });
});
