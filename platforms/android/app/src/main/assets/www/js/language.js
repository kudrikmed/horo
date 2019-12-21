var currentLanguage = localStorage.getItem('language');
var textServer = '';
var textAquarius, textPisces, textAries, textTaurus, textGemini, textCancer, textLeo, textVirgo, textLibra, textScorpio, textSaggitarius, textCapricorn = '';
var textTodayIs, textMoonDay = '';
var textNewMoon, textWaxingCrescentMoon, textQuarterMoon, textWaxingGibbousMoon, textFullMoon, textWaningGibbousMoon, textLastQuarterMoon, textWaningCrescentMoon = '';
var textFamily, textLove, textHealth;
var Signs;
var textAppName;
var MoonPhases, MoonDays, MoonStars, MoonConflictsTexts, MoonLoveTexts, MoonFriendshipTexts, MoonMoneyTexts, MoonEmotionsTexts;
var textHoroForToday, textHoroForTomorrow = '';
var textNotificationTitle;

function updateLanguage() {
	
	currentLanguage = localStorage.getItem('language');
	
	    if (currentLanguage.indexOf("ru") > -1) {
			console.log("russian");
			// selector
			smartSelect.setValue('rus');
			// app name
			textAppName = "Гороскоп";
			// server
			textServer = 'https://astrohoro.site/service/getRus.php';
			// arrays
			Signs = ['Водолей', 'Рыбы', 'Овен', 'Телец', 'Близнецы', 'Рак', 'Лев', 'Дева', 'Весы', 'Скорпион', 'Стрелец', 'Козерог'];
			MoonPhases = [
			'Новолуние влияет на человека в течение нескольких дней. В этот период люди ощущают подавленность, нервное истощение, что часто сопровождается головными болями. Во время новолуния жидкость быстрее выводится из организма, ускоряется обмен веществ.В этот период чаще наблюдаются нарушения психики, проявления различных фобий и маний. Не рекомендуется начинать что-то новое, крайне нежелательны встречи с подозрительными людьми.',
			'Первая четверть - фаза - соответствует весне по солнечному календарю и означает начало всего нового. В течение этой фазы мозг у человека становится очень активным. Все планы, намеченные в этот период, будут предельно четкими, продуманными и непременно принесут удачу. Повышается общая активность и стремление творить, но проявлять спешку не стоит, - лучше все обдумать, рассчитать и, не спеша, приступить к выполнению плана.',
			'Соответствует лету по Солнечному календарю. Это самый продуктивный период, вемя наполнения энергией. Вторая фаза Луны лучше всего подходит для смены места работы, путешествий, общественных выступлений.',
			'Период полной Луны – самое оптимальное время для осуществления дружеских встреч, совершения рискованных дел, подписания любых контрактов и соглашений. Все будет складываться как нельзя лучше, но из-за такой активности нервной системы и всего организма в целом, у человека могут начаться проблемы со сном. Однако здесь есть свои плюсы. В такие моменты самое время наладить интимную жизнь между партнерами. Если супружеская жизнь не клеиться – Полнолуние отличный шанс все исправить.',
			'Период уравновешенной деятельности и зрелости, соответствует осени. Эта фаза Луны хорошо подходит для завершения дел, а вот новые можно начинать только в том случае, если они завершатся до новолуния. В этот период расходуется энергия, а аппетит снижается. Поэтому рекомендуется начинать борьбу с лишним весом и целлюлитом именно в это время.',
			'Эта фаза называется ущербная или убывающая Луна. Это время, когда наступает лунная зима. Человек больше устает, становится малоподвижным, медлительным и вялым. Идет накопление усталости, снижается иммунитет. Во время четвертой лунной фазы не стоит вести какие-то активные действия — они не принесут результата.'
			]
			MoonDays = ['Первый лунный день – это основа для всего лунного месяца. Он несет только позитивную энергию – большой шанс исполнения заветных желаний, реализации планов и задумок, а также признания в своей любви к кому-то, – чувство будет взаимным. Этот ясный и чистый день необходимо провести в спокойной и тихой обстановке, вспомнив свое детство, проанализировав настоящие поступки, и построить планы на будущее. В первые лунные сутки нужно очиститься от всего плохого – простить обидчиков, попросить прощения у тех, кого, возможно, обидели словом или действием, наладить испортившиеся по какой-то причине отношения с близкими людьми, а также изгнать из своей головы темные мысли мщения недругам.',
			'Это стартовый день, поэтому в первой половине дня можно продолжать планирование тех же дел, что и в предыдущие сутки, но остерегаясь посвящать других в свои задумки – может отрицательно отразиться на их реализации во второй половине дня. В послеобеденное время растет работоспособность и активизируется практическая и научная деятельность – благодатная почва для осуществления намеченного накануне. Этот день идеально подходит для получения новых знаний в любой научной области.',
			'Этот день пройдет под знаком активной борьбы и агрессивности, особенно первая половина суток. Под влиянием лунных третьих суток меланхолики станут более уязвимы и впечатлительны на фоне астральных атак. Им будет казаться, что вокруг них плетут интриги и строят коварные планы. Чтобы не пострадать, необходимо быть готовым постоять за себя. Во второй половине дня негативная энергия пойдет на спад.',
			'Этот день довольно неоднозначный: с одной стороны – он несет положительную энергетику, а с другой – отрицательную, так как в нем есть зло, поэтому его можно назвать пассивным и не совсем благоприятным. В этот день многих преследует чувство неудовлетворенности от совершенных дел. Во второй половине лунного дня возможны конфликты, снижение настроения.',
			'Пятые лунные сутки связаны с кардинальными жизненными переменами, поэтому рекомендуется планировать и определяться со своими целями, опираясь на уже полученные возможности – поиск новых ни к чему не приведет. В этот день Фортуна будет на стороне тех, кто привык, прежде чем действовать, взвешивать все «за» и «против», от ветреных особ, скорее всего, она отвернется. В эти лунные сутки не стоит совершать злые поступки и брать на себя неприятности близких – все происходящее нужно принять как данность.',
			'Шестые лунные сутки – идеальное время для умственных и духовных поисков, а также для различных научных исследований. Сегодня лучше отказаться от активных действий – вести спокойный образ жизни. В этот день не стоит ждать каких-либо неожиданностей.',
			'В седьмые лунные сутки энергия продолжает наполнять организм с неиссякаемой силой. Кажется, что нет ничего невозможного, так что этой активности просто необходимо направление в нужное плодотворное русло. Сегодня нужно быть осторожнее со словами, не бросать их на ветер, потому что они могут быть восприняты мирозданием чересчур буквально.',
			'Восьмые лунные сутки – время поступать решительно и твердо, время каяться в неблаговидных поступках и прощать грехи, забывать давние обиды, время очиститься с помощью огня. То, что не было решено и закончено, потребует скорейшего завершения, иначе так и будет лежать на душе мертвым грузом. В этот лунный день может случиться что-то совершенно непредвиденное. Если кто спланировал поездку или долгожданное путешествие, да и обычную служебную командировку, – это превосходный момент. Как и для перестановки в доме и планирования своего жилья.',
			'У девятого лунного дня есть перспектива стать опасным, поскольку он излучает отрицательное энергетическое влияние. День считается темным, «сатанинским», потому следует минимизировать присутствие в жизни любого внешнего зла, чтобы оно не повлияло на ваш внутренний мир. Обольщения и обманы, иллюзии и заблуждения наполняют этот нестабильный тревожный период.',
			'Этот день благоприятствует любым начинаниям, всему новому, всем созидательным процессам. Это день пожертвований, день трансформации внутренней природы, связанный с выходом человека на собственный путь, с включением кармической памяти. Происходит выход на тайные источники знаний. Рекомендуется заглянуть в себя, чтобы понять прошлое и настоящее, обеспечить выполнение своей кармической задачи. Десятый лунный день хорош для начала любого дела, для примирения, завершения домашних конфликтов и размолвок, для встреч с родственниками.',
			'День излучает очень сильную энергетику, он считается одним из самых мощных дней лунного месяца. Любые дела, начатые в этот день, обязательно нужно довести до конца. Не рекомендуется проявлять пассивность и вести сидячий образ жизни. Необходима осторожность и внимательность во всех делах, желательно не брать в руки колющие и режущие предметы, даже хлеб лучше ломать руками. Об опасности в одиннадцатый лунный день предупреждают падающие ножи и вилки.',
			'Это день сострадания, милосердия, энергии любви к ближнему. В это время рекомендуется дарить подарки, подавать милостыню, особенно, если об этом просят. Не следует сердиться и ненавидеть, скандалить и ссориться, поскольку помириться потом будет очень трудно. Это время сознательного уединения, внимательности к себе, успокоения, победы мудрости над чувствами. Не следует жалеть себя и жаловаться на жизнь - в таком состоянии можно остаться надолго. В двенадцатый лунный день нельзя предпринимать новые дела, так как все они принесут только потери.',
			'В этот день дают о себе знать старые проблемы, а многие ситуации из прошлого могут повторяться. Чтобы освободиться от груза прошлого, не нужно тратить время на изучение бесполезной информации, - она лишь загромождает разум и мешает сделать правильный выбор даже там, где он очевиден. Новые важные дела начинать не следует, лучше отложить их реализацию на более благоприятное время.',
			'Время активных и решительных действий. В этот день не следует распыляться на мелочи, - нужно уделить внимание одному самому важному вопросу или проблеме, поскольку дела, начатые в этот день, всегда удаются. Этот день - сильный и мощный, он является одним из самых счастливых дней месяца. Нужно обращать внимание на знаки, сигналы и приметы, приходящие к вам. Следует внимательно прислушиваться к советам, которые вам дают. Даже рекомендации незнакомых людей в этот день могут быть полезными.',
			'Люди в пятнадцатый лунный день психически уязвимы, поскольку в этот период активизируются темные силы. Это критический день перед полнолунием, когда особенно сильно проявляется внутреннее начало каждого человека, поддающееся земным соблазнам. В этот день нужно защитить себя, практиковать любые формы аскетизма. Никаких важных дел в этот день начинать не рекомендуется. Плохим знаком этого дня является ссора. Нельзя поддаваться азарту: играть в тотализаторе, в казино, в карты.',
			'Это день справедливости и очищения, день гармонии между духовным и физическим телами. Рекомендуются любые дела, способствующие гармонии. Считается, что грубость, крик, бесцеремонное поведение недопустимы в этот период. Следует соблюдать спокойствие, не нарушать никакими поступками внутреннего комфорта и мира в душе, поскольку главное в эти лунные сутки - умеренность. Шестнадцатый лунный день - это время, когда злобность и агрессивность, зависть и ненависть приводят к тяжелым последствиям.',
			'Эти лунные сутки являются временем накопления, плодородности, радости и внутренней свободы. Это лучший день для праздников и торжеств, на которых нельзя быть скучным и невеселым. Наиболее яркая характеристика этого периода — любовь, но не следует терять голову и осторожность: из-за неконтролируемых энергий он содержит в себе много неожиданностей. Семнадцатый лунный день желательно провести как день контактов, веселья и раскрепощения. Но результаты этого дня могут быть очень разными: на высшем уровне - выход к познанию идеальной любви, на низшем - буйство и распущенность. День не принесет удачи одиночкам, эгоистам, скучным и замкнутым людям.',
			'Энергетика этого дня склоняет человека к пассивности. Возрастает опасность поддаться чужому влиянию, начать следовать чужим мыслям. Этот период может стать днем коварных обманов и обольщений, масок и интриг. Люди, сами того не желая, могут подводить друг друга. Рекомендуется следить за своими негативными привычками и мыслями, отказаться от эгоизма и тщеславия, иллюзий и низменных инстинктов, постараться увидеть себя со стороны. Все, что происходит в восемнадцатый лунный день, является как бы зеркальным отражением внутренней сущности человека и показывает то, что он наработал в своей жизни. В этот день противопоказаны пьянство, курение, чрезмерное использование духов.',
			'В этот день всем управляет тяжелая и неблагоприятная для человека энергетика. Если позволяют обстоятельства, лучше остаться дома и никуда не выходить. В этот период существует риск поддаться дурному влиянию, а новое знакомство может иметь тяжелое продолжение: будет очень сложно освободиться от влияния этого человека. Нужно опасаться пьяных людей, способных нанести ущерб здоровью.',
			'В это время можно увидеть мир в новом свете, а также совершить полное внутреннее преображение, поскольку это день освобождения от любого груза, преодоления сомнений, познания космического закона, духовного роста. В двадцатый лунный день хорошо начинать любое дело, - оно обязательно будет успешным и удачным.',
			'Творческий и активный день, который характеризуют добровольная жертва, храбрость, бесстрашие и отказ от собственности. Это день революционных перестроек, упорства в достижении цели, умения добиться триумфа. Энергетика этого периода пробуждает в человеке активное начало, придает ему храбрость, уверенность, решительность. В этот день нужно стремиться быть честным и справедливым даже в мелочах. Сегодня можно смело преодолевать козни недоброжелателей и врагов.',
			'Энергетика этого дня активизирует мыслительные процессы, в этот период особенно хорошо усваиваются новые знания, приходят новые идеи и решения. Это лучший день для мудрецов и философов. Это время мудрости, тайных знаний, мирового закона и незыблемости. В двадцать второй день Луны легче узнавать будущее, проявлять щедрость или просто накапливать знания, но использовать их можно только во благо.',
			'День очень тяжелый по своей энергетике - один из периодов обольщения, связанный с насилием, разрушением старого, с коренной реформой. В этот день в человеке легко высвобождаются неуемный аппетит, склонность к дракам и авантюрам. В двадцать третий день Луны легко поддаться всеобщей взвинченности, которая охватывает людей. Поэтому в любой ситуации необходимо сохранять душевный покой и избегать соблазна с кем-нибудь поссориться. Следует остерегаться неизвестных мест, новых компаний; необходимо не поддаваться на провокации, соблазну мщения.',
			'Этот лунный день излучает огромную преобразующую и созидательную энергию. Это время разрушения старого и создания нового. Люди, как правило, настроены спокойно и благодушно. Этот период хорошо подходит для творческой работы; успешно проходят выставки и показы, выступления и концерты, творческие вечера.',
			'Это период пассивности, сознательного одиночества и покоя. Не следует проявлять активность, поспешность и суету. Нужно избегать случайных контактов и неожиданностей. Это день сосредоточения, самоуглубления, очищения от физических и духовных шлаков. Рекомендуется прислушаться к своему внутреннему голосу, обдумать свою жизнь и свое восприятие мира. Любой знак в этот день должен восприниматься, как указание.',
			'Один из опасных, критических дней, в который люди склонны к конфликтам. Существует опасность перерасходовать свою энергию на пустяки. А потому рекомендуется воздерживаться от активных действий, отдыхать и экономно тратить энергию. Следует отказаться от ненужных связей и контактов, быть избирательным в общении. День склоняет людей к пустым тратам денег, ненужным покупкам, бестолковому поведению. Высока вероятность ограблений и потерь. Следует быть максимально собранными и внимательными. Может возникнуть желание похвастаться, преувеличить свои достижения. Этого ни в коем случае делать нельзя - потом будет стыдно.',
			'В этот лунный день можно неожиданно найти решение проблемы, которая давно беспокоит, если не слишком погружаться в повседневную рутину, а посвятить свои мысли возвышенному. Чтобы день прошел хорошо, надо избегать напряжения и волнений. Следует избегать любого «тумана», психических воздействий. Нельзя смотреться в зеркало.',
			'Энергетика этого периода очень гармонична, это очень чистый и светлый день. Ни в коем случае нельзя нарушать эту гармонию своими грубыми действиями. Желательно быть в хорошем настроении, контролировать свои эмоции, иметь добрые мысли и намерения. Запрещается в двадцать восьмой лунный день рубить деревья, рвать цветы, копать землю, убивать насекомых.',
			'Это самый опасный, плохой и страшный день лунного месяца. Это время, когда в сгустившемся астральном тумане вершат свои темные дела ведьмы и колдуны. Люди в этот период ослабевают, их энергия истощается. Необходимо позаботиться о надежной защите. Следует отказаться от фальшивых и ненужных связей, избегать назойливых и пустых людей, избавляться от мрачных мыслей и беспросветной тоски. В этот день даже мысленно лучше не строить никаких планов, не начинать новых дел.',
			'Прекрасный, полный гармонии день, в главе которого любовь и покаяние. Нет лучше момента для завершения всех начатых в этом месяце дел, некоего подведения итогов, а все новое начнете и спланируете уже в первые лунные сутки. Чтобы без помех перейти на следующий этап, отбросьте лишнее и наносное, избавьтесь от бесполезной суеты, просто успокойтесь.'
			]
			MoonStars = [{
				// 1
				love: 3, // свадьба
				social: 2, // социум
				business: 3, // бизнес
				conflict: 1, // выяснение отношений
				recreation: 3, // отдых
				hair: 1, // стрижка волос
				conception: 4 // зачатие
			},
			{
				// 2
				love: 2,
				social: 1,
				business: 5,
				conflict: 2,
				recreation: 2,
				hair: 2,
				conception: 5
			},
			{
				// 3
				love: 2,
				social: 3,
				business: 1,
				conflict: 1,
				recreation: 1,
				hair: 1,
				conception: 2
			},
			{
				// 4
				love: 3,
				social: 2,
				business: 4,
				conflict: 1,
				recreation: 4,
				hair: 2,
				conception: 5
			},
			{
				// 5
				love: 1,
				social: 3,
				business: 2,
				conflict: 3,
				recreation: 1,
				hair: 5,
				conception: 2
			},
			{
				// 6
				love: 5,
				social: 5,
				business: 4,
				conflict: 4,
				recreation: 3,
				hair: 2,
				conception: 5
			},
			{
				// 7
				love: 4,
				social: 5,
				business: 3,
				conflict: 3,
				recreation: 4,
				hair: 2,
				conception: 5
			},
			{
				// 8
				love: 2,
				social: 4,
				business: 3,
				conflict: 1,
				recreation: 3,
				hair: 4,
				conception: 4
			},
			{
				// 9
				love: 2,
				social: 2,
				business: 2,
				conflict: 1,
				recreation: 4,
				hair: 2,
				conception: 1
			},
			{
				// 10
				love: 4,
				social: 4,
				business: 5,
				conflict: 2,
				recreation: 5,
				hair: 2,
				conception: 4
			},
			{
				// 11
				love: 4,
				social: 3,
				business: 2,
				conflict: 2,
				recreation: 5,
				hair: 4,
				conception: 5
			},
			{
				// 12
				love: 5,
				social: 2,
				business: 1,
				conflict: 1,
				recreation: 4,
				hair: 2,
				conception: 1
			},
			{
				// 13
				love: 2,
				social: 5,
				business: 3,
				conflict: 1,
				recreation: 4,
				hair: 4,
				conception: 1
			},
			{
				// 14
				love: 2,
				social: 5,
				business: 5,
				conflict: 1,
				recreation: 1,
				hair: 4,
				conception: 4
			},
			{
				// 15
				love: 1,
				social: 1,
				business: 1,
				conflict: 1,
				recreation: 4,
				hair: 1,
				conception: 1
			},
			{
				// 16
				love: 5,
				social: 5,
				business: 3,
				conflict: 1,
				recreation: 5,
				hair: 2,
				conception: 3
			},
			{
				// 17
				love: 5,
				social: 5,
				business: 3,
				conflict: 1,
				recreation: 5,
				hair: 1,
				conception: 4
			},
			{
				// 18
				love: 2,
				social: 2,
				business: 2,
				conflict: 1,
				recreation: 3,
				hair: 2,
				conception: 2
			},
			{
				// 19
				love: 1,
				social: 2,
				business: 2,
				conflict: 1,
				recreation: 3,
				hair: 5,
				conception: 2
			},
			{
				// 20
				love: 1,
				social: 5,
				business: 5,
				conflict: 1,
				recreation: 2,
				hair: 2,
				conception: 1
			},
			{
				// 21
				love: 4,
				social: 5,
				business: 5,
				conflict: 1,
				recreation: 5,
				hair: 4,
				conception: 5
			},
			{
				// 22
				love: 2,
				social: 4,
				business: 3,
				conflict: 1,
				recreation: 3,
				hair: 5,
				conception: 3
			},
			{
				// 23
				love: 1,
				social: 1,
				business: 1,
				conflict: 1,
				recreation: 1,
				hair: 1,
				conception: 1
			},
			{
				// 24
				love: 2,
				social: 4,
				business: 5,
				conflict: 1,
				recreation: 1,
				hair: 1,
				conception: 4
			},
			{
				// 25
				love: 2,
				social: 2,
				business: 2,
				conflict: 1,
				recreation: 5,
				hair: 2,
				conception: 4
			},
			{
				// 26
				love: 2,
				social: 1,
				business: 1,
				conflict: 1,
				recreation: 2,
				hair: 4,
				conception: 4
			},
			{
				// 27
				love: 4,
				social: 4,
				business: 5,
				conflict: 2,
				recreation: 4,
				hair: 4,
				conception: 2
			},
			{
				// 28
				love: 2,
				social: 4,
				business: 5,
				conflict: 2,
				recreation: 4,
				hair: 4,
				conception: 5
			},
			{
				// 29
				love: 2,
				social: 1,
				business: 1,
				conflict: 1,
				recreation: 4,
				hair: 1,
				conception: 1
			},
			{
				// 30
				love: 2,
				social: 2,
				business: 2,
				conflict: 1,
				recreation: 5,
				hair: 1,
				conception: 4
			}]
			MoonLoveTexts = [
			'В новые отношения сегодня вступать не стоит. Существует большая вероятность, что в них не будет стабильности и уверенности.',
			'Для любовных взаимоотношений следует выбрать более подходящий день.',
			'Если есть возможность, новые отношения или новый виток текущих отношений лучше перенести, можно только планировать.',
			'этот день вполне благоприятен для начала новых отношений, а также заключения брака и создания семьи.',
			'Практически идеальный день для начала новых отношений.'
			]
			MoonFriendshipTexts = [
			'Этот лунный день плох для общения с друзьями, нельзя злиться, следует избегать конфликтов и вспышек эмоций.',
			'Этот день лучше провести в уединении, работа в коллективе не рекомендуется.',
			'Будьте внимательны к своим эмоциям при контактах с людьми, возможны мелкие ссоры с близкими.',
			'Хороший день для общения и совместной работы. Однако, в беседе не следует давить на собеседника, недопустимы грубые шутки и цинизм.',
			'Сегодня лучшее время, чтобы получить удовольствие от общения с друзьями.'
			]
			MoonMoneyTexts = [
			'В этот день лучше не рисковать деньгами, поскольку возможны потери. И вообще, в этот день лучше не иметь никаких дел с финансами.',
			'Сегодня возможны потери денег, поэтому важные дела лучше перенести на более благоприятный день',
			'Делами заниматься можно, очень благоприятное время для проведения переговоров, собеседований, конференций. Также можно проводить не очень крупные финансовые операции.',
			'Это хороший день для деловых контактов. Также это благоприятный день для финансовых операций.',
			'Удачный день для работы и бизнеса. Можно проводить любые финансовые операции.'
			]
			MoonConflictsTexts = [
			'Споры сегодня не приведут ни к чему хорошему, если в этот день дать выход негативным эмоциям, они могут надолго испортить настроение.',
			'Постарайтесь перенести любые сложные разговоры на более подходящий день.',
			'Можно подискутировать о жизненных принципах.',
			'В этот день можно вступить в небольшую полемику.',
			'']
			MoonEmotionsTexts = [
			'В этот день отдыхать не следует, необходима активность.',
			'В этот день лучше проявить больше активности.',
			'Сегодня нейтральный день для отдыха.',
			'В этот день можно позволить себе отдохнуть.',
			'Очень хороший день для отдыха, особенно отдыха активного.'
			]
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
			$$('#moreDangerText').text('Конфликты');
			$$('#moreEmotionsText').text('Отдых');
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
			// share
			textHoroForToday = "Гороскоп на сегодня";
			textHoroForTomorrow = "Гороскоп на завтра";
			// notifications
			textNotificationTitle = "Ваш гороскоп готов";
			
			
			
		};
		if (currentLanguage.indexOf("en") > -1) {
			console.log("english");
			// selector
			smartSelect.setValue('eng');
			// app name
			textAppName = "Horoscope";
			// server
			textServer = 'https://astrohoro.site/service/getEng.php';
			// arrays
			Signs = ['Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Saggitarius', 'Capricorn'];
			MoonPhases = [
			'A new moon affects a person for several days. During this period, people feel depressed, nervous exhaustion, which is often accompanied by headaches. During a new moon, fluid is more quickly eliminated from the body, metabolism is accelerated. During this period, mental disorders, manifestations of various phobias and mania are more often observed. It is not recommended to start something new, meetings with suspicious people are extremely undesirable.',
			'The first quarter - phase - corresponds to the spring according to the solar calendar and marks the beginning of everything new. During this phase, the human brain becomes very active. All plans outlined during this period will be extremely clear, thought out and will certainly bring good luck. The general activity and desire to create is increasing, but you should not be in a hurry - it’s better to think it over, calculate it and, slowly, begin to implement the plan.',
			'Corresponds to the summer according to the solar calendar. This is the most productive period, the time of filling with energy. The second phase of the moon is best suited for changing jobs, traveling, public speaking.',
			"The full moon period is the best time for friendly meetings, risky business, and signing any contracts and agreements. Everything will turn out as well as possible, but due to such activity of the nervous system and the whole organism as a whole, a person may begin to have problems with sleep. However, there are pluses. At such moments, it's time to establish an intimate life between partners. If married life does not stick, the full Moon is a great chance to fix it.",
			'The period of balanced activity and maturity corresponds to autumn. This phase of the moon is well suited for completing things, but new ones can only be started if they are completed before the new moon. During this period, energy is consumed, and appetite is reduced. Therefore, it is recommended to begin the fight against excess weight and cellulite at this time.',
			'This phase is called the waning moon. This is the time when moon winter comes. A person gets tired more, becomes inactive, slow and lethargic. There is an accumulation of fatigue, immunity is reduced. During the fourth lunar phase, one should not conduct any active actions - they will not bring results.'];
			MoonDays = [
			'The first lunar day is the basis for the entire lunar month. It carries only positive energy - a great chance of fulfilling cherished desires, the implementation of plans and ideas, as well as recognition of one’s love for someone — the feeling will be mutual. This clear and clean day must be spent in a calm and quiet environment, remembering your childhood, analyzing real actions, and making plans for the future. On the first lunar day, you need to cleanse yourself of all the bad things - forgive offenders, ask for forgiveness from those who may have been offended by word or action, establish relations with loved ones that have been spoiled for some reason, and also cast out dark thoughts of revenge on enemies from your head.',
			'This is a starting day, so in the morning you can continue planning the same things as on the previous day, but beware of devoting others to your ideas - it can negatively affect their implementation in the afternoon. In the afternoon, working capacity is growing and practical and scientific activities are intensifying - fertile ground for the implementation of the plan on the eve. This day is ideal for acquiring new knowledge in any scientific field.',
			'This day will be marked by active struggle and aggressiveness, especially the first half of the day. Under the influence of the lunar third day, melancholics will become more vulnerable and impressionable against the background of astral attacks. It will seem to them that intrigues are being woven around them and they are making cunning plans. In order not to suffer, you must be prepared to stand up for yourself. In the afternoon, negative energy will decline.',
			'This day is rather ambiguous: on the one hand, it carries positive energy, and on the other, negative, because it has evil, so it can be called passive and not entirely favorable. On the fourth lunar day, many are haunted by a feeling of dissatisfaction with the accomplished deeds. In the afternoon, conflicts, a decrease in mood are possible.',
			'The fifth lunar day is associated with cardinal changes in life, therefore it is recommended to plan and determine your goals, based on the opportunities already obtained - the search for new ones will not lead to anything. On this day, Fortune will be on the side of those who are accustomed, before acting, to weigh all the pros and cons, from windy persons, most likely, she will turn away. On these lunar days, you should not commit evil deeds and take on the troubles of loved ones - everything that happens should be taken for granted.',
			'The sixth lunar day is an ideal time for mental and spiritual searches, as well as for various scientific studies. Today it is better to abandon active actions - to lead a calm lifestyle. On this day, you should not wait for any surprises, everything flows calmly and harmoniously, flowing from one to another, everything flows smoothly and without fuss. This is a period for reflection and analysis, for conclusions and contemplation of the present moment.',
			'On the seventh lunar day, energy continues to fill the body with inexhaustible strength. It seems that nothing is impossible, so this activity just needs a direction in the desired fruitful direction. Today you need to be careful with the words, do not throw them into the wind, because they can be perceived by the universe too literally.',
			'The eighth lunar day is a time to act decisively and firmly, a time to repent of unseemly deeds and forgive sins, forget old insults, a time to cleanse yourself with fire. What has not been decided and completed will require a speedy conclusion, otherwise it will lie on the soul with a dead weight. On this lunar day something completely unforeseen can happen. If someone planned a trip or a long-awaited trip, and a regular business trip, this is an excellent moment. As well as for relocation in the house and planning your home.',
			'The ninth lunar day has the prospect of becoming dangerous, because it radiates a negative energy effect. The day is considered to be dark, “satanic,” therefore, the presence in life of any external evil should be minimized so that it does not affect your inner world. Seduction and deception, illusions and delusions fill this unstable alarming period.',
			'Day of beginnings: the business that has been launched will certainly bring success, so on these lunar days it is recommended to plan the construction of a house or a summer residence, the opening of your own business or enterprise. Ideal time for active family vacations, as the tenth lunar day is considered family day. You can arrange a joint dinner with family and friends.',
			'The eleventh lunar day has powerful energy, which must be aimed not at the result, but at the process of implementing what was planned, and also make efforts to achieve it as soon as possible. Care must be taken and scrupulousness in business. This day should not be overloaded, but a wait-and-see attitude is contraindicated.',
			'On the twelfth lunar day, you need to retire, pray for yourself and loved ones, be calm, let wisdom prevail over feelings. Compassion and mercy are the foundation of this day. The more goodness will be done for others, the sooner everything will return a hundredfold, and vice versa, you will not be merciful yourself - you will fall into disgrace of the universe. Energetically, the twelfth lunar day is conducive to giving gifts, as well as to giving alms.',
			'The past will receive great power on this lunar day; a lot of what has already been experienced and long left behind suddenly comes back again and manifests itself with a turn of the wheel. It seems that he needs a rethinking and analysis, so on the one hand it is necessary to revisit some aspects of the events and actions of the day past, and on the other hand, it is time to get rid of the superfluous, superfluous, cluttering consciousness, to engage in cleansing the mind in order to properly respond and move forward. This is a day of creativity and fruitful collective work.',
			'The fourteenth lunar day is great to start a new important business. Everything will turn out brilliantly, exactly as intended, and even better. One of the most powerful and strongest days of the month, he is also considered very happy. A surge of activity and determination will finally help to move from reflection to action. No need to waste energy on trifles on such a day, this is a chance to solve a very important, long exciting question. And even if it takes a whole day, there will be no better time in the entire lunar month.',
			'On the fifteenth lunar day, the forces of darkness intensify, so the vulnerability of the human psyche today is incredibly strong. The full moon is approaching, and all that is inside goes out - earthly temptations are especially dangerous for the inner principle of man. He needs protection, this can be achieved by asceticism in all its forms, pacification of the flesh, the desire for purity. Lunar cycle day is good for protecting unjustly offended, restoring justice and a good name. Important matters should preferably be postponed until more favorable times.',
			'The sixteenth day of the lunar calendar - of exceptional crystalline purity; a time when harmony of the astral and physical dominates, spiritual purification, justice. There is nothing more important than maintaining inner comfort and adherence to measures in everything. Be calm and moderate, do not make unnecessary movements, then peace will reign in the soul and home. A planned trip will bring many positive impressions, the house will shine after a thorough cleaning, and if you need to sell or give away any animal, then do it today.',
			'Time to accumulate, internally free, have fun and rejoice. There is no better moment for a celebration or celebration, and no one should be bored. It is worth completely devoting the seventeenth lunar day to recreational activities, having fun in full. Today is characterized by fertility and love, although you still need to have a head on your shoulders and be careful - because of the movement of uncontrolled energies, it contains a lot of surprises.',
			"On the eighteenth lunar day, individuality is at stake, the signs of this day are thoughtless agreement with other people's opinions and imitation. In the presence of impure, evil thoughts, it is necessary to work on this, as well as on the development of an objective perception of the world. Base instincts, illusions - that should be torn away today. Like a mirror surface, this day of the cycle will show your inner self, what you have achieved, what you have come to. There is no better restraint and prudence for the atmosphere of this period, as well as maintaining clarity of mind and an objective assessment of one's own person.",
			'This lunar day is considered evil, evil, unsafe. An energetically difficult period, especially for people sensitive to the subtle world. The best recommendation today is not to leave home walls for no good reason, and if you had to leave, then try to make things quicker and come back. This is the only place where you can be safe. It would be good to purify the soul morally, ease conscience, time for rethinking one’s actions and repentance, at least mentally. To help yourself, you can bring a burning candle around the house or apartment, light a lamp or a bonfire in the yard, just look at the fire so that all the negativity goes away with smoke. Also, if you want to clean up, throw away unnecessary things, especially gifts from unpleasant people, which have bothered you for a long time, but you did not dare to get rid of them.',
			'A serious day, a time of spiritual transformation, victory over doubts, knowledge of cosmic laws. Starting any business, even risky, will lead to undoubted success.',
			'Day of creative activity and charity, as well as a revolutionary day. Its main features are voluntary sacrifice, courage, fearlessness, and persistent achievement of the desired. Justice and honesty are valued more than ever, even by little things. Enemies will not achieve anything with their intrigues, all their machinations will be overcome.',
			"The main milestones of this day of the lunar calendar are wisdom, secret ancient knowledge, immutability. It's time to learn new information, think about unexpected ideas, make decisions. Philosophers will certainly find their listeners.",
			'A difficult day during which you can succumb to seduction. Perhaps violence, destruction in order to create a new, fundamental reforms. People on the twenty-third lunar day can be overcome by wild instincts, bouts of restless appetite, obsession, it is easy to start a fight or some dangerous adventure. In this difficult period, it is better to turn to fasting and abstinence, to be careful.',
			'A time of truly colossal transformative and creative power. The old collapses and a new one is created in return, so that global projects can be safely carried out. The day is favorable for everything related to construction, even the Egyptian pyramids were laid on the twenty-fourth day of the lunar calendar.',
			'The twenty-fifth day of the lunar calendar is not for manifestations of activity, it is better to spend it alone and at rest. Hurry, running around and vanity are not recommended - today you need to be focused, delve into yourself, identify spiritual and physical toxins and clear yourself of them. The inner voice does not deceive, it is worth listening to it, think again about your own life, about your worldview. If something seems to be a sign - take into account, this will give new strength and show prospects.',
			'The day is unsafe, conflicting, there may be a predisposition to quarrels, waste of energy in vain. Therefore, it is worth saving it, spending it sparingly, refraining from excessive activity. Show selectivity in contact with other people, in general, limit communication as soon as possible. Any undertakings on the twenty-sixth day of the lunar cycle will bring nothing but damage and loss.',
			"On this mysterious day of the cycle, you can very well get the most secret knowledge if you devote yourself only to elevated thoughts, and not to everyday routine. Then unexpected solutions may come for long troubling problems, so don't waste this precious time.",
			'A very beneficial day in the lunar month, it is bright and clean, with a balanced energy. You can’t act rudely and dishonorably, so as not to damage it even by a random word spoken in haste. On the twenty-eighth day of the Lunar calendar, you need to try to be in good spirits, have control over emotions, keep only good in thoughts and intentions. Avoid conflict situations as soon as possible.',
			'In the lunar month there is no worse and more dangerous twenty-ninth lunar day. It is believed that this period is under the auspices of Hekate, and therefore is ideal for sorcerers and witches, the accomplishment of their dark deeds. An ordinary person is weak and exhausted, almost devoid of strength. The energies of the day are too complex and put pressure on the psyche, but to protect yourself, it will be enough to just turn on the bright light in the house. Candles can be the best choice, can be ecclesiastical and in large quantities - they have a special clean energy.',
			'A wonderful day full of harmony, at the head of which is love and repentance. There is no better moment for the completion of all the work begun this month, for some summing up, and you will begin and plan everything new already on the first lunar day. To proceed to the next stage without interference, discard the superfluous and the superficial, get rid of the useless fuss, just calm down.'];
			MoonStars = [{
				// 1
				love: 3, // свадьба
				social: 2, // социум
				business: 3, // бизнес
				conflict: 1, // выяснение отношений
				recreation: 3, // отдых
				hair: 1, // стрижка волос
				conception: 4 // зачатие
			},
			{
				// 2
				love: 2,
				social: 1,
				business: 5,
				conflict: 2,
				recreation: 2,
				hair: 2,
				conception: 5
			},
			{
				// 3
				love: 2,
				social: 3,
				business: 1,
				conflict: 1,
				recreation: 1,
				hair: 1,
				conception: 2
			},
			{
				// 4
				love: 3,
				social: 2,
				business: 4,
				conflict: 1,
				recreation: 4,
				hair: 2,
				conception: 5
			},
			{
				// 5
				love: 1,
				social: 3,
				business: 2,
				conflict: 3,
				recreation: 1,
				hair: 5,
				conception: 2
			},
			{
				// 6
				love: 5,
				social: 5,
				business: 4,
				conflict: 4,
				recreation: 3,
				hair: 2,
				conception: 5
			},
			{
				// 7
				love: 4,
				social: 5,
				business: 3,
				conflict: 3,
				recreation: 4,
				hair: 2,
				conception: 5
			},
			{
				// 8
				love: 2,
				social: 4,
				business: 3,
				conflict: 1,
				recreation: 3,
				hair: 4,
				conception: 4
			},
			{
				// 9
				love: 2,
				social: 2,
				business: 2,
				conflict: 1,
				recreation: 4,
				hair: 2,
				conception: 1
			},
			{
				// 10
				love: 4,
				social: 4,
				business: 5,
				conflict: 2,
				recreation: 5,
				hair: 2,
				conception: 4
			},
			{
				// 11
				love: 4,
				social: 3,
				business: 2,
				conflict: 2,
				recreation: 5,
				hair: 4,
				conception: 5
			},
			{
				// 12
				love: 5,
				social: 2,
				business: 1,
				conflict: 1,
				recreation: 4,
				hair: 2,
				conception: 1
			},
			{
				// 13
				love: 2,
				social: 5,
				business: 3,
				conflict: 1,
				recreation: 4,
				hair: 4,
				conception: 1
			},
			{
				// 14
				love: 2,
				social: 5,
				business: 5,
				conflict: 1,
				recreation: 1,
				hair: 4,
				conception: 4
			},
			{
				// 15
				love: 1,
				social: 1,
				business: 1,
				conflict: 1,
				recreation: 4,
				hair: 1,
				conception: 1
			},
			{
				// 16
				love: 5,
				social: 5,
				business: 3,
				conflict: 1,
				recreation: 5,
				hair: 2,
				conception: 3
			},
			{
				// 17
				love: 5,
				social: 5,
				business: 3,
				conflict: 1,
				recreation: 5,
				hair: 1,
				conception: 4
			},
			{
				// 18
				love: 2,
				social: 2,
				business: 2,
				conflict: 1,
				recreation: 3,
				hair: 2,
				conception: 2
			},
			{
				// 19
				love: 1,
				social: 2,
				business: 2,
				conflict: 1,
				recreation: 3,
				hair: 5,
				conception: 2
			},
			{
				// 20
				love: 1,
				social: 5,
				business: 5,
				conflict: 1,
				recreation: 2,
				hair: 2,
				conception: 1
			},
			{
				// 21
				love: 4,
				social: 5,
				business: 5,
				conflict: 1,
				recreation: 5,
				hair: 4,
				conception: 5
			},
			{
				// 22
				love: 2,
				social: 4,
				business: 3,
				conflict: 1,
				recreation: 3,
				hair: 5,
				conception: 3
			},
			{
				// 23
				love: 1,
				social: 1,
				business: 1,
				conflict: 1,
				recreation: 1,
				hair: 1,
				conception: 1
			},
			{
				// 24
				love: 2,
				social: 4,
				business: 5,
				conflict: 1,
				recreation: 1,
				hair: 1,
				conception: 4
			},
			{
				// 25
				love: 2,
				social: 2,
				business: 2,
				conflict: 1,
				recreation: 5,
				hair: 2,
				conception: 4
			},
			{
				// 26
				love: 2,
				social: 1,
				business: 1,
				conflict: 1,
				recreation: 2,
				hair: 4,
				conception: 4
			},
			{
				// 27
				love: 4,
				social: 4,
				business: 5,
				conflict: 2,
				recreation: 4,
				hair: 4,
				conception: 2
			},
			{
				// 28
				love: 2,
				social: 4,
				business: 5,
				conflict: 2,
				recreation: 4,
				hair: 4,
				conception: 5
			},
			{
				// 29
				love: 2,
				social: 1,
				business: 1,
				conflict: 1,
				recreation: 4,
				hair: 1,
				conception: 1
			},
			{
				// 30
				love: 2,
				social: 2,
				business: 2,
				conflict: 1,
				recreation: 5,
				hair: 1,
				conception: 4
			}]
			MoonLoveTexts = [
			'It is not worth entering into a new relationship today. There is a high probability that it will not have stability and confidence.',
			'You should choose a more suitable day for a love relationship.',
			'If it is possible, a new relationship or a new round of current relations is better to transfer. You can only make a plan.',
			'This day is quite favorable for starting a new relationship, as well as marriage and family formation.',
			'Almost the perfect day to start a new relationship.'
			]
			MoonFriendshipTexts = [
			'This lunar day is bad for talking with friends. You should avoid conflicts and outbursts of emotions.',
			'This day is best spent in solitude, teamwork is not recommended.',
			'Be attentive to your emotions when dealing with people; minor quarrels with loved ones are possible.',
			'Good day for communication and teamwork. However, in the conversation one should not put pressure on the interlocutor, rude jokes and cynicism are unacceptable.',
			'Today is the best time to enjoy talking with friends.'
			]
			MoonMoneyTexts = [
			'On this day, it is better not to risk money, as losses are possible. And in general, on this day it is better not to have any business with finances.',
			'Today, there may be a loss of money, so important things are better to transfer to a more favorable day.',
			'You can do business, a very favorable time for negotiations, interviews, conferences. You can also conduct not very large financial transactions.',
			'This is a good day for business contacts. It is also a favorable day for financial transactions.',
			'Good day for work and business. You can conduct any financial transactions.'
			]
			MoonConflictsTexts = [
			'Disputes today will not lead to anything good, if negative emotions are released that day, they can ruin the mood for a long time.',
			'Try to transfer any complicated conversations to a more suitable day.',
			'You can discuss life principles.',
			'On this day, you can enter into a little controversy.',
			'']
			MoonEmotionsTexts = [
			'This day should not rest, activity is necessary.',
			'This day is better to show more activity.',
			'Today is a neutral day to relax.',
			'On this day you can afford to relax.',
			'A very good day to relax, especially active relaxation.'
			]
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
			$$('#moreDangerText').text('Conflicts');
			$$('#moreEmotionsText').text('Relaxation');
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
			// share
			textHoroForToday = "Astrology forecast for today";
			textHoroForTomorrow = "Astrology forecast for tomorrow";
			// notifications
			textNotificationTitle = "Astrology forecast is ready";
		};
		refreshZodiac();
		refreshSign();
}