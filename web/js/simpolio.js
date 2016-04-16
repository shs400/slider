// SimPolio_ver 1.3 16.04.09


var SimPolio = (function(){

    function SimPolio(id){
        this.id = id;
        this.simpolio = $(this.id) || '#simpolio'
        this.portLeft = 0;
        this.portTop = 0;
        this.width = this.simpolio.closest('.portfolio_view').width(); // 포트폴리오 부모 div의 크기
        
        
		this.chkWidth();
		this.animate(this.viewNum);
        this.resize(this.viewNum);
        
        
    }

	SimPolio.prototype.chkWidth = function(){
		if(this.simpolio.closest('.portfolio_view').width() < "800" && this.simpolio.closest('.portfolio_view').width() >= "660"){
			return this.viewNum = "3";
		}else if(this.simpolio.closest('.portfolio_view').width() < "660" && this.simpolio.closest('.portfolio_view').width() >= "420"){
			return this.viewNum = "2";
		}else if(this.simpolio.closest('.portfolio_view').width() < "420" && this.simpolio.closest('.portfolio_view').width() >= "5"){
			return this.viewNum = "1";
		}else{
			return this.viewNum = "4";
		}
	}
    
    SimPolio.prototype.set = function(wNum){ //wNum = 한줄당 들어갈수잇는 포트폴리오 갯수
        this.liLenght = this.simpolio.find('.s_thum_view').length;
        //console.log(this.liLenght);
        this.simpolio.find('.s_thum').css({
            'width' : 100/this.viewNum+'%'
        })
        
        this.thumWidth = this.simpolio.find('.s_thum').width();
        this.simpolio.find('.s_thum_view').css({
            'width' : this.thumWidth,
            'height' : this.thumWidth
        })
    }

	SimPolio.prototype.animate = function(wNum){
		
        this.set(this.viewNum);

		console.log('한줄갯수',this.viewNum);
        this.portW = this.simpolio.find('.s_thum').innerWidth();// 가로:세로 1:1 비율이여서 높이값에 대신 Width 값 사용됨.
        //this.portH = this.simpolio.find('.s_thum').innerHeight();
        //console.log('높이',this.portH );
        
        this.portLine = Math.ceil(this.liLenght/this.viewNum);
        console.log('라인수',':',this.portLine);
        
        var portLineH = this.simpolio.find('.s_thum').innerWidth();
        //console.log(this.portTop);
        for(var n=1; n <= this.portLine; n++){
            this.portLeft = 0 
            this.portTop += portLineH;
            console.log(portLineH);
            for(var i=0; i < this.viewNum; i++){
                this.simpolio.children('.s_thum:eq('+(this.viewNum*(n-1)+i)+')').animate({
                    'top' : this.portTop-portLineH,
                    'left' : this.portLeft},500);
                this.portLeft += this.portW;        
            }  
        }

		var aa = this.simpolio.find('img').height();
        this.viewHeight = this.portW*this.portLine;
        //console.log('썸높이',$('.s_thum').height());
        //console.log('이미지높이',$('.s_thum_view img'));
        //console.log('이미지높이',$('.s_thum_view img').height());
		//console.log($('.portfolio_view').width());
        this.simpolio.closest('.portfolio_view').css({'height' : this.viewHeight});
	}
    
    SimPolio.prototype.resize = function(wNum){

        var _this = this;
        $(window).on('resize',function(){			
			_this.chkWidth();
			_this.set(_this.viewNum);
            var resizePortLeft = 0;
            _this.resizeProtW = _this.simpolio.find('.s_thum').innerWidth();
            console.log(_this.resizeProtW);
			_this.resizePortLine = Math.ceil(_this.liLenght/_this.viewNum);
            _this.portLineH = _this.simpolio.find('.s_thum').innerHeight();
            var resizePortTop = 0;
            for(var n=1; n <= _this.resizePortLine; n++){
                resizePortLeft = 0 ;
                resizePortTop += _this.portLineH;
                for(var i=0; i < _this.viewNum; i++){
                    _this.simpolio.children('.s_thum:eq('+(_this.viewNum*(n-1)+i)+')').stop().animate({
                    'top' : resizePortTop-_this.portLineH,
                    'left' : resizePortLeft},300);
                    resizePortLeft += _this.resizeProtW; 
                }
            }
            _this.resizeViewHeight = _this.portLineH*_this.resizePortLine;
			console.log('라인',_this.resizePortLine);
            console.log('리사이즈높이',_this.resizeViewHeight);
			_this.simpolio.closest('.portfolio_view').stop().animate({'height' : _this.resizeViewHeight},300);
        })
    }
    
    SimPolio.prototype.wrapHeight = function(){ 
        this.simpolio.closest('.portfolio_view').css({'height' : this.viewHeight})
    }
    
    return SimPolio;
}())