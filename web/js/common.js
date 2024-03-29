
var i = 1;
$(function(){
    
    $(window).on('load',function(){
        headerEffect();
        downArrow();
        openMenu();
        topBtn(); 
        $('.open').fadeOut(500);
    });
    
    $(window).on('resize',function(){
        headerEffect();
        downArrow();
        topBtn();
    });
    
})

function headerEffect(){    
    $(window).scroll(function(){
        if($(window).scrollTop() >= 10){
            $('.header').stop().fadeOut(500);
        }else{
            $('.header').stop().fadeIn(500);
        }
    })    
}

function portfolioOver(){
    $('.s_thum_view').mouseover(function(){
        var imgSrc = $(this).find('img').attr('src');
        $(this).find('img').attr('src',imgSrc.replace('_off','_on'));
    });
     $('.s_thum_view').mouseleave(function(){
        var imgSrc = $(this).find('img').attr('src');
        $(this).find('img').attr('src',imgSrc.replace('_on','_off'));
    })
}

function downArrow(){
    var portOffsetTop = $('.portfolio_wrap').offset().top;
    $('.down_arrow').on('click',function(){
        $('html,body').stop().animate({'scrollTop' : portOffsetTop });
    })
}





function openMenu(){
    
    $('.open_menu_bar').on('click',function(){
        $('.open_menu').fadeIn(500,function(){
            $('.open_menu .logo').stop().fadeIn(400).animate({'margin-top':'0'},400);
            $('.open_menu ul').stop().animate({'height' : '120px'},300)
        });
    });
    
    $('.menu_close').on('click',function(){
        $('.open_menu').fadeOut(500);
        $('.open_menu .logo').hide().css({'margin-top' : '-34px'});
            $('.open_menu ul').css({'height' : '0'})
    });
    
}

function topBtn(){
    var portPosTop = $('.portfolio_wrap').offset().top;
    $(window).scroll(function(){
        if($(window).scrollTop() >= portPosTop){
            $('.top_btn').stop().fadeIn(300);
        }else{
            $('.top_btn').stop().fadeOut(300);
        }
    })  
    
    $('.top_btn').on('click',function(){
        $('html,body').stop().animate({'scrollTop' : '0px'});
    })
    
}