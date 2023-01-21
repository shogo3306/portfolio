// nav 
$(".openbtn").click(function () {//ボタンがクリックされたら
    $(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
});

$("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
    $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
});
// はじめ
var stroke;
stroke = new Vivus('mask', {//アニメーションをするIDの指定
    start: 'manual',//自動再生をせずスタートをマニュアルに
    type: 'scenario-sync',// アニメーションのタイプを設定
    duration: 100,//アニメーションの時間設定。数字が小さくなるほど速い
    forceRender: false,//パスが更新された場合に再レンダリングさせない
    animTimingFunction: Vivus.EASE,//動きの加速減速設定
},
    function () {
        $("#mask").attr("class", "done");//描画が終わったらdoneというクラスを追加
    }
);

$(window).on('load', function () {
    $("#splash").delay(5000).fadeOut('slow');//ローディング画面を3秒（3000ms）待機してからフェイドアウト
    $("#splash_logo").delay(5000).fadeOut('slow');//ロゴを3秒（3000ms）待機してからフェイドアウト
    stroke.play();//SVGアニメーションの実行
});


// ページトップ
function PageTopAnime() {

    var scroll = $(window).scrollTop(); //スクロール値を取得
    if (scroll >= 200) {//200pxスクロールしたら
        $('#page-top').removeClass('DownMove');		// DownMoveというクラス名を除去して
        $('#page-top').addClass('UpMove');			// UpMoveというクラス名を追加して出現
    } else {//それ以外は
        if ($('#page-top').hasClass('UpMove')) {//UpMoveというクラス名が既に付与されていたら
            $('#page-top').removeClass('UpMove');	//  UpMoveというクラス名を除去し
            $('#page-top').addClass('DownMove');	// DownMoveというクラス名を追加して非表示
        }
    }

    var wH = window.innerHeight; //画面の高さを取得
    var footerPos = $('#footer').offset().top; //footerの位置を取得
    if (scroll + wH >= (footerPos + 10)) {
        var pos = (scroll + wH) - footerPos + 10 //スクロールの値＋画面の高さからfooterの位置＋10pxを引いた場所を取得し
        $('#page-top').css('bottom', pos);	//#page-topに上記の値をCSSのbottomに直接指定してフッター手前で止まるようにする
    } else {//それ以外は
        if ($('#page-top').hasClass('UpMove')) {//UpMoveというクラス名がついていたら
            $('#page-top').css('bottom', '10px');// 下から10pxの位置にページリンクを指定
        }
    }
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
    PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
    PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// #page-topをクリックした際の設定
$('#page-top').click(function () {
    $('body,html').animate({
        scrollTop: 0//ページトップまでスクロール
    }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
    return false;//リンク自体の無効化
});
// gsap work
window.addEventListener("load", function () {

    //プラグインを定義
    gsap.registerPlugin(ScrollTrigger);

    const area = document.querySelector(".js-area");
    const items = document.querySelectorAll(".js-item");
    const num = items.length;

    //位置とscaleを指定
    items.forEach((item, i) => {
        gsap.set(item, {
            zIndex: num - i,
        });
    });

    gsap.set(".js-item04", {
        scale: 0, width: "60vw", height: "auto",
    });
    gsap.set(".js-item05", {
        scale: 0, width: "60vw", height: "auto",
    });
    gsap.set(".js-item06", {
        scale: 0, width: "60vw", height: "auto",
    });

    //タイムライン
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: area, //トリガー
            start: "top top ", //開始位置
            end: "+=1500", //終了位置
            scrub: true, //ピン留め
            pin: true, //スクロール量に応じて動かす
        }
    });

    //要素を順に拡大する
    tl
        .to(".js-item04", { scale: 1, duration: 2 }, "-=0.5")
        .to(".js-item04", { opacity: 0, duration: 0.2 }, "-=0.2")
        .to(".js-item05", { scale: 1, duration: 2 }, "-=0.2")
        .to(".js-item05", { opacity: 0, duration: 0.2 }, "-=0.2")
        .to(".js-item06", { scale: 1, duration: 2 }, "-=0.2")
        .to(".js-item06", { opacity: 0, duration: 0.2 }, "-=0.2")
});

