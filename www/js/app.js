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

var smartSelect;

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
        return 'new-moon';
        break;
      case 1:
        return 'waxing-crescent-moon';
        break;
      case 2:
        return 'quarter-moon';
        break;
      case 3:
        return 'waxing-gibbous-moon';
        break;
      case 4:
        return 'full-moon';
        break;
      case 5:
        return 'waning-gibbous-moon';
        break;
      case 6:
        return 'last-quarter-moon';
        break;
      case 7:
        return 'waning-crescent-moon';
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
	
	app.panel.open('left', true);
//  localStorage.setItem('firstStart', 'no');
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

$$('#readMoreFABButton').on('click', function () {
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
	refreshSign();
});
$$('#piscesMenuButton').on('click', function () {
    localStorage.setItem('sign', 'pisces');
	refreshSign();
});
$$('#ariesMenuButton').on('click', function () {
    localStorage.setItem('sign', 'aries');
	refreshSign();
});
$$('#taurusMenuButton').on('click', function () {
    localStorage.setItem('sign', 'taurus');
	refreshSign();
});
$$('#geminiMenuButton').on('click', function () {
    localStorage.setItem('sign', 'gemini');	
	refreshSign();
});
$$('#cancerMenuButton').on('click', function () {
    localStorage.setItem('sign', 'cancer');
	refreshSign();
});
$$('#leoMenuButton').on('click', function () {
    localStorage.setItem('sign', 'leo');
	refreshSign();
});
$$('#virgoMenuButton').on('click', function () {
    localStorage.setItem('sign', 'virgo');
	refreshSign();
});
$$('#libraMenuButton').on('click', function () {
    localStorage.setItem('sign', 'libra');
	refreshSign();
});
$$('#scorpioMenuButton').on('click', function () {
    localStorage.setItem('sign', 'scorpio');
	refreshSign();
});
$$('#saggitariusMenuButton').on('click', function () {
    localStorage.setItem('sign', 'saggitarius');
	refreshSign();
});
$$('#capricornMenuButton').on('click', function () {
    localStorage.setItem('sign', 'capricorn');
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

function refreshSign () {
	var sign = localStorage.getItem('sign');
	switch(sign){
		case 'aquarius':
		$$('#navbarTitleText').text(textAquarius);
		$$('#readMorePopupTitle').text(textAquarius);
		break;
		case 'pisces':
		$$('#navbarTitleText').text(textPisces);
		$$('#readMorePopupTitle').text(textPisces);
		break;
	}
};