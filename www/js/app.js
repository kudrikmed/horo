/* distance to planets
https://www.johndcook.com/blog/2015/10/24/distance-to-mars/
https://keisan.casio.com/exec/system/1224746378
https://codepen.io/lulunac27/pen/NRoyxE
*/

// privacy policy, t&c  https://app-privacy-policy-generator.firebaseapp.com/

/* moon
https://astroonlain.ru/lunnyi-kalendar-na-kazhdyi-den
http://geocult.ru/lunnaya-astrologiya
*/

/* plugins
ads https://github.com/floatinghotpot/cordova-admob-pro
flurry https://github.com/blakgeek/cordova-plugin-flurryanalytics
share https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
rate https://github.com/pushandplay/cordova-plugin-apprate
notifications https://github.com/katzer/cordova-plugin-local-notifications
version https://www.npmjs.com/package/cordova-plugin-appversion
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
	    $$('#textPopoverMoonPhaseAbout').text('0');
        return textNewMoon;
        break;
      case 1:
	    $$('#textPopoverMoonPhaseAbout').text('1');
        return textWaxingCrescentMoon;
        break;
      case 2:
        return textQuarterMoon;
		$$('#textPopoverMoonPhaseAbout').text('1');
        break;
      case 3:
        return textWaxingGibbousMoon;
		$$('#textPopoverMoonPhaseAbout').text('2');
        break;
      case 4:
        return textFullMoon;
		$$('#textPopoverMoonPhaseAbout').text('3');
        break;
      case 5:
		$$('#textPopoverMoonPhaseAbout').text('4');
        return textWaningGibbousMoon;
        break;
      case 6:
        return textLastQuarterMoon;
		$$('#textPopoverMoonPhaseAbout').text('4');
        break;
      case 7:
        return textWaningCrescentMoon;
		$$('#textPopoverMoonPhaseAbout').text('5');
        break;
    }
  }
};

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

localStorage.setItem('fabbuttonpressed', 'not pressed');

if (localStorage.getItem('firstStart') != 'no') {
	
	localStorage.setItem('language', navigator.language);
	localStorage.setItem('sign', 'aries');
	localStorage.setItem('notifications', 'true');
	localStorage.setItem('notificationTime', '09:00');
	document.getElementById('timePicker').value = "09:00";
	updateLanguage();
	refreshZodiac();
	var userID = Math.random()*100000000000000000;
	localStorage.setItem('userID', userID);
	
	mixpanel.identify(userID);
	mixpanel.people.set({
    "$created": new  Date(),
	"version": AppVersion.version
});

	flurryAnalytics = new FlurryAnalytics({
    // requried
    appKey: 'JF2QQM7WYSD2SXSJFT6G',
    // optional
	version: AppVersion.version,
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
	version: AppVersion.version
});
	mixpanel.people.set({
    "$last_login": new Date(),
	"version": AppVersion.version
});
	trackEvent('App started');
	document.getElementById('timePicker').value = "09:00";
}

if (localStorage.getItem('notificationTime'))
{
	document.getElementById('timePicker').value = localStorage.getItem('notificationTime');
}
else
{
	document.getElementById('timePicker').value = "09:00";
}

//setNotifications();


AppRate.preferences = {
  displayAppName: textAppName,
  usesUntilPrompt: 5,
  promptAgainForEachNewVersion: false,
  inAppReview: true,
  storeAppURL: {
    ios: '<my_app_id>',
    android: 'https://play.google.com/store/apps/details?id=com.astropro.horo',
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
	deleteBanner();
	app.popup.close('#readMorePopup', true);
}
	else if ($$('#readMoreMoonPopup').hasClass('modal-in'))
{
	deleteBanner();
	app.popup.close('#readMoreMoonPopup', true);
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
	if (this.checked){
	document.getElementById("notificationTimeElement").classList.remove('disabled');	
	$$("timePicker").prop({
		disabled: true
	});
	setNotifications();
	var notificationTime = document.getElementById("timePicker").value;
	localStorage.setItem('notificationTime', notificationTime);
	localStorage.setItem('notifications', true);
	console.log("notifications accepted");

}
else{
	document.getElementById("notificationTimeElement").classList.add('disabled');
	$$("timePicker").prop({
	disabled: false
	});
	localStorage.setItem('notifications', false);
	cordova.plugins.notification.local.cancelAll(function() {
    console.log("notifications blocked");
	}, this);
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
	localStorage.setItem('notificationTime', document.getElementById('timePicker').value); 
	setNotifications();
    app.popup.close('#settingsPopup', true);
});

function setNotifications() {
	console.log("step 1");
	console.log(localStorage.getItem('notifications'));
	if (localStorage.getItem('notifications') == 'true'){
	var time = document.getElementById("timePicker").value;
	var hours = time.split(":")[0];
    var minutes = time.split(":")[1];
	console.log("Notification ok");
	cordova.plugins.notification.local.schedule({
    title: textNotificationTitle,
	foreground: true,
    trigger: { count: 1, every: { hour: parseInt(hours), minute: parseInt(minutes) } }
});
	}
}

$$('#readMorePopup').on('popup:close', function () {
	prepareAd();
	trackEvent('More popup closed');
});

$$('#shareMainCardHeader').on('click', function () {
	
	trackEvent('Main screen share pressed');
	
	var textMessageShareResult = $$('#horocontent').text();
	var fullShareMessage = textHoroForToday + ". " + $$('#navbarTitleText').text() + ". " + textMessageShareResult;
	
	var shareResult = {
    message: fullShareMessage, // not supported on some apps (Facebook, Instagram)
    subject: textAppName, // fi. for email
        // files: ['', ''], // an array of filenames either locally or remotely
    url: 'https://play.google.com/store/apps/details?id=com.astropro.horo'
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
	var fullShareMessage = textHoroForToday + ". " + $$('#readMorePopupTitle').text() + ". " + textMessageShareResult;
	
	var shareResult = {
    message: fullShareMessage, // not supported on some apps (Facebook, Instagram)
    subject: textAppName, // fi. for email
        // files: ['', ''], // an array of filenames either locally or remotely
    url: 'https://play.google.com/store/apps/details?id=com.astropro.horo'
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
	var fullShareMessage = textHoroForTomorrow + ". " + $$('#readMorePopupTitle').text() + ". " + textMessageShareResult;
	
	var shareResult = {
    message: fullShareMessage, // not supported on some apps (Facebook, Instagram)
    subject: textAppName, // fi. for email
        // files: ['', ''], // an array of filenames either locally or remotely
    url: 'https://play.google.com/store/apps/details?id=com.astropro.horo'
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
	AppRate.preferences.useLanguage = navigator.language;
	trackEvent('Rate app buttin pressed');
	AppRate.promptForRating();
	});
	
$$('#moonPhaseMore').on('click', function () {
	
	trackEvent('Moon phase more');
	var currentPhase = $$('#moreCurrentMoonPhase').text();
		
	switch (currentPhase) {
      case textNewMoon:
	    $$('#textPopoverMoonPhaseAbout').text(MoonPhases[0]);
        break;
      case textWaxingCrescentMoon:
	    $$('#textPopoverMoonPhaseAbout').text(MoonPhases[1]);
        break;
      case textQuarterMoon:
	    $$('#textPopoverMoonPhaseAbout').text(MoonPhases[1]);
        break;	
      case textWaxingGibbousMoon:
	    $$('#textPopoverMoonPhaseAbout').text(MoonPhases[2]);
        break;
      case textFullMoon:
	    $$('#textPopoverMoonPhaseAbout').text(MoonPhases[3]);
        break;
      case textWaningGibbousMoon:
	    $$('#textPopoverMoonPhaseAbout').text(MoonPhases[4]);
        break;
      case textLastQuarterMoon:
	    $$('#textPopoverMoonPhaseAbout').text(MoonPhases[4]);
        break;
      case textWaningCrescentMoon:
	    $$('#textPopoverMoonPhaseAbout').text(MoonPhases[5]);
        break;
	}
	
	var currentMoonPhase = $$('#moreCurrentMoonPhase').text();
	$$('#textPopoverMoonPhase').text(currentMoonPhase);
	app.popover.open('#popoverMoonPhase', '#moreCurrentMoonDay', true);
	
	});
	
$$('#moonDayMore').on('click', function () {
	trackEvent('Moon day more');
	var currentMoonDay = $$('#moreCurrentMoonDay').text();
	$$('#textPopoverMoonDay').text(currentMoonDay);
	var moonDay = parseInt($$('#moonDay').text()) - 1;
	$$('#textPopoverMoonDayAbout').text(MoonDays[moonDay]);
	app.popover.open('#popoverMoonDay', '#moonDayMore', true);
});

$$('#getLoveInfo').on('click', function () {
	trackEvent('Love info');	
	$$('#textPopoverLoveAbout').text(MoonLoveTexts[MoonStars[getMoonDay() - 1].love - 1]);
	$$('#textPopoverLove').text($$('#moreLoveText').text() + ": " + $$('#moreLoveSigns').text());
	app.popover.open('#popoverLoveInfo', '#getLoveInfo', true);
});

$$('#getFriendshipInfo').on('click', function () {
	trackEvent('Friendship info');	
	$$('#textPopoverFriendshipAbout').text(MoonFriendshipTexts[MoonStars[getMoonDay() - 1].social - 1]);
	$$('#textPopoverFriendship').text($$('#moreFriendshipText').text() + ": " + $$('#moreFriendshipSigns').text());
	app.popover.open('#popoverFriendshipInfo', '#getFriendshipInfo', true);
});

$$('#getMoneyInfo').on('click', function () {
	trackEvent('Money info');	
	$$('#textPopoverMoneyAbout').text(MoonMoneyTexts[MoonStars[getMoonDay() - 1].business - 1]);
	$$('#textPopoverMoney').text($$('#moreMoneyText').text() + ": " + $$('#moreMoneySigns').text());
	app.popover.open('#popoverMoneyInfo', '#getMoneyInfo', true);
});

$$('#getDangerInfo').on('click', function () {
	trackEvent('Danger info');	
	$$('#textPopoverDangerAbout').text(MoonConflictsTexts[MoonStars[getMoonDay() - 1].conflict - 1]);
	$$('#textPopoverDanger').text($$('#moreDangerText').text() + ": " + $$('#moreDangerSigns').text());
	app.popover.open('#popoverDangerInfo', '#getDangerInfo', true);
});

$$('#getEmotionsInfo').on('click', function () {
	trackEvent('Emotions info');	
	$$('#textPopoverEmotionsAbout').text(MoonEmotionsTexts[MoonStars[getMoonDay() - 1].recreation - 1]);
	$$('#textPopoverEmotions').text($$('#moreEmotionsText').text() + ": " + $$('#moreEmotionsSigns').text());
	app.popover.open('#popoverEmotionsInfo', '#getEmotionsInfo', true);
});

$$('#moonSignMore').on('click', function () {
	trackEvent('Moon sign info');	
	$$('#textPopoverMoonSign').text($$('#moreMoonSign').text());
	app.popover.open('#popoverMoonSignInfo', '#moonSignMore', true);
});

$$('#moonHairMore').on('click', function () {
	trackEvent('Moon hair info');	
	$$('#textPopoverMoonHairAbout').text(MoonHairTexts[MoonStars[getMoonDay() - 1].hair - 1]);
	$$('#textPopoverMoonHair').text($$('#moreMoonHairText').text());
	app.popover.open('#popoverMoonHairInfo', '#moonHairMore', true);
});

$$('#moonConceptionMore').on('click', function () {
	trackEvent('Moon conception info');	
	$$('#textPopoverMoonConceptionAbout').text(MoonConceptionTexts[MoonStars[getMoonDay() - 1].conception - 1]);
	$$('#textPopoverMoonConception').text($$('#moreMoonConceptionText').text());
	app.popover.open('#popoverMoonConceptionInfo', '#moonConceptionMore', true);
});

function getMoonDay ()
{
	var currentTime = new Date();
	// returns the month (from 0 to 11)
	var month = currentTime.getMonth() + 1;
	// returns the day of the month (from 1 to 31)
	var day = currentTime.getDate();
	// returns the year (four digits)
	var year = currentTime.getFullYear();
	var currentMoonDay = moonDate(day, month, year);
	
	return currentMoonDay;
}

$$('#fabmoon').on('click', function () {


		makeInterstitial();	
		makeBanner();
		
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

switchFABbutton();
trackEvent('FAB moon pressed');
	// Return today's date and time
var currentTime = new Date();

// returns the month (from 0 to 11)
var month = currentTime.getMonth() + 1;

// returns the day of the month (from 1 to 31)
var day = currentTime.getDate();

// returns the year (four digits)
var year = currentTime.getFullYear();

var currentMoonDay = moonDate(day, month, year);

$$('#moreCurrentMoonPhase').text(Moon.phase(year, month, day));
$$('#moonDay').text(currentMoonDay);
$$('#moreCurrentMoonDay').text(textTodayIs + currentMoonDay + textMoonDay);

document.getElementById('moreLoveStars').innerHTML = putStars(MoonStars[currentMoonDay - 1].love);
document.getElementById('moreFriendshipStars').innerHTML = putStars(MoonStars[currentMoonDay - 1].social);
document.getElementById('moreMoneyStars').innerHTML = putStars(MoonStars[currentMoonDay - 1].business);
document.getElementById('moreDangerStars').innerHTML = putStars(MoonStars[currentMoonDay - 1].conflict);
document.getElementById('moreEmotionsStars').innerHTML = putStars(MoonStars[currentMoonDay - 1].recreation);

document.getElementById('moreMoonHair').innerHTML = putStars(MoonStars[currentMoonDay - 1].hair);
document.getElementById('moreMoonConception').innerHTML = putStars(MoonStars[currentMoonDay - 1].conception);

$$('#moreMoonSign').text(textMoonInSign + getMoonInformations(new Date()).constellation);

    app.popup.open('#readMoreMoonPopup', true);
});

$$('#fabzodiac').on('click', function () {


		makeInterstitial();	
		makeBanner();
		
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

switchFABbutton();
trackEvent('FAB zodiac pressed');
	// Return today's date and time
var currentTime = new Date();

// returns the month (from 0 to 11)
var month = currentTime.getMonth() + 1;

// returns the day of the month (from 1 to 31)
var day = currentTime.getDate();

// returns the year (four digits)
var year = currentTime.getFullYear();

var currentMoonDay = moonDate(day, month, year);

$$('#moreCurrentMoonPhase').text(Moon.phase(year, month, day));
$$('#moonDay').text(currentMoonDay);
$$('#moreCurrentMoonDay').text(textTodayIs + currentMoonDay + textMoonDay);

document.getElementById('moreLoveStars').innerHTML = putStars(MoonStars[currentMoonDay - 1].love);
document.getElementById('moreFriendshipStars').innerHTML = putStars(MoonStars[currentMoonDay - 1].social);
document.getElementById('moreMoneyStars').innerHTML = putStars(MoonStars[currentMoonDay - 1].business);
document.getElementById('moreDangerStars').innerHTML = putStars(MoonStars[currentMoonDay - 1].conflict);
document.getElementById('moreEmotionsStars').innerHTML = putStars(MoonStars[currentMoonDay - 1].recreation);

document.getElementById('moreMoonHair').innerHTML = putStars(MoonStars[currentMoonDay - 1].hair);
document.getElementById('moreMoonConception').innerHTML = putStars(MoonStars[currentMoonDay - 1].conception);

$$('#moreMoonSign').text(textMoonInSign + getMoonInformations(new Date()).constellation);

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

var thisTime = new Date();


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

function putStars (number) {
	var textStars = '';
	var parsedNumber = parseInt(number);
	switch (parsedNumber) {
      case 1:
	    textStars = '<i class="icon material-icons text-color-primary">star</i><i class="icon material-icons text-color-primary">star_border</i><i class="icon material-icons text-color-primary">star_border</i><i class="icon material-icons text-color-primary">star_border</i><i class="icon material-icons text-color-primary">star_border</i>'
        break;	
      case 2:
	    textStars = '<i class="icon material-icons text-color-primary">star</i><i class="icon material-icons text-color-primary">star</i><i class="icon material-icons text-color-primary">star_border</i><i class="icon material-icons text-color-primary">star_border</i><i class="icon material-icons text-color-primary">star_border</i>'
        break;
      case 3:
	    textStars = '<i class="icon material-icons text-color-primary">star</i><i class="icon material-icons text-color-primary">star</i><i class="icon material-icons text-color-primary">star</i><i class="icon material-icons text-color-primary">star_border</i><i class="icon material-icons text-color-primary">star_border</i>'
        break;
      case 4:
	    textStars = '<i class="icon material-icons text-color-primary">star</i><i class="icon material-icons text-color-primary">star</i><i class="icon material-icons text-color-primary">star</i><i class="icon material-icons text-color-primary">star</i><i class="icon material-icons text-color-primary">star_border</i>'
        break;
      case 5:
	    textStars = '<i class="icon material-icons text-color-primary">star</i><i class="icon material-icons text-color-primary">star</i><i class="icon material-icons text-color-primary">star</i><i class="icon material-icons text-color-primary">star</i><i class="icon material-icons text-color-primary">star</i>'
        break;
}
return textStars;
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
	trackEvent('sign changed');
	trackEvent('auqarius');
    localStorage.setItem('sign', 'aquarius');
	refreshZodiac();
});
$$('#piscesMenuButton').on('click', function () {
	trackEvent('sign changed');
	trackEvent('pisces');
    localStorage.setItem('sign', 'pisces');
	refreshZodiac();
});
$$('#ariesMenuButton').on('click', function () {
	trackEvent('sign changed');
	trackEvent('aries');
    localStorage.setItem('sign', 'aries');
	refreshZodiac();
});
$$('#taurusMenuButton').on('click', function () {
	trackEvent('sign changed');
	trackEvent('taurus');
    localStorage.setItem('sign', 'taurus');
	refreshZodiac();
});
$$('#geminiMenuButton').on('click', function () {
	trackEvent('sign changed');
	trackEvent('gemini');
    localStorage.setItem('sign', 'gemini');
	refreshZodiac();	
});
$$('#cancerMenuButton').on('click', function () {
	trackEvent('sign changed');
	trackEvent('cancer');
    localStorage.setItem('sign', 'cancer');
	refreshZodiac();
});
$$('#leoMenuButton').on('click', function () {
	trackEvent('sign changed');
	trackEvent('leo');
    localStorage.setItem('sign', 'leo');
	refreshZodiac();
});
$$('#virgoMenuButton').on('click', function () {
	trackEvent('sign changed');
	trackEvent('virgo');
    localStorage.setItem('sign', 'virgo');
	refreshZodiac();
});
$$('#libraMenuButton').on('click', function () {
	trackEvent('sign changed');
	trackEvent('libra');
    localStorage.setItem('sign', 'libra');
	refreshZodiac();
});
$$('#scorpioMenuButton').on('click', function () {
	trackEvent('sign changed');
	trackEvent('scorpio');
    localStorage.setItem('sign', 'scorpio');
	refreshZodiac();
});
$$('#sagittariusMenuButton').on('click', function () {
	trackEvent('sign changed');
	trackEvent('sagittarius');
    localStorage.setItem('sign', 'sagittarius');
	refreshZodiac();
});
$$('#capricornMenuButton').on('click', function () {
	trackEvent('sign changed');
	trackEvent('capricorn');
    localStorage.setItem('sign', 'capricorn');
	refreshZodiac();
});

$$('#readMoreFABButton').on('click', function () {
		
	trackEvent('FAB pressed');
	console.log(localStorage.getItem('fabbuttonpressed'));
	switchFABbutton();

});

function switchFABbutton(){
	if(localStorage.getItem('fabbuttonpressed') == 'not pressed'){
		document.getElementById('readMoreFABButtonText').innerHTML = '<div class="material-icons text-size-44">keyboard_arrow_down</div>';
		localStorage.setItem('fabbuttonpressed', 'pressed');
	}
	else {
		localStorage.setItem('fabbuttonpressed', 'not pressed');
		updateLanguage();
	}
}

$$('#readMorePopupBackButton').on('click', function () {
	deleteBanner();
	app.popup.close('#readMorePopup', true);
});

$$('#readMoreMoonPopupBackButton').on('click', function () {
	deleteBanner();
	app.popup.close('#readMoreMoonPopup', true);
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
	
	if (localStorage.getItem('numberOfEvents'))
	{
		var eventsNumber = parseInt(localStorage.getItem('numberOfEvents'));
		eventsNumber = eventsNumber + 1;
		 localStorage.setItem('numberOfEvents', eventsNumber);
	 switch (eventsNumber) {
        case 100:
	AppRate.promptForRating();
        break;
		case 200:
	AppRate.promptForRating();
        break;
		case 300:
	AppRate.promptForRating();
        break;
							}
	}
	 else 
	 {
		 localStorage.setItem('numberOfEvents', '1');
	 }
}

function prepareAd(){
	/*
	AdMob.prepareInterstitial({
	adId: 'ca-app-pub-5186877757924020/9190888687',
	autoShow: false,
	isTesting: false
	});

	AdMob.prepareRewardVideoAd({
	adId: 'ca-app-pub-5186877757924020/3867722898',
	autoShow: false,
	isTesting: false
	}, function(){console.log("Video is ready")}, function(){console.log("Error during loading video")});
	*/
}

