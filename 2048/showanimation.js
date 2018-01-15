function showNumberWithAnimation(i, j, randNumber ){

	var numberCell=$("#number-cell-"+i+'-'+j);
	numberCell.css('background-color',getNumberBackgroundColor(randNumber));
	numberCell.css('color', getNumberColor(randNumber));
	if (randNumber==2){
		numberCell.text("煮糊了");
	}
	else if(randNumber==4){
		numberCell.text("一点点");
	}
	else if(randNumber==8){
		numberCell.text("星巴克");
	}
	else if(randNumber==16){
		numberCell.text("神奇女侠");
	}
	else if(randNumber==32){
		numberCell.text("羞羞的铁拳");
	}
	else if(randNumber==64){
		numberCell.text("老爷锅");
	}
	else if(randNumber==128){
		numberCell.text("海底捞");
	}
	else if(randNumber==256){
		numberCell.text("熊大");
	}
	else if(randNumber==512){
		numberCell.text("熊二");
	}
	else if(randNumber==1024){
		numberCell.text("浅灵");
	}
	else if(randNumber==2048){
		numberCell.text("浣熊");
	}
	else if(randNumber==4096){
		numberCell.text("I❤朱皖琼");
	}
	numberCell.animate({
		width:cellSideLength,
		height:cellSideLength,
		top:getPosTop(i, j)+'px',
		left:getPosLeft(i, j)+'px'
	},300);
}

function showMoveAnimation(fromx, fromy, tox, toy){
	var numberCell=$("#number-cell-"+fromx+'-'+fromy);
	numberCell.animate({
		top: getPosTop(tox, toy),
		left:getPosLeft(tox, toy)
	},200);
}

function updateScore(score){

	$("#score").text(score);
}