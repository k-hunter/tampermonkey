// ==UserScript==
// @name         fuc500lottery
// @namespace    http://tampermonkey.net/
// @namespace    https://code.jquery.com/jquery-3.3.1.min.js
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://203248.com/
// @grant        none
// ==/UserScript==
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
	var　arry_data = new Array();//历史数据二维数组
//  初始化二维数组
for(var i = 0; i < 9;i++){//9期
	arry_data[i] = new Array();
	for(var j = 0; j < 10; j++){//10个球
		arry_data[i][j] = '';
	}
}//for


function LetsWaitReady()
{
	$(document).ready(function () {
		//		getData();
		//		trendChart();
		//		analyzeData();
		//	ballSelect();
		// 		test();
		checkPer5Min();
	});
}
//////////////////////////////////////////////////////////////////////////////////////////
function test(){
	$("#app").click(function (e) {
		console.log("----------test()------------");
		//trendChart();
		// 		getData();
	});//click
}//test
//////////////////////////////////////////////////////////////////////////////////////////
function checkPer5Min(){
	setInterval(function() {
		clear();
		getData();
		//},300000);//60*1000*5 应该一分钟一次
	},60000);//60*1000*5 应该一分钟一次
	// },180000);//60*1000*5 应该3分钟一次
	//},120000);//60*1000*5 应该2分钟一次
}


function getData(){//recent 9 editions 获取9期数据,算法，只有当前9次出现次数连续是大为7次，或小为7次，才投本名
	var arry_ul = $("ul");
	var arry_data_hall = new Array();
	for(var x=0;x<9;x++)
	{//there are 9 history datas in this board 9期
		//get the datas inner history
		for(var y=0;y< 10;y++)
		{//10个球
			arry_data_hall[y] = arry_ul[17].childNodes[x].childNodes[2].childNodes[y].innerText;//put data into arry
			arry_data[x][y] = arry_data_hall[y];//把具体数据放进二维数组中
			if(y==9){
				//var arry_data_string = arry_data_hall.join(",");//cover arry to string
				//               console.log(arry_ul[17].childNodes[x].childNodes[0].innerText);//title of datas
				//console.log("最新第"+x+"期:"+arry_data_string);
				//console.log("----------------------");
			}
		}//inner for
		if(x==8) {
			//开始判断各名是否值得投
			callDataAnalyze(arry_data);
			//arry_data_old = arry_data;
		}

	}//outer for
}//getData



//////////////////////////////////////////////////////////////////////////////////////////
function trendChart(){
	$("#app").click(function (e) {
		console.log("----------------------");
		console.log("----------trendChart()------------");
		console.log("----------------------");
		var view_trend = $(".view-trend")[0].childNodes[0];//获取更多历史记录
		window.close();//关闭之前页面，无效？
		//     view_trend.click();//切换过去
		//     window.close();//关闭之前页面
		var arry_table = $("table");

		var　arr2 = new Array();
		//  初始化二维数组
		for(var i = 0; i < 30;i++){
			arr2[i] = new Array();
			for(var j = 0; j < 10; j++){
				arr2[i][j] = '';
			}
		}//for
		//  生成权限列表二维数组
		for (var x = 0; x < 30; x++) {
			console.log("----------------------");
			console.log(arry_table[0].childNodes[2].childNodes[x].childNodes[0].innerText);//title of datas
			console.log(arry_table[0].childNodes[2].childNodes[x].childNodes[4].innerText);//data string
			var arr = arry_table[0].childNodes[2].childNodes[x].childNodes[4].innerText.split(',');//cover string to arry
			for (var y = 0; y < 10; y++) {
				arr2[x][y] = arr[y];
				console.log('arr2['+x+']['+y+'] ==  '+ arr2[x][y]);
			}
			console.log("----------------------");
		}//for
	});
}//trendChart()
//////////////////////////////////////////////////////////////////////////////////////////
//判断算法，7-2法，6-3回归5-4法（大概率情况）
function callDataAnalyze(arry_data){
	console.log("//////////////////////////////////////////////");
	console.log("----------callDataAnalyze(arry_data)------------");
	console.log("/////////////////////////////////////////////");
	for(var i=0;i<10;i++){//10个球，10名
		console.log("----------第"+(i+1)+"名最新9期历史------------");
		var big_flag=0,small_flag=0;
		for(var j=0;j<9;j++){//9期
			console.log("第"+(i+1)+"名第"+(j+1)+"期:"+arry_data[j][i]);
			if(arry_data[j][i]>5){big_flag++;}else{small_flag++};


			if(j==8){//判断所有期数扫完
				console.log("第"+(i+1)+"名：  出现大的次数："+big_flag+"    出现小的次数："+small_flag);
				//if(big_flag<=2 || small_flag<=2){

				//特殊原则，2-7算法
				if(big_flag==-2 || small_flag==-2){
					if(big_flag<=2){
						console.log("出现大的次数："+big_flag+"次，所以投大！！！");
						var flag1=1;//1大，2小，
						//clear_ball_select_before().then(() => {
						callBallSelect(i,flag1);//选中相应名称，投注
						//});
						flag1="";
					}else{
						console.log("出现小的次数："+small_flag+"次，所以投小！！！");
						var flag2=2;
						//clear_ball_select_before().then(() => {
						callBallSelect(i,flag2);//选中相应名称，投注
						//});
						flag2="";
					}
				}

				//大众原则，6-3回归5-4算法
				if(big_flag==3 || small_flag==3){
					if(big_flag==3){//出现3，意味着要回归4
						console.log("出现大的次数："+big_flag+"次，所以投大！！！");
						var flag3=1;//1大，2小，
						//clear_ball_select_before().then(() => {
						callBallSelect(i,flag3);//选中相应名称，投注
						flag3="";
					}else{
						console.log("出现小的次数："+small_flag+"次，所以投小！！！");
						var flag4=2;
						//clear_ball_select_before().then(() => {
						callBallSelect(i,flag4);//选中相应名称，投注
						flag4="";
					}
				}

			};//j==8


		}//j for
	}//i for
}//analyzeData




function clear_ball_select_before(){
	return new Promise((resolve, reject) => {
		for(var i=0;i<10;i++){
			$(".quickChoice")[i].childNodes[5].click();//清除所选
		}
		resolve(1);
	});
}




function clear(){
	for(var i=0;i<10;i++)
	{
		$(".quickChoice")[i].childNodes[5].click();//清除所选
		if(i==9)
		{ //alert("================clear=====================");
		}
	}
}





//////////////////////////////////////////////////////////////////////////////////////////



var ball_num,flag,edition_changed="";
function callBallSelect(ball_num,flag){
	function select() {
		return new Promise((resolve, reject) => {
			console.log("==========================================");
			console.log("=====#选中投注第"+(ball_num+1)+"名,中中中!数学必胜！#=====");
			console.log("==========================================");

			//var game_choose_pk5 = $("ul.play-sort")[1].childNodes[5].childNodes[1];//pk5
			//game_choose_pk5.click();//能切换到pk5
			var quick_choice_board = $(".quickChoice");//快速选择 0-9 名
			//var num_ball = $(".number-ball");//可以一个号一个号选
			//	var sele_ball = num_ball[2].children[0];//选中第三名 1号
			//sele_ball.click();

			var quick_select = quick_choice_board[ball_num].childNodes[flag];//选中第一名0，大1
			quick_select.click();//点击
			//	console.log(quick_choice_board[0].childNodes[1]);//1大，2小， 需要点击一下
			var money_mod = $(".game-footer")[0].childNodes[0].childNodes;//几个模式,2 元，3角，4分//2元，3角，4分
			//	console.log(money_mod[4]);//2元，3角，4分
			money_mod[4].click();
			//做好同步处理
			//var time_num = $(".multiple")[0].childNodes[0].value;
			//time_num = 4;// 投4倍
			$(".multiple")[0].childNodes[0].value = 1;//setting the time of money
			resolve(1);
		});
	};

	select().then(() => {
		var big_small="";
		if(flag==1){big_small="大";}else{big_small="小";};
		// console.log(arry_ul[17].childNodes[x].childNodes[0].innerText);//title of datas
		var newest_edition = $("ul")[17].childNodes[0].childNodes[0].innerText;
		var time_num = $(".multiple")[0].childNodes[0].value;
		if(edition_changed!=newest_edition){
			console.log("########搞起"+edition_changed+"!="+newest_edition+"直接投注########");
			$("button.button")[1].click();//直接投注按钮
			//$("button.button")[1].click();//直接投注按
			//alert("投注信息：投注第"+ball_num+"名，倍"+time_num+",选"+flag+big_small);

			edition_changed=newest_edition;
			console.log("###########投注信息：投注第"+ball_num+"名，倍"+time_num+",选"+flag+big_small+"#############");
		}else{
			console.log(edition_changed+"="+newest_edition+"喝茶等待");
			//$("button.button")[1].click();//直接投注按钮
		};
	});
	ball_num ="";
	flag="";
}




//////////////////////////////////////////////////////////////////////////////////////////



function callBallSelect1(ball_num){
	console.log("----------ballSelect()------------"+ball_num);
	//var play_game_content = $(".play-game-content");
	//var ball_selection_board = $(".ball-section");//球面选择板块
	//console.log(play_game_content);
	//var nav_hall = $("ul.nav-link")[0].childNodes[2].childNodes[2];//大厅游戏选择 点击无效 需要悬停
	var game_choose_pk5 = $("ul.play-sort")[1].childNodes[5].childNodes[1];//pk5
	//ar game_choose = $("ul.play-sort")[1].childNodes[4].childNodes[1];//pk3
	console.log(game_choose_pk5);
	game_choose_pk5.click();//能切换到pk5
	// game_choose.click();//能切换到pk3
	var ball_select = $(".ball-section")[0].childNodes[0].childNodes;//0-9 名
	var history_recent = $("ul")[17];//近9期历史记录，不用
	var view_trend = $(".view-trend")[0].childNodes[0];//获取更多历史记录
	//view_trend.click();//切换过去
	console.log(view_trend);
	var quick_choice_board = $(".quickChoice");//快速选择 0-9 名
	var num_ball = $(".number-ball");//可以一个号一个号选
	var sele_ball = num_ball[2].children[0];//选中第三名 1号
	//sele_ball.click();
	console.log(sele_ball);
	var quick_select = quick_choice_board[0].childNodes[1];//选中第一名0，大1
	//quick_select.click();//点击
	console.log(quick_choice_board[0].childNodes[1]);//1大，2小， 需要点击一下
	var money_mod = $(".game-footer")[0].childNodes[0].childNodes;//几个模式,2 元，3角，4分
	console.log(money_mod[4]);//2 元，3角，4分  //active-unit 选中模式
	//money_mod[4].click();
	//做好同步处理
	var time_num = $(".multiple")[0].childNodes[0].value;
	// time_num = 4;// 投4倍
	$(".multiple")[0].childNodes[0].value = 3;//setting the time of money
	console.log(time_num);
	var submit_bt = $("button.button")[1];//直接投注按钮
	console.log(submit_bt);

}//ballselect

//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
	//main
	//////////////////////////////////////////////////////////////////////////////////////////
	(function() {
		'use strict';
		LetsWaitReady();
		// Your code here...
	})();
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

