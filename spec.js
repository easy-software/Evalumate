describe('Protractor Demo App', function() {

  var username = element(by.model('credentials.username'));
  var password = element(by.model('credentials.password'));
  var signIn = element(by.buttonText('Sign in'));
  var more = element(by.buttonText('More'));
  var menuItems = element.all(by.repeater('item in menu.items'));



  it('Red Flag Modal', function() {

    browser.get('http://evalumate.herokuapp.com/authentication/signin');
    //browser.pause();
    //element(by.css('btn btn-primary'))

    //element(by.css('btn btn-primary'));
  //  element(by.xpath('.//*[.="Sign In"]'))
//expect(element(by.tagName('h1')).getText()).toBe('New Journal');
username.sendKeys('michael');
password.sendKeys('Hello12345?');
signIn.click();


menuItems.get(3).click();
more.click();
expect(element(by.id('myModal')).isPresent()).toBeTruthy();

browser.sleep(3000);
});

it('Journal Test', function() {
browser.get('http://evalumate.herokuapp.com');

///////////////////////////////


//browser.pause();
  menuItems.get(0).click();

  var subItems = element.all(by.repeater('subitem in item.items'));
  subItems.get(1).click();

  var getArticle = element.all(by.repeater('article in articles'));
  getArticle.get(0).click();

  var update = element(by.tagName('i')).click();
  var content = element(by.model('article.content'));
  content.clear().sendKeys('How about a new body');

  var update = element(by.buttonText('Update'));
  update.click();
  var text = element(by.binding('article.content'));
  expect(text.getText()).toEqual('How about a new body');
  browser.pause();

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
