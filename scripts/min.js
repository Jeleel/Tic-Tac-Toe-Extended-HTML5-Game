var TicTacToe={};TicTacToe.FBWrapper=function(){return{accessToken:null,namespace:"tictactoeextended",checkLoginStatus:function(a){console.log("checkLoginStatus");a&&"connected"==a.status?(TicTacToe.FBWrapper.accessToken=a.authResponse.accessToken,FB.api("/me",function(a){console.log(a);TicTacToe.GameState.p1Name=a.name;$("#p1NameDiv1").val(a.name)}),!0==TicTacToe.GameState.makeFBPost&&TicTacToe.FBWrapper.postAction()):TicTacToe.FBWrapper.accessToken=null},postAction:function(){console.log("postaction");null!=TicTacToe.FBWrapper.accessToken&&
FB.api("/me/"+TicTacToe.FBWrapper.namespace+":earn","post",{report:TicTacToe.GameState.gameDescription,badge:"http://www.gethugames.in/tictactoe/badge.php?rank="+(10-TicTacToe.GameState.rank)},function(a){console.log(a)})},shareStatus:function(){}}}();TicTacToe.TwitterWrapper=function(){return{shareStatus:function(){window.open("http://twitter.com/home?status="+TicTacToe.GameState.gameDescription+" goo.gl/sfb8L","title","height=300, width=480")}}}();TicTacToe.AudioManager=function(){var a,g;return{init:function(){a=new Audio("audio/bgm.ogg");a.volume=0.3;a.loop=!0;a.play()},click:function(){var a;a=new Audio("audio/clickEffect.ogg");a.volume=0.3;a.play()},chime:function(){(new Audio("audio/chimeEffect.ogg")).play()},mute:function(){g=!0;a.pause()},unMute:function(){g=!1;a.play()},toggleMute:function(){(g=!g)?a.pause():a.play()}}}();TicTacToe.InputManager=function(){var a,g,b=!1;$(document).mousemove(function(c){a=c.pageX;g=c.pageY});$(document).mousedown(function(c){a=c.pageX;g=c.pageY;b=!0});document.addEventListener("touchend",function(c){c.preventDefault();c=c.touches[0];a=c.pageX;g=c.pageY;b=!0},!1);return{getMouse:function(){return{x:a,y:g}},getClickIfAny:function(){return b?(b=!1,{x:a,y:a}):null},init:function(){$("#scoreBoardDiv").hide();$("#playOptionsDiv").hide();$("#tipsScreen").hide();$("#inGameMute").click(function(){TicTacToe.AudioManager.toggleMute();
"\u2551"==$("#inGameMute").html()?$("#inGameMute").html("&#9668;"):$("#inGameMute").html("&#9553;")});$("#menuButton").click(function(){TicTacToe.GameState.currentScreen="Menu";$("#menuScreen").show();$(".freeBoardDiv").show();$("#scoreBoardDiv").hide();$("#playOptionsDiv").hide();$("#shareScoreWidget").hide()});$("#infoScreen").click(function(){TicTacToe.GameState.currentScreen="Menu";$("#infoScreen").hide();$("#menuScreen").show()});$("#helpButton").click(function(){TicTacToe.GameState.currentScreen=
"Info";$("#infoScreen").show();$("#menuScreen").hide()});$("#creditsScreen").click(function(){TicTacToe.GameState.currentScreen="Menu";$("#creditsScreen").hide();$("#menuScreen").show()});$("#creditsButton").click(function(){TicTacToe.GameState.currentScreen="Credits";$("#creditsScreen").show();$("#menuScreen").hide()});$("#closeGameOver").click(function(){TicTacToe.GameState.currentScreen="Menu";$("#shareScoreWidget").hide();$("#menuScreen").show();$(".freeBoardDiv").show();$("#scoreBoardDiv").hide();
$("#playOptionsDiv").hide()});$("#muteMusicButton").click(function(){TicTacToe.AudioManager.toggleMute()});$("#shareFacebookWidget").click(function(a){TicTacToe.GameState.makeFBPost=!0;console.log("logging in");FB.login(function(a){a.authResponse&&(console.log("logged in"),FB.getLoginStatus(TicTacToe.FBWrapper.checkLoginStatus))},{scope:"user_about_me,publish_stream,publish_actions"});a.stopPropogation()});$("#shareTwitterWidget").click(function(a){TicTacToe.TwitterWrapper.shareStatus();a.stopPropogation()});
$("#p1NameDiv1").blur(function(){TicTacToe.GameState.p1Name=$("#p1NameDiv1").val()});$("#p2NameDiv1").blur(function(){TicTacToe.GameState.p2Name=$("#p2NameDiv1").val()});$("#p1NameDiv1").click(function(a){a.stopPropagation()});$("#p2NameDiv1").click(function(a){a.stopPropagation()});navigator.onLine||$("#creditsDiv").html("<br/><b>OFFLINE MODE</b><br/><br/>Sharing option not available<br/><br/>")}}}();TicTacToe.GameState=function(){return{currentScreen:"Menu",isAI:0,tiles:[],highlightTiles:[],currentPlayerID:0,player1Score:0,player2Score:0,hoverTileX:0,hoverTileY:0,selectedTileX:0,selectedTileY:0,rows:9,cols:9,block:4,isGameOver:!1,lastUpdatedTime:new Date,p1ElapsedTime:0,p2ElapsedTime:0,aiTileX:0,aiTileY:0,isValidMove:!1,p1Name:"Player 1",p2Name:"Player 2",gameStatus:"",gameDescription:"",badgeURL:"",rank:0,makeFBPost:!1,reset:function(){var a;a=TicTacToe.GameState;a.currentScreen="Menu";a.isAI=
!0;a.currentPlayerID=0;a.player1Score=0;a.player2Score=0;a.selectedTileX=0;a.selectedTileY=0;a.lastUpdatedTime=new Date;a.p1ElapsedTime=0;for(var g=a.p2ElapsedTime=0;g<a.rows;g++){a.tiles[g]=[];TicTacToe.GameLogic.scoreTile[g]=[];for(var b=0;b<a.cols;b++)a.tiles[g][b]=-1,TicTacToe.GameLogic.scoreTile[g][b]=0}$("#shareScoreWidget").hide();$("#infoScreen").hide();$("#creditsScreen").hide();$("#timeTaken.text").text("");$("#player1Score").text("0");$("#player2Score").text("0")}}}();TicTacToe.GameLogic=function(){return{scoreTile:[],updateScore:function(a){for(var g=0,b=0,c,e,h=a.highlightTiles.length,d=0;d<a.rows;d++)for(var k=0;k<a.cols;k++){var i;if(-1!=a.tiles[d][k]){i=0;c=[];e=!1;for(var f=k;f<k+a.block&&f<a.cols;f++){a.selectedTileX==d&&a.selectedTileY==f&&(e=!0);var m={x:d,y:f};c.push(m);if(0==a.tiles[d][f])i++;else if(1==a.tiles[d][f])i--;else break}if(i==a.block&&(g++,e))for(f=0;f<a.block;f++)a.highlightTiles[h++]=c[f];if(i==-a.block&&(b++,e))for(f=0;f<a.block;f++)a.highlightTiles[h++]=
c[f];i=0;c=[];e=!1;for(f=d;f<d+a.block&&f<a.rows;f++)if(a.selectedTileX==f&&a.selectedTileY==k&&(e=!0),m={x:f,y:k},c.push(m),0==a.tiles[f][k])i++;else if(1==a.tiles[f][k])i--;else break;if(i==a.block&&(g++,e))for(f=0;f<a.block;f++)a.highlightTiles[h++]=c[f];if(i==-a.block&&(b++,e))for(f=0;f<a.block;f++)a.highlightTiles[h++]=c[f];i=0;c=[];e=!1;for(f=0;f<a.block;f++){a.selectedTileX==f+d&&a.selectedTileY==f+k&&(e=!0);m={x:f+d,y:f+k};c.push(m);if(f+k>=a.cols||f+d>=a.rows)break;if(0==a.tiles[f+d][f+k])i++;
else if(1==a.tiles[f+d][f+k])i--;else break}if(i==a.block&&(g++,e))for(f=0;f<a.block;f++)a.highlightTiles[h++]=c[f];if(i==-a.block&&(b++,e))for(f=0;f<a.block;f++)a.highlightTiles[h++]=c[f];i=0;c=[];e=!1;for(f=0;f<a.block;f++){a.selectedTileX==d-f&&a.selectedTileY==f+k&&(e=!0);m={x:d-f,y:f+k};c.push(m);if(k+f>=a.cols||0>d-f)break;if(0==a.tiles[d-f][k+f])i++;else if(1==a.tiles[d-f][k+f])i--;else break}if(i==a.block&&(g++,e))for(f=0;f<a.block;f++)a.highlightTiles[h++]=c[f];if(i==-a.block&&(b++,e))for(f=
0;f<a.block;f++)a.highlightTiles[h++]=c[f]}}a.player1Score=g;a.player2Score=b},endTurn:function(a){var g;a.currentPlayerID=0==a.currentPlayerID?1:0;g=!0;for(var b=0;b<a.rows;b++)for(var c=0;c<a.cols;c++)-1==a.tiles[b][c]&&(g=!1);a.isGameOver=g},calcTime:function(a){var g,b,c;g=new Date;b=g-a.lastUpdatedTime;a.lastUpdatedTime=g;0==a.currentPlayerID?a.p1ElapsedTime+=b:a.p2ElapsedTime+=b;g=a.p1ElapsedTime/1E3;b=Math.floor(g/60);g=Math.floor(g%60);a=a.p2ElapsedTime/1E3;c=Math.floor(a/60);a=Math.floor(a%
60);$("#timeTaken").text(b+":"+g+"  /  "+c+":"+a)},updateUI:function(a){$("#player1Score").text(a.player1Score);$("#player2Score").text(a.player2Score)},aiMove:function(a){for(var g=TicTacToe.GameLogic,b=0;b<a.rows;b++){g.scoreTile[b]=[];for(var c=0;c<a.cols;c++)g.scoreTile[b][c]=0}console.log("left to right");for(b=0;b<a.rows;b++)for(var e=0,h=-1,c=0;c<a.cols;c++)-1==a.tiles[b][c]?(g.scoreTile[b][c]+=e,e=0):a.tiles[b][c]==h?e++:a.tiles[b][c]!=h&&(e=1),h=a.tiles[b][c];console.log("right to left");
for(b=0;b<a.rows;b++){e=0;h=-1;for(c=a.cols-1;0<=c;c--)-1==a.tiles[b][c]?(g.scoreTile[b][c]+=e,e=0):a.tiles[b][c]==h?e++:a.tiles[b][c]!=h&&(e=1),h=a.tiles[b][c]}console.log("top to bottom");for(c=0;c<a.cols;c++){e=0;h=-1;for(b=0;b<a.rows;b++)-1==a.tiles[b][c]?(g.scoreTile[b][c]+=e,e=0):a.tiles[b][c]==h?e++:a.tiles[b][c]!=h&&(e=1),h=a.tiles[b][c]}for(c=0;c<a.cols;c++){e=0;h=-1;for(b=a.rows-1;0<=b;b--)-1==a.tiles[b][c]?(g.scoreTile[b][c]+=e,e=0):a.tiles[b][c]==h?e++:a.tiles[b][c]!=h&&(e=1),h=a.tiles[b][c]}for(b=
0;b<a.rows;b++)for(var d=b,e=0,h=-1,c=0;c<a.cols&&d<a.rows;c++)-1==a.tiles[d][c]?(g.scoreTile[d][c]+=e,e=0):a.tiles[d][c]==h?e++:a.tiles[d][c]!=h&&(e=1),h=a.tiles[d][c],d++;for(c=1;c<a.cols;c++){d=c;e=0;h=-1;for(b=0;b<a.rows&&d<a.cols;b++)-1==a.tiles[b][d]?(g.scoreTile[b][d]+=e,e=0):a.tiles[b][d]==h?e++:a.tiles[b][d]!=h&&(e=1),h=a.tiles[b][d],d++}for(b=a.rows-1;0<=b;b--){d=b;e=0;h=-1;for(c=a.cols-1;0<=c&&0<=d;c--)-1==a.tiles[d][c]?(g.scoreTile[d][c]+=e,e=0):a.tiles[d][c]==h?e++:a.tiles[d][c]!=h&&
(e=1),h=a.tiles[d][c],d--}for(c=a.cols-2;0<=c;c--){d=c;e=0;h=-1;for(b=a.rows-1;0<=b&&0<=d;b--)-1==a.tiles[b][d]?(g.scoreTile[b][d]+=e,e=0):a.tiles[b][d]==h?e++:a.tiles[b][d]!=h&&(e=1),h=a.tiles[b][d],d--}for(b=0;b<a.rows;b++){d=b;e=0;h=-1;for(c=a.cols-1;0<=c&&d<a.rows;c--)-1==a.tiles[d][c]?(g.scoreTile[d][c]+=e,e=0):a.tiles[d][c]==h?e++:a.tiles[d][c]!=h&&(e=1),h=a.tiles[d][c],d++}for(c=0;c<a.cols-1;c++){d=c;e=0;h=-1;for(b=0;b<a.rows&&0<d;b++)-1==a.tiles[b][d]?(g.scoreTile[b][d]+=e,e=0):a.tiles[b][d]==
h?e++:a.tiles[b][d]!=h&&(e=1),h=a.tiles[b][d],d--}for(b=a.rows-1;0<=b;b--){d=b;e=0;h=-1;for(c=0;c<a.cols&&0<=d;c++)-1==a.tiles[d][c]?(g.scoreTile[d][c]+=e,e=0):a.tiles[d][c]==h?e++:a.tiles[d][c]!=h&&(e=1),h=a.tiles[d][c],d--}for(c=0;c<a.cols-1;c++){d=c;e=0;h=-1;for(b=a.rows-1;0<=b&&0<=d;b--)-1==a.tiles[b][d]?(g.scoreTile[b][d]+=e,e=0):a.tiles[b][d]==h?e++:a.tiles[b][d]!=h&&(e=1),h=a.tiles[b][d],d++}d=h=e=0;console.log("score tile");for(b=0;b<a.rows;b++)for(c=0;c<a.cols;c++)g.scoreTile[b][c]>e&&(e=
g.scoreTile[b][c],h=b,d=c);a.aiTileX=h;a.aiTileY=d;a.selectedTileX=a.aiTileX;a.selectedTileY=a.aiTileY;a.tiles[a.aiTileX][a.aiTileY]=a.currentPlayerID}}}();TicTacToe.BoardTile=function(a,g,b,c,e,h){var d,k,i,f,m,n,j,l;this.update=function(){"blinkX"==j?(1<=l&&(j="x"),l+=0.03):"blinkO"==j?(1<=l&&(j="o"),l+=0.02):"toX"==j?(1<=l&&(j="x"),l+=0.05):"toO"==j&&(1<=l&&(j="o"),l+=0.05)};this.draw=function(a){"x"==j?a.drawImage(d,f*m,i*n,m,n):"o"==j?a.drawImage(k,f*m,i*n,m,n):"blinkX"==j?(a.globalAlpha=100*l%20/20,a.drawImage(d,f*m,i*n,m,n),a.globalAlpha=1):"blinkO"==j?(a.globalAlpha=100*l%20/20,a.drawImage(k,f*m,i*n,m,n),a.globalAlpha=1):"toX"==j?(a.globalAlpha=
l,a.drawImage(d,f*m,i*n,m/l,n/l),a.globalAlpha=1):"toO"==j&&(a.globalAlpha=l,a.drawImage(k,f*m,i*n,m/l,n/l),a.globalAlpha=1);a.textAlign="center";a.font="16px Arial Bold"};this.setState=function(a){switch(a){case -1:j="empty";break;case 0:j="toX";break;case 1:j="toO"}l=0};this.highlight=function(){if("x"==j||"toX"==j)j="blinkX";if("o"==j||"toO"==j)j="blinkO";l=0};this.updateRes=function(a,c,b,e,g,h){d=a;k=c;i=b;f=e;m=g;n=h};j="empty";d=a;k=g;i=b;f=c;m=e;n=h};TicTacToe.GameBoard=function(a,g,b){function c(){q();p();for(var a=0;a<m;a++)for(var c=0;c<n;c++)o[a][c].updateRes(e,h,a,c,j,l);d=$("#boardCanvas").offset().left;k=$("#boardCanvas").offset().top}var e,h,d,k,i,f,m,n,j,l,o=[],p=function(){var a;a=800<$(window).width()?"2X":"";h=new Image;h.src="images/oTile"+a+".png";e=new Image;e.src="images/xTile"+a+".png"},q=function(){var a=document.getElementById("boardCanvas");f=800<$(window).width()?i=480:i=320;a.width=i;a.height=f;j=i/n;l=f/m};this.x=function(){return d};
this.y=function(){return k};this.width=function(){return i};this.height=function(){return f};this.tileWidth=function(){return j};this.tileHeight=function(){return l};this.resize=function(){q();p()};this.update=function(a,c){var b=TicTacToe.GameState,e=a.x-d,g=a.y-k;b.hoverTileX=-1;b.hoverTileY=-1;0<e&&(0<g&&e<i&&g<f)&&(b.hoverTileX=Math.floor(g/l),b.hoverTileY=Math.floor(e/j),-1!==b.tiles[b.hoverTileX][b.hoverTileY]&&(b.hoverTileX=-1,b.hoverTileY=-1));null!==c&&(-1!=b.hoverTileX?(b.selectedTileX=
b.hoverTileX,b.selectedTileY=b.hoverTileY,b.tiles[b.selectedTileX][b.selectedTileY]=b.currentPlayerID,o[b.selectedTileX][b.selectedTileY].setState(b.currentPlayerID),b.isValidMove=!0):b.isValidMove=!1);if(0!=b.highlightTiles.length){for(e=0;e<b.highlightTiles.length;e++)o[b.highlightTiles[e].x][b.highlightTiles[e].y].highlight();b.highlightTiles.length=0;TicTacToe.AudioManager.chime()}for(b=0;b<m;b++)for(e=0;e<n;e++)o[b][e].update()};this.draw=function(a){a.clearRect(0,0,i,f);for(var c=0;c<m;c++)for(var b=
0;b<n;b++)o[c][b].draw(a);a.fillStyle="rgba(255, 0, 0, 0.5);";a.beginPath();a.rect(TicTacToe.GameState.hoverTileY*j,TicTacToe.GameState.hoverTileX*l,j,l);a.closePath();a.fill()};this.reset=function(){for(var a=0;a<m;a++){o[a]=[];for(var c=0;c<n;c++)o[a][c]=new TicTacToe.BoardTile(e,h,a,c,j,l)}};this.updateAIMove=function(a){o[a.aiTileX][a.aiTileY].setState(a.currentPlayerID);if(0!=a.highlightTiles.length){TicTacToe.AudioManager.chime();for(var c=0;c<a.highlightTiles.length;c++)o[a.highlightTiles[c].x][a.highlightTiles[c].y].highlight();
a.highlightTiles.length=0}};m=g;n=b;d=$("#boardCanvas").offset().left;k=$("#boardCanvas").offset().top;q();p();this.reset();window.addEventListener("resize",c,!1);window.addEventListener("orientationchange",c,!1)};TicTacToe.GameManager=function(){function a(){var a,b,g,d;a=TicTacToe.GameState;b="Amoeba;Mosquito;Dog;Monkey;Baby;Student;Professor;Scientist;Super Hero;God".split(";");g="images/Amoeba.png images/Mosquito.png images/Dog.png images/Monkey.png images/Baby.png images/Student.png images/Professor.png images/Scientist.png images/SuperHero.png images/God.png".split(" ");TicTacToe.GameState.isAI?a.player1Score>a.player2Score?(d=Math.round(5+(a.player1Score-a.player2Score)/2-a.p1ElapsedTime/3E4),d=0>d?
0:d,d=9<d?9:d,a.gameStatus=a.p1Name+" Wins",a.gameDescription=a.p1Name+" scored "+a.player1Score+" points and earned the title of "+b[d]):a.player1Score<a.player2Score?(a.gameStatus=a.p1Name+" Loses",a.gameDescription=a.p1Name+" scored "+a.player1Score+" points in Tic Tac Toe and lost the game",d=0):(d=0,a.gameStatus="Game Draw",a.gameDescription="Game draw between "+a.p1Name+" and AI with a score of "+a.player1Score):a.player1Score>a.player2Score?(d=Math.round((a.player1Score-a.player2Score)/2+(a.p2ElapsedTime-
a.p1ElapsedTime)/3E4),d=0>d?0:d,d=9<d?9:d,a.gameStatus=a.p1Name+" Wins",a.gameDescription=a.p1Name+" scored "+a.player1Score+" points against "+a.p2Name+" and earned the title of "+b[d]):a.player1Score<a.player2Score?(d=Math.round((a.player2Score-a.player1Score)/2+(a.p1ElapsedTime-a.p2ElapsedTime)/3E4),d=0>d?0:d,d=9<d?9:d,a.gameStatus=a.p2Name+" Wins",a.gameDescription=a.p2Name+" scored "+a.player2Score+" points against "+a.p1Name+" and earned the title of "+b[d]):(d=0,a.gameStatus="Game Draw",a.gameDescription=
"Game draw between "+a.p1Name+" and "+a.p2Name+" with a score of "+a.player1Score);TicTacToe.GameState.rank=d;$("#gOverStatus").text(a.gameStatus);$("#gOverDescription").text(a.gameDescription);$("#gOverRemark").text("Amoeba huh? Wish you atleast had multi celled brains.;Silly Insect. But atleast you hav brains;You played with doggy instincts, not bad;Come on. You are on the right track. Practice more;Allast you show the IQ of human species;You got the potential to be the best. just Practice;Wow! Now can teach your fellow mates on how to play;Brainy, Brainy, keep it up;No one can beat you now. You are off the charts;The Super computer AI bows before you my lord".split(";")[d]);
console.log(d);$("#badgeImageHolder").attr({src:g[d]});a.badgeURL="http://www.gethugames.in/tictactoe/"+g[d];TicTacToe.FBWrapper.postAction()}var g,b;return{init:function(){var c=document.getElementById("boardCanvas");g=c.getContext("2d");c.addEventListener("selectStart",function(a){a.preventDefault();return!1},!1);document.body.addEventListener("touchmove",function(a){a.preventDefault()},!1);TicTacToe.GameState.reset();TicTacToe.AudioManager.init();TicTacToe.InputManager.init();b=new TicTacToe.GameBoard(g,
TicTacToe.GameState.rows,TicTacToe.GameState.cols);setTimeout(TicTacToe.GameManager.loop,1E3*(1/30));$("#newAIGameButton").click(function(){$("#p1NameDiv1").focus();TicTacToe.GameState.reset();TicTacToe.GameState.isAI=!0;TicTacToe.GameState.currentScreen="Game";b.reset();$("#menuScreen").hide();$(".freeBoardDiv").hide();$("#scoreBoardDiv").show();$("#playOptionsDiv").show();$("#tipsScreen").show();$("#tipsScreen").delay(3E3).fadeOut();$("#p2NameDiv1").hide()});$("#newHumanGameButton").click(function(){TicTacToe.GameState.reset();
TicTacToe.GameState.currentScreen="Game";TicTacToe.GameState.isAI=!1;b.reset();$("#menuScreen").hide();$(".freeBoardDiv").hide();$("#scoreBoardDiv").show();$("#playOptionsDiv").show();$("#tipsScreen").show();$("#tipsScreen").delay(3E3).fadeOut();$("#p2NameDiv1").show()});$("#p1NameDiv1").keyup(function(){var b=$("#p1NameDiv1").val();TicTacToe.GameState.p1Name=b;$("#p1NameDiv2").text(b);"End"==TicTacToe.GameState.currentScreen&&a()});$("#p2NameDiv1").keyup(function(){var b=$("#p2NameDiv1").val();TicTacToe.GameState.p2Name=
b;"End"==TicTacToe.GameState.currentScreen&&a()})},loop:function(){TicTacToe.GameManager.update();TicTacToe.GameManager.draw();setTimeout(TicTacToe.GameManager.loop,1E3*(1/30))},update:function(){var c=TicTacToe.InputManager.getMouse(),e=TicTacToe.InputManager.getClickIfAny(),g=c.x-b.x(),d=c.y-b.y();if("Game"==TicTacToe.GameState.currentScreen){b.update(c,e);if(0<g&&(0<d&&g<b.width()&&d<b.height())&&null!=e){TicTacToe.GameLogic.updateScore(TicTacToe.GameState);TicTacToe.GameState.isValidMove&&(TicTacToe.AudioManager.click(),
TicTacToe.GameLogic.endTurn(TicTacToe.GameState));TicTacToe.GameLogic.updateUI(TicTacToe.GameState);if(TicTacToe.GameState.isGameOver){a();TicTacToe.GameState.currentScreen="End";$("#shareScoreWidget").show();return}if(TicTacToe.GameState.isAI&&(TicTacToe.GameState.isValidMove&&(TicTacToe.GameLogic.aiMove(TicTacToe.GameState),TicTacToe.GameLogic.updateScore(TicTacToe.GameState),b.updateAIMove(TicTacToe.GameState),TicTacToe.GameLogic.endTurn(TicTacToe.GameState),TicTacToe.GameLogic.updateUI(TicTacToe.GameState)),
TicTacToe.GameState.isGameOver)){a();TicTacToe.GameState.currentScreen="End";$("#shareScoreWidget").show();return}}TicTacToe.GameLogic.calcTime(TicTacToe.GameState)}},draw:function(){"Game"==TicTacToe.GameState.currentScreen?b.draw(g):"End"==TicTacToe.GameState.currentScreen&&b.draw(g)}}}();
