var board=new Array();
var score=0;
var hasConflicted=new Array();

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function(){
    prepareForMobile();
    newgame();
});

function prepareForMobile(){

    if( documentWidth > 500 ){
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }

    $('#grid-container').css('width',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('height',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('padding', cellSpace);
    $('#grid-container').css('border-radius',0.02*gridContainerWidth);

    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('border-radius',0.02*cellSideLength);
}

function newgame(){
	//初始化16个方格
	init();


	//在两个格子里随机的生成数字
	generateOneNumber();
	generateOneNumber();
}

function init(){
	for(var i=0; i<4; i++)
		for(var j=0; j<4; j++){
			var gridCell=$("#grid-cell-"+i+"-"+j);
			gridCell.css('top',getPosTop(i, j));
			gridCell.css('left',getPosLeft(i, j));

		}

	for(var i=0; i<4; i++)
	{
		board[i]= new Array();
		hasConflicted[i]=new Array();
		for(var j=0; j<4; j++){
			board[i][j]=0;

			hasConflicted[i][j]=false;
		}
	}

	updateBoardView();

	score=0;
}


function updateBoardView(){

	$(".number-cell").remove();
	for(var i=0; i<4; i++)
		for(j=0; j<4; j++){
			$('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell=$('#number-cell-'+i+'-'+j);
			if(board[i][j]==0){
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				theNumberCell.css('top',getPosTop(i, j)+cellSideLength/2);
				theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
			}else{
				theNumberCell.css('width',cellSideLength);
				theNumberCell.css('height',cellSideLength);
				theNumberCell.css('top',getPosTop(i, j));
				theNumberCell.css('left',getPosLeft(i, j));
				theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				///可以用数字theNumberCell.text(board[i][j]);
				///
				///
				///
				/////改为数字时应该一下字体font-size: 60px;


					//自定义优化
				var randNumber=board[i][j];
				if (randNumber==2){
					theNumberCell.text("煮糊了");
				}
				else if(randNumber==4){
					theNumberCell.text("一点点");
				}
				else if(randNumber==8){
					theNumberCell.text("星巴克");
				}
				else if(randNumber==16){
					theNumberCell.text("神奇女侠");
				}
				else if(randNumber==32){
					theNumberCell.text("羞羞的铁拳");
				}
				else if(randNumber==64){
					theNumberCell.text("老爷锅");
				}
				else if(randNumber==128){
					theNumberCell.text("海底捞");
				}
				else if(randNumber==256){
					theNumberCell.text("熊大");
				}
				else if(randNumber==512){
					theNumberCell.text("熊二");
				}
				else if(randNumber==1024){
					theNumberCell.text("浅灵");
				}
				else if(randNumber==2048){
					theNumberCell.text("浣熊");
				}
				else if(randNumber==4096){
					theNumberCell.text("I❤朱皖琼");
				}
				

			}
			hasConflicted[i][j]=false;
		}
		
    $('.number-cell').css('line-height',cellSideLength+'px');
    $('.number-cell').css('font-size',0.2*cellSideLength+'px');
}

function generateOneNumber(){
	//判断空间是否已满
	if(nospace(board))//nospace()在support中
		return false;

	//随机生成一个位置
	var randx=parseInt(Math.floor(Math.random()*4));
	var randy=parseInt(Math.floor(Math.random()*4));
//添加一个变量来优化while
	var times=0;
	while(times<50){//可以写成1或true
		if(board[randx][randy]==0)
			break;
		//如果位置不可用继续寻找可用位置
		randx=parseInt(Math.floor(Math.random()*4));
		randy=parseInt(Math.floor(Math.random()*4));
		
		times++;
	}
	if(times==50){//人工寻找到一个没有数字的位置
		for(var i=0; i<4; i++)
			for(var j=0; j<4; j++){
				if(board[i][j]==0)
					randx=x;
					randy=y;
			}
	}
	//随机生成一个数字
	//50%概率生成随机数2和4
	var randNumber=Math.random()<0.5?2:4;

	//在随机位置上显示随机的数字
		board[randx][randy]=randNumber;
		//显示在前端界面的函数在showanimation2048中实现
		showNumberWithAnimation(randx, randy, randNumber);
		return true;
}

$(document).keydown(function(event){
		event.preventDefault();//阻止默认的事件行为
	switch(event.keyCode){
		case 37: //left
			if(moveLeft()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		case 38: //up
			if(moveUp()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		case 39: //reight
			if(moveReight()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		case 40: //down
			if(moveDown()){
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()",300);
			}
			break;
		default: //default
			break;
	}
});

//移动端手指触发判断
document.addEventListener('touchstart',function(event){//手指开始位置
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

document.addEventListener('touchend',function(event){//手指结束位置
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;
    //防止误触发
    if( Math.abs( deltax ) < 0.3*documentWidth && Math.abs( deltay ) < 0.3*documentWidth )
        return;

    //判断是向左右移动还是上下移动
    if( Math.abs( deltax ) >= Math.abs( deltay ) ){

        if( deltax > 0 ){
            //move right
            if( moveReight() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
        else{
            //move left
            if( moveLeft() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
    }
    else{
        if( deltay > 0 ){
            //move down
            if( moveDown() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
        else{
            //move up
            if( moveUp() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
    }
});

function isgameover(){
    if( nospace( board ) && nomove( board ) ){
        gameover();
    }
}

function gameover(){
    alert('理想虽然很美好，但是生活也有它的苟且。尽自己最大的努力就好，我会陪你到最后。爱你。!');
    $("#score").text(0);
}
function moveLeft(){

    if( !canMoveLeft( board ) )
        return false;

    //moveLeft
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 1 ; j < 4 ; j ++ ){
            if( board[i][j] != 0 ){

                for( var k = 0 ; k < j ; k ++ ){
                    if( board[i][k] == 0 && noBlockHorizontal( i , k , j , board ) ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal( i , k , j , board ) && !hasConflicted[i][k]){
                        //move
                        showMoveAnimation( i , j , i , k );
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        	//加分步骤
                        	
                        	score+=board[i][k];
                        	updateScore(score);

                        	hasConflicted[i][k]=true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveReight(){
    if(!canMoveReight( board ) )
        return false;

    //moveRight
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2 ; j >= 0 ; j -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > j ; k -- ){

                    if( board[i][k] == 0 && noBlockHorizontal( i , j , k , board ) ){
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal( i , j , k , board ) && !hasConflicted[i][k] ){
                        showMoveAnimation( i , j , i , k);
                        board[i][k] +=board[i][j];
                        board[i][j] = 0;

                        	score+=board[i][k];
                        	updateScore(score);

                        	hasConflicted[i][k]=true;

                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp(){

    if( !canMoveUp( board ) )
        return false;

    //moveUp
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ ){
            if( board[i][j] != 0 ){
                for( var k = 0 ; k < i ; k ++ ){

                    if( board[k][j] == 0 && noBlockVertical( j , k , i , board ) ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , k , i , board ) &&!hasConflicted[k][j] ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        	score+=board[k][j];
                        	updateScore(score);


                        	hasConflicted[k][j]=true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
    if( !canMoveDown( board ) )
        return false;

    //moveDown
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){

                    if( board[k][j] == 0 && noBlockVertical( j , i , k , board ) ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , i , k , board ) && !hasConflicted[k][j] ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] +=board[i][j];
                        board[i][j] = 0;


                        	score+=board[k][j];
                        	updateScore(score);
             			
                        	hasConflicted[k][j]=true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}