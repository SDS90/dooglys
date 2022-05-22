//Скрипты


$(function(){

	//Регистрация
	$(".open-start").fancybox({
		padding: 0,
	});

	//Плавная прокрутка
	$('#startButton').on('click',function (e) {
         
        var scrollTop = parseInt($(this).data("scroll"));
         
        if (scrollTop > 0){
            $('html, body').stop().animate({
                'scrollTop': scrollTop
            }, 2000, 'swing', function () {
                //console.log($(window).scrollTop())
                var scrollTop = $(window).scrollTop();
                if ($(window).scrollTop() != scrollTop){
                    $('html, body').stop().animate({
                        'scrollTop': scrollTop
                    }, 0, 'swing');
                }

            });    

            return false;
        } else {
            return true;
        }
    });

    $('.doodle').on('click',function (e) {
         
        var scrollTop = parseInt($(this).data("scroll"));
         
        if (scrollTop > 0){
            $('html, body').scrollTop(scrollTop);    

            return false;
        } else {
            return true;
        }
    });

    //Планы. Выравниваем таймлайн
    $(".about-plans-wrapper .about-block").each(function(){
    	var timeline = $(this).find(".timeline");
    	var planList = $(this).find(".plan-list");

    	var timeWidth = timeline.find(".timeline-overlay").width();
    	var bubblesNum = planList.find("li").length - 1;
    	var activeBubblesNum = Math.floor(bubblesNum/(100/timeWidth));

    	$(this).find(".timeline-list li").each(function(i,v){
    		if (i <= activeBubblesNum){
    			$(this).addClass("active");
    		}
    	})    	
    });


    /*$('.dooglys-hover').hover(function (e) {
         
        var scrollTop = parseInt($("#startButton").data("scroll"));
        $('html, body').stop().animate({
            'scrollTop': scrollTop
        }, 2000, 'swing', function () {
            //console.log($(window).scrollTop())
            var scrollTop = $(window).scrollTop();
            if ($(window).scrollTop() != scrollTop){
                $('html, body').stop().animate({
                    'scrollTop': scrollTop
                }, 0, 'swing');
            }

        });    

        return false;
    },function(){
    	var scrollTop = 0;
        $('html, body').stop().animate({
            'scrollTop': scrollTop
        }, 2000, 'swing', function () {
            //console.log($(window).scrollTop())
            var scrollTop = $(window).scrollTop();
            if ($(window).scrollTop() != scrollTop){
                $('html, body').stop().animate({
                    'scrollTop': scrollTop
                }, 0, 'swing');
            }

        }); 
        return false;
    });*/

	//Меню
	$(".menu-link").click(function(){
		if ($(this).hasClass("active")){
			$(this).removeClass("active");
			$(".menu-block").fadeOut();
		} else {
			$(this).addClass("active");
			$(".menu-block").fadeIn();
		}
		return false;
	});

	$(document.body).click(function(event){
		if ($(event.target).closest(".menu-block, .open-start").length) return;
		$(".menu-block").fadeOut();
		$(".menu-link").removeClass("active");
		event.stopPropagation();
	});

    //Сравнение (блок "Предсказуемо")
	$('.compare').coveringBad({
		marginY : 0 ,
		marginX : 0 ,
		setX  : 400,
		setY  : 140 ,
		direction   : "horizontal"
	});

	//Запуск скролла
	skrollr.init({
		edgeStrategy: 'set',
		easing: {
			WTF: Math.random,
			inverted: function(p) {
				return 1-p;
			}
		}
	});



	$(window).scroll(function(){
		var scrollLeft = $(this).scrollLeft();
   		$(".full-page, .header-wrapper").css("left", -scrollLeft);
	});

	//Совместимость
	$("#compatibilityCheck").click(function(){
		return false;
	});

	$("#aboutList").scrollbar();

	//Планы
	$("#dooglysPlans .panel-wrapper a").each(function(){
		$(this).attr("data-left", $(this).position().left);
		$(this).attr("data-top", $(this).position().top);
		$(this).css("left", $(this).position().left);
		$(this).css("top", $(this).position().top);
	});

	$(".panel-header-wrapper").each(function(){
		$(this).css("height",$(this).closest(".panel-wrapper").height());
	})

	$("#dooglysPlans .panel-wrapper a").click(function(){

		if (!$(this).closest("li").hasClass("active")) {
			var href = $(this).attr("href");
			var time = 400;

			if ($(this).closest("li").hasClass("loyality")){
				$("#dooglysPlans .about-header").addClass("loyality");
			} else {
				$("#dooglysPlans .about-header").removeClass("loyality");
			}

			$(this).closest("li").addClass("active");

			$(this).stop().animate({
				left: -555,
				top: -10
			}, time);

			$("#aboutList a[href=" + href + "]").addClass("active");
			$(".about-plans-wrapper").fadeIn(time);
			$(href).fadeIn(time);
		}

		return false;
	});

	$("#aboutList a").click(function(){
		var href = $(this).attr("href");
		var activeLink = $("#dooglysPlans .panel-wrapper li.active a");

		activeLink.css({
			left: activeLink.data("left"),
			top: activeLink.data("top")
		});

		$(".about-plans-wrapper .about-block").hide();
		$("#aboutList a, #dooglysPlans .panel-wrapper li").removeClass("active");
		$(this).addClass("active");

		if ($(this).hasClass("loyality")){
			$("#dooglysPlans .about-header").addClass("loyality");
		} else {
			$("#dooglysPlans .about-header").removeClass("loyality");
		}

		$("#dooglysPlans .panel-wrapper a[href=" + href + "]").closest("li").addClass("active");
		$("#dooglysPlans .panel-wrapper a[href=" + href + "]").css({
				left: -555,
				top: -10
			});

		$(href).show();

		return false;
	});

	$(".about-plans-wrapper .close").click(function(){
		var time = 400;
		var activeLink = $("#dooglysPlans .panel-wrapper li.active a");

		$(".about-plans-wrapper, .about-plans-wrapper .about-block").fadeOut();

		activeLink.stop().animate({
			left: activeLink.data("left"),
			top: activeLink.data("top")
		}, time);

		setTimeout(function(){
			$("#aboutList a, #dooglysPlans .panel-wrapper li").removeClass("active");
		},time);
		return false;
	});

	$(".about-plans-wrapper .textblock-wrapper").on("mousewheel",function(event, delta) {
        this.scrollTop -= (delta * 50);
      if (this.scrollTop > 0){
        $(this).closest(".scroll-wrapper").addClass("scrolling");
      } else {
        $(this).closest(".scroll-wrapper").removeClass("scrolling");
      }

      return false;
    });

    //Отзывы
    $(".full-slide-text").scrollbar();

    $(".reviews-slider .read-more").click(function(){
    	$($(this).attr("href")).show();
    	return false;
    });

    $(".full-slide .close").click(function(){
    	$(this).closest(".full-slide").hide();
    	return false;
    });

});

$(window).load(function () {
    $(window).trigger("resize");

    //Слайдер отзывов
	$("#reviewsSlider").cycle({
		fx: 'fade',
		speed: 1000, 
		timeout: 5000,
		prev: '#reviewsSliderPrev',
		next: '#reviewsSliderNext',
	});

    if (window.location.hash != ""){
        var scrollTopFirst = $(window).scrollTop();
        var scrollTopSecond = $(window).scrollTop();

        $('html, body').stop().animate({
                'scrollTop': 0
            }, 0, 'swing');

        $('html, body').stop().animate({
            'scrollTop': $(window.location.hash).offset().top
        }, 1000, 'swing', function () {});
    }
    
});