// Simlider_ver 1.0 16.04.03

// 루프기능 추가하기전 

var Simlider = (function(){
    
    function Simlider(id , option) {
        this.id = id || "#Simlider"; // 인자값이 없으면 #Simlider 로 받는다.
        this.slider = $(this.id); // $(#Simlider)         
        
        this.settings = {
            rollingSpeed : 500
        }
        
        //실행문 영역
        this.chkset(); // 값이 잘들어오는지 체크 
        this.resizeW(); // 리사이즈
        this.setWidth(); // 슬라이더 기본 레이어 셋팅
        this.pageBtn(); // page 셋팅
        this.pageClick(); // page 클릭
        this.arrowBtnSet(); // 이전 다음 버튼 셋팅
        this.arrowClickMove(); // 이전 다음 버튼 클릭시 움직임
        this.extend(this.settings,option) // 세부 옵션 셋팅
        
        //선언문 영역
        this.width = $(window).width(); 
        // this.width = $(window).width(); - 실행문 영역보다 위에서 선언하면 마크업상 ul li가 아래로 생성된후 width값을 가져오기 때문에 먼저 li가 일렬로 보이도록 셋팅을해주고 width값을 불러와야한다. 
        this.pageIdx = 0; // 버튼 인덱스 초기값 설정
        this.moveVal = 0; // 움직임값 초기화
        this.nowIdx = 0; // 현재 인덱스 초기화
        this.dir; // 없어도될것같은데 혹시몰라서...
        this.nowPlay = false;
        
    }
    
    Simlider.prototype.extend = function(defaultOption,userOption){
        $.extend(defaultOption,userOption);
    } // defaul 값과 사용자가 원하는 옵션값을 비교하여 default에 덮어씌운다.
    
    Simlider.prototype.resizeW = function(){
        var _this = this;
        $(window).on('resize',function(){
            _this.width = $(window).width();
            _this.moveVal = -(_this.width * _this.nowIdx); //  현재의 width값과 index 값을 곱하여 resize 후 움직일 값을 저장함 ( 물론 움직임은 left 기준에 -로 움직이니 미리 -를 넣어줌)
            _this.slider.css({'left' : _this.moveVal})
        })
    } // 리사이즈  
    
    Simlider.prototype.chkset = function(){    
        this.liLength = this.slider.find('li').length; // Simlider가 가지고있는 li 갯수 체크
    }; // 값이 잘들어오는지 체크  

    Simlider.prototype.setWidth = function(){
        var ulWidth = 100*this.liLength; // li의 갯수만큼의 width값을 ul에 부여 
        this.slider.css({'width' : ulWidth+'%'}); // 가변적 이므로 %로 위에서 계산된 ulWidth를 부여 
        this.liWidth = this.slider.find('li').css({'width' : 100/this.liLength+'%' }); // li기준에서 ulWidth가 100%이기 때문에 100에서 li의 갯수를 나눈 값을 퍼센트값으로 지정한다.  
        //this.moveVal = this.slider.find('li').width(); // 하나의  li갯수만큼 이동하기 때문에 이동값으로 li의 width값 저장
    }; // 초기 셋팅 메서드

    Simlider.prototype.pageBtn = function(){
        this.pageUl = $('<ul class=\'pageArea\'></ul>'); // page Ul 생성
        this.slider.after(this.pageUl); // page Ul을 Simlider 뒤에 넣는다.
        for(var i = 0; i<this.liLength; i++)
        {
            var pageLi = $('<li></li>'); // page ll 생성
            this.pageUl.append(pageLi); // page ul에 li 삽입
        } // li 갯수만큼 반복하여 버튼 생성
    } // page 버튼 셋팅 메서드

    Simlider.prototype.pageClick = function(){
        var _this = this;
        this.pageLi = this.pageUl.find('li'); 
        this.pageLi.on('click',function(){
            var pageIdx = $(this).index();
            _this.move(pageIdx); // move 메서드에 인덱스값을 넘김
        })
    }

    Simlider.prototype.pageOn = function(){
        //console.log(this.pageIdx);
    }

    Simlider.prototype.arrowBtnSet = function(){
        this.prevBtn = $('<span class=\'prevBtn\'>이전</span>');
        this.nextBtn = $('<span class=\'nextBtn\'>다음</span>');
        this.slider.before(this.prevBtn);
        this.slider.after(this.nextBtn);
    } // 이전, 다음 버튼 셋팅 메서드

    Simlider.prototype.arrowClickMove = function(){
        var _this = this;
        this.prevBtn.on('click',function(){
            _this.limitedMove("left");
        });
        this.nextBtn.on('click',function(){
            _this.limitedMove("right");
        })
    }

    Simlider.prototype.limitedMove = function(dir){    
        var maxRightMove = -((this.liLength-1) * this.width);// 오른쪽 움직임은 left 기준으로 li 갯수의 -1 값만큼 이동 할수있다. 그러므로 최대 li갯수 * 현재 width값이 오른쪽으로 갈수있는 최대값.    
        if(dir === "left" && this.moveVal >= 0){
            return;
        }else if(dir === "right" && this.moveVal <= maxRightMove)
        {
            return;
        }
        //방향이 left고 moveVal이 +값이 되면 이동을 제한함
        //방향이 right고 moveVal이 maxRightMove 이상이면 이동을 제한함
        
        dir === "right" ? this.rightMove() : this.leftMove();// 오른쪽 클릭시 dir값이 right면 rightMove를 실행하고 아니면 left를 실행
    }

    Simlider.prototype.rightMove = function(){
        var _this = this;
        this.overlapHack(function(){
            _this.nowPlay = true;
            _this.nowIdx++; // 현재 인덱스 증가
            _this.moveVal -= _this.width; 
            _this.slider.animate({'left' : _this.moveVal},_this.settings.rollingSpeed,function(){
                _this.nowPlay = false;
            });
        })        
    }; // 오른쪽으로만 이동하는 메서드

    Simlider.prototype.leftMove = function(){
        var _this = this;
        this.overlapHack(function(){
            _this.nowPlay = true;
            _this.nowIdx--; // 현재 인덱스 감소
            _this.moveVal += _this.width;
            _this.slider.animate({'left' : _this.moveVal},_this.settings.rollingSpeed,function(){
                _this.nowPlay = false;
            });
        })        
    }; // 왼쪽으로만 이동하는 메서드

    Simlider.prototype.move = function(pageIdx){
        var _this = this;
        this.overlapHack(function(){
            _this.nowPlay = true;
            _this.nowIdx = pageIdx; // page index를 현재 index로 변경
            _this.moveVal = -(pageIdx * _this.width); // 클릭시 넘겨준 index값에 현재 width 값을 곱하여 그만큼 이동
            _this.slider.animate({'left' : _this.moveVal},_this.settings.rollingSpeed,function(){
                _this.nowPlay = false; //animate 후 콜백해줄 때 nowPlay를 false로 바꿔줌
            });
        })
        
    } // 값을받아 이동하게하는 기능만 있는 메서드
    
    Simlider.prototype.overlapHack = function(callback){
        if(this.nowPlay === true)
        {
            return;
        }
        callback(); //리터럴함수에 이름을 붙여서 실행하는것임.
    } // Boolean true false 를 이용한 중복방지 콜백
    
    return Simlider;
    
}())