function makeInterstitial() {
		AdMob.prepareInterstitial({
		adId: 'ca-app-pub-5186877757924020/9190888687',
		autoShow: true,
		isTesting: false 
		});

//	    AdMob.showInterstitial();	
		
}

function makeBanner() {
		AdMob.createBanner({
		adId: 'ca-app-pub-5186877757924020/7732586337',
		position: AdMob.AD_POSITION.BOTTOM_CENTER,
		autoShow: true,
		isTesting: false  
		});

	//	AdMob.showBanner();
}

function deleteBanner() {
		AdMob.hideBanner();
		AdMob.removeBanner();
}

//normalize values to range 0...1
  function normalize(v) {
    v = v - Math.floor(v);
    if (v < 0) {
      v = v + 1;
    }
    return v;
  }




// https://github.com/giboow/mooncalc/blob/master/mooncalc.js

function getMoonInformations(date) {
    var age, // Moon's age
      distance, // Moon's distance in earth radii
      latitude, // Moon's ecliptic latitude
      longitude, // Moon's ecliptic longitude
      phase, // Moon's phase
      trajectory, // Moon's trajectory
      zodiac; // Moon's zodiac sign 

    var yy, mm, k1, k2, k3, jd;
    var ip, dp, np, rp;

    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();


    yy = year - Math.floor((12 - month) / 10);
    mm = month + 9;
    if (mm >= 12) {
      mm = mm - 12;
    }

    k1 = Math.floor(365.25 * (yy + 4712));
    k2 = Math.floor(30.6 * mm + 0.5);
    k3 = Math.floor(Math.floor((yy / 100) + 49) * 0.75) - 38;

    jd = k1 + k2 + day + 59;  // for dates in Julian calendar
    if (jd > 2299160) {
      jd = jd - k3;      // for Gregorian calendar
    }

    //calculate moon's age in days
    ip = normalize((jd - 2451550.1) / 29.530588853);
    age = ip * 29.53;

    if (age <  1.84566) {
      phase = 'NEW';
      trajectory = 'ascendent';
    } else if (age <  5.53699) {
      phase = 'Waxing crescent';
      trajectory = 'ascendent';
    } else if (age <  9.22831) {
      phase = 'First quarter';
      trajectory = 'ascendent';
    } else if (age < 12.91963) {
      phase = 'Waxing gibbous';
      trajectory = 'ascendent';
    } else if (age < 16.61096) {
      phase = 'FULL';
      trajectory = 'descendent';
    } else if (age < 20.30228) {
      phase = 'Waning gibbous';
      trajectory = 'descendent';
    } else if (age < 23.99361) {
      phase = 'Last quarter';
      trajectory = 'descendent';
    } else if (age < 27.68493) {
      phase = 'Waning crescent';
      trajectory = 'descendent';
    } else {
      phase = 'NEW';
      trajectory = 'ascendent';
    }

    ip = ip * 2 * Math.PI;  //Convert phase to radians

    // Calculate moon's distance
    dp = 2 * Math.PI * normalize((jd - 2451562.2) / 27.55454988);
    distance = 60.4 - 3.3 * Math.cos(dp) - 0.6 * Math.cos(2 * ip - dp) - 0.5 * Math.cos(2 * ip);

    // Calculate moon's ecliptic latitude
    np = 2 * Math.PI * normalize((jd - 2451565.2) / 27.212220817);
    latitude = 5.1 * Math.sin(np);

    // Calculate moon's ecliptic longitude
    rp = normalize((jd - 2451555.8) / 27.321582241);
    longitude = 360 * rp + 6.3 * Math.sin(dp) + 1.3 * Math.sin(2 * ip - dp) + 0.7 * Math.sin(2 * ip);

    if (longitude <  33.18) {
      zodiac = textPisces;
	  document.getElementById('moonSign').innerHTML = '<div class="zodiac-font center">l</div>';
	  $$('#textPopoverMoonSignAbout').text(MoonSignInfo.pisces);
    } else if (longitude <  51.16) {
      zodiac = textAries;
	  document.getElementById('moonSign').innerHTML = '<div class="zodiac-font center">a</div>';
	  $$('#textPopoverMoonSignAbout').text(MoonSignInfo.aries);
    } else if (longitude <  93.44) {
      zodiac = textTaurus;
	  document.getElementById('moonSign').innerHTML = '<div class="zodiac-font center">b</div>';
	  $$('#textPopoverMoonSignAbout').text(MoonSignInfo.taurus);
    } else if (longitude < 119.48) {
      zodiac = textGemini;
	  document.getElementById('moonSign').innerHTML = '<div class="zodiac-font center">c</div>';
	  $$('#textPopoverMoonSignAbout').text(MoonSignInfo.gemini);
    } else if (longitude < 135.30) {
      zodiac = textCancer;
	  document.getElementById('moonSign').innerHTML = '<div class="zodiac-font center">d</div>';
	  $$('#textPopoverMoonSignAbout').text(MoonSignInfo.cancer);
    } else if (longitude < 173.34) {
      zodiac = textLeo;
	  document.getElementById('moonSign').innerHTML = '<div class="zodiac-font center">e</div>';
	  $$('#textPopoverMoonSignAbout').text(MoonSignInfo.leo);
    } else if (longitude < 224.17) {
      zodiac = textVirgo;
	  document.getElementById('moonSign').innerHTML = '<div class="zodiac-font center">f</div>';
	  $$('#textPopoverMoonSignAbout').text(MoonSignInfo.virgo);
    } else if (longitude < 242.57) {
      zodiac = textLibra;
	  document.getElementById('moonSign').innerHTML = '<div class="zodiac-font center">g</div>';
	  $$('#textPopoverMoonSignAbout').text(MoonSignInfo.libra);
    } else if (longitude < 271.26) {
      zodiac = textScorpio;
	  document.getElementById('moonSign').innerHTML = '<div class="zodiac-font center">h</div>';
	  $$('#textPopoverMoonSignAbout').text(MoonSignInfo.scorpio);
    } else if (longitude < 302.49) {
      zodiac = textSagittarius;
	  document.getElementById('moonSign').innerHTML = '<div class="zodiac-font center">i</div>';
	  $$('#textPopoverMoonSignAbout').text(MoonSignInfo.sagittarius);
    } else if (longitude < 311.72) {
      zodiac = textCapricorn;
	  document.getElementById('moonSign').innerHTML = '<div class="zodiac-font center">j</div>';
	  $$('#textPopoverMoonSignAbout').text(MoonSignInfo.capricorn);
    } else if (longitude < 348.58) {
      zodiac = textAquarius;
	  document.getElementById('moonSign').innerHTML = '<div class="zodiac-font center">k</div>';
	  $$('#textPopoverMoonSignAbout').text(MoonSignInfo.aquarius);
    } else {
      zodiac = textPisces;
	  document.getElementById('moonSign').innerHTML = '<div class="zodiac-font center">l</div>';
	  $$('#textPopoverMoonSignAbout').text(MoonSignInfo.pisces);
    }

    return {
      'date' : { 'year' : year, 'month' : month , 'day' : day},
      'age' : age,
      'distance' : distance * 6371,
      'ecliptic' : {
        'latitude' : latitude,
        'longitude' : longitude
      },
      'phase' : phase,
      'trajectory' : trajectory,
      'constellation' : zodiac,
    };
  }