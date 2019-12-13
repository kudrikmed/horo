var currentLanguage = localStorage.getItem('language');
var textAquarius, textPisces, textAries, textTaurus, textGemini, textCancer, textLeo, textVirgo, textLibra, textScorpio, textSaggitarius, textCapricorn = '';
var textTodayIs, textMoonDay = '';
function updateLanguage() {
	
	currentLanguage = localStorage.getItem('language');
	
	    if (currentLanguage.indexOf("ru") > -1) {
			console.log("russian");
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
			$$('#readMoreFABButtonText').text('Далее...');
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
			
			
		};
		if (currentLanguage.indexOf("en") > -1) {
			console.log("english");
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
		};
		refreshSign();
}