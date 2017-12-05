
describe('Evalumate testing commenced', function() {



	var more = element(by.buttonText('More'));
	var menuItems = element.all(by.repeater('item in menu.items'));

	//signs in
	it('sign in', function() {
		browser.get('http:evalumate.herokuapp.com/authentication/signin');
		browser.wait(function() {
		return  element(by.model('credentials.username')).isPresent();
		})
		var username = element(by.model('credentials.username'));
		var pw = element(by.model('credentials.password'));
		var signinButton = element(by.buttonText('Sign in'));
		username.sendKeys('macDawg');
		pw.sendKeys('Qq#54artyq');
		signinButton.click();
		expect(browser.getCurrentUrl()).toContain('evalumate.herokuapp.com');
		browser.sleep(2000);

	});





	//profile page tested with an update and confirming update saved
	it('profile', function() {
		//browser.get('http:evalumate.herokuapp.com/profiles');
		menuItems.get(0).click();
		browser.sleep(2000);
		var mantra = element(by.model('mantra'));
		var EMantra = element(by.buttonText('EDIT MANTRA'));
		EMantra.click();
		mantra.sendKeys('brand new mantra');
		browser.sleep(2000);
		var update = element(by.buttonText('UPDATE'));
		update.click();
		browser.sleep(2500);
		var NewMantra = element(by.binding('article1.mantra'));
		expect(NewMantra.getText()).toContain('tested');

	});

	//clicks through the quiz
	it('should take an emotional maturity quiz', function() {
		menuItems.get(1).click();
		var subItems = element.all(by.repeater('subitem in item.items'));
		subItems.get(0).click();
		element(by.buttonText('TAKE QUIZ')).click();
		element(by.model('vm.name')).sendKeys('Protractor Quiz taker');
		browser.sleep(2000);
		element.all(by.repeater('ema in vm.ema')).each(function(element, index) {
		// Will print 0 First, 1 Second, 2 Third.
		element.all(by.css ("input[type='radio']")).get(1).click();

		});

		element(by.buttonText('Submit')).click();
		browser.waitForAngular();
		browser.sleep(4000);
		var ass = element.all(by.repeater('test in vm.assessment.emaresult.slice().reverse()'));
		expect(ass.get(0).getText()).toContain('Test');
		//.all(by.css ("input[type='radio']")).get(1).click();
		//browser.pause();


	});


	//romantic assessment quiz
	it('should take a romantic assessment', function() {

		menuItems.get(1).click();
		var subItems = element.all(by.repeater('subitem in item.items'));
		subItems.get(1).click();
		element(by.buttonText('Take Assessment')).click();
		element(by.model('vm.name')).sendKeys('Protractor Quiz taker');
		browser.sleep(2000);

		element.all(by.repeater('raa in vm.raa')).each(function(element, index) {
		// Will print 0 First, 1 Second, 2 Third.
		element.all(by.css ("input[type='radio']")).get(1).click();
		});

		element(by.buttonText('Submit')).click();
		browser.waitForAngular();
		browser.sleep(4000);
		var ass = element.all(by.repeater('test in vm.assessment.raaresult.slice().reverse()'));
		expect(ass.get(0).getText()).toContain('Protractor');
		//.all(by.css ("input[type='radio']")).get(1).click();
	});


	//sends 3 emails then shows that the emails sent are remembered
	it('emails', function() {
		//browser.get('http://evalumate.herokuapp.com/assessments/create');

		menuItems.get(1).click();

		var subItems = element.all(by.repeater('subitem in item.items'));
		subItems.get(2).click();
		var email1 = element(by.model('assessment.email1.address'));
		var email2 = element(by.model('assessment.email2.address'));
		var email3 = element(by.model('assessment.email3.address'));
		var sendEmail = element(by.buttonText('Send Email'));

		email1.clear().sendKeys('bobbyLee@gmail.com');
		browser.sleep(2000);
		email2.clear().sendKeys('robbyRee@gmail.com');
		browser.sleep(2000);
		email3.clear().sendKeys('tobbyTee@gmail.com');
		browser.sleep(2000);
		sendEmail.click();
		browser.sleep(3000);
	});

	//tests the red flag page by clicking through them
	it('Red Flag Modal', function() {
		menuItems.get(2).click();
		browser.sleep(2000);
		more.click();
		var clos = element(by.buttonText('Close'));
		browser.sleep(2000);
		clos.click();
		browser.sleep(2000);
		//var sec = element(by.buttonText('More')).get(1).

		var sec= element.all(by.buttonText('More')).get(1)
		sec.click();
		var clos2 = element.all(by.buttonText('Close')).get(1);
		browser.sleep(2000);
		clos2.click();
		browser.sleep(2000);

		var sec2= element.all(by.buttonText('More')).get(2)
		sec2.click();
		var clos3 = element.all(by.buttonText('Close')).get(2);
		browser.sleep(2000);
		clos3.click();
		browser.sleep(2000);

		var sec3= element.all(by.buttonText('More')).get(1)
		sec3.click();
		var clos4 = element.all(by.buttonText('Close')).get(1);
		browser.sleep(2000);
		clos4.click();
		browser.sleep(2000);
	});





	//creates a new journal entry
	it('should create a new journal', function() {
		//the modal fades out so we have to wait for the menu to be availible

		var EC = protractor.ExpectedConditions;
		var isClickable = EC.elementToBeClickable(menuItems.get(0));
		browser.wait(isClickable, 2000);
		menuItems.get(3).click();

		//browser.get('http://evalumate.herokuapp.com');
		var subItems = element.all(by.repeater('subitem in item.items'));
		subItems.get(4).click();

		//create//////////////////////////////////////////////////
		element(by.model('title')).sendKeys('Protractor');
		browser.sleep(2000);
		element(by.model('content')).sendKeys('Some body text that will be changed next through the update function');
		browser.sleep(2500);
		element(by.className('btn btn-default')).click();
		//element(by.buttonText('EDIT MANTRA')).click();

		//update//////////////////////////////////////////////////
		browser.sleep(2000);
		var getArticle = element.all(by.repeater('article in articles'));
		expect(getArticle.get(0).getText()).toContain('Some body text');


	});



	//tests update by clicking old journal and then update button
	it('should update a journal', function() {
	var EC = protractor.ExpectedConditions;
		var isClickable = EC.elementToBeClickable(menuItems.get(0));
		browser.wait(isClickable, 2000);
		menuItems.get(3).click();

		//browser.get('http://evalumate.herokuapp.com');
		var subItems = element.all(by.repeater('subitem in item.items'));
		subItems.get(3).click();
		var getArticle = element.all(by.repeater('article in articles'));
		getArticle.get(0).click();
		browser.sleep(2000);
		//browser.pause();
		var update = element(by.tagName('i')).click();
		var content = element(by.model('article.content'));
		content.clear().sendKeys('New body text that will be deleted in the next test, which will result in the first Test entry being shown instead of this text');
		browser.sleep(3000);
		var update = element(by.buttonText('Update'));
		update.click();
		browser.sleep(2000);
		var text = element(by.binding('article.content'));
		expect(text.getText()).toContain('New body text');
		//////////////////////////////////////////////////
	});


	//delete//////////////////////////////////////////////////
	it('should delete a journal', function() {
		var dlt =element(by.className('glyphicon glyphicon-trash'));
		dlt.click();
		browser.sleep(2000);
		var getArticle = element.all(by.repeater('article in articles'));
		getArticle.get(0).click();
		browser.sleep(2000);
		var firstElement = element(by.binding('article.content'));
		expect(firstElement.getText()).not.toEqual('How about a new body');
		browser.sleep(2000);
		////////////////////////////////////////////////////////////////
		//check to see if it is delete
	});



	//tests the strive for 5 page
	it('ways2grow', function() {
		//browser.get(' http://evalumate.herokuapp.com/ways2grows');
		menuItems.get(4).click();
		var send = element(by.id('chart'));
		send.click();
		browser.sleep(5000);
		menuItems.get(4).click();
		var send2 = element(by.id('chart'));
		send.click();
		browser.sleep(3000);
	});

});
