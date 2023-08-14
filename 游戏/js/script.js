var chess = document.getElementsByClassName("chess")[0];
var context = chess.getContext("2d");
var title = document.getElementsByClassName("title")[0];
context.strokeStyle = "#B9B9B9";

window.onload = function () {
    drawChessBoard();
}

function drawChessBoard() {
    for (var i = 0; i < 15; i++) {
        //设置横线起始点坐标
        context.moveTo(15, 15 + i * 30);
        //设置结束点坐标
        context.lineTo(435, 15 + i * 30);
        //连接两点
        context.stroke();

        //设置竖线起始点坐标
        context.moveTo(15 + i * 30, 15);
        //设置结束点坐标
        context.lineTo(15 + i * 30, 435);
        //连接两点
        context.stroke();
    }
}


//设置赢法数组
/**
 * 0,0,0
 * 1,0,0
 * 2,0,0
 * 3,0,0
 * 4,0,0
 *
 * 0,0,1
 * 1,1,1
 * 2,1,1
 * 3,1,1
 * 4,1,1
 *
 */
var wins = [];
for (var i = 0; i < 15; i++) {
    wins[i] = [];
    for (var j = 0; j < 15; j++) {
        wins[i][j] = [];
    }
}

var count = 0;
//统计横线赢法
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[j + k][i][count] = true;
        }
        count++;
    }
}


//统计竖线赢法
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i][j + k][count] = true;
        }
        count++;
    }
}

//统计右斜线赢法
for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j + k][count] = true;
        }
        count++;
    }
}

//统计左斜线赢法
for (var i = 0; i < 11; i++) {
    for (var j = 14; j > 3; j--) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j - k][count] = true;
        }
        count++;
    }
}

//定义二维数组标记落子
var chessboard = [];
for (var i = 0; i < 15; i++) {
    chessboard[i] = [];
    for (var j = 0; j < 15; j++) {
        chessboard[i][j] = 0;
    }
}

//下棋
var me = true;//标记人是否可以下棋
var over = false;//游戏是否结束

var mywin = [];//记录用户在赢法上的分值
var computerwin = [];//记录计算机在赢法上的分值
for (var i = 0; i < count; i++) {
    mywin[i] = 0;
    computerwin[i] = 0;
}

chess.onclick = function (event) {
    if (over) {
        return;
    }
    if (!me) {
        return;
    }

    var x = event.offsetX;
    var y = event.offsetY;

    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);

    if (chessboard[i][j] == 0) {
        //落子
        onestep(i, j, me);

        //标记已经落子
        chessboard[i][j] = 1;

        for (var k = 0; k < count; k++) {
            if (wins[i][j][k]) {
                mywin[k]++;
                if (mywin[k] == 5) {
                    title.innerHTML = "恭喜你获得了比赛的胜利！"
                    alert("你赢了！")
                    over = true;
                }
            }
        }
        if (!over) {
            me = !me;
            // 延迟两秒执行的代码
            setTimeout(function() {
                //计算机落子
                computerAI();
            }, 500)

        }
    }
}


function computerAI() {

    //空白子在用户所占用赢法上的分值
    var myScore = [];
    //空白子在计算机所占用赢法上的分值
    var computerScore = [];

    for (var i = 0; i < 15; i++) {
        myScore[i] = [];
        computerScore[i] = [];

        for (var j = 0; j < 15; j++) {
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }

    //空白子最大分值
    var max = 0;
    //最大分值空白子所在的坐标
    var x = 0, y = 0;

    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            //判断是否为空白子
            if (chessboard[i][j] == 0) {
                for (var k = 0; k < count; k++) {
                    if (wins[i][j][k]) {
                        if (mywin[k] == 1) {
                            myScore[i][j] += 200;
                        } else if (mywin[k] == 2) {
                            myScore[i][j] += 400;
                        } else if (mywin[k] == 3) {
                            myScore[i][j] += 2000;
                        } else if (mywin[k] == 4) {
                            myScore[i][j] += 10000;
                        }
                        if (computerwin[k] == 1) {
                            computerScore[i][j] += 200;
                        } else if (computerwin[k] == 2) {
                            computerScore[i][j] += 400;
                        } else if (computerwin[k] == 3) {
                            computerScore[i][j] += 2200;
                        } else if (computerwin[k] == 4) {
                            computerScore[i][j] += 20000;
                        }
                    }
                }

                if(myScore[i][j]>max){
                    max=myScore[i][j];
                    x=i;
                    y=j;
                }else if (myScore[i][j]==max){
                    if(computerScore[i][j]>max){
                        max=computerScore[i][j];
                        x=i;
                        y=j;
                    }
                }
                if(computerScore[i][j]>max){
                    max=computerScore[i][j];
                    x=i;
                    y=j;
                }else if (computerScore[i][j]==max){
                    if(myScore[i][j]>max){
                        max=myScore[i][j];
                        x=i;
                        y=j;
                    }
                }
            }
        }
    }
    onestep(x,y,me);
    chessboard[x][y]=1;

    for(var k=0;k<count;k++){
        if(wins[x][y][k]){
            computerwin[k]+=1;
            if(computerwin[k]==5){
                title.innerHTML="不是吧，我写的ai你都下不过啊？";
                alert("不是吧，我写的ai你都下不过啊？");
                over=true;
            }
        }
    }
    if(!over){
        me=!me;
    }
}

//落子方法
function onestep(i, j, me) {
    context.beginPath();

    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);

    context.closePath();

    var color;
    if (me) {
        color = "#000000";
    } else {
        color = "#656363";
    }
    context.fillStyle = color;
    context.fill();

}

function rst(){
    window.location.reload();
}