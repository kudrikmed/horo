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