/* distance to planets
https://www.johndcook.com/blog/2015/10/24/distance-to-mars/
https://keisan.casio.com/exec/system/1224746378
https://codepen.io/lulunac27/pen/NRoyxE
http://cosinekitty.com/solar_system.html
*/

// privacy policy, t&c  https://app-privacy-policy-generator.firebaseapp.com/

/* moon
https://astroonlain.ru/lunnyi-kalendar-na-kazhdyi-den
http://geocult.ru/lunnaya-astrologiya
*/

/*
natal chart
https://github.com/cyjoelchen/php-sweph
https://astrowin.org/php_scripts/index.html

https://github.com/Kibo/AstroChart
*/

/*
city with lat long
https://developers.teleport.org/api/getting_started/
https://github.com/teleport/autocomplete/blob/master/examples/basic.html
*/

/* plugins
ads https://github.com/floatinghotpot/cordova-admob-pro
flurry https://github.com/blakgeek/cordova-plugin-flurryanalytics
share https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
rate https://github.com/pushandplay/cordova-plugin-apprate
notifications https://github.com/katzer/cordova-plugin-local-notifications
version https://www.npmjs.com/package/cordova-plugin-appversion
pdf https://www.npmjs.com/package/cordova-pdf-generator
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

var Horo, TomorrowHoro, planetArray;

var	geoLocation = {
	longitude: 45,
	latitude: 45
	};

var ZodiacSigns = ['Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
var HouseNames = ['l', 'll', 'lll', 'lV', 'V', 'Vl', 'Vll', 'Vlll', 'lX', 'X', 'Xl', 'Xll'];
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
	else if ($$('#setupNatalPopup').hasClass('modal-in'))
{
	app.popup.close('#setupNatalPopup', true);
}
	else if ($$('#readMoreNatalPopup').hasClass('modal-in'))
{
	app.popup.close('#readMoreNatalPopup', true);
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

$$('#fabnatal').on('click', function () {
	switchFABbutton();
	trackEvent('FAB natal pressed');	
	
//	document.getElementById("natalDatePicker").valueAsDate = new Date();

	app.popup.open('#setupNatalPopup', true);
});

    var placeAutocompleteResults = document.querySelector('.placeAutocompleteResult');
    var appendToResult = placeAutocompleteResults.insertAdjacentHTML.bind(placeAutocompleteResults, 'afterend');
    var myTeleportAutocomplete = new TeleportAutocomplete({ el: '.natalPlacePicker', maxItems: 5, geoLocate: false});
	myTeleportAutocomplete.on('change', function(value) {	   
		geoLocation = {
		longitude: value.longitude,
		latitude: value.latitude
	   };
	   console.log(geoLocation);
      });
	
$$('#goToNatalChartFABButton').on('click', function () {
	if (document.getElementById("natalDatePicker").value && document.getElementById("idOfNatalPlacePicker").value){
	app.popup.close('#setupNatalPopup', true);
	trackEvent('GOTO natal chart pressed');	
	var myDate = new Date(document.getElementById("natalDatePicker").value);
  
	app.request.post(textServerNatal, {
       // date: '16 November 1989 22:32:00',
	      date: formatDateForNatalChart(myDate),
		  longitude: geoLocation.longitude,
		  latitude: geoLocation.latitude
    }, function (data) {
        if (data) {
			// document.getElementById('rawDataNatalChart').innerHTML = data;
			var parsedData = JSON.parse(data);
			var degreeArray = [];
			var speedArray = [];
			for (var i = 0; i < 30; i++){
				var degreeMassive = parsedData[i].split(", ");
				var degree = degreeMassive[1];
				degreeArray[i] = degree;
		}
			
			for (var i = 0; i < 14; i++){
				var speedMassive = parsedData[i].split(", ");
				var speed = speedMassive[2];
				speedArray[i] = speed;
		}
		
		    planetsArray = {
			Sun: {
				degree: parseFloat(degreeArray[0]),
				speed: parseFloat(speedArray[0]),
				sign: calculateSignByDegree(parseFloat(degreeArray[0])),
				signNumber: calculateSignNumberByDegree(parseFloat(degreeArray[0]))
			},
			Moon: {
				degree: parseFloat(degreeArray[1]),
				speed: parseFloat(speedArray[1]),
				sign: calculateSignByDegree(parseFloat(degreeArray[1])),
				signNumber: calculateSignNumberByDegree(parseFloat(degreeArray[1]))
			},
			Mercury: {
				degree: parseFloat(degreeArray[2]),
				speed: parseFloat(speedArray[2]),
				sign: calculateSignByDegree(parseFloat(degreeArray[2])),
				signNumber: calculateSignNumberByDegree(parseFloat(degreeArray[2]))
			},
			Venus: {
				degree: parseFloat(degreeArray[3]),
				speed: parseFloat(speedArray[3]),
				sign: calculateSignByDegree(parseFloat(degreeArray[3])),
				signNumber: calculateSignNumberByDegree(parseFloat(degreeArray[3]))
			},
			Mars: {
				degree: parseFloat(degreeArray[4]),
				speed: parseFloat(speedArray[4]),
				sign: calculateSignByDegree(parseFloat(degreeArray[4])),
				signNumber: calculateSignNumberByDegree(parseFloat(degreeArray[4]))
			},
			Jupiter: {
				degree: parseFloat(degreeArray[5]),
				speed: parseFloat(speedArray[5]),
				sign: calculateSignByDegree(parseFloat(degreeArray[5])),
				signNumber: calculateSignNumberByDegree(parseFloat(degreeArray[5]))
			},
			Saturn: {
				degree: parseFloat(degreeArray[6]),
				speed: parseFloat(speedArray[6]),
				sign: calculateSignByDegree(parseFloat(degreeArray[6])),
				signNumber: calculateSignNumberByDegree(parseFloat(degreeArray[6]))
			},
			Uranus: {
				degree: parseFloat(degreeArray[7]),
				speed: parseFloat(speedArray[7]),
				sign: calculateSignByDegree(parseFloat(degreeArray[7])),
				signNumber: calculateSignNumberByDegree(parseFloat(degreeArray[7]))
			},
			Neptune: {
				degree: parseFloat(degreeArray[8]),
				speed: parseFloat(speedArray[8]),
				sign: calculateSignByDegree(parseFloat(degreeArray[8])),
				signNumber: calculateSignNumberByDegree(parseFloat(degreeArray[8]))
			},
			Pluto: {
				degree: parseFloat(degreeArray[9]),
				speed: parseFloat(speedArray[9]),
				sign: calculateSignByDegree(parseFloat(degreeArray[9])),
				signNumber: calculateSignNumberByDegree(parseFloat(degreeArray[9]))
			},
			Chiron: {
				degree: parseFloat(degreeArray[10]),
				speed: parseFloat(speedArray[10]),
				sign: calculateSignByDegree(parseFloat(degreeArray[10])),
				signNumber: calculateSignNumberByDegree(parseFloat(degreeArray[10]))
			},
			meanApogee: {
				degree: parseFloat(degreeArray[11]),
				speed: parseFloat(speedArray[11]),
				sign: calculateSignByDegree(parseFloat(degreeArray[11])),
				signNumber: calculateSignNumberByDegree(parseFloat(degreeArray[11]))
			},
			meanNode: {
				degree: parseFloat(degreeArray[12]),
				speed: parseFloat(speedArray[12]),
				sign: calculateSignByDegree(parseFloat(degreeArray[12])),
				signNumber: calculateSignNumberByDegree(parseFloat(degreeArray[12]))
			},
			trueNode: {
				degree: parseFloat(degreeArray[13]),
				speed: parseFloat(speedArray[13]),
				sign: calculateSignByDegree(parseFloat(degreeArray[13])),
				signNumber: calculateSignNumberByDegree(parseFloat(degreeArray[13]))
			},
			house1: {
				degree: parseFloat(degreeArray[14]),
			},
			house2: {
				degree: parseFloat(degreeArray[15]),
			},
			house3: {
				degree: parseFloat(degreeArray[16]),
			},
			house4: {
				degree: parseFloat(degreeArray[17]),
			},
			house5: {
				degree: parseFloat(degreeArray[18]),
			},
			house6: {
				degree: parseFloat(degreeArray[19]),
			},
			house7: {
				degree: parseFloat(degreeArray[20]),
			},
			house8: {
				degree: parseFloat(degreeArray[21]),
			},
			house9: {
				degree: parseFloat(degreeArray[22]),
			},
			house10: {
				degree: parseFloat(degreeArray[23]),
			},
			house11: {
				degree: parseFloat(degreeArray[24]),
			},
			house12: {
				degree: parseFloat(degreeArray[25]),
			},
			Ascendant: {
				degree: parseFloat(degreeArray[26]),
				sign: calculateSignByDegree(parseFloat(degreeArray[26])),
				signNumber: calculateSignNumberByDegree(parseFloat(degreeArray[26]))
			},
			MC: {
				degree: parseFloat(degreeArray[27]),
				sign: calculateSignByDegree(parseFloat(degreeArray[27])),
				signNumber: calculateSignNumberByDegree(parseFloat(degreeArray[27]))
			},
			ARMC: {
				degree: parseFloat(degreeArray[28]),
				sign: calculateSignByDegree(parseFloat(degreeArray[28])),
				signNumber: calculateSignNumberByDegree(parseFloat(degreeArray[28]))
			},
			Vertex: {
				degree: parseFloat(degreeArray[29]),
				sign: calculateSignByDegree(parseFloat(degreeArray[29])),
				signNumber: calculateSignNumberByDegree(parseFloat(degreeArray[29]))
			}
		}		
			console.log(planetsArray);
			/*
			var physicalScreenWidth = window.screen.width * window.devicePixelRatio;
			console.log(physicalScreenWidth);
			*/
			document.getElementById('pictureNatalChart').innerHTML = '';
			var chart = new astrology.Chart( 'pictureNatalChart', 300, 300);
			
			var radix = chart.radix(
			{
			"planets":{"Moon":[planetsArray.Moon.degree], "Sun":[planetsArray.Sun.degree], "Mercury":[planetsArray.Mercury.degree], "Lilith":[planetsArray.meanApogee.degree], "Chiron":[planetsArray.Chiron.degree], "Pluto":[planetsArray.Pluto.degree], "Neptune":[planetsArray.Neptune.degree], "Uranus":[planetsArray.Uranus.degree], "Saturn":[planetsArray.Saturn.degree], "Jupiter":[planetsArray.Jupiter.degree], "Mars":[planetsArray.Mars.degree], "Venus":[planetsArray.Venus.degree], "NNode":[planetsArray.meanNode.degree], "As":[planetsArray.Ascendant.degree]},
			"cusps":[planetsArray.Ascendant.degree, planetsArray.Ascendant.degree + 30, planetsArray.Ascendant.degree + 60, planetsArray.Ascendant.degree + 90, planetsArray.Ascendant.degree + 120, planetsArray.Ascendant.degree + 150, planetsArray.Ascendant.degree + 180, planetsArray.Ascendant.degree + 210, planetsArray.Ascendant.degree + 240, planetsArray.Ascendant.degree + 270, planetsArray.Ascendant.degree + 300, planetsArray.Ascendant.degree + 330]	
			});
			
			radix.addPointsOfInterest( {"As":[planetsArray.Ascendant.degree],"Ic":[360 - planetsArray.MC.degree],"Ds":[360 - planetsArray.Ascendant.degree],"Mc":[planetsArray.MC.degree]});
			radix.aspects();
			
			console.log("Градус Асценданта " + planetsArray.Ascendant.degree);
			console.log("Солнце в доме " + calculateHouseByDegree(planetsArray.Sun.degree, planetsArray.Ascendant.degree) + ", Градус Солнца " + planetsArray.Sun.degree);
			console.log("Луна в доме " + calculateHouseByDegree(planetsArray.Moon.degree, planetsArray.Ascendant.degree) + ", Градус Луны " + planetsArray.Moon.degree);
			console.log("Венера в доме " + calculateHouseByDegree(planetsArray.Venus.degree, planetsArray.Ascendant.degree) + ", Градус Венеры " + planetsArray.Venus.degree);
			console.log("Марс в доме " + calculateHouseByDegree(planetsArray.Mars.degree, planetsArray.Ascendant.degree) + ", Градус Марса " + planetsArray.Mars.degree);
			console.log("Узел Луны в доме " + calculateHouseByDegree(planetsArray.meanNode.degree, planetsArray.Ascendant.degree) + ", Градус Узла " + planetsArray.meanNode.degree);
			console.log("Лилит в доме " + calculateHouseByDegree(planetsArray.meanApogee.degree, planetsArray.Ascendant.degree) + ", Градус Лилит " + planetsArray.meanApogee.degree);
			
			$$('#textSunNatalInSign').text(Planets[0] + createCardNameInNatalChart(planetsArray.Sun.sign));
			$$('#sunNatalContent').text(SunInZodiacNatal[planetsArray.Sun.signNumber]);
			
			$$('#textAscendantNatalInSign').text(Planets[12] + createCardNameInNatalChart(planetsArray.Ascendant.sign));
			$$('#ascendantNatalContent').text(AscendantInZodiacNatal[planetsArray.Ascendant.signNumber]);
			
			$$('#textMoonNatalInSign').text(Planets[1] + createCardNameInNatalChart(planetsArray.Moon.sign));
			$$('#moonNatalContent').text(MoonInZodiacNatal[planetsArray.Moon.signNumber]);
			
			$$('#textMercuryNatalInSign').text(Planets[2] + createCardNameInNatalChart(planetsArray.Mercury.sign));
			$$('#mercuryNatalContent').text(MercuryInZodiacNatal[planetsArray.Mercury.signNumber]);
			
			$$('#textVenusNatalInSign').text(Planets[3] + createCardNameInNatalChart(planetsArray.Venus.sign));
			$$('#venusNatalContent').text(VenusInZodiacNatal[planetsArray.Venus.signNumber]);
			
			$$('#textMarsNatalInSign').text(Planets[4] + createCardNameInNatalChart(planetsArray.Mars.sign));
			$$('#marsNatalContent').text(MarsInZodiacNatal[planetsArray.Mars.signNumber]);
			
			$$('#textJupiterNatalInSign').text(Planets[5] + createCardNameInNatalChart(planetsArray.Jupiter.sign));
			$$('#jupiterNatalContent').text(JupiterInZodiacNatal[planetsArray.Jupiter.signNumber]);
			
			$$('#textSaturnNatalInSign').text(Planets[6] + createCardNameInNatalChart(planetsArray.Saturn.sign));
			$$('#saturnNatalContent').text(SaturnInZodiacNatal[planetsArray.Saturn.signNumber]);
			
			$$('#textUranusNatalInSign').text(Planets[7] + createCardNameInNatalChart(planetsArray.Uranus.sign));
			$$('#uranusNatalContent').text(UranusInZodiacNatal[planetsArray.Uranus.signNumber]);
			
			$$('#textNeptuneNatalInSign').text(Planets[8] + createCardNameInNatalChart(planetsArray.Neptune.sign));
			$$('#neptuneNatalContent').text(NeptuneInZodiacNatal[planetsArray.Neptune.signNumber]);
			
			$$('#textPlutoNatalInSign').text(Planets[9] + createCardNameInNatalChart(planetsArray.Pluto.sign));
			$$('#plutoNatalContent').text(PlutoInZodiacNatal[planetsArray.Pluto.signNumber]);
			
			$$('#textChironNatalInSign').text(Planets[10] + createCardNameInNatalChart(planetsArray.Chiron.sign));
			$$('#chironNatalContent').text(ChironInZodiacNatal[planetsArray.Chiron.signNumber]);
			
			$$('#textLilithNatalInSign').text(Planets[11] + createCardNameInNatalChart(planetsArray.meanApogee.sign));
			$$('#lilithNatalContent').text(LilithInZodiacNatal[planetsArray.meanApogee.signNumber]);
			
			$$('#textNodeNatalInSign').text(Planets[13] + createCardNameInNatalChart(planetsArray.trueNode.sign));
			$$('#nodeNatalContent').text(NorthNodeInZodiacNatal[planetsArray.trueNode.signNumber]);			
			
			
			};
			
    }, function () { console.log('Error during loading natal chart') });
	

		
			
	
	app.popup.open('#readMoreNatalPopup', true);
	}
	else {
		navigator.notification.alert(textPleaseFillData, function(){console.log('Fields format error')}, textAlert, textContinue);
	}
});

$$('#saveNatalCardAsPDF').on('click', function () {
		
		pdf.fromData( document.getElementById('readMoreNatalPopup').innerHTML,       
			// options
			{
                documentSize: 'A4',
                type: 'share',
                fileName: 'myFile.pdf'
              })
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

function formatDateForNatalChart(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hour + ':' + minute + ':' + second;
}

function calculateSignByDegree (degree)
{
	var degree = degree;
	if (degree <= 30)
	{
		return ZodiacSigns[2];
	}
	else if (degree >30 && degree <= 60)
	{
		return ZodiacSigns[3];
	}
	else if (degree >60 && degree <= 90)
	{
		return ZodiacSigns[4];
	}
	else if (degree >90 && degree <= 120)
	{
		return ZodiacSigns[5];
	}
	else if (degree >120 && degree <= 150)
	{
		return ZodiacSigns[6];
	}
	else if (degree >150 && degree <= 180)
	{
		return ZodiacSigns[7];
	}
	else if (degree >180 && degree <= 210)
	{
		return ZodiacSigns[8];
	}
	else if (degree >210 && degree <= 240)
	{
		return ZodiacSigns[9];
	}
	else if (degree >240 && degree <= 270)
	{
		return ZodiacSigns[10];
	}
	else if (degree >270 && degree <= 300)
	{
		return ZodiacSigns[11];
	}
	else if (degree >300 && degree <= 330)
	{
		return ZodiacSigns[0];
	}
	else if (degree >330)
	{
		return ZodiacSigns[1];
	}
};

function calculateSignNumberByDegree (degree)
{
	var degree = degree;
	if (degree <= 30)
	{
		return 2;
	}
	else if (degree >30 && degree <= 60)
	{
		return 3;
	}
	else if (degree >60 && degree <= 90)
	{
		return 4;
	}
	else if (degree >90 && degree <= 120)
	{
		return 5;
	}
	else if (degree >120 && degree <= 150)
	{
		return 6;
	}
	else if (degree >150 && degree <= 180)
	{
		return 7;
	}
	else if (degree >180 && degree <= 210)
	{
		return 8;
	}
	else if (degree >210 && degree <= 240)
	{
		return 9;
	}
	else if (degree >240 && degree <= 270)
	{
		return 10;
	}
	else if (degree >270 && degree <= 300)
	{
		return 11;
	}
	else if (degree >300 && degree <= 330)
	{
		return 0;
	}
	else if (degree >330)
	{
		return 1;
	}
};

function calculateHouseByDegree (degree, ascendantDegree)
{
	var planetDegree = degree;
	var ascendantDegree = ascendantDegree;
	
	var realPlanetDegree = planetDegree - ascendantDegree;
	if (realPlanetDegree < 0){
		realPlanetDegree = realPlanetDegree + 360;
	}

	if (realPlanetDegree > 0 && realPlanetDegree <= 30)
	{
		return HouseNames[0];
	}
	else if (realPlanetDegree > 30 && realPlanetDegree <= 60)
	{
		return HouseNames[1];
	}
	else if (realPlanetDegree > 60 && realPlanetDegree <= 90)
	{
		return HouseNames[2];
	}
	else if (realPlanetDegree > 90 && realPlanetDegree <= 120)
	{
		return HouseNames[3];
	}
	else if (realPlanetDegree > 120 && realPlanetDegree <= 150)
	{
		return HouseNames[4];
	}
	else if (realPlanetDegree > 150 && realPlanetDegree <= 180)
	{
		return HouseNames[5];
	}
	else if (realPlanetDegree > 180 && realPlanetDegree <= 210)
	{
		return HouseNames[6];
	}
	else if (realPlanetDegree > 210 && realPlanetDegree <= 240)
	{
		return HouseNames[7];
	}
	else if (realPlanetDegree > 240 && realPlanetDegree <= 270)
	{
		return HouseNames[8];
	}
	else if (realPlanetDegree > 270 && realPlanetDegree <= 300)
	{
		return HouseNames[9];
	}
	else if (realPlanetDegree > 300 && realPlanetDegree <= 330)
	{
		return HouseNames[10];
	}
	else if (realPlanetDegree > 330 && realPlanetDegree <= 360)
	{
		return HouseNames[11];
	}
	else 
	{
		return "House defining error";
	}
};

function calculateHouseNumberByDegree (degree, ascendantDegree)
{
	var planetDegree = degree;
	var ascendantDegree = ascendantDegree;
	
	var realPlanetDegree = planetDegree - ascendantDegree;
	if (realPlanetDegree < 0){
		realPlanetDegree = realPlanetDegree + 360;
	}

	if (realPlanetDegree > 0 && realPlanetDegree <= 30)
	{
		return 0;
	}
	else if (realPlanetDegree > 30 && realPlanetDegree <= 60)
	{
		return 1;
	}
	else if (realPlanetDegree > 60 && realPlanetDegree <= 90)
	{
		return 2;
	}
	else if (realPlanetDegree > 90 && realPlanetDegree <= 120)
	{
		return 3;
	}
	else if (realPlanetDegree > 120 && realPlanetDegree <= 150)
	{
		return 4;
	}
	else if (realPlanetDegree > 150 && realPlanetDegree <= 180)
	{
		return 5;
	}
	else if (realPlanetDegree > 180 && realPlanetDegree <= 210)
	{
		return 6;
	}
	else if (realPlanetDegree > 210 && realPlanetDegree <= 240)
	{
		return 7;
	}
	else if (realPlanetDegree > 240 && realPlanetDegree <= 270)
	{
		return 8;
	}
	else if (realPlanetDegree > 270 && realPlanetDegree <= 300)
	{
		return 9;
	}
	else if (realPlanetDegree > 300 && realPlanetDegree <= 330)
	{
		return 10;
	}
	else if (realPlanetDegree > 330 && realPlanetDegree <= 360)
	{
		return 11;
	}
	else 
	{
		return "House defining error";
	}
};

function createCardNameInNatalChart (sign)
{
	var sign = sign;
	for(var i = 0; i<SignsInEnglish.length; i++)
	{
		if (sign == SignsInEnglish[i])
		{
			return PlanetsInSigns[i];
		}
	}
}

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

$$('#setupNatalPopupBackButton').on('click', function () {
	app.popup.close('#setupNatalPopup', true);
});

$$('#readMoreMoonPopupBackButton').on('click', function () {
	deleteBanner();
	app.popup.close('#readMoreMoonPopup', true);
});

$$('#readMoreNatalPopupBackButton').on('click', function () {
	deleteBanner();
	app.popup.close('#readMoreNatalPopup', true);
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
	/*
		AdMob.createBanner({
		adId: 'ca-app-pub-5186877757924020/7732586337',
		position: AdMob.AD_POSITION.BOTTOM_CENTER,
		autoShow: true,
		isTesting: false  
		});
	*/
}

function deleteBanner() {
	/*
		AdMob.hideBanner();
		AdMob.removeBanner();
	*/	
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