$(function () {
    // 获取当前日期并设置到页面上
    var date = new Date();
    $(".data-time").eq(0).html(date.toISOString().substring(0, date.toISOString().indexOf("T")))

    // 获取当前星期并设置到页面上
    var str = "星期" + "日一二三四五六".charAt(new Date().getDay());
    $(".xingqi").html(str)

    // 给每个头部菜单项绑定点击事件
    $(".s-second-header>ul>li").each(function () {
        $(this).on("click", function () {
            $(this).addClass("boder-line").siblings().removeClass("boder-line");
        })
    })
    // 将网页分成若干个等宽的滑动块，每个滑动块的宽度为浏览器窗口宽度除以滑动块个数，高度为浏览器窗口高度。
    // 设置地图块的高度，将地图块的高度设置为浏览器窗口高度。设置滑动块的高度，将滑动块的高度设置为浏览器窗口高度。
    
    // 设置滑动块的宽度和高度
    $(".z-s-block>li").each(function () {
        $(this).width($(window).innerWidth() / $(".z-s-block>li").length)
        $(this).height(window.innerHeight)
    })

    // 设置地图块的高度
    $(".map-block").height(window.innerHeight);

    // 设置滑动块的高度
    $(".silder-block").css({
        height: window.innerHeight + "px"
    })

    // 设置图片列表和图片块的宽度
    $(".imgblock").css({ width: window.innerWidth * 5 })
    $(".imglist").css({ width: window.innerWidth })

    var imglist = document.getElementsByClassName("imglist");
    var imgblock = document.getElementsByClassName("imgblock")[0];
    var diandian = document.getElementsByClassName("diandian");
    var block = document.getElementsByClassName("silder-block")[0];
    var count = 0;
    var time = null;
    var oldtime = new Date().getTime()

    // 设置第一个点为亮点
    $(".diandian").eq(0).find("img").attr("src", "img/icon/jianzhibai.png");

    // 定义一个轮播函数
    function hh() {
        // 获取当前时间
        var newtime = new Date().getTime();
        // 如果距离上一次轮播时间超过3.5秒，则进行下一次轮播
        if (newtime - oldtime >= 3500) {
            // 切换下一个图片
            imgblock.className = "imgblock trans";
            $(".diandian").eq(count).find("img").attr("src", "img/icon/jianzhihong.png");
            count++;
            imgblock.style.marginLeft = -window.innerWidth * count + "px";
            // 判断是否到达最后一张图片，如果是则返回第一张
            $(".diandian").eq(count > imglist.length - 2 ? 0 : count).find("img").attr("src", "img/icon/jianzhibai.png");
            setTimeout(function () {
                if (count > imglist.length - 2) {
                    count = 0;
                    imgblock.className = "imgblock";
                    imgblock.style.marginLeft = "0px";
                }
            }, 500);
            oldtime = newtime;
        }
        // 清空变量
        newtime = null;
        // 循环调用该函数，实现轮播的效果
        time = window.requestAnimationFrame(hh)
    }

    // 调用轮播函数
    hh()

    // 给滑动块绑定鼠标移入和移出事件，实现暂停和继续轮播的效果
    block.onmouseenter = function () {
        window.cancelAnimationFrame(time)
    };
    block.onmouseleave = function () {
        hh();
    };

    // 给轮播点绑定鼠标移入事件，实现点击轮播点跳转到指定图片的效果
    for (var i = 0; i < diandian.length; i++) {
        diandian[i].index = i;
        diandian[i].onmouseenter = function () {
            $(".diandian").eq(count).find("img").attr("src", "img/icon/jianzhihong.png");
            imgblock.style.marginLeft = -window.innerWidth * this.index + "px";
            $(this).find("img").attr("src", "img/icon/jianzhibai.png");
            count = this.index;
        }
    }

    // 定义一个包含数据的JSON对象
    var json = [{
        title: "国家及代表性传承人",
        child: [{ "name": "民间文学", "number": 123 }, { "name": "传统音乐", "number": 380 },
        { "name": "传统舞蹈", "number": 298 }, { "name": "传统戏剧", "number": 784 },
        { "name": "曲艺", "number": 207 }, { "name": "传统体育", "number": 88 },
        { "name": "传统美术", "number": 378 }, { "name": "传统技艺", "number": 518 },
        { "name": "传统医药", "number": 138 }, { "name": "民俗", "number": 60 }]
    }, {
        title: "国家级代表性项目",
        child: [{ "name": "民间文学", "number": 231 }, { "name": "传统音乐", "number": 401 },
        { "name": "传统舞蹈", "number": 324 }, { "name": "传统戏剧", "number": 448 },
        { "name": "曲艺", "number": 425 }, { "name": "传统体育", "number": 361 },
        { "name": "传统美术", "number": 193 }, { "name": "传统技艺", "number": 507 },
        { "name": "传统医药", "number": 137 }, { "name": "民俗", "number": 427 }]
    }]

    // 给左侧菜单列表绑定点击事件，根据点击的菜单项显示相应的数据
    $(".left_list").click(function () {
        $(this).addClass("jinse").siblings().removeClass("jinse")
        for (var i = 0; i < json.length; i++) {
            if (json[i].title == $(this).html()) {
                for (var index in json[i].child) {
                    $(".list-text>span:nth-child(1)").eq(index).html(json[i].child[index].number);
                    $(".list-text>span:nth-child(2)").eq(index).html(json[i].child[index].name)
                }
            }
        }
    })


    // 定义了一个名为cityjson的变量，存储了一个包含多个城市信息的数组
    var cityjson = [{
        city: "全国",
        child: [{ // 子集，包含两个不同的国家及代表性传承人
            title: "国家及代表性传承人", // 子集的标题
            child: [{ "name": "民间文学", "number": 123 }, { "name": "传统音乐", "number": 380 },
            { "name": "传统舞蹈", "number": 298 }, { "name": "传统戏剧", "number": 784 },
            { "name": "曲艺", "number": 207 }, { "name": "传统体育", "number": 88 },
            { "name": "传统美术", "number": 378 }, { "name": "传统技艺", "number": 518 },
            { "name": "传统医药", "number": 138 }, { "name": "民俗", "number": 60 }]
        }, {
            title: "国家级代表性项目",
            child: [{ "name": "民间文学", "number": 231 }, { "name": "传统音乐", "number": 401 },
            { "name": "传统舞蹈", "number": 324 }, { "name": "传统戏剧", "number": 448 },
            { "name": "曲艺", "number": 425 }, { "name": "传统体育", "number": 361 },
            { "name": "传统美术", "number": 193 }, { "name": "传统技艺", "number": 507 },
            { "name": "传统医药", "number": 137 }, { "name": "民俗", "number": 427 }]
        }, {
            city: "北京",
            child: [{ // 子集，包含两个不同的国家及代表性传承人
                title: "国家及代表性传承人",
                child: [{ "name": "民间文学", "number": 0 }, { "name": "传统音乐", "number": 1 },
                { "name": "传统舞蹈", "number": 8 }, { "name": "传统戏剧", "number": 4 },
                { "name": "曲艺", "number": 7 }, { "name": "传统体育", "number": 8 },
                { "name": "传统美术", "number": 8 }, { "name": "传统技艺", "number": 18 },
                { "name": "传统医药", "number": 8 }, { "name": "民俗", "number": 0 }]
            }, {
                title: "国家级代表性项目",
                child: [{ "name": "民间文学", "number": 1 }, { "name": "传统音乐", "number": 1 },
                { "name": "传统舞蹈", "number": 4 }, { "name": "传统戏剧", "number": 8 },
                { "name": "曲艺", "number": 5 }, { "name": "传统体育", "number": 36 },
                { "name": "传统美术", "number": 1 }, { "name": "传统技艺", "number": 7 },
                { "name": "传统医药", "number": 7 }, { "name": "民俗", "number": 4 }]
            }]
        }, {
            city: "山东",
            child: [{ // 子集，包含两个不同的国家及代表性传承人
                title: "国家及代表性传承人",
                child: [{ "name": "民间文学", "number": 0 }, { "name": "传统音乐", "number": 1 },
                { "name": "传统舞蹈", "number": 8 }, { "name": "传统戏剧", "number": 4 },
                { "name": "曲艺", "number": 7 }, { "name": "传统体育", "number": 8 },
                { "name": "传统美术", "number": 8 }, { "name": "传统技艺", "number": 18 },
                { "name": "传统医药", "number": 8 }, { "name": "民俗", "number": 0 }]
            }, {
                title: "国家级代表性项目",
                child: [{ "name": "民间文学", "number": 1 }, { "name": "传统音乐", "number": 1 },
                { "name": "传统舞蹈", "number": 4 }, { "name": "传统戏剧", "number": 8 },
                { "name": "曲艺", "number": 5 }, { "name": "传统体育", "number": 36 },
                { "name": "传统美术", "number": 1 }, { "name": "传统技艺", "number": 7 },
                { "name": "传统医药", "number": 7 }, { "name": "民俗", "number": 4 }]
            }]
        }]
    }]; // 数组结束符号


});