var currentLanguage = localStorage.getItem('language');
var textServer = '';
var textAquarius, textPisces, textAries, textTaurus, textGemini, textCancer, textLeo, textVirgo, textLibra, textScorpio, textSaggitarius, textCapricorn = '';
var textTodayIs, textMoonDay = '';
var textNewMoon, textWaxingCrescentMoon, textQuarterMoon, textWaxingGibbousMoon, textFullMoon, textWaningGibbousMoon, textLastQuarterMoon, textWaningCrescentMoon = '';
var textFamily, textLove, textHealth;
var Signs;
var textAppName;

function updateLanguage() {
	
	currentLanguage = localStorage.getItem('language');
	
	    if (currentLanguage.indexOf("ru") > -1) {
			console.log("russian");
			// app name
			textAppName = "Гороскоп";
			// server
			textServer = 'https://synrunning.com/horo/getRus.php';
			// arrays
			Signs = ['Водолей', 'Рыбы', 'Овен', 'Телец', 'Близнецы', 'Рак', 'Лев', 'Дева', 'Весы', 'Скорпион', 'Стрелец', 'Козерог'];
			// vars
			textAquarius = 'Водолей';
			textPisces = 'Рыбы';
			textAries = 'Овен';
			textTaurus = 'Телец';
			textGemini = 'Близнецы';
			textCancer = 'Рак';
			textLeo = 'Лев';
			textVirgo = 'Дева';
			textLibra = 'Весы';
			textScorpio = 'Скорпион';
			textSaggitarius = 'Стрелец';
			textCapricorn = 'Козерог';
			textFamily = 'Семья';
			textLove = 'Любовь';
			textHealth = 'Здоровье';
			// app rate
			AppRate.preferences.useLanguage = 'ru-ru';
			// left panel
			$$('#menuLabelZodiacSign').text('Знак зодиака');
			$$('#textAquarius').text('Водолей');
			$$('#textPisces').text('Рыбы');
			$$('#textAries').text('Овен');
			$$('#textTaurus').text('Телец');
			$$('#textGemini').text('Близнецы');
			$$('#textCancer').text('Рак');
			$$('#textLeo').text('Лев');
			$$('#textVirgo').text('Дева');
			$$('#textLibra').text('Весы');
			$$('#textScorpio').text('Скорпион');
			$$('#textSaggitarius').text('Стрелец');
			$$('#textCapricorn').text('Козерог');
			// right panel
			$$('#menuLabelSettings').text('Настройки');
			$$('#notificationsMenuButton').text('Уведомления');
			$$('#languageMenuButton').text('Язык');
			$$('#ratingMenuButton').text('Оценить');
			// main
			$$('#textTodayMainCardHeader').text('Сегодня');
			$$('#shareMainCardHeader').text('Рассказать');
			$$('#cardHeaderValues').text('Числа');
			$$('#readMoreFABButtonText').text('Больше...');
			// setting
			$$('#settingsPopupTitle').text('Настройки');
			$$('#cardHeaderLanguage').text('Язык');
			$$('#textSelectLanguage').text('Выберите язык');
			$$('#cardHeaderNotifications').text('Уведомления');
			$$('#textTime').text('Время');
			$$('#textSaveAndExitButton').text('Применить');
			// more
			$$('#cardHeaderInfluence').text('Влияние сегодня');
			$$('#textMoon').text('Луна');
			$$('#moreMoonPhaseText').text('Фаза луны');
			$$('#moreMoonDayText').text('Лунные сутки');
			$$('#textMoreToday').text('Сегодня');
			$$('#moreShareToday').text('Рассказать');
			$$('#textMoreTomorrow').text('Завтра');
			$$('#moreShareTomorrow').text('Рассказать');
			$$('#moreTodayInteraction').text('Взаимодействия сегодня');
			$$('#moreLoveText').text('Любовь');
			$$('#moreFriendshipText').text('Дружба');
			$$('#moreMoneyText').text('Деньги');
			$$('#moreDangerText').text('Опасность');
			$$('#moreEmotionsText').text('Радость');
			textTodayIs = "Сегодня ";
			textMoonDay = " лунные сутки";
			// popovers
			$$('#textRuler').text('Властитель');
			$$('#textRulerAbout').text('В астрологии знаки зодиака - это определенные участки эклиптики. Символически они определяют некоторую территорию. То есть, знаки без планет - это пустая территория. Так как именно планеты в астрологии являются главными действующими лицами, то именно они и управляют этими участками - знаками зодиака. Для каждого знака есть своя главная планета-управитель. И чем сильнее в данный момент управитель, тем сильнее проявляет свое влияние знак. На бытовом уровне это проявляется уверенностью в себе, крепким здоровьем и высокой стрессоустойчивостью.');
			$$('#textDispositor').text('Изгнанник');
			$$('#textDispositorAbout').text('Не так уж много найдется людей, чувствующих себя комфортно вдали от дома. Вот и планета, находясь в знаке Зодиака, противоположном ее обители, оказывается в чужеродной среде, где все не по ней. Она как будто в чужой стране, язык и обычаи которой не понимает. Поэтому, чем дальше от своего знака планета, тем меньше ее воздействие. А на обыденном уровне этому соответствуют болезни, конфликты, неудовлетворенность жизнью.');
			// moon phases
			textNewMoon = 'Новолуние';
			textWaxingCrescentMoon = 'Ранняя растущая Луна';
			textQuarterMoon = 'Растущая Луна';
			textWaxingGibbousMoon = 'Зрелая растущая Луна';
			textFullMoon = 'Полнолуние';
			textWaningGibbousMoon = 'Ранняя убывающая Луна';
			textLastQuarterMoon = 'Убывющая Луна';
			textWaningCrescentMoon = 'Зрелая убывающая Луна';
			
			
			
			
		};
		if (currentLanguage.indexOf("en") > -1) {
			console.log("english");
			// app name
			textAppName = "Horoscope";
			// server
			textServer = 'https://synrunning.com/horo/getEng.php';
			// arrays
			Signs = ['Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Saggitarius', 'Capricorn'];
			// vars
			textAquarius = 'Aquarius';
			textPisces = 'Pisces';
			textAries = 'Aries';
			textTaurus = 'Taurus';
			textGemini = 'Gemini';
			textCancer = 'Cancer';
			textLeo = 'Leo';
			textVirgo = 'Virgo';
			textLibra = 'Libra';
			textScorpio = 'Scorpio';
			textSaggitarius = 'Saggitarius';
			textCapricorn = 'Capricorn';
			textFamily = 'Family';
			textLove = 'Love';
			textHealth = 'Health';
			// app rate
			AppRate.preferences.useLanguage = 'en-us';
			// left panel
			$$('#menuLabelZodiacSign').text('Zodiac sign');
			$$('#textAquarius').text('Aquarius');
			$$('#textPisces').text('Pisces');
			$$('#textAries').text('Aries');
			$$('#textTaurus').text('Taurus');
			$$('#textGemini').text('Gemini');
			$$('#textCancer').text('Cancer');
			$$('#textLeo').text('Leo');
			$$('#textVirgo').text('Virgo');
			$$('#textLibra').text('Libra');
			$$('#textScorpio').text('Scorpio');
			$$('#textSaggitarius').text('Saggitarius');
			$$('#textCapricorn').text('Capricorn');
			// right panel
			$$('#menuLabelSettings').text('Settings');
			$$('#notificationsMenuButton').text('Notifications');
			$$('#languageMenuButton').text('Language');
			$$('#ratingMenuButton').text('Rate app');
			// main
			$$('#textTodayMainCardHeader').text('Today');
			$$('#shareMainCardHeader').text('Share');
			$$('#cardHeaderValues').text('Values');
			$$('#readMoreFABButtonText').text('More...');
			// setting
			$$('#settingsPopupTitle').text('Settings');
			$$('#cardHeaderLanguage').text('Language');
			$$('#textSelectLanguage').text('Select language');
			$$('#cardHeaderNotifications').text('Notifications');
			$$('#textTime').text('Time');
			$$('#textSaveAndExitButton').text('Apply');
					// more
			$$('#cardHeaderInfluence').text("Today's influences");
			$$('#textMoon').text('Moon');
			$$('#moreMoonPhaseText').text('Moon phase');
			$$('#moreMoonDayText').text('Moon day');
			$$('#textMoreToday').text('Today');
			$$('#moreShareToday').text('Share');
			$$('#textMoreTomorrow').text('Tomorrow');
			$$('#moreShareTomorrow').text('Share');
			$$('#moreTodayInteraction').text("Today's interactions");
			$$('#moreLoveText').text('Love');
			$$('#moreFriendshipText').text('Friendship');
			$$('#moreMoneyText').text('Money');
			$$('#moreDangerText').text('Danger');
			$$('#moreEmotionsText').text('Joy');
			textTodayIs = "Today is ";
			textMoonDay = " moon day";
			// popovers
			$$('#textRuler').text('Ruler');
			$$('#textRulerAbout').text('The ruling planet of each zodiac sign is the archetype, or original pattern, for knowing its meaning. These are the players in the cosmic drama expressed through the zodiac signs. Planets are wanderers of the symbolic sky, with mythical stories or atmospheres of associations.');
			$$('#textDispositor').text('Dispositor');
			$$('#textDispositorAbout').text('A dispositor is a planet that rules the sign that another planet is located in. The term alludes to the conceptualization that the dispositor has some role in administering or controlling the planet that is placed in its domicile.  This is because the planet that is being disposited has to rely on the dispositor for support.');
			// moon phases
			textNewMoon = 'New Moon';
			textWaxingCrescentMoon = 'Waxing crescent Moon';
			textQuarterMoon = 'Quarter Moon';
			textWaxingGibbousMoon = 'Waxing gibbous Moon';
			textFullMoon = 'Full Moon';
			textWaningGibbousMoon = 'Waning gibbous Moon';
			textLastQuarterMoon = 'Last quarter Moon';
			textWaningCrescentMoon = 'Waning crescent Moon';
		};
		refreshZodiac();
		refreshSign();
}