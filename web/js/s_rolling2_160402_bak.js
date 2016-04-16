
var Simlider = (function($){

	$.fn.Simlider = function(options){
		console.log(this)
		var defaults = {
			
			button : "on",  // on 이면 이전,다음 버튼생성 off면 버튼 사라짐
			page : "on", // on 이면 paging 버튼 생성
			rolling : "on" // on이면 rolling 시작

		};

		var index = $(this).index();

		var slider = {};
		
		var doc = $(document);
		var _this = this; // $('#ul.Simlider') 
		var siderWrap = document.createElement('div');	// 최종으로 감싸는 영역 div 생성
		var siderArea = document.createElement('div');	// 보여지는 영역 div 생성
		var liNum = _this.find('li').length; // li의 갯수

		var liLast = _this.find('li:last');
		_this.find('li:first').clone().appendTo(this); // 앞부분 clone 생성
		liLast.clone().prependTo(this); //  뒷부분 clone 
		_this.find('li:eq(1)').addClass('on'); // clone을 제외한 첫번째 li에 index 값을 찾기 위한 on class 부여 
		//alert($('li.on').index())
		
		
		var liW = $('#Simlider li').width(); // li의 Width
		var	winW = $(window).width(); // window 사이즈
		var	winH = $(window).height(); // window 사이즈
		var viewW = winW * (liNum+2); // 롤링될 전체 사이즈
		_this.find('li').show(); // display된 visual 이미지를 show해라 ( css에서 1번 이미지를 제외하고 모두 display:none; 처리 해놓음 ) 

		siderWrap.setAttribute('id','sliderWrap') // siderWrap ID값부여 
		siderArea.setAttribute('id','sliderArea') // siderArea ID값부여 
		_this.wrap(siderArea).wrap(siderWrap); // 아이디 값을 준 ul를 #siderArea 로 감싸다. #siderArea 를 #siderWrap 로 감싸다.
				

		_this.prevBtn = function(){
			var prev = document.createElement('span');	// 이전버튼 span 생성
			prev.innerHTML = '이전 버튼' // 접근성을 위한 텍스트 삽입
			prev.setAttribute('class','prevBtn'); // 이전버튼에 class값 prevBtn 부여
			_this.before(prev); // #Simlider 이전의 위치에 삽입
		}

		_this.nextBtn = function(){
			var next = document.createElement('span');	// 다음버튼 span 생성
			next.innerHTML = '다음 버튼' // 접근성을 위한 텍스트 삽입
			next.setAttribute('class','nextBtn'); // 다음버튼에 class값 nextBtn 부여
			_this.after(next); // #Simlider 이후의 위치에 삽입
		}

		_this.page = function(){
			var pageUl = document.createElement('ul');	// paging ul 생성
			pageUl.setAttribute('class','pageArea'); // 다음버튼에 class값 nextBtn 부여
			for(var i = 1; i <= liNum; i++)
			{	
				//console.log(pageUl);				
				var pageLl = document.createElement('li');
				pageLl.setAttribute('class','page'+i); 
				$(pageLl).appendTo(pageUl); // 이미지 갯수에 따른 paging li 버튼 생성
			}
			_this.before(pageUl); // #Simlider 이전의 위치에 삽입
			var pageCenter = $(pageUl).width()/2;
			$(pageUl).css({'margin-left' : -pageCenter }); // 버튼 위치 가운데 정렬을 해주기위함.

			
			$(pageUl).find('li').click(function(){
				//alert($(this).index()); // page 의 index값
			})
		}


		var setElement = function(){
			//console.log(_this.settings);
			//console.log(_this.settings.page);
			_this.btn = btn(); // 버튼 셋팅
		} 

		function btn(){
			if(_this.settings.button == 'on') { _this.prevBtn(); _this.nextBtn(); } // option의 button값이 on이면 버튼을 실행해라.
			if(_this.settings.page == 'on') { _this.page(); } // option의 page값이 on이면 버튼을 실행해라.
			if(_this.settings.rolling == 'on') { setInterval(next,_this.settings.rollingSpeed) } // option의 page값이 on이면 rolling을 실행해라.
			
			$('.pageArea li').eq(0).addClass('select'); // 첫번째 page 버튼 on	

			$('.prevBtn').on({ mouseenter: function(){ // prevBtn 마우스오버 설정
				 $(this).stop(false,false).animate({'opacity' : '1'},200)
				 },
				 mouseleave: function(){
				  $(this).stop(false,false).animate({'opacity' : '0.5'},200)
				 }
			});

			$('.nextBtn').on({ mouseenter: function(){ // nextBtn 마우스오버 설정
				 $(this).stop(false,false).animate({'opacity' : '1'},200)
				 },
				 mouseleave: function(){
				  $(this).stop(false,false).animate({'opacity' : '0.5'},200)
				 }
			});

			doc.on('click','.prevBtn',prev)
			
			function prev(){  // prevBtn 클릭시 이동
				if($('li.on').index() <= 1) // 처음에서 맨뒤로갈때 
				{
					//alert('a');
					_this.filter(':not(:animated)').animate({'left' : '+='+liW},500,function(){ // liW 크기만큼 추가로 이동
						_this.css({"left" : -liW*liNum }) // 콜백으로 실제로 보여지는 위치를 -liW*liNum 로 이동
						_this.find('li').removeClass('on').eq(liNum).addClass('on');  // visual li on 설정 
						$('.pageArea li').removeClass('select').eq(liNum-1).addClass('select'); // page버튼 on 설정 
					})
				}
				else // 이전페이지 이동할때
				{	
					var nextIndex = $('li.on').index()-1;
						_this.filter(':not(:animated)').animate({'left' : '+='+liW},500, function(){
						_this.find('li').removeClass('on').eq(nextIndex).addClass('on');  // visual li on 설정 
						$('.pageArea li').removeClass('select').eq(nextIndex-1).addClass('select'); // page버튼 on 설정 
					})
				}	
			}


			doc.on('click','.nextBtn',next)
			
			function next(){  // nextBtn 클릭시 이동
				//alert($('li.on').index());
				if($('li.on').index() >= liNum) // 마지막에서에서 처음으로갈때 
				{
					_this.filter(':not(:animated)').animate({'left' : '-='+liW},500,function(){  // liW 크기만큼 추가로 이동
						_this.css({"left" : -liW }) // 콜백으로 실제로 보여지는 위치를 -liW*liNum 로 이동
						_this.find('li').removeClass('on').eq(1).addClass('on');  // visual li on 설정 
						$('.pageArea li').removeClass('select').eq(0).addClass('select'); // page버튼 on 설정 
					})
				}
				else// 다음페이지 이동할때
				{			
					var nextIndex = $('li.on').index()+1;
					//alert(nextIndex);
					_this.filter(':not(:animated)').animate({'left' : '-='+liW},500, function(){
						_this.find('li').removeClass('on').eq(nextIndex).addClass('on');  // visual li on 설정 
						$('.pageArea li').removeClass('select').eq(nextIndex-1).addClass('select'); // page버튼 on 설정 
					})
				}
			}
		}

		var init = function(){			
			_this.settings = $.extend({}, defaults, options); //  defaults값과 사용자가 사용할 options 값을 비교하여 사용자가 사용할 값으로 변경
			setElement(); //  Element 셋팅
			cssSet();
		}

		init(); // init 실행

		
		_this.__proto__.leftMove = function(){
			
		} // 왼쪽으로 이동하는 동작을 프로토타입에 담고 싶음.

		_this.__proto__.rightMove = function(){
			
		} // 오른쪽으로 이동하는 동작을 프로토타입에 담고 싶음.

		// 추후 반응형을 위한 css 설정 부분 //

		function cssSet(){
			_this.closest('#sliderArea').css({
				'width' : winW ,
				'overflow' : 'hidden',
				'height' : 'auto'
			});

			_this.css({
				'width' : viewW ,
				'height' : 'auto',
				'left' : -liW
			});

			_this.find('li').css({
				'width' : winW ,
				'height' : 'auto'
			});
		}


		
		// 그냥 해본거임.
		$(window).resize(function(){
			liW = $('#Simlider li').width(); // li의 Width
			winW = $(window).width(); // window 사이즈
			winH = $(window).height(); // window 사이즈
			viewW = winW * (liNum+2); // 롤링될 전체 사이즈
			
			_this.closest('#sliderArea').css({
				'width' : winW ,
				'overflow' : 'hidden',
				'height' : 'auto'
			});

			_this.css({
				'width' : viewW ,
				'height' : 'auto',
				'left' : -liW
			});

			_this.find('li').css({
				'width' : winW ,
				'height' : 'auto'
			});
		})

	}



}($))

