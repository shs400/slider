
var i = 1;
$(function(){
    
    $(window).load(function(){
        headerEffect();
        downArrow();
        open_menu();
        //portfolioOver();
        //portfolioTimer();   
        $('.open').fadeOut(500);
    })
    $(window).resize(function(){
        headerEffect();
        downArrow();
    })
    
})

function headerEffect(){    
    var rollingH = $('.portfolio_wrap').offset();
    var headerH = $('header').innerHeight();
    //console.log('높이',rollingH.top);
    $(window).scroll(function(){
        if($(window).scrollTop() >= 10){
            $('header').stop().fadeOut(500);
        }else{
            $('header').stop().fadeIn(500);
        }
    })    
}

function portfolioOver(){
    $('.s_thum_view').mouseover(function(){
        var imgSrc = $(this).find('img').attr('src');
        //console.log(imgSrc.replace('_off','_on'));
        $(this).find('img').attr('src',imgSrc.replace('_off','_on'));
    });
     $('.s_thum_view').mouseleave(function(){
        var imgSrc = $(this).find('img').attr('src');
        //console.log(imgSrc.replace('_off','_on'));
        $(this).find('img').attr('src',imgSrc.replace('_on','_off'));
    })
}

function downArrow(){
    var portOffsetTop = $('.portfolio_wrap').offset().top;
    $('.down_arrow').on('click',function(){
        $('html,body').stop().animate({'scrollTop' : portOffsetTop });
    })
}



function portfolioTimer(){
    setInterval(portTimer,1000);
}

function portTimer(){
    var _this = $('#simpolio');
    var portCnt = $('.s_thum').length;
    var imgSrc;
    var beforSrc;
    if(i <= portCnt){  
        imgSrc = 'web/images/visual/main_img'+i+'_off.jpg'
        //console.log(i,'번');
        $('.s_thum:eq('+(i-1)+')').find('img').attr('src',imgSrc.replace('_off','_on'));
        i++;
        beforSrc = $('.s_thum:eq('+(i-3)+')').find('img').attr('src');
        $('.s_thum:eq('+(i-3)+')').find('img').attr('src',beforSrc.replace('_on','_off'));
    }else{
        return i = 1;
    }
}

function open_menu(){
    
    $('.open_menu_bar').on('click',function(){
        $('.open_menu').fadeIn(500);
    });
    
    $('.menu_close').on('click',function(){
        $('.open_menu').fadeOut(500);
    });
    
}