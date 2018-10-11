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

    //alert("oh shit,damn it!");

    //divCompareTable
    var TableBodyHeight = $(".divTableBody").css('height');//元素高度
    var TableBodyWidth = $(".divTableBody").css('width');
    var TableBodyLeft = $(".divTableBody").css('left');
    var TableBodyRight = $(".divTableBody").css('right');
    var TableBodyTop = $(".divTableBody").css('top');
    var divTableHeadTop = $(".divTableHead").offset().top;//是标签距离顶部高度


    //修改了你的css样式
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
    //     init
    $(".divTableHead").css(changecss_auto);
    $(".lockDiv").css(changecss_fix);

    // for scroll up and down
    var p=0,t=0;
    $(document).scroll(function() {
        var scroH = $(document).scrollTop();  //滚动高度
        var viewH = $(window).height();  //可见高度
        var contentH = $(document).height();  //内容高度
        // console.log(scroH,contentH,viewH,divTableHeadTop);

        p = $(this).scrollTop();
        if(t<=p){//下滚
            //console.log("下滚");
            if(contentH < TableBodyTop){  //距离顶小于divCompareTable时
                $(".divTableHead").css(changecss_auto);
            }
            else{  //距离顶部高度大于...
                $(".lockDiv").css(changecss_fix);
            }
        }

        else{//上滚
            //console.log("上滚");
            if (scroH  > divTableHeadTop){  //距离底部高度da于...,
                $(".divTableHead").css(changecss_fix);
            }
            else{  //距离顶部高度小于...
                $(".lockDiv").css(changecss_auto);
            }
        }
        setTimeout(function(){t = p;},0);

    });

})();