// モーダルjs

$('.js-modal-open').on('click', function () {
    var target = $(this).data('target');
    var modal = document.getElementById(target);
    scrollPosition = $(window).scrollTop();

    $('body').addClass('fixed').css({ 'top': -scrollPosition });
    $(modal).fadeIn();
    return false;

});

// モーダルウィンドウを閉じる
$('.js-modal-close').on('click', function () {
    $('body').removeClass('fixed');
    window.scrollTo(0, scrollPosition);
    $('.js-modal').fadeOut();
    return false;
});

// aboutの画像

$(function () {
    $(window).on('scroll resize', function () {
        var setHeight = 50;
        var wHeight = $(window).height();
        var scrollTop = $(window).scrollTop();
        $('.animate').each(function () {
            var targetPosition = $(this).offset().top;
            if (scrollTop > targetPosition - wHeight + setHeight) {
                $(this).addClass('show');
            }
        })
    });
});
// 
const CLASSNAME = "-visible";
        const TIMEOUT = 1500;
        const $target = $(".title");

        setInterval(() => {
            $target.addClass(CLASSNAME);
            setTimeout(() => {
                $target.removeClass(CLASSNAME);
            }, TIMEOUT);
        }, TIMEOUT * 2);
// contactの中のjs
$('textarea').blur(function () {
    $('#hire textarea').each(function () {
        $this = $(this);
        if (this.value != '') {
            $this.addClass('focused');
            $('textarea + label + span').css({ 'opacity': 1 });
        }
        else {
            $this.removeClass('focused');
            $('textarea + label + span').css({ 'opacity': 0 });
        }
    });
});

$('#hire .field:first-child input').blur(function () {
    $('#hire .field:first-child input').each(function () {
        $this = $(this);
        if (this.value != '') {
            $this.addClass('focused');
            $('.field:first-child input + label + span').css({ 'opacity': 1 });
        }
        else {
            $this.removeClass('focused');
            $('.field:first-child input + label + span').css({ 'opacity': 0 });
        }
    });
});

$('#hire .field:nth-child(2) input').blur(function () {
    $('#hire .field:nth-child(2) input').each(function () {
        $this = $(this);
        if (this.value != '') {
            $this.addClass('focused');
            $('.field:nth-child(2) input + label + span').css({ 'opacity': 1 });
        }
        else {
            $this.removeClass('focused');
            $('.field:nth-child(2) input + label + span').css({ 'opacity': 0 });
        }
    });
});

// rotate()
document.querySelector(`.rotate`).animate(
    [
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(-360deg)' }
    ],
    {
        duration: 10000,
        easing: 'linear',
        iterations: Infinity
    }
);

// タイトルのテキストタイピング
function EachTextAnimeControl() {
    $('.eachTextAnime').each(function () {
        var elemPos = $(this).offset().top - 50;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight) {
            $(this).addClass("appeartext");

        } else {
            $(this).removeClass("appeartext");
        }
    });
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
    EachTextAnimeControl();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
    //spanタグを追加する
    var element = $(".eachTextAnime");
    element.each(function () {
        var text = $(this).text();
        var textbox = "";
        text.split('').forEach(function (t, i) {
            if (t !== " ") {
                if (i < 10) {
                    textbox += '<span style="animation-delay:.' + i + 's;">' + t + '</span>';
                } else {
                    var n = i / 10;
                    textbox += '<span style="animation-delay:' + n + 's;">' + t + '</span>';
                }

            } else {
                textbox += t;
            }
        });
        $(this).html(textbox);
    });

    EachTextAnimeControl();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述

