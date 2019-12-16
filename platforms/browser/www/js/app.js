/* distance to planets
https://www.johndcook.com/blog/2015/10/24/distance-to-mars/
https://keisan.casio.com/exec/system/1224746378
https://codepen.io/lulunac27/pen/NRoyxE
*/

/* moon
https://astroonlain.ru/lunnyi-kalendar-na-kazhdyi-den
*/

/* plugins
ads https://github.com/floatinghotpot/cordova-admob-pro
flurry https://github.com/blakgeek/cordova-plugin-flurryanalytics
share https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
rate https://github.com/pushandplay/cordova-plugin-apprate
*/

/*
app id ca-app-pub-5186877757924020~1720905856
block id ca-app-pub-5186877757924020/3867722898
interstitial id ca-app-pub-5186877757924020/9190888687
*/

// Dom7
var $$ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
  id: 'io.framework7.testapp',
  root: '#app',
  sheet: {
    closeByBackdropClick: true,
  },
  theme: theme,
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  routes: routes,
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },
});

// gauges
var rulershipGauge, dispositorGauge, houseGauge, elementGauge;
var gaugeHealth, gaugeLove, gaugeFamily;

var smartSelect;

var Horo, TomorrowHoro;

var Moon = {
  phase: function (year, month, day) {
    var c = e = jd = b = 0;

    if (month < 3) {
      year--;
      month += 12;
    }

    ++month;
    c = 365.25 * year;
    e = 30.6 * month;
    jd = c + e + day - 694039.09; // jd is total days elapsed
    jd /= 29.5305882; // divide by the moon cycle
    b = parseInt(jd); // int(jd) -> b, take integer part of jd
    jd -= b; // subtract integer part to leave fractional part of original jd
    b = Math.round(jd * 8); // scale fraction from 0-8 and round

    if (b >= 8) b = 0; // 0 and 8 are the same so turn 8 into 0

    switch (b) {
      case 0:
        return textNewMoon;
        break;
      case 1:
        return textWaxingCrescentMoon;
        break;
      case 2:
        return textQuarterMoon;
        break;
      case 3:
        return textWaxingGibbousMoon;
        break;
      case 4:
        return textFullMoon;
        break;
      case 5:
        return textWaningGibbousMoon;
        break;
      case 6:
        return textLastQuarterMoon;
        break;
      case 7:
        return textWaningCrescentMoon;
        break;
    }
  }
};

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

if (localStorage.getItem('firstStart') != 'no') {
	
	localStorage.setItem('language', navigator.language);
	localStorage.setItem('sign', 'aries');
	updateLanguage();
	refreshZodiac();
	refreshSign();
	var userID = Math.random()*10000000000000000;
	localStorage.setItem('userID', userID);
	
	mixpanel.identify(userID);
	mixpanel.people.set({
    "$created": new  Date()
});

	flurryAnalytics = new FlurryAnalytics({
    // requried
    appKey: 'JF2QQM7WYSD2SXSJFT6G',
    // optional
    continueSessionSeconds: 3,          // how long can the app be paused before a new session is created, must be less than or equal to five for Android devices
    userId: userID,
});
	trackEvent("App first start");
	
	app.panel.open('left', true);
    localStorage.setItem('firstStart', 'no');
}
else
{		
	updateLanguage();
	refreshZodiac();
	refreshSign();
	flurryAnalytics = new FlurryAnalytics({
    // requried
    appKey: 'JF2QQM7WYSD2SXSJFT6G',
    // optional
    continueSessionSeconds: 3,          // how long can the app be paused before a new session is created, must be less than or equal to five for Android devices
    userId: userID,
});
	mixpanel.people.set({
    "$last_login": new Date()
});
	trackEvent('App started');
}

prepareAd();

AppRate.preferences = {
  displayAppName: textAppName,
  usesUntilPrompt: 5,
  promptAgainForEachNewVersion: false,
  inAppReview: true,
  storeAppURL: {
    ios: '<my_app_id>',
    android: 'https://play.google.com/store/apps/details?id=com.synfitness.synrun',
    windows: 'ms-windows-store://pdp/?ProductId=<the apps Store ID>',
    blackberry: 'appworld://content/[App Id]/',
    windows8: 'ms-windows-store:Review?name=<the Package Family Name of the application>'
  },
  callbacks: {
    handleNegativeFeedback: function(){
      window.open('mailto:kudrikmed@gmail.com','_system');
    },
    onRateDialogShow: function(callback){
      callback(1) // cause immediate click on 'Rate Now' button
    },
    onButtonClicked: function(buttonIndex){
      console.log("onButtonClicked -> " + buttonIndex);
    }
  },
  openUrl: AppRate.preferences.openUrl
};

document.addEventListener("backbutton", function (e) {
	e.preventDefault();
	console.log("back button pressed");
	
	if($$('#settingsPopup').hasClass('modal-in'))
{
	app.popup.close('#settingsPopup', true);
}
	else if ($$('#readMorePopup').hasClass('modal-in'))
{
	app.popup.close('#readMorePopup', true);
}
	else if ($$('.panel-right').hasClass('panel-active'))
{
	app.panel.close('right', true);
}
	else if ($$('.panel-left').hasClass('panel-active'))
{
	app.panel.close('left', true);
}
 else
 {
	navigator.app.exitApp();
 }
	
}, false);

gaugeHealth = app.gauge.create({
        el: '#gaugeHealth',
    });
gaugeFamily = app.gauge.create({
        el: '#gaugeFamily',
    });
gaugeLove = app.gauge.create({
        el: '#gaugeLove',
    });	
	
gaugeHealth.update({
		labelText: textHealth
	});
gaugeFamily.update({
		labelText: textFamily
	});	
gaugeLove.update({
		labelText: textLove
	});
	
document.getElementById("notificationToggleCheckbox").addEventListener("click", function(){
	console.log("Toggle pressed!")
	if (this.checked){
	document.getElementById("notificationTimeElement").classList.remove('disabled');	
	$$("timePicker").prop({
		disabled: true
	});
}
else{
	document.getElementById("notificationTimeElement").classList.add('disabled');
	$$("timePicker").prop({
	disabled: false
	});
}
}, false);

// ajax

refreshZodiac();
};

$$('#notificationsMenuButton').on('click', function () {
    app.popup.open('#settingsPopup', true);
});

$$('#languageMenuButton').on('click', function () {
    app.popup.open('#settingsPopup', true);
});

$$('#textSaveAndExitButton').on('click', function () {
	var language = smartSelect.getValue();
	localStorage.setItem('language', language);
	updateLanguage();	
    app.popup.close('#settingsPopup', true);
});

$$('#readMorePopup').on('popup:close', function () {
	prepareAd();
	trackEvent('More popup closed');
});

$$('#shareMainCardHeader').on('click', function () {
	
	trackEvent('Main screen share pressed');
	
	var textMessageShareResult = $$('#horocontent').text();
	
	var shareResult = {
    message: textMessageShareResult, // not supported on some apps (Facebook, Instagram)
    subject: textAppName, // fi. for email
        // files: ['', ''], // an array of filenames either locally or remotely
    url: 'https://www.synrunning.com'
        // chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title,
        // appPackageName: 'com.apple.social.facebook' // Android only, you can provide id of the App you want to share with
    };

    var onSuccessShareResult = function (result) {

    };

    var onErrorShareResult = function (msg) {

    };

    window.plugins.socialsharing.shareWithOptions(shareResult, onSuccessShareResult, onErrorShareResult);
	});
	
$$('#moreShareToday').on('click', function () {
	
	trackEvent('More share today pressed');
	
	var textMessageShareResult = $$('#moreTodayHoroContent').text();
	
	var shareResult = {
    message: textMessageShareResult, // not supported on some apps (Facebook, Instagram)
    subject: textAppName, // fi. for email
        // files: ['', ''], // an array of filenames either locally or remotely
    url: 'https://www.synrunning.com'
        // chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title,
        // appPackageName: 'com.apple.social.facebook' // Android only, you can provide id of the App you want to share with
    };

    var onSuccessShareResult = function (result) {

    };

    var onErrorShareResult = function (msg) {

    };

    window.plugins.socialsharing.shareWithOptions(shareResult, onSuccessShareResult, onErrorShareResult);
	});
	
