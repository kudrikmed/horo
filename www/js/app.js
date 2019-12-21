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
notifications https://github.com/katzer/cordova-plugin-local-notifications
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

if (localStorage.getItem('firstStart') != 'no') {
	
	localStorage.setItem('language', navigator.language);
	localStorage.setItem('sign', 'aries');
	localStorage.setItem('notifications', true);
	localStorage.setItem('notificationTime', '9:00');
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
	
setNotifications();
	
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

if (localStorage.getItem('notificationTime'))
{
	document.getElementById('timePicker').value = localStorage.getItem('notificationTime');
}
else
{
	document.getElementById('timePicker').value = "9:00";
}

setNotifications();
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
	setNotifications();
    app.popup.close('#settingsPopup', true);
});

function setNotifications() {
	
	if (localStorage.getItem('notifications') == true){
	var time = document.getElementById("timePicker").value;
	var hours = time.split(":")[0];
    var minutes = time.split(":")[1];
	
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
	var fullShareMessage = textHoroForToday + ". " + $$('#readMorePopupTitle').text() + ". " + textMessageShareResult;
	
	var shareResult = {
    message: fullShareMessage, // not supported on some apps (Facebook, Instagram)
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
	var fullShareMessage = textHoroForTomorrow + ". " + $$('#readMorePopupTitle').text() + ". " + textMessageShareResult;
	
	var shareResult = {
    message: fullShareMessage, // not supported on some apps (Facebook, Instagram)
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

var currentMoonDay = moonDate(day, month, year);

$$('#moreCurrentMoonPhase').text(Moon.phase(year, month, day));
$$('#moonDay').text(currentMoonDay);
$$('#moreCurrentMoonDay').text(textTodayIs + currentMoonDay + textMoonDay);

document.getElementById('moreLoveStars').innerHTML = putStars(MoonStars[currentMoonDay - 1].love);
document.getElementById('moreFriendshipStars').innerHTML = putStars(MoonStars[currentMoonDay - 1].social);
document.getElementById('moreMoneyStars').innerHTML = putStars(MoonStars[currentMoonDay - 1].business);
document.getElementById('moreDangerStars').innerHTML = putStars(MoonStars[currentMoonDay - 1].conflict);
document.getElementById('moreEmotionsStars').innerHTML = putStars(MoonStars[currentMoonDay - 1].recreation);

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

