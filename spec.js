describe('Protractor Demo App', function() {

  var username = element(by.model('credentials.username'));
  var password = element(by.model('credentials.password'));
  var signIn = element(by.buttonText('Sign in'));
  var more = element(by.buttonText('More'));
  var menuItems = element.all(by.repeater('item in menu.items'));



  it('should open up a modal', function() {

    browser.get('http://evalumate.herokuapp.com/authentication/signin');
    username.sendKeys('michael');
    password.sendKeys('Hello12345?');
    signIn.click();



    menuItems.get(3).click();
    more.click();
    expect(element(by.id('myModal')).isPresent()).toBeTruthy();
    element(by.className('close')).click();
    /*
    var EC = protractor.ExpectedConditions;
    var isClickable = EC.elementToBeClickable(menuItems.get(1));
    browser.wait(isClickable, 2000);
    menuItems.get(1).click();
    */
});

  it('should take a romantic assessment', function() {
    browser.get('http://evalumate.herokuapp.com');



    menuItems.get(1).click();
    var subItems = element.all(by.repeater('subitem in item.items'));
    subItems.get(3).click();
    element(by.buttonText('Take Assessment')).click();
    element(by.model('vm.name')).sendKeys('Protractor');

    element.all(by.repeater('raa in vm.raa')).each(function(element, index) {
      // Will print 0 First, 1 Second, 2 Third.
    element.all(by.css ("input[type='radio']")).get(1).click();
  });

element(by.buttonText('Submit')).click();
browser.waitForAngular();
var ass = element.all(by.repeater('test in vm.assessment.raaresult.slice().reverse()'));
expect(ass.get(0).getText()).toContain('Protractor');
//.all(by.css ("input[type='radio']")).get(1).click();
});



it('should take an emotional maturity quiz', function() {
browser.get('http://evalumate.herokuapp.com');


  menuItems.get(1).click();
  var subItems = element.all(by.repeater('subitem in item.items'));
  subItems.get(2).click();
  element(by.buttonText('Take Assessment')).click();
  element(by.model('vm.name')).sendKeys('Test');
  element.all(by.repeater('ema in vm.ema')).each(function(element, index) {
    // Will print 0 First, 1 Second, 2 Third.
  element.all(by.css ("input[type='radio']")).get(1).click();


});

element(by.buttonText('Submit')).click();
browser.waitForAngular();
var ass = element.all(by.repeater('test in vm.assessment.emaresult.slice().reverse()'));
expect(ass.get(0).getText()).toContain('Test');
//.all(by.css ("input[type='radio']")).get(1).click();
});



it('should create a new journal', function() {


//the modal fades out so we have to wait for the menu to be availible

  var EC = protractor.ExpectedConditions;
  var isClickable = EC.elementToBeClickable(menuItems.get(0));
  browser.wait(isClickable, 2000);
  menuItems.get(0).click();


//browser.get('http://evalumate.herokuapp.com');
var subItems = element.all(by.repeater('subitem in item.items'));
subItems.get(1).click();



//create//////////////////////////////////////////////////
element(by.model('title')).sendKeys('Protractor');
element(by.model('content')).sendKeys('Some body text');
element(by.className('btn btn-default')).click();
//////////////////////////////////////////////////


//update//////////////////////////////////////////////////

  browser.waitForAngular();
  var getArticle = element.all(by.repeater('article in articles'));
  expect(getArticle.get(0).getText()).toContain('Some body text');
});

it('should update a journal', function() {
var getArticle = element.all(by.repeater('article in articles'));
  getArticle.get(0).click();
  browser.sleep(2000);
  //browser.pause();
  var update = element(by.tagName('i')).click();
  var content = element(by.model('article.content'));
  content.clear().sendKeys('How about a new body');

  var update = element(by.buttonText('Update'));
  update.click();
  var text = element(by.binding('article.content'));
  expect(text.getText()).toEqual('How about a new body');
//////////////////////////////////////////////////
});
  //delete//////////////////////////////////////////////////
  it('should delete a journal', function() {
  var dlt =element(by.className('glyphicon glyphicon-trash'));
  dlt.click();
  var getArticle = element.all(by.repeater('article in articles'));
  getArticle.get(0).click();
  var firstElement = element(by.binding('article.content'));
  expect(firstElement.getText()).not.toEqual('How about a new body');
  ////////////////////////////////////////////////////////////////
  //check to see if it is deleted

  //browser.pause();

});
});

//expect(element(by.tagName('h3')).getText()).toBe('EvaluMateTM is a web app designed to evaluate the levels of Romantic Attraction (RA) and Emotional Maturity (EM) in a partner. EvaluMate™ is a companion to all LovEd Programs.');
/*
it('should add one and two', function() {
  var x = element(by.css('navbar-text pull-left'));
   //expect(browser.getTitle()).toEqual('MEAN.JS - Development Environment');

  expect(x.getText()).toEqual('hello');
});
//expect(element(by.tagName('a')).getText()).toBe('Sign in')
*/

/*
var elements = element.all(by.repeater('item in menu.items'));
elements.get(0).click();

var subItems = element.all(by.repeater('subitem in item.items'));
subItems.get(1).click();

var getArticle = element.all(by.repeater('article in articles'));
getArticle.get(0).click();

browser.pause();
*/
