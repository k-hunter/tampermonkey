// ==UserScript==
// @name         mr.masker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://geleiem.com/StockCompare/*
// @grant        none
// ==/UserScript==
// @require http://code.jquery.com/jquery-1.8.2.js

(function() {
    'use strict';

    //alert("hello im mr masker!");
    //alert("oh shit,damn it!");
    var foolish_bar = document.getElementById("divCompareTable");
    var foolish_bar0 = $("#divCompareTable");
    //     //console.log(foolish_bar);
    //     var lock_div = document.getElementsByClassName("divTableHead lockDiv");
    //     var lock_div0 = $(".divTableHead");

    var TableBodyHeight = $(".divTableBody").css('height');//元素高度
    var TableBodyWidth = $(".divTableBody").css('width');
    var TableBodyLeft = $(".divTableBody").css('left');
    var TableBodyRight = $(".divTableBody").css('right');
    var TableBodyTop = $(".divTableBody").css('top');
    var divTableHeadTop = $(".divTableHead").offset().top;//是标签距离顶部高度


    var WindowHeight = $(window).height();//浏览器窗口高度
    var scroH0 = $(document).scrollTop();
    var offsetBot = WindowHeight-(TableBodyHeight+TableBodyTop - $(document).scrollTop());//元素到浏览器底部的高度

    //     console.log(WindowHeight,TableBodyHeight,TableBodyTop,$(document).scrollTop());
    //     console.log(TableBodyWidth,TableBodyLeft,TableBodyTop,offsetBot);

    var changecss_fix = {
        "position": "fixed",
        "top": 0,
        "left": TableBodyLeft,
        "right": TableBodyRight,
        "width" : TableBodyWidth,

    };
    var changecss_auto = {
        "position": "unset",
        "top": "0",
        "left": TableBodyLeft,
        "right": TableBodyRight,
        "width" : TableBodyWidth,

    };

    // for up and down
    var p=0,t=0;

    $(document).scroll(function() {
        var scroH = $(document).scrollTop();  //滚动高度
        var viewH = $(window).height();  //可见高度
        var contentH = $(document).height();  //内容高度

        //         if(contentH >TableBodyTop){  //距离顶部大于100px时
        //          $(".divTableHead").css(changecss_auto);
        //         }
        //         if (contentH - (scroH + viewH) <= 100){  //距离底部高度小于100px
        //             $(".lockDiv").css(changecss_fix);
        //         }
        //         if (contentH = (scroH + viewH)){  //滚动条滑到底部啦
        //             console.log("我是有底线的！");
        //         }
        //         console.log(viewH,contentH,scroH);


        console.log(scroH,contentH,viewH,divTableHeadTop);

        p = $(this).scrollTop();
        if(t<=p){//下滚
            console.log("下滚");

            if(contentH < TableBodyTop){  //距离顶部大于100px时
                $(".divTableHead").css(changecss_auto);
            }
            else{  //距离顶部高度大于100px
                $(".lockDiv").css(changecss_fix);
            }

        }

        else{//上滚
            console.log("上滚");

            if (scroH  > divTableHeadTop){  //距离底部高度小于800px,
                $(".divTableHead").css(changecss_fix);
                //                 $(".lockDiv").css(changecss_auto);
            }
            else{  //距离顶部高度小于100px
                $(".lockDiv").css(changecss_auto);
                //                 $(".divTableHead").css(changecss_fix);
            }

        }
        setTimeout(function(){t = p;},0);


    });

    //     init
    $(".divTableHead").css(changecss_auto);
    $(".lockDiv").css(changecss_fix);

    //     console.log("hack successed!");


})();