$$('#moreShareTomorrow').on('click', function () {
	
	trackEvent('More tomorrow share pressed');
	
	var textMessageShareResult = $$('#moreTomorrowHoroContent').text();
	
	var shareResult = {
    message: textMessageShareResult, // not supported on some apps (Facebook, Instagram)
    subject: textAppName, // fi. for email
        // files: ['', ''], // an array of filenames either locally or remotely
    url: 'https://www.synrunning.com'
        // chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title,
        // appPackageName: 'com.apple.social.facebook' // Android only, you can provide id of the App you want to share with
    };

    var onSuccessShareResult = function (result) {

    };

    var onErrorShareResult = function (msg) {

    };

    window.plugins.socialsharing.shareWithOptions(shareResult, onSuccessShareResult, onErrorShareResult);
	});

$$('#ratingMenuButton').on('click', function () {
	trackEvent('Rate app buutin pressed');
	AppRate.promptForRating();
	});

$$('#readMoreFABButton').on('click', function () {
	
		AdMob.showInterstitial();
		
		rulershipGauge = app.gauge.create({
		el: '#popupGaugeRulership',
		type: 'semicircle',
		value: 0.3,
		borderColor: '#0f4c81',
		valueText: 'Mars',
		valueTextColor: '#0f4c81',
		labelText: 'ruler'
	});
	
		dispositorGauge = app.gauge.create({
		el: '#popupGaugeDispositor',
		type: 'semicircle',
		value: 0.5,
		borderColor: '#0f4c81',
		valueText: 'Venus',
		valueTextColor: '#0f4c81',
		labelText: 'dispositor'
	});
		houseGauge = app.gauge.create({
		el: '#popupGaugeHouse',
		type: 'semicircle',
		value: 0.2,
		borderColor: '#0f4c81',
		valueText: '8th',
		valueTextColor: '#0f4c81',
		labelText: 'house'
	});
	
		elementGauge = app.gauge.create({
		el: '#popupGaugeElement',
		type: 'semicircle',
		value: 0.9,
		borderColor: '#0f4c81',
		valueText: 'Water',
		valueTextColor: '#0f4c81',
		labelText: 'element'
	});
	
		directionGauge = app.gauge.create({
		el: '#popupGaugeDirection',
		type: 'semicircle',
		value: 0.6,
		borderColor: '#0f4c81',
		valueText: 'West',
		valueTextColor: '#0f4c81',
		labelText: 'direction'
	});
	
		seasonGauge = app.gauge.create({
		el: '#popupGaugeSeason',
		type: 'semicircle',
		value: 0.6,
		borderColor: '#0f4c81',
		valueText: 'Autumn',
		valueTextColor: '#0f4c81',
		labelText: 'season'
	});

trackEvent('FAB pressed');
	// Return today's date and time
var currentTime = new Date();

// returns the month (from 0 to 11)
var month = currentTime.getMonth() + 1;

// returns the day of the month (from 1 to 31)
var day = currentTime.getDate();

// returns the year (four digits)
var year = currentTime.getFullYear();

$$('#moreCurrentMoonPhase').text(Moon.phase(year, month, day));
$$('#moonDay').text(moonDate(day, month, year));
$$('#moreCurrentMoonDay').text(textTodayIs + moonDate(day, month, year) + textMoonDay);

    app.popup.open('#readMorePopup', true);
});
// get moon date
function moonDate (day, month, year){
	var N, D, M, Y, L = 0;
	D = day;
	M = month;
	Y = year;
	
	L = year - 1994;
	while (L>19){
		L=L-19;
	}
	
	N=(L*11) - 14 + D + M;
	while (N>30){
		N = N - 30;
	}

	return N;
};

// get horo date
function getHoroDate (){
// Return today's date and time
var currentTime = new Date();

// returns the month (from 0 to 11)
var month = currentTime.getMonth() + 1;

// returns the day of the month (from 1 to 31)
var day = currentTime.getDate();

// returns the year (four digits)
var year = currentTime.getFullYear();
while(year > 2017)
{
year = year - 2;
}

var output = year + "-" + month + "-" + day;

if(output == "2017-02-29"){
	output = "2016-02-29";
}

return output; 
};

// get horo tomorrow date
function getHoroTomorrowDate (){

var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

// returns the month (from 0 to 11)
var month = tomorrow.getMonth() + 1;

// returns the day of the month (from 1 to 31)
var day = tomorrow.getDate();

// returns the year (four digits)
var year = tomorrow.getFullYear();
while(year > 2017)
{
year = year - 2;
}
var output = year + "-" + month + "-" + day;

if(output == "2017-02-29"){
	output = "2016-02-29";
}

return output; 
};

// popovers
$$('#popupGaugeRulership').on('click', function () {
    app.popover.open('#popoverRuler', '#popupGaugeRulership', true);
});
$$('#popupGaugeDispositor').on('click', function () {
    app.popover.open('#popoverDispositor', '#popupGaugeDispositor', true);
});
$$('#popupGaugeHouse').on('click', function () {
    app.popover.open('#popoverHouse', '#popupGaugeHouse', true);
});
$$('#popupGaugeElement').on('click', function () {
    app.popover.open('#popoverElement', '#popupGaugeElement', true);
});
$$('#popupGaugeDirection').on('click', function () {
    app.popover.open('#popoverDirection', '#popupGaugeDirection', true);
});
$$('#popupGaugeSeason').on('click', function () {
    app.popover.open('#popoverSeason', '#popupGaugeSeason', true);
});

// sign selection
$$('#aquariusMenuButton').on('click', function () {
    localStorage.setItem('sign', 'aquarius');
	refreshZodiac();
	refreshSign();
});
$$('#piscesMenuButton').on('click', function () {
    localStorage.setItem('sign', 'pisces');
	refreshZodiac();
	refreshSign();
});
$$('#ariesMenuButton').on('click', function () {
    localStorage.setItem('sign', 'aries');
	refreshZodiac();
	refreshSign();
});
$$('#taurusMenuButton').on('click', function () {
    localStorage.setItem('sign', 'taurus');
	refreshZodiac();
	refreshSign();
});
$$('#geminiMenuButton').on('click', function () {
    localStorage.setItem('sign', 'gemini');
	refreshZodiac();	
	refreshSign();
});
$$('#cancerMenuButton').on('click', function () {
    localStorage.setItem('sign', 'cancer');
	refreshZodiac();
	refreshSign();
});
$$('#leoMenuButton').on('click', function () {
    localStorage.setItem('sign', 'leo');
	refreshZodiac();
	refreshSign();
});
$$('#virgoMenuButton').on('click', function () {
    localStorage.setItem('sign', 'virgo');
	refreshZodiac();
	refreshSign();
});
$$('#libraMenuButton').on('click', function () {
    localStorage.setItem('sign', 'libra');
	refreshZodiac();
	refreshSign();
});
$$('#scorpioMenuButton').on('click', function () {
    localStorage.setItem('sign', 'scorpio');
	refreshZodiac();
	refreshSign();
});
$$('#saggitariusMenuButton').on('click', function () {
    localStorage.setItem('sign', 'saggitarius');
	refreshZodiac();
	refreshSign();
});
$$('#capricornMenuButton').on('click', function () {
    localStorage.setItem('sign', 'capricorn');
	refreshZodiac();
	refreshSign();
});



$$('#readMorePopupBackButton').on('click', function () {
    app.popup.close('#readMorePopup', true);
});

$$('#settingsPopupBackButton').on('click', function () {
    app.popup.close('#settingsPopup', true);
});

var settingsPopupView = app.views.create('#settingsPopupView', {url: '/'});

    smartSelect = app.smartSelect.create({ 
    el: $$('#languageSmartSelect'),
	view: settingsPopupView,
	openIn: 'sheet'
});

function refreshZodiac() {
	  app.request.post(textServer, {
        date: getHoroDate(),
    }, function (data) {
        if (data) {
			Horo = JSON.parse(data);
			refreshSign();
        };
    }, function () { console.log('Error during loading horoscope') });
	
  app.request.post(textServer, {
        date: getHoroTomorrowDate(),
    }, function (data) {
        if (data) {
			TomorrowHoro = JSON.parse(data);
			refreshSign();
        };
    }, function () { console.log('Error during loading horoscope') });	
};

function trackEvent (someEvent) {
	mixpanel.track(someEvent);
	flurryAnalytics.logEvent(someEvent);
}

function prepareAd(){
	AdMob.prepareInterstitial({
	adId: 'ca-app-pub-5186877757924020/9190888687',
	autoShow: false,
	isTesting: true
	});
}

function refreshSign () {
	var sign = localStorage.getItem('sign');
	
	if(Horo && TomorrowHoro){
	switch(sign){
		case 'aquarius':
		$$('#navbarTitleText').text(textAquarius);
		$$('#readMorePopupTitle').text(textAquarius);
		$$('#horocontent').text(Horo['aquarius']);
		$$('#moreTodayHoroContent').text(Horo['aquarius']);
		$$('#moreTomorrowHoroContent').text(TomorrowHoro['aquarius']);		
		var alpha = Math.floor(11 * (parseInt(Horo['random1']) / 100));
		var beta = Math.floor(11 * (parseInt(Horo['random2']) / 100));		
		alpha = alpha + 0;
		while (alpha > 11){
			alpha = alpha - 12;
		}
		beta = beta + 0;
		while (beta > 11){
			beta = beta - 12;
		}
		if(alpha != beta){
			$$('#moreLoveSigns').text(Signs[alpha] + ', ' + Signs[beta]);
		}
		else{
			$$('#moreLoveSigns').text(Signs[alpha]);
		}
		var gamma = Math.floor(11 * (parseInt(Horo['random3']) / 100));
		var delta = Math.floor(11 * (parseInt(Horo['random4']) / 100));
		
		gamma = gamma + 0;
		while (gamma > 11){
			gamma = gamma - 12;
		}
		delta = delta + 0;
		while (delta > 11){
			delta = delta - 12;
		}
		if(gamma != delta){
			$$('#moreFriendshipSigns').text(Signs[gamma] + ', ' + Signs[delta]);
		}
		else{
			$$('#moreFriendshipSigns').text(Signs[gamma]);
		}
		var epsilon = Math.floor(11 * (parseInt(Horo['random5']) / 100));
		var zeta = Math.floor(11 * (parseInt(Horo['random6']) / 100));
		epsilion = epsilon + 0;
		while (epsilon > 11){
			epsilon = epsilon - 12;
		}
		zeta = zeta + 0;
		while (zeta > 11){
			zeta = zeta - 12;
		}
		if(epsilon != zeta){
			$$('#moreMoneySigns').text(Signs[epsilon] + ', ' + Signs[zeta]);
		}
		else{
			$$('#moreMoneySigns').text(Signs[epsilon]);
		}
		var eta = Math.floor(11 * (parseInt(Horo['random1'])+ parseInt(Horo['random2'])) / 200);
		var theta = Math.floor(11 * (parseInt(Horo['random3'])+parseInt(Horo['random4'])) / 200);
		eta = eta + 0;
		while (eta > 11){
			eta = eta - 12;
		}
		theta = theta + 0;
		while (theta > 11){
			theta = theta - 12;
		}
		if(eta != theta){
			$$('#moreDangerSigns').text(Signs[eta] + ', ' + Signs[theta]);
		}
		else{
			$$('#moreDangerSigns').text(Signs[eta]);
		}
		var iota = Math.floor(11 * (parseInt(Horo['random1'])+ parseInt(Horo['random3'])) / 200);
		var kappa = Math.floor(11 * (parseInt(Horo['random2'])+parseInt(Horo['random4'])) / 200);
		iota = iota + 9;
		while (iota > 11){
			iota = iota - 12;
		}
		kappa = kappa + 3;
		while (kappa > 11){
			kappa = kappa - 12;
		}
		if(iota != kappa){
			$$('#moreEmotionsSigns').text(Signs[iota] + ', ' + Signs[kappa]);
		}
		else {
			$$('#moreEmotionsSigns').text(Signs[iota]);
		}
		var valueHealth = parseInt(Horo['random3']) + 47;
		while(valueHealth > 100){
			valueHealth = valueHealth - 100;
			}
		gaugeHealth.update({
			labelText: textHealth,
			value: valueHealth / 100,
			valueText: valueHealth
							});
		var valueFamily = parseInt(Horo['random4']) + 39;
		while(valueFamily > 100){
			valueFamily = valueFamily - 100;
			}
		gaugeFamily.update({
			labelText: textFamily,
			value: valueFamily / 100,
			valueText: valueFamily
							});
		var valueLove = parseInt(Horo['random5']) + 22;
		while(valueLove > 100){
			valueLove = valueLove - 100;
			}
		gaugeLove.update({
			labelText: textLove,
			value: valueLove / 100,
			valueText: valueLove
							});
		break;
		case 'pisces':
		$$('#navbarTitleText').text(textPisces);
		$$('#readMorePopupTitle').text(textPisces);
		$$('#horocontent').text(Horo['pisces']);
		$$('#moreTodayHoroContent').text(Horo['pisces']);
		$$('#moreTomorrowHoroContent').text(TomorrowHoro['pisces']);
		var alpha = Math.floor(11 * (parseInt(Horo['random1']) / 100));
		var beta = Math.floor(11 * (parseInt(Horo['random2']) / 100));		
		alpha = alpha + 1;
		while (alpha > 11){
			alpha = alpha - 12;
		}
		beta = beta + 3;
		while (beta > 11){
			beta = beta - 12;
		}
		if(alpha != beta){
			$$('#moreLoveSigns').text(Signs[alpha] + ', ' + Signs[beta]);
		}
		else{
			$$('#moreLoveSigns').text(Signs[alpha]);
		}
		var gamma = Math.floor(11 * (parseInt(Horo['random3']) / 100));
		var delta = Math.floor(11 * (parseInt(Horo['random4']) / 100));
		
		gamma = gamma + 1;
		while (gamma > 11){
			gamma = gamma - 12;
		}
		delta = delta + 5;
		while (delta > 11){
			delta = delta - 12;
		}
		if(gamma != delta){
			$$('#moreFriendshipSigns').text(Signs[gamma] + ', ' + Signs[delta]);
		}
		else{
			$$('#moreFriendshipSigns').text(Signs[gamma]);
		}
		var epsilon = Math.floor(11 * (parseInt(Horo['random5']) / 100));
		var zeta = Math.floor(11 * (parseInt(Horo['random6']) / 100));
		epsilion = epsilon + 1;
		while (epsilon > 11){
			epsilon = epsilon - 12;
		}
		zeta = zeta + 7;
		while (zeta > 11){
			zeta = zeta - 12;
		}
		if(epsilon != zeta){
			$$('#moreMoneySigns').text(Signs[epsilon] + ', ' + Signs[zeta]);
		}
		else{
			$$('#moreMoneySigns').text(Signs[epsilon]);
		}
		var eta = Math.floor(11 * (parseInt(Horo['random1'])+ parseInt(Horo['random2'])) / 200);
		var theta = Math.floor(11 * (parseInt(Horo['random3'])+parseInt(Horo['random4'])) / 200);
		eta = eta + 1;
		while (eta > 11){
			eta = eta - 12;
		}
		theta = theta + 9;
		while (theta > 11){
			theta = theta - 12;
		}
		if(eta != theta){
			$$('#moreDangerSigns').text(Signs[eta] + ', ' + Signs[theta]);
		}
		else{
			$$('#moreDangerSigns').text(Signs[eta]);
		}
		var iota = Math.floor(11 * (parseInt(Horo['random1'])+ parseInt(Horo['random3'])) / 200);
		var kappa = Math.floor(11 * (parseInt(Horo['random2'])+parseInt(Horo['random4'])) / 200);
		iota = iota + 1;
		while (iota > 11){
			iota = iota - 12;
		}
		kappa = kappa + 0;
		while (kappa > 11){
			kappa = kappa - 12;
		}
		if(iota != kappa){
			$$('#moreEmotionsSigns').text(Signs[iota] + ', ' + Signs[kappa]);
		}
		else {
			$$('#moreEmotionsSigns').text(Signs[iota]);
		}
		var valueHealth = parseInt(Horo['random3']) + 25;
		while(valueHealth > 100){
			valueHealth = valueHealth - 100;
			}
		gaugeHealth.update({
			labelText: textHealth,
			value: valueHealth / 100,
			valueText: valueHealth
							});
		var valueFamily = parseInt(Horo['random4']) + 82;
		while(valueFamily > 100){
			valueFamily = valueFamily - 100;
			}
		gaugeFamily.update({
			labelText: textFamily,
			value: valueFamily / 100,
			valueText: valueFamily
							});
		var valueLove = parseInt(Horo['random5']) + 63;
		while(valueLove > 100){
			valueLove = valueLove - 100;
			}
		gaugeLove.update({
			labelText: textLove,
			value: valueLove / 100,
			valueText: valueLove
							});
		break;
		case 'aries':
		$$('#navbarTitleText').text(textAries);
		$$('#readMorePopupTitle').text(textAries);
		$$('#horocontent').text(Horo['aries']);
		$$('#moreTodayHoroContent').text(Horo['aries']);
		$$('#moreTomorrowHoroContent').text(TomorrowHoro['aries']);
		var alpha = Math.floor(11 * (parseInt(Horo['random1']) / 100));
		var beta = Math.floor(11 * (parseInt(Horo['random2']) / 100));		
		alpha = alpha + 6;
		while (alpha > 11){
			alpha = alpha - 12;
		}
		beta = beta + 6;
		while (beta > 11){
			beta = beta - 12;
		}
		if(alpha != beta){
			$$('#moreLoveSigns').text(Signs[alpha] + ', ' + Signs[beta]);
		}
		else{
			$$('#moreLoveSigns').text(Signs[alpha]);
		}
		var gamma = Math.floor(11 * (parseInt(Horo['random3']) / 100));
		var delta = Math.floor(11 * (parseInt(Horo['random4']) / 100));
		
		gamma = gamma + 6;
		while (gamma > 11){
			gamma = gamma - 12;
		}
		delta = delta + 9;
		while (delta > 11){
			delta = delta - 12;
		}
		if(gamma != delta){
			$$('#moreFriendshipSigns').text(Signs[gamma] + ', ' + Signs[delta]);
		}
		else{
			$$('#moreFriendshipSigns').text(Signs[gamma]);
		}
		var epsilon = Math.floor(11 * (parseInt(Horo['random5']) / 100));
		var zeta = Math.floor(11 * (parseInt(Horo['random6']) / 100));
		epsilion = epsilon + 6;
		while (epsilon > 11){
			epsilon = epsilon - 12;
		}
		zeta = zeta + 3;
		while (zeta > 11){
			zeta = zeta - 12;
		}
		if(epsilon != zeta){
			$$('#moreMoneySigns').text(Signs[epsilon] + ', ' + Signs[zeta]);
		}
		else{
			$$('#moreMoneySigns').text(Signs[epsilon]);
		}
		var eta = Math.floor(11 * (parseInt(Horo['random1'])+ parseInt(Horo['random2'])) / 200);
		var theta = Math.floor(11 * (parseInt(Horo['random3'])+parseInt(Horo['random4'])) / 200);
		eta = eta + 6;
		while (eta > 11){
			eta = eta - 12;
		}
		theta = theta + 5;
		while (theta > 11){
			theta = theta - 12;
		}
		if(eta != theta){
			$$('#moreDangerSigns').text(Signs[eta] + ', ' + Signs[theta]);
		}
		else{
			$$('#moreDangerSigns').text(Signs[eta]);
		}
		var iota = Math.floor(11 * (parseInt(Horo['random1'])+ parseInt(Horo['random3'])) / 200);
		var kappa = Math.floor(11 * (parseInt(Horo['random2'])+parseInt(Horo['random4'])) / 200);
		iota = iota + 6;
		while (iota > 11){
			iota = iota - 12;
		}
		kappa = kappa + 4;
		while (kappa > 11){
			kappa = kappa - 12;
		}
		if(iota != kappa){
			$$('#moreEmotionsSigns').text(Signs[iota] + ', ' + Signs[kappa]);
		}
		else {
			$$('#moreEmotionsSigns').text(Signs[iota]);
		}
		var valueHealth = parseInt(Horo['random3']) + 33;
		while(valueHealth > 100){
			valueHealth = valueHealth - 100;
			}
		gaugeHealth.update({
			labelText: textHealth,
			value: valueHealth / 100,
			valueText: valueHealth
							});
		var valueFamily = parseInt(Horo['random4']) + 72;
		while(valueFamily > 100){
			valueFamily = valueFamily - 100;
			}
		gaugeFamily.update({
			labelText: textFamily,
			value: valueFamily / 100,
			valueText: valueFamily
							});
		var valueLove = parseInt(Horo['random5']) + 15;
		while(valueLove > 100){
			valueLove = valueLove - 100;
			}
		gaugeLove.update({
			labelText: textLove,
			value: valueLove / 100,
			valueText: valueLove
							});
		break;
		case 'taurus':
		$$('#navbarTitleText').text(textTaurus);
		$$('#readMorePopupTitle').text(textTaurus);
		$$('#horocontent').text(Horo['taurus']);
		$$('#moreTodayHoroContent').text(Horo['taurus']);
		$$('#moreTomorrowHoroContent').text(TomorrowHoro['taurus']);
		var alpha = Math.floor(11 * (parseInt(Horo['random1']) / 100));
		var beta = Math.floor(11 * (parseInt(Horo['random2']) / 100));		
		alpha = alpha + 2;
		while (alpha > 11){
			alpha = alpha - 12;
		}
		beta = beta + 0;
		while (beta > 11){
			beta = beta - 12;
		}
		if(alpha != beta){
			$$('#moreLoveSigns').text(Signs[alpha] + ', ' + Signs[beta]);
		}
		else{
			$$('#moreLoveSigns').text(Signs[alpha]);
		}
		var gamma = Math.floor(11 * (parseInt(Horo['random3']) / 100));
		var delta = Math.floor(11 * (parseInt(Horo['random4']) / 100));
		
		gamma = gamma + 1;
		while (gamma > 11){
			gamma = gamma - 12;
		}
		delta = delta + 6;
		while (delta > 11){
			delta = delta - 12;
		}
		if(gamma != delta){
			$$('#moreFriendshipSigns').text(Signs[gamma] + ', ' + Signs[delta]);
		}
		else{
			$$('#moreFriendshipSigns').text(Signs[gamma]);
		}
		var epsilon = Math.floor(11 * (parseInt(Horo['random5']) / 100));
		var zeta = Math.floor(11 * (parseInt(Horo['random6']) / 100));
		epsilion = epsilon + 9;
		while (epsilon > 11){
			epsilon = epsilon - 12;
		}
		zeta = zeta + 4;
		while (zeta > 11){
			zeta = zeta - 12;
		}
		if(epsilon != zeta){
			$$('#moreMoneySigns').text(Signs[epsilon] + ', ' + Signs[zeta]);
		}
		else{
			$$('#moreMoneySigns').text(Signs[epsilon]);
		}
		var eta = Math.floor(11 * (parseInt(Horo['random1'])+ parseInt(Horo['random2'])) / 200);
		var theta = Math.floor(11 * (parseInt(Horo['random3'])+parseInt(Horo['random4'])) / 200);
		eta = eta + 3;
		while (eta > 11){
			eta = eta - 12;
		}
		theta = theta + 2;
		while (theta > 11){
			theta = theta - 12;
		}
		if(eta != theta){
			$$('#moreDangerSigns').text(Signs[eta] + ', ' + Signs[theta]);
		}
		else{
			$$('#moreDangerSigns').text(Signs[eta]);
		}
		var iota = Math.floor(11 * (parseInt(Horo['random1'])+ parseInt(Horo['random3'])) / 200);
		var kappa = Math.floor(11 * (parseInt(Horo['random2'])+parseInt(Horo['random4'])) / 200);
		iota = iota + 7;
		while (iota > 11){
			iota = iota - 12;
		}
		kappa = kappa + 5;
		while (kappa > 11){
			kappa = kappa - 12;
		}
		if(iota != kappa){
			$$('#moreEmotionsSigns').text(Signs[iota] + ', ' + Signs[kappa]);
		}
		else {
			$$('#moreEmotionsSigns').text(Signs[iota]);
		}
		var valueHealth = parseInt(Horo['random3']) + 71;
		while(valueHealth > 100){
			valueHealth = valueHealth - 100;
			}
		gaugeHealth.update({
			labelText: textHealth,
			value: valueHealth / 100,
			valueText: valueHealth
							});
		var valueFamily = parseInt(Horo['random4']) + 53;
		while(valueFamily > 100){
			valueFamily = valueFamily - 100;
			}
		gaugeFamily.update({
			labelText: textFamily,
			value: valueFamily / 100,
			valueText: valueFamily
							});
		var valueLove = parseInt(Horo['random5']) + 13;
		while(valueLove > 100){
			valueLove = valueLove - 100;
			}
		gaugeLove.update({
			labelText: textLove,
			value: valueLove / 100,
			valueText: valueLove
							});
		break;
			case 'gemini':
		$$('#navbarTitleText').text(textGemini);
		$$('#readMorePopupTitle').text(textGemini);
		$$('#horocontent').text(Horo['gemini']);
		$$('#moreTodayHoroContent').text(Horo['gemini']);
		$$('#moreTomorrowHoroContent').text(TomorrowHoro['gemini']);
		var alpha = Math.floor(11 * (parseInt(Horo['random1']) / 100));
		var beta = Math.floor(11 * (parseInt(Horo['random2']) / 100));		
		alpha = alpha + 7;
		while (alpha > 11){
			alpha = alpha - 12;
		}
		beta = beta + 1;
		while (beta > 11){
			beta = beta - 12;
		}
		if(alpha != beta){
			$$('#moreLoveSigns').text(Signs[alpha] + ', ' + Signs[beta]);
		}
		else{
			$$('#moreLoveSigns').text(Signs[alpha]);
		}
		var gamma = Math.floor(11 * (parseInt(Horo['random3']) / 100));
		var delta = Math.floor(11 * (parseInt(Horo['random4']) / 100));
		
		gamma = gamma + 3;
		while (gamma > 11){
			gamma = gamma - 12;
		}
		delta = delta + 4;
		while (delta > 11){
			delta = delta - 12;
		}
		if(gamma != delta){
			$$('#moreFriendshipSigns').text(Signs[gamma] + ', ' + Signs[delta]);
		}
		else{
			$$('#moreFriendshipSigns').text(Signs[gamma]);
		}
		var epsilon = Math.floor(11 * (parseInt(Horo['random5']) / 100));
		var zeta = Math.floor(11 * (parseInt(Horo['random6']) / 100));
		epsilion = epsilon + 5;
		while (epsilon > 11){
			epsilon = epsilon - 12;
		}
		zeta = zeta + 2;
		while (zeta > 11){
			zeta = zeta - 12;
		}
		if(epsilon != zeta){
			$$('#moreMoneySigns').text(Signs[epsilon] + ', ' + Signs[zeta]);
		}
		else{
			$$('#moreMoneySigns').text(Signs[epsilon]);
		}
		var eta = Math.floor(11 * (parseInt(Horo['random1'])+ parseInt(Horo['random2'])) / 200);
		var theta = Math.floor(11 * (parseInt(Horo['random3'])+parseInt(Horo['random4'])) / 200);
		eta = eta + 8;
		while (eta > 11){
			eta = eta - 12;
		}
		theta = theta + 4;
		while (theta > 11){
			theta = theta - 12;
		}
		if(eta != theta){
			$$('#moreDangerSigns').text(Signs[eta] + ', ' + Signs[theta]);
		}
		else{
			$$('#moreDangerSigns').text(Signs[eta]);
		}
		var iota = Math.floor(11 * (parseInt(Horo['random1'])+ parseInt(Horo['random3'])) / 200);
		var kappa = Math.floor(11 * (parseInt(Horo['random2'])+parseInt(Horo['random4'])) / 200);
		iota = iota + 10;
		while (iota > 11){
			iota = iota - 12;
		}
		kappa = kappa + 3;
		while (kappa > 11){
			kappa = kappa - 12;
		}
		if(iota != kappa){
			$$('#moreEmotionsSigns').text(Signs[iota] + ', ' + Signs[kappa]);
		}
		else {
			$$('#moreEmotionsSigns').text(Signs[iota]);
		}
		var valueHealth = parseInt(Horo['random3']) + 63;
		while(valueHealth > 100){
			valueHealth = valueHealth - 100;
			}
		gaugeHealth.update({
			labelText: textHealth,
			value: valueHealth / 100,
			valueText: valueHealth
							});
		var valueFamily = parseInt(Horo['random4']) + 72;
		while(valueFamily > 100){
			valueFamily = valueFamily - 100;
			}
		gaugeFamily.update({
			labelText: textFamily,
			value: valueFamily / 100,
			valueText: valueFamily
							});
		var valueLove = parseInt(Horo['random5']) + 25;
		while(valueLove > 100){
			valueLove = valueLove - 100;
			}
		gaugeLove.update({
			labelText: textLove,
			value: valueLove / 100,
			valueText: valueLove
							});
		break;
			case 'cancer':
		$$('#navbarTitleText').text(textCancer);
		$$('#readMorePopupTitle').text(textCancer);
		$$('#horocontent').text(Horo['cancer']);
		$$('#moreTodayHoroContent').text(Horo['cancer']);
		$$('#moreTomorrowHoroContent').text(TomorrowHoro['cancer']);
		var alpha = Math.floor(11 * (parseInt(Horo['random1']) / 100));
		var beta = Math.floor(11 * (parseInt(Horo['random2']) / 100));		
		alpha = alpha + 4;
		while (alpha > 11){
			alpha = alpha - 12;
		}
		beta = beta + 2;
		while (beta > 11){
			beta = beta - 12;
		}
		if(alpha != beta){
			$$('#moreLoveSigns').text(Signs[alpha] + ', ' + Signs[beta]);
		}
		else{
			$$('#moreLoveSigns').text(Signs[alpha]);
		}
		var gamma = Math.floor(11 * (parseInt(Horo['random3']) / 100));
		var delta = Math.floor(11 * (parseInt(Horo['random4']) / 100));
		
		gamma = gamma + 9;
		while (gamma > 11){
			gamma = gamma - 12;
		}
		delta = delta + 3;
		while (delta > 11){
			delta = delta - 12;
		}
		if(gamma != delta){
			$$('#moreFriendshipSigns').text(Signs[gamma] + ', ' + Signs[delta]);
		}
		else{
			$$('#moreFriendshipSigns').text(Signs[gamma]);
		}
		var epsilon = Math.floor(11 * (parseInt(Horo['random5']) / 100));
		var zeta = Math.floor(11 * (parseInt(Horo['random6']) / 100));
		epsilion = epsilon + 9;
		while (epsilon > 11){
			epsilon = epsilon - 12;
		}
		zeta = zeta + 2;
		while (zeta > 11){
			zeta = zeta - 12;
		}
		if(epsilon != zeta){
			$$('#moreMoneySigns').text(Signs[epsilon] + ', ' + Signs[zeta]);
		}
		else{
			$$('#moreMoneySigns').text(Signs[epsilon]);
		}
		var eta = Math.floor(11 * (parseInt(Horo['random1'])+ parseInt(Horo['random2'])) / 200);
		var theta = Math.floor(11 * (parseInt(Horo['random3'])+parseInt(Horo['random4'])) / 200);
		eta = eta + 7;
		while (eta > 11){
			eta = eta - 12;
		}
		theta = theta + 1;
		while (theta > 11){
			theta = theta - 12;
		}
		if(eta != theta){
			$$('#moreDangerSigns').text(Signs[eta] + ', ' + Signs[theta]);
		}
		else{
			$$('#moreDangerSigns').text(Signs[eta]);
		}
		var iota = Math.floor(11 * (parseInt(Horo['random1'])+ parseInt(Horo['random3'])) / 200);
		var kappa = Math.floor(11 * (parseInt(Horo['random2'])+parseInt(Horo['random4'])) / 200);
		iota = iota + 4;
		while (iota > 11){
			iota = iota - 12;
		}
		kappa = kappa + 4;
		while (kappa > 11){
			kappa = kappa - 12;
		}
		if(iota != kappa){
			$$('#moreEmotionsSigns').text(Signs[iota] + ', ' + Signs[kappa]);
		}
		else {
			$$('#moreEmotionsSigns').text(Signs[iota]);
		}
		var valueHealth = parseInt(Horo['random3']) + 13;
		while(valueHealth > 100){
			valueHealth = valueHealth - 100;
			}
		gaugeHealth.update({
			labelText: textHealth,
			value: valueHealth / 100,
			valueText: valueHealth
							});
		var valueFamily = parseInt(Horo['random4']) + 38;
		while(valueFamily > 100){
			valueFamily = valueFamily - 100;
			}
		gaugeFamily.update({
			labelText: textFamily,
			value: valueFamily / 100,
			valueText: valueFamily
							});
		var valueLove = parseInt(Horo['random5']) + 81;
		while(valueLove > 100){
			valueLove = valueLove - 100;
			}
		gaugeLove.update({
			labelText: textLove,
			value: valueLove / 100,
			valueText: valueLove
							});
		break;
			case 'leo':
		$$('#navbarTitleText').text(textLeo);
		$$('#readMorePopupTitle').text(textLeo);
		$$('#horocontent').text(Horo['leo']);
		$$('#moreTodayHoroContent').text(Horo['leo']);
		$$('#moreTomorrowHoroContent').text(TomorrowHoro['leo']);
		var alpha = Math.floor(11 * (parseInt(Horo['random1']) / 100));
		var beta = Math.floor(11 * (parseInt(Horo['random2']) / 100));		
		alpha = alpha + 8;
		while (alpha > 11){
			alpha = alpha - 12;
		}
		beta = beta + 3;
		while (beta > 11){
			beta = beta - 12;
		}
		if(alpha != beta){
			$$('#moreLoveSigns').text(Signs[alpha] + ', ' + Signs[beta]);
		}
		else{
			$$('#moreLoveSigns').text(Signs[alpha]);
		}
		var gamma = Math.floor(11 * (parseInt(Horo['random3']) / 100));
		var delta = Math.floor(11 * (parseInt(Horo['random4']) / 100));
		
		gamma = gamma + 3;
		while (gamma > 11){
			gamma = gamma - 12;
		}
		delta = delta + 1;
		while (delta > 11){
			delta = delta - 12;
		}
		if(gamma != delta){
			$$('#moreFriendshipSigns').text(Signs[gamma] + ', ' + Signs[delta]);
		}
		else{
			$$('#moreFriendshipSigns').text(Signs[gamma]);
		}
		var epsilon = Math.floor(11 * (parseInt(Horo['random5']) / 100));
		var zeta = Math.floor(11 * (parseInt(Horo['random6']) / 100));
		epsilion = epsilon + 8;
		while (epsilon > 11){
			epsilon = epsilon - 12;
		}
		zeta = zeta + 3;
		while (zeta > 11){
			zeta = zeta - 12;
		}
		if(epsilon != zeta){
			$$('#moreMoneySigns').text(Signs[epsilon] + ', ' + Signs[zeta]);
		}
		else{
			$$('#moreMoneySigns').text(Signs[epsilon]);
		}
		var eta = Math.floor(11 * (parseInt(Horo['random1'])+ parseInt(Horo['random2'])) / 200);
		var theta = Math.floor(11 * (parseInt(Horo['random3'])+parseInt(Horo['random4'])) / 200);
		eta = eta + 5;
		while (eta > 11){
			eta = eta - 12;
		}
		theta = theta + 10;
		while (theta > 11){
			theta = theta - 12;
		}
		if(eta != theta){
			$$('#moreDangerSigns').text(Signs[eta] + ', ' + Signs[theta]);
		}
		else{
			$$('#moreDangerSigns').text(Signs[eta]);
		}
		var iota = Math.floor(11 * (parseInt(Horo['random1'])+ parseInt(Horo['random3'])) / 200);
		var kappa = Math.floor(11 * (parseInt(Horo['random2'])+parseInt(Horo['random4'])) / 200);
		iota = iota + 10;
		while (iota > 11){
			iota = iota - 12;
		}
		kappa = kappa + 2;
		while (kappa > 11){
			kappa = kappa - 12;
		}
		if(iota != kappa){
			$$('#moreEmotionsSigns').text(Signs[iota] + ', ' + Signs[kappa]);
		}
		else {
			$$('#moreEmotionsSigns').text(Signs[iota]);
		}
		var valueHealth = parseInt(Horo['random3']) + 62;
		while(valueHealth > 100){
			valueHealth = valueHealth - 100;
			}
		gaugeHealth.update({
			labelText: textHealth,
			value: valueHealth / 100,
			valueText: valueHealth
							});
		var valueFamily = parseInt(Horo['random4']) + 13;
		while(valueFamily > 100){
			valueFamily = valueFamily - 100;
			}
		gaugeFamily.update({
			labelText: textFamily,
			value: valueFamily / 100,
			valueText: valueFamily
							});
		var valueLove = parseInt(Horo['random5']) + 81;
		while(valueLove > 100){
			valueLove = valueLove - 100;
			}
		gaugeLove.update({
			labelText: textLove,
			value: valueLove / 100,
			valueText: valueLove
							});
		break;
			case 'virgo':
		$$('#navbarTitleText').text(textVirgo);
		$$('#readMorePopupTitle').text(textVirgo);
		$$('#horocontent').text(Horo['virgo']);
		$$('#moreTodayHoroContent').text(Horo['virgo']);
		$$('#moreTomorrowHoroContent').text(TomorrowHoro['virgo']);
		var alpha = Math.floor(11 * (parseInt(Horo['random1']) / 100));
		var beta = Math.floor(11 * (parseInt(Horo['random2']) / 100));		
		alpha = alpha + 3;
		while (alpha > 11){
			alpha = alpha - 12;
		}
		beta = beta + 2;
		while (beta > 11){
			beta = beta - 12;
		}
		if(alpha != beta){
			$$('#moreLoveSigns').text(Signs[alpha] + ', ' + Signs[beta]);
		}
		else{
			$$('#moreLoveSigns').text(Signs[alpha]);
		}
		var gamma = Math.floor(11 * (parseInt(Horo['random3']) / 100));
		var delta = Math.floor(11 * (parseInt(Horo['random4']) / 100));
		
		gamma = gamma + 7;
		while (gamma > 11){
			gamma = gamma - 12;
		}
		delta = delta + 1;
		while (delta > 11){
			delta = delta - 12;
		}
		if(gamma != delta){
			$$('#moreFriendshipSigns').text(Signs[gamma] + ', ' + Signs[delta]);
		}
		else{
			$$('#moreFriendshipSigns').text(Signs[gamma]);
		}
		var epsilon = Math.floor(11 * (parseInt(Horo['random5']) / 100));
		var zeta = Math.floor(11 * (parseInt(Horo['random6']) / 100));
		epsilion = epsilon + 3;
		while (epsilon > 11){
			epsilon = epsilon - 12;
		}
		zeta = zeta + 3;
		while (zeta > 11){
			zeta = zeta - 12;
		}
		if(epsilon != zeta){
			$$('#moreMoneySigns').text(Signs[epsilon] + ', ' + Signs[zeta]);
		}
		else{
			$$('#moreMoneySigns').text(Signs[epsilon]);
		}
		var eta = Math.floor(11 * (parseInt(Horo['random1'])+ parseInt(Horo['random2'])) / 200);
		var theta = Math.floor(11 * (parseInt(Horo['random3'])+parseInt(Horo['random4'])) / 200);
		eta = eta + 10;
		while (eta > 11){
			eta = eta - 12;
		}
		theta = theta + 2;
		while (theta > 11){
			theta = theta - 12;
		}
		if(eta != theta){
			$$('#moreDangerSigns').text(Signs[eta] + ', ' + Signs[theta]);
		}
		else{
			$$('#moreDangerSigns').text(Signs[eta]);
		}
		var iota = Math.floor(11 * (parseInt(Horo['random1'])+ parseInt(Horo['random3'])) / 200);
		var kappa = Math.floor(11 * (parseInt(Horo['random2'])+parseInt(Horo['random4'])) / 200);
		iota = iota + 2;
		while (iota > 11){
			iota = iota - 12;
		}
		kappa = kappa + 10;
		while (kappa > 11){
			kappa = kappa - 12;
		}
		if(iota != kappa){
			$$('#moreEmotionsSigns').text(Signs[iota] + ', ' + Signs[kappa]);
		}
		else {
			$$('#moreEmotionsSigns').text(Signs[iota]);
		}
		var valueHealth = parseInt(Horo['random3']) + 12;
		while(valueHealth > 100){
			valueHealth = valueHealth - 100;
			}
		gaugeHealth.update({
			labelText: textHealth,
			value: valueHealth / 100,
			valueText: valueHealth
							});
		var valueFamily = parseInt(Horo['random4']) + 61;
		while(valueFamily > 100){
			valueFamily = valueFamily - 100;
			}
		gaugeFamily.update({
			labelText: textFamily,
			value: valueFamily / 100,
			valueText: valueFamily
							});
		var valueLove = parseInt(Horo['random5']) + 81;
		while(valueLove > 100){
			valueLove = valueLove - 100;
			}
		gaugeLove.update({
			labelText: textLove,
			value: valueLove / 100,
			valueText: valueLove
							});
		break;
			case 'libra':
		$$('#navbarTitleText').text(textLibra);
		$$('#readMorePopupTitle').text(textLibra);
		$$('#horocontent').text(Horo['libra']);
		$$('#moreTodayHoroContent').text(Horo['libra']);
		$$('#moreTomorrowHoroContent').text(TomorrowHoro['libra']);
		var alpha = Math.floor(11 * (parseInt(Horo['random1']) / 100));
		var beta = Math.floor(11 * (parseInt(Horo['random2']) / 100));		
		alpha = alpha + 0;
		while (alpha > 11){
			alpha = alpha - 12;
		}
		beta = beta + 3;
		while (beta > 11){
			beta = beta - 12;
		}
		if(alpha != beta){
			$$('#moreLoveSigns').text(Signs[alpha] + ', ' + Signs[beta]);
		}
		else{
			$$('#moreLoveSigns').text(Signs[alpha]);
		}
		var gamma = Math.floor(11 * (parseInt(Horo['random3']) / 100));
		var delta = Math.floor(11 * (parseInt(Horo['random4']) / 100));
		
		gamma = gamma + 8;
		while (gamma > 11){
			gamma = gamma - 12;
		}
		delta = delta + 7;
		while (delta > 11){
			delta = delta - 12;
		}
		if(gamma != delta){
			$$('#moreFriendshipSigns').text(Signs[gamma] + ', ' + Signs[delta]);
		}
		else{
			$$('#moreFriendshipSigns').text(Signs[gamma]);
		}
		var epsilon = Math.floor(11 * (parseInt(Horo['random5']) / 100));
		var zeta = Math.floor(11 * (parseInt(Horo['random6']) / 100));
		epsilion = epsilon + 4;
		while (epsilon > 11){
			epsilon = epsilon - 12;
		}
		zeta = zeta + 10;
		while (zeta > 11){
			zeta = zeta - 12;
		}
		if(epsilon != zeta){
			$$('#moreMoneySigns').text(Signs[epsilon] + ', ' + Signs[zeta]);
		}
		else{
			$$('#moreMoneySigns').text(Signs[epsilon]);
		}
		var eta = Math.floor(11 * (parseInt(Horo['random1'])+ parseInt(Horo['random2'])) / 200);
		var theta = Math.floor(11 * (parseInt(Horo['random3'])+parseInt(Horo['random4'])) / 200);
		eta = eta + 7;
		while (eta > 11){
			eta = eta - 12;
		}
		theta = theta + 6;
		while (theta > 11){
			theta = theta - 12;
		}
		if(eta != theta){
			$$('#moreDangerSigns').text(Signs[eta] + ', ' + Signs[theta]);
		}
		else{
			$$('#moreDangerSigns').text(Signs[eta]);
		}
		var iota = Math.floor(11 * (parseInt(Horo['random1'])+ parseInt(Horo['random3'])) / 200);
		var kappa = Math.floor(11 * (parseInt(Horo['random2'])+parseInt(Horo['random4'])) / 200);
		iota = iota + 1;
		while (iota > 11){
			iota = iota - 12;
		}
		kappa = kappa + 3;
		while (kappa > 11){
			kappa = kappa - 12;
		}
		if(iota != kappa){
			$$('#moreEmotionsSigns').text(Signs[iota] + ', ' + Signs[kappa]);
		}
		else {
			$$('#moreEmotionsSigns').text(Signs[iota]);
		}
		var valueHealth = parseInt(Horo['random3']) + 31;
		while(valueHealth > 100){
			valueHealth = valueHealth - 100;
			}
		gaugeHealth.update({
			labelText: textHealth,
			value: valueHealth / 100,
			valueText: valueHealth
							});
		var valueFamily = parseInt(Horo['random4']) + 82;
		while(valueFamily > 100){
			valueFamily = valueFamily - 100;
			}
		gaugeFamily.update({
			labelText: textFamily,
			value: valueFamily / 100,
			valueText: valueFamily
							});
		var valueLove = parseInt(Horo['random5']) + 8;
		while(valueLove > 100){
			valueLove = valueLove - 100;
			}
		gaugeLove.update({
			labelText: textLove,
			value: valueLove / 100,
			valueText: valueLove
							});
		break;
			case 'scorpio':
		$$('#navbarTitleText').text(textScorpio);
		$$('#readMorePopupTitle').text(textScorpio);
		$$('#horocontent').text(Horo['scorpio']);
		$$('#moreTodayHoroContent').text(Horo['scorpio']);
		$$('#moreTomorrowHoroContent').text(TomorrowHoro['scorpio']);
		var alpha = Math.floor(11 * (parseInt(Horo['random1']) / 100));
		var beta = Math.floor(11 * (parseInt(Horo['random2']) / 100));		
		alpha = alpha + 2;
		while (alpha > 11){
			alpha = alpha - 12;
		}
		beta = beta + 8;
		while (beta > 11){
			beta = beta - 12;
		}
		if(alpha != beta){
			$$('#moreLoveSigns').text(Signs[alpha] + ', ' + Signs[beta]);
		}
		else{
			$$('#moreLoveSigns').text(Signs[alpha]);
		}
		var gamma = Math.floor(11 * (parseInt(Horo['random3']) / 100));
		var delta = Math.floor(11 * (parseInt(Horo['random4']) / 100));
		
		gamma = gamma + 5;
		while (gamma > 11){
			gamma = gamma - 12;
		}
		delta = delta + 4;
		while (delta > 11){
			delta = delta - 12;
		}
		if(gamma != delta){
			$$('#moreFriendshipSigns').text(Signs[gamma] + ', ' + Signs[delta]);
		}
		else{
			$$('#moreFriendshipSigns').text(Signs[gamma]);
		}
		var epsilon = Math.floor(11 * (parseInt(Horo['random5']) / 100));
		var zeta = Math.floor(11 * (parseInt(Horo['random6']) / 100));
		epsilion = epsilon + 8;
		while (epsilon > 11){
			epsilon = epsilon - 12;
		}
		zeta = zeta + 3;
		while (zeta > 11){
			zeta = zeta - 12;
		}
		if(epsilon != zeta){
			$$('#moreMoneySigns').text(Signs[epsilon] + ', ' + Signs[zeta]);
		}
		else{
			$$('#moreMoneySigns').text(Signs[epsilon]);
		}
		var eta = Math.floor(11 * (parseInt(Horo['random1'])+ parseInt(Horo['random2'])) / 200);
		var theta = Math.floor(11 * (parseInt(Horo['random3'])+parseInt(Horo['random4'])) / 200);
		eta = eta + 10;
		while (eta > 11){
			eta = eta - 12;
		}
		theta = theta + 1;
		while (theta > 11){
			theta = theta - 12;
		}
		if(eta != theta){
			$$('#moreDangerSigns').text(Signs[eta] + ', ' + Signs[theta]);
		}
		else{
			$$('#moreDangerSigns').text(Signs[eta]);
		}
		var iota = Math.floor(11 * (parseInt(Horo['random1'])+ parseInt(Horo['random3'])) / 200);
		var kappa = Math.floor(11 * (parseInt(Horo['random2'])+parseInt(Horo['random4'])) / 200);
		iota = iota + 2;
		while (iota > 11){
			iota = iota - 12;
		}
		kappa = kappa + 4;
		while (kappa > 11){
			kappa = kappa - 12;
		}
		if(iota != kappa){
			$$('#moreEmotionsSigns').text(Signs[iota] + ', ' + Signs[kappa]);
		}
		else {
			$$('#moreEmotionsSigns').text(Signs[iota]);
		}
		var valueHealth = parseInt(Horo['random3']) + 85;
		while(valueHealth > 100){
			valueHealth = valueHealth - 100;
			}
		gaugeHealth.update({
			labelText: textHealth,
			value: valueHealth / 100,
			valueText: valueHealth
							});
		var valueFamily = parseInt(Horo['random4']) + 41;
		while(valueFamily > 100){
			valueFamily = valueFamily - 100;
			}
		gaugeFamily.update({
			labelText: textFamily,
			value: valueFamily / 100,
			valueText: valueFamily
							});
		var valueLove = parseInt(Horo['random5']) + 4;
		while(valueLove > 100){
			valueLove = valueLove - 100;
			}
		gaugeLove.update({
			labelText: textLove,
			value: valueLove / 100,
			valueText: valueLove
							});
		break;
			case 'saggitarius':
		$$('#navbarTitleText').text(textSaggitarius);
		$$('#readMorePopupTitle').text(textSaggitarius);
		$$('#horocontent').text(Horo['saggitarius']);
		$$('#moreTodayHoroContent').text(Horo['saggitarius']);
		$$('#moreTomorrowHoroContent').text(TomorrowHoro['saggitarius']);
		var alpha = Math.floor(11 * (parseInt(Horo['random1']) / 100));
		var beta = Math.floor(11 * (parseInt(Horo['random2']) / 100));		
		alpha = alpha + 1;
		while (alpha > 11){
			alpha = alpha - 12;
		}
		beta = beta + 10;
		while (beta > 11){
			beta = beta - 12;
		}
		if(alpha != beta){
			$$('#moreLoveSigns').text(Signs[alpha] + ', ' + Signs[beta]);
		}
		else{
			$$('#moreLoveSigns').text(Signs[alpha]);
		}
		var gamma = Math.floor(11 * (parseInt(Horo['random3']) / 100));
		var delta = Math.floor(11 * (parseInt(Horo['random4']) / 100));
		
		gamma = gamma + 5;
		while (gamma > 11){
			gamma = gamma - 12;
		}
		delta = delta + 0;
		while (delta > 11){
			delta = delta - 12;
		}
		if(gamma != delta){
			$$('#moreFriendshipSigns').text(Signs[gamma] + ', ' + Signs[delta]);
		}
		else{
			$$('#moreFriendshipSigns').text(Signs[gamma]);
		}
		var epsilon = Math.floor(11 * (parseInt(Horo['random5']) / 100));
		var zeta = Math.floor(11 * (parseInt(Horo['random6']) / 100));
		epsilion = epsilon + 10;
		while (epsilon > 11){
			epsilon = epsilon - 12;
		}
		zeta = zeta + 6;
		while (zeta > 11){
			zeta = zeta - 12;
		}
		if(epsilon != zeta){
			$$('#moreMoneySigns').text(Signs[epsilon] + ', ' + Signs[zeta]);
		}
		else{
			$$('#moreMoneySigns').text(Signs[epsilon]);
		}
		var eta = Math.floor(11 * (parseInt(Horo['random1'])+ parseInt(Horo['random2'])) / 200);
		var theta = Math.floor(11 * (parseInt(Horo['random3'])+parseInt(Horo['random4'])) / 200);
		eta = eta + 4;
		while (eta > 11){
			eta = eta - 12;
		}
		theta = theta + 10;
		while (theta > 11){
			theta = theta - 12;
		}
		if(eta != theta){
			$$('#moreDangerSigns').text(Signs[eta] + ', ' + Signs[theta]);
		}
		else{
			$$('#moreDangerSigns').text(Signs[eta]);
		}
		var iota = Math.floor(11 * (parseInt(Horo['random1'])+ parseInt(Horo['random3'])) / 200);
		var kappa = Math.floor(11 * (parseInt(Horo['random2'])+parseInt(Horo['random4'])) / 200);
		iota = iota + 7;
		while (iota > 11){
			iota = iota - 12;
		}
		kappa = kappa + 3;
		while (kappa > 11){
			kappa = kappa - 12;
		}
		if(iota != kappa){
			$$('#moreEmotionsSigns').text(Signs[iota] + ', ' + Signs[kappa]);
		}
		else {
			$$('#moreEmotionsSigns').text(Signs[iota]);
		}
		var valueHealth = parseInt(Horo['random3']) + 3;
		while(valueHealth > 100){
			valueHealth = valueHealth - 100;
			}
		gaugeHealth.update({
			labelText: textHealth,
			value: valueHealth / 100,
			valueText: valueHealth
							});
		var valueFamily = parseInt(Horo['random4']) + 81;
		while(valueFamily > 100){
			valueFamily = valueFamily - 100;
			}
		gaugeFamily.update({
			labelText: textFamily,
			value: valueFamily / 100,
			valueText: valueFamily
							});
		var valueLove = parseInt(Horo['random5']) + 49;
		while(valueLove > 100){
			valueLove = valueLove - 100;
			}
		gaugeLove.update({
			labelText: textLove,
			value: valueLove / 100,
			valueText: valueLove
							});
		break;
			case 'capricorn':
		$$('#navbarTitleText').text(textCapricorn);
		$$('#readMorePopupTitle').text(textCapricorn);
		$$('#horocontent').text(Horo['capricorn']);
		$$('#moreTodayHoroContent').text(Horo['capricorn']);
		$$('#moreTomorrowHoroContent').text(TomorrowHoro['capricorn']);
		var alpha = Math.floor(11 * (parseInt(Horo['random1']) / 100));
		var beta = Math.floor(11 * (parseInt(Horo['random2']) / 100));		
		alpha = alpha + 1;
		while (alpha > 11){
			alpha = alpha - 12;
		}
		beta = beta + 11;
		while (beta > 11){
			beta = beta - 12;
		}
		if(alpha != beta){
			$$('#moreLoveSigns').text(Signs[alpha] + ', ' + Signs[beta]);
		}
		else{
			$$('#moreLoveSigns').text(Signs[alpha]);
		}
		var gamma = Math.floor(11 * (parseInt(Horo['random3']) / 100));
		var delta = Math.floor(11 * (parseInt(Horo['random4']) / 100));
		
		gamma = gamma + 3;
		while (gamma > 11){
			gamma = gamma - 12;
		}
		delta = delta + 2;
		while (delta > 11){
			delta = delta - 12;
		}
		if(gamma != delta){
			$$('#moreFriendshipSigns').text(Signs[gamma] + ', ' + Signs[delta]);
		}
		else{
			$$('#moreFriendshipSigns').text(Signs[gamma]);
		}
		var epsilon = Math.floor(11 * (parseInt(Horo['random5']) / 100));
		var zeta = Math.floor(11 * (parseInt(Horo['random6']) / 100));
		epsilion = epsilon + 9;
		while (epsilon > 11){
			epsilon = epsilon - 12;
		}
		zeta = zeta + 1;
		while (zeta > 11){
			zeta = zeta - 12;
		}
		if(epsilon != zeta){
			$$('#moreMoneySigns').text(Signs[epsilon] + ', ' + Signs[zeta]);
		}
		else{
			$$('#moreMoneySigns').text(Signs[epsilon]);
		}
		var eta = Math.floor(11 * (parseInt(Horo['random1'])+ parseInt(Horo['random2'])) / 200);
		var theta = Math.floor(11 * (parseInt(Horo['random3'])+parseInt(Horo['random4'])) / 200);
		eta = eta + 6;
		while (eta > 11){
			eta = eta - 12;
		}
		theta = theta + 5;
		while (theta > 11){
			theta = theta - 12;
		}
		if(eta != theta){
			$$('#moreDangerSigns').text(Signs[eta] + ', ' + Signs[theta]);
		}
		else{
			$$('#moreDangerSigns').text(Signs[eta]);
		}
		var iota = Math.floor(11 * (parseInt(Horo['random1'])+ parseInt(Horo['random3'])) / 200);
		var kappa = Math.floor(11 * (parseInt(Horo['random2'])+parseInt(Horo['random4'])) / 200);
		iota = iota + 4;
		while (iota > 11){
			iota = iota - 12;
		}
		kappa = kappa + 2;
		while (kappa > 11){
			kappa = kappa - 12;
		}
		if(iota != kappa){
			$$('#moreEmotionsSigns').text(Signs[iota] + ', ' + Signs[kappa]);
		}
		else {
			$$('#moreEmotionsSigns').text(Signs[iota]);
		}
		var valueHealth = parseInt(Horo['random3']) + 17;
		while(valueHealth > 100){
			valueHealth = valueHealth - 100;
			}
		gaugeHealth.update({
			labelText: textHealth,
			value: valueHealth / 100,
			valueText: valueHealth
							});
		var valueFamily = parseInt(Horo['random4']) + 29;
		while(valueFamily > 100){
			valueFamily = valueFamily - 100;
			}
		gaugeFamily.update({
			labelText: textFamily,
			value: valueFamily / 100,
			valueText: valueFamily
							});
		var valueLove = parseInt(Horo['random5']) + 71;
		while(valueLove > 100){
			valueLove = valueLove - 100;
			}
		gaugeLove.update({
			labelText: textLove,
			value: valueLove / 100,
			valueText: valueLove
							});
		break;
	}
	}
};