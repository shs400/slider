// Simlider_ver 1.0 16.04.04

// 루프기능 추가 (루프기능만 사용가능)

var Simlider = (function(){
    
    function Simlider(id , option) {
        this.id = id || "#Simlider"; // 인자값이 없으면 #Simlider 로 받는다.
        this.slider = $(this.id); // $(#Simlider)         
        
        this.settings = {
            btnPos : "right",
            pageShow : "on",  //         
            playSpeed : 1000, // 자동재생시 이동하는 스피드
            rollingSpeed : 500 // 클릭시 이동 하는 스피드 
        }
        
        this.pageIdx = 1; // 버튼 인덱스 초기값 설정
        this.nowIdx = 1; // 현재 인덱스 초기화
        
        
        //실행문 영역
        this.extend(this.settings,option) // 세부 옵션 셋팅
        this.setClone();
        this.chkset(); // 값이 잘들어오는지 체크 
        this.resizeW();
        this.setWidth(); // 슬라이더 기본 레이어 셋팅
        this.pageBtn(); // page 셋팅
        this.pageClick(); // page 클릭
        this.arrowBtnSet(); // 이전 다음 버튼 셋팅
        this.arrowClickMove(); // 이전 다음 버튼 클릭시 움직임
        this.playSet();
        this.playClick();
        this.pageOn(this.nowIdx);
        
        //선언문 영역
        this.width = $(window).width(); 
        // this.width = $(window).width(); - 실행문 영역보다 위에서 선언하면 마크업상 ul li가 아래로 생성된후 width값을 가져오기 때문에 먼저 li가 일렬로 보이도록 셋팅을해주고 width값을 불러와야한다. 
        
        this.slider.css({'left' : -this.width})
        this.moveVal = -this.width; // 움직임값 초기화
        this.dir; // 없어도될것같은데 혹시몰라서...
        this.nowPlay = false;
        this.pageLiLength = this.liLength-2; // 페이지 li갯수는 슬라이드 이미지 갯수가 클론으로 인하여 +2됬으므로 -2 해준다.
        console.log('현재 인덱스',this.nowIdx);
        console.log('page 인덱스',this.pageIdx);
        
        
    }
    
    Simlider.prototype.setClone = function(){
        this.firstLi = this.slider.find('li:first').clone();
        this.lastLi = this.slider.find('li:last').clone();
        this.slider.append(this.firstLi);
        this.slider.prepend(this.lastLi);
    }
    
    Simlider.prototype.extend = function(defaultOption,userOption){
        $.extend(defaultOption,userOption);
        this.settings.pageShow === "on" ? '' : this.pageWrap.remove();
    } // defaul 값과 사용자가 원하는 옵션값을 비교하여 default에 덮어씌운다.
    
    Simlider.prototype.resizeW = function(){
        var _this = this;
        $(window).on('resize',function(){
            _this.width = $(window).width();
            _this.moveVal = -(_this.width * _this.nowIdx); //  현재의 width값과 index 값을 곱하여 resize 후 움직일 값을 저장함 ( 물론 움직임은 left 기준에 -로 움직이니 미리 -를 넣어줌)
            _this.slider.css({'left' : _this.moveVal});
            console.log('현재 인덱스',_this.nowIdx);
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
        var _this = this;
        this.pageUl = $('<ul class=\'pageArea\'></ul>'); // page Ul 생성
        for(var i = 0; i<this.liLength-2; i++)
        {
            var pageLi = $('<li><a href=\'javascript:;\'>'+i+'번째 버튼</a></li>'); // page ll 생성
            this.pageUl.append(pageLi); // page ul에 li 삽입
        } // li 갯수만큼 반복하여 버튼 생성
        this.pageWrap = $('<div class=\'simPageWrap\'></div>')
        this.pageWrap.append(this.pageUl);
        this.slider.after(this.pageWrap); // page Ul을 Simlider 뒤에 넣는다.
        
        var pageWrapWidth = this.pageWrap.width();
        var setPos = {
            center : function(){
                _this.pageWrap.css({'left' : '50%', 'margin-left' : -pageWrapWidth/2})
            },
            left : function(){
                 _this.pageWrap.css({'left' : '0%'});
            },
            right : function(){
               _this.pageWrap.css({'left' : 'inherit', 'right' : '0%'});
            }
        }      
        setPos[this.settings.btnPos]();
        
    } // page 버튼 셋팅

    Simlider.prototype.pageClick = function(){
        var _this = this;
        this.pageLi = this.pageUl.find('li'); 
        this.pageLi.on('click',function(){
            if(_this.nowPlay === true){
                _this.nowPlay = false;
                return;
            }   
            var pageIdx = $(this).index()+1;
            _this.move(pageIdx); // move 메서드에 인덱스값을 넘김
            _this.pageOn(pageIdx);
            console.log('현재 인덱스',_this.nowIdx);            
            console.log('클릭한 인덱스',pageIdx);
        })
    }

    Simlider.prototype.pageOn = function(idx){
        var realIdx = idx - 1
        console.log(realIdx);
        this.pageUl.find('li').removeClass('select');
        this.pageUl.find('li:eq('+realIdx+')').addClass('select');
    }

    Simlider.prototype.arrowBtnSet = function(){
        this.prevBtn = $('<span class=\'prevBtn\'><a href=\'javascript:;\'>이전</a></span>');
        this.nextBtn = $('<span class=\'nextBtn\'><a href=\'javascript:;\'>다음</a></span>');
        this.slider.before(this.prevBtn);
        this.slider.after(this.nextBtn);
    } // 이전, 다음 버튼 셋팅 

    Simlider.prototype.arrowClickMove = function(){
        var _this = this;
        this.prevBtn.on('click',function(){
            _this.loopMove("left");
            _this.pageOn(_this.nowIdx);
        });
        this.nextBtn.on('click',function(){
            _this.loopMove("right");
            _this.pageOn(_this.nowIdx);
        })        
    }

    /* //move 제한 
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
    */    
    
    Simlider.prototype.loopMove = function(dir){    
        dir === "right" ? this.rightMove() : this.leftMove();// 오른쪽 클릭시 dir값이 right면 rightMove를 실행하고 아니면 left를 실행
    }

    Simlider.prototype.rightMove = function(){
        var _this = this;
        this.overlapHack(function(){
            _this.nowPlay = true;
            _this.nowIdx++; // 현재 인덱스 증가
            _this.pageIdx = _this.nowIdx; // 페이지 index와 현재 index를 동일하게 맞춤
            if(_this.nowIdx > _this.pageLiLength ){ // 현재 index가 페이지 갯수보다 커지면 
                _this.nowIdx = 1; // 현재 index를 1로 초기화
                _this.pageIdx = _this.nowIdx;
                _this.moveVal -= _this.width; 
                _this.slider.animate({'left' : _this.moveVal},_this.settings.rollingSpeed,function(){
                    _this.nowPlay = false;
                    _this.slider.css({'left': -_this.width}); // animate 후 초기의 left 값으로 css 변경하여 loop를 돌게 만듬.
                    _this.moveVal = -_this.width; // moveVal을 원래 초기값으로 바꿔줌
                });     
            }else{
                _this.moveVal -= _this.width; 
                _this.slider.animate({'left' : _this.moveVal},_this.settings.rollingSpeed,function(){
                    _this.nowPlay = false;
                });
            }
            _this.pageOn(_this.nowIdx); // if문 후에 현재 index값을 pageOn에 넣어줌
        })   
    }; // 오른쪽으로만 이동

    Simlider.prototype.leftMove = function(){
        var _this = this;
        this.overlapHack(function(){
            _this.nowPlay = true;
            _this.nowIdx--; // 현재 인덱스 감소
            if(_this.nowIdx < 1 ){ // 현재 index가 페이지 1 작아지면
                _this.moveVal += _this.width;
                _this.nowIdx = _this.pageLiLength;
                _this.pageIdx = _this.nowIdx;
                _this.slider.animate({'left' : _this.moveVal},_this.settings.rollingSpeed,function(){
                    _this.nowPlay = false;
                    _this.slider.css({'left': -_this.width*_this.pageLiLength}); // animate 후 초기의 left 값으로 css 변경하여 loop를 돌게 만듬.
                    _this.moveVal = -_this.width*_this.pageLiLength; // moveVal을 마지막 li 위치값으로으로 바꿔줌
                });
            }else{
                _this.pageIdx = _this.nowIdx;
                _this.moveVal += _this.width;
                _this.slider.animate({'left' : _this.moveVal},_this.settings.rollingSpeed,function(){
                    _this.nowPlay = false;
                });
            }  
            _this.pageOn(_this.nowIdx);           
        })        
    }; // 왼쪽으로만 이동

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
        
    } // 값을받아 이동하게하는 기능
    
        
    Simlider.prototype.playSet = function(){
        this.playBtn = $('<span class=\'simPlayBtn\'><a href=\'javacript:;\' class=\'s_play\'>재생</a></span>');
        this.pageWrap.append(this.playBtn);
    }
    
    Simlider.prototype.playClick = function(){
        var _this = this;
        this.playBtn.on('click',function(){
            if($(this).find('a').attr('class') == 's_play'){
                _this.setInter = setInterval(function(){
                    _this.rightMove();
                },_this.settings.playSpeed);
                $(this).find('a').attr({'class':'s_stop'}).html('정지');
            }else{
                clearInterval(_this.setInter);
                $(this).find('a').attr({'class':'s_play'}).html('재생');
            }  
        });
    }
    
    
    Simlider.prototype.overlapHack = function(callback){
        if(this.nowPlay === true)
        {
            return;
        }
        callback(); //리터럴함수에 이름을 붙여서 실행하는것임.
    } // Boolean true false 를 이용한 중복방지 콜백
    
    return Simlider;
    
}())



