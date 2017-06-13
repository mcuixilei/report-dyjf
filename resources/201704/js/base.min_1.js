if ("undefined" == typeof ZBD || !ZBD) var ZBD = {};
ZBD.namespace = function() {
    var i, j, d, a = arguments,
    o = null;
    for (i = 0; i < a.length; i += 1) for (d = ("" + a[i]).split("."), o = ZBD, j = "ZBD" == d[0] ? 1 : 0; j < d.length; j += 1) o[d[j]] = o[d[j]] || {},
    o = o[d[j]];
    return o
},
ZBD.lang = ZBD.lang || {},
ZBD.namespace("global.tabsFn"),
ZBD.global.tabsFn = function(current,options,content){
    var t = $('.'+options);
    t.click(function() {
        var _index = 0;
        _index = $(this).index();
        var $cnt = $('.'+content);
        t.removeClass(current);
        $(this).addClass(current);
        $cnt.hide().eq(_index).show();
        return false;
    });
},


ZBD.namespace("global.carousel"),
ZBD.global.carousel = function(){

    var glume = function(banners_id, focus_id) {
        this.$ctn = $('#' + banners_id);
        this.$focus = $('#' + focus_id);
        this.$adLis = null;
        this.$btns = null;
        this.switchSpeed = 5;//自动播放间隔(s)
        this.defOpacity = 1;
        this.crtIndex = 0;
        this.adLength = 0;
        this.timerSwitch = null;
        this.init();
    };
    glume.prototype = {
        fnNextIndex : function() {
            return (this.crtIndex >= this.adLength - 1) ? 0 : this.crtIndex + 1;
        },
        //动画切换
        fnSwitch : function(toIndex) {
            if (this.crtIndex == toIndex) {
                return;
            }
            this.$adLis.css('zIndex', 0);
            this.$adLis.filter(':eq(' + this.crtIndex + ')').css('zIndex', 2);
            this.$adLis.filter(':eq(' + toIndex + ')').css('zIndex', 1);
            this.$btns.removeClass('on');
            this.$btns.filter(':eq(' + toIndex + ')').addClass('on');
            var me = this;

            $(this.$adLis[this.crtIndex]).animate({
                opacity : 0
            }, 1000, function() {
                me.crtIndex = toIndex;
                $(this).css({
                    opacity : me.defOpacity,
                    zIndex : 0
                });
            });
        },
        fnAutoPlay : function() {
            this.fnSwitch(this.fnNextIndex());
        },
        fnPlay : function() {
            var me = this;
            me.timerSwitch = window.setInterval(function() {
                me.fnAutoPlay();
            }, me.switchSpeed * 1000);
        },
        fnStopPlay : function() {
            window.clearTimeout(this.timerSwitch);
            this.timerSwitch = null;
        },

        init : function() {
            this.$adLis = this.$ctn.children();
            this.$btns = this.$focus.children();
            this.adLength = this.$adLis.length;

            var me = this;
            //点击切换
            this.$focus.on('click', 'a', function(e) {
                e.preventDefault();
                var index = parseInt($(this).attr('data-index'), 10)
                me.fnSwitch(index);
            });
            this.$adLis.filter(':eq(' + this.crtIndex + ')').css('zIndex', 2);
            this.fnPlay();

            //hover时暂停动画
            this.$ctn.hover(function() {
                me.fnStopPlay();
            }, function() {
                me.fnPlay();
            });

            if ($.browser.msie && $.browser.version < 7) {
                this.$btns.hover(function() {
                    $(this).addClass('hover');
                }, function() {
                    $(this).removeClass('hover');
                });
            }
        }
    };


    return glume;
},


ZBD.namespace("PCT.process"),
ZBD.PCT.process = function(){

    var iconCls =  $('span.jingspan');
    if(iconCls){
        $('span.jingspan').each(function(){
            var pctVal = $(this).text()-0;
            if(typeof pctVal=='number'){
                $(this).text(pctVal+'%');
                $(this).addClass('icon-pct-'+pctVal)
            }else{
                $(this).text('0%');
            }
        });
    }
},

/*弹窗*/
ZBD.namespace("fn.popup"),
ZBD.fn.popup = function(parmsID,cls,closeID){
    var linkID = $("#"+parmsID);
    var maskID = $('#'+closeID);
    var cont = $('.'+cls).eq(0);
    linkID.bind('click',function(e){
        var _html = '';
        _html = $('<div id="ui-mask" style="position:fixed;left:0;right:0;top:0;bottom:0;background:#000;bottom:0;filter: alpha(opacity=75);opacity:0.75;z-index:99"></div>').prependTo('body');
        cont.show();
        return false;
    });

    $('#'+closeID).click(function(event) {
       cont.hide();
       $('#ui-mask').remove();
    });
},


ZBD.namespace("fn.popup2"),
ZBD.fn.popup2 = function(parms,num){
    var linkPrp = '';
    if($('#'+parms)){
        linkPrp = $('#'+parms);
        if(!num){
            linkPrp.bind('click',function() {
            var _html = '';
            selRechargeableList();//弹出页面
            return false;     
            });
            $('#popup-closed').live('click',function() {
                 $('#ui-mask').remove();
                $(this).closest('.ui-popup').remove();
               
            });
        }
        if(num ==2){
            linkPrp.bind('click',function() {
            var _html = '';
            showWithdrawList();
            return false;     
            });
            $('#popup-closed').live('click',function() {
            	 $('#ui-mask').remove();
                $(this).closest('.ui-popup').eq(0).remove();
            });        
        }
    }

 

    if($('.'+parms)!=' '){
        linkPrp = $('.'+parms);
        if(!num){
           linkPrp.bind('click',function() {
            var _html = '';
            _html = $('<div id="ui-mask"style="position:fixed;left:0;right:0;top:0;bottom:0;background:#000;bottom:0;filter: alpha(opacity=75);opacity:0.75;z-index:99"></div><div class="ui-popup"><div class="ui-popup-area"><div class="ui-popup-header"><span class="ui-popup-tit">提现记录</span><a id="popup-closed"class="ui-popup-link">关闭</a></div><table width="100%"border="0"cellpadding="0"cellspacing="0"><thead><th class="ui-popup-item-th">交易流水号</th><th class="ui-popup-item-th">提现金额</th><th class="ui-popup-item-th">日期</th><th class="ui-popup-item-th">状态</th></thead><tbody><tr><td>201456656</td><td>¥49,640.00</td><td>2014-6-19</td><td>状态</td></tr><tr><td>201456656</td><td>¥49,640.00</td><td>2014-6-19</td><td>状态</td></tr><tr><td>201456656</td><td>¥49,640.00</td><td>2014-6-19</td><td>状态</td></tr><tr><td>201456656</td><td>¥49,640.00</td><td>2014-6-19</td><td>状态</td></tr><tr><td>201456656</td><td>¥49,640.00</td><td>2014-6-19</td><td>状态</td></tr></tbody></table><div class="ui-sysymsg-pgbox"><div class="fn-clear"><div class="ui-pg-list"><a class="prev">上一页</a><a class="current"><span class="pc">1</span></a><a><span class="pc">2</span></a><a class="next">下一页</a><a class="pg-total">共2页</a></div></div></div><i class="ui-popup-footer"></i></div></div>').appendTo('body');
                return false;     
            });
            $('#popup-closed').live('click',function() {
                 $('#ui-mask').remove();
                 $(this).closest('.ui-popup').eq(0).remove();
            });
        }


        if(num == 2){
            linkPrp.bind('click',function() {
            var _html = '';
            _html = $('<div id="ui-mask"style="position:fixed;left:0;right:0;top:0;bottom:0;background:#000;bottom:0;filter: alpha(opacity=75);opacity:0.75;z-index:99"></div><div class="ui-popup-2"style="display:block"><div class="ui-popup-area-2"><div class="ui-popup-header"><span class="ui-popup-tit">珠宝贷<span>201308012235</span></span><a id="popup-closed"class="ui-popup-link">关闭</a></div><table width="565"border="0"cellpadding="0"cellspacing="0"><tbody><tr><td align="center" class="xian-bottom1">待还款总额</td><td align="center" class="xian-bottom1">本金应还款</td><td align="center" class="xian-bottom1">应还本金</td><td align="center" class="xian-bottom1">应还利息</td></tr><tr><td align="center" class="xian-bottom1">¥49,640.00</td><td align="center" class="xian-bottom1">¥49,640.00</td><td align="center" class="xian-bottom1">¥49,640.00</td><td align="center" class="xian-bottom1">¥49,640.00</td></tr></tbody></table><i class="ui-popup-footer"></i></div></div>').appendTo('body');
                return false;     
            });
            $('#popup-closed').live('click',function() {
                 $('#ui-mask').remove();
                 $(this).closest('.ui-popup-'+num).eq(0).remove();
            });

        }

    }

 

},
ZBD.namespace("fn.myPopup"),
ZBD.fn.myPopup = function(startID,closedCls,areaID){
    var goStar = $("#"+startID);
    var closedObj = $('.'+closedCls).eq(0);
    var _html = '';
    goStar.bind('click',function() {
            _html = $('<div id="ui-mask"style="position:relative;left:0;right:0;top:0;bottom:0;background:#000;bottom:0;filter: alpha(opacity=75);opacity:0.75;z-index:99"></div>').appendTo('body');
        $('#'+areaID).show();
        return false;
    });
    closedObj.bind('click', function() {
         $('#'+areaID).hide();
         $('#ui-mask').remove();
         return false;
    });


}



ZBD.namespace("fn.pop"),
ZBD.fn.pop = function(parms,num){
	var lN_NO=num;
	linkPrp = $('.'+parms);
	if($('.'+parms)){
		$.ajax({
			type : "POST",
			url : getHpoleURL()
					+ "/lntpayplandetail/memberCenter/sellntpayplandetailjson.do?LnNo="
					+ lN_NO,
			success : function(data) {
				var dataObj = eval("(" + data + ")");
				dataObj=dataObj.recentborrow;
				var qian=dataObj.lnBal-dataObj.aplLnAmt;
				vhtml = "";

				vhtml+= "<div id='ui-mask' style='position:fixed;left:0;right:0;top:0;bottom:0;background:#000;bottom:0;filter: alpha(opacity=75);opacity:0.75;z-index:99'></div>";
				vhtml+= "<div class='ui-popup-2' style='display:block'><div class='ui-popup-area-2'><div class='ui-popup-header'>";
				vhtml+= "<span class='ui-popup-tit'>"+dataObj.lnNm+"<span> </span></span>";
				vhtml+= "<a id='popup-closed' class='ui-popup-link'>关闭</a></div><table width='100%' border='0' cellpadding='0' cellspacing='0'>";
				vhtml+= "<tbody><tr><td class='fn-r'>已还金额：</td><td class='fn-l'>"+formatMoney(qian,2)+"元</td><td class='fn-r'>";
				vhtml+= "未还金额：</td><td class='fn-l'>"+dataObj.lnBal+"元</td></tr><tr><td class='fn-r'>借款期限：</td><td class='fn-l'>"+dataObj.aplLnTerm+dataObj.cLNTERMUNIT +"</td>";
				vhtml+= "<td class='fn-r'>还款方式：</td><td class='fn-l'>"+dataObj.cPayMeth+"</td></tr></tbody></table><i class='ui-popup-footer'></i></div></div>";
				$(vhtml).appendTo('body');
			}
		});
		
		
    
        $('#popup-closed').live('click',function() {
             $('#ui-mask').remove();
             $(this).closest('.ui-popup-2').eq(0).remove();
        });
	}
	
}

ZBD.namespace("fn.tou"),
ZBD.fn.tou = function(parms,num,value){
	
	var ln_no=num;
	var tx_no=value;
	linkPrp = $('.'+parms);
	if($('.'+parms)){
        	vhtml = "";
			vhtml+= "<div id='ui-mask' style='position:fixed;left:0;right:0;top:0;bottom:0;background:#000;bottom:0;filter: alpha(opacity=75);opacity:0.75;z-index:99'></div>";
			vhtml+= "<div class='ui-popup-2' style='display:block'><div class='ui-popup-area-2'><div class='ui-popup-header'>";
			vhtml+= "<span class='ui-popup-tit'>珠宝贷E货<span> </span></span>";
			vhtml+= "<a id='popup-closed' class='ui-popup-link'>关闭</a></div><table width='100%' border='0' cellpadding='0' cellspacing='0'>";
			vhtml+= "<tbody><tr><td class='fn-r'>已还金额：</td><td class='fn-l'>222222</td><td class='fn-r'>";
			vhtml+= "未还金额：</td><td class='fn-l'>3333333</td></tr><tr><td class='fn-r'>年化收益率：</td><td class='fn-l'>444444%</td>";
			vhtml+= "<td class='fn-r'>还款方式：</td><td class='fn-l'>5555555</td></tr></tbody></table><i class='ui-popup-footer'></i></div></div>";
			$(vhtml).appendTo('body');

       $('#popup-closed').live('click',function() {
             $('#ui-mask').remove();
             $(this).closest('.ui-popup-2').eq(0).remove();
        });
	}
	
};
ZBD.namespace("fn.myPopup"),
ZBD.fn.myPopup = function(startID,closedCls,areaID){
    var goStar = $("#"+startID);
    var closedObj = $('.'+closedCls).eq(0);
    var _html = '';
    goStar.bind('click',function() {
            _html = $('<div id="ui-mask"style="position:fixed;left:0;right:0;top:0;bottom:0;background:#000;bottom:0;filter: alpha(opacity=75);opacity:0.75;z-index:99"></div>').appendTo('body');
        $('#'+areaID).show();
        return false;
    });
    closedObj.bind('click', function() {
         $('#'+areaID).hide();
         $('#ui-mask').remove();
         return false;
    });


},
ZBD.namespace("fn.serviceMod"),
ZBD.fn.serviceMod = function(parmWrap,parmClosed){
    var $win = $(window);
    var serviceMod = $('#'+parmWrap);
    var serviceClosed = $('#'+parmClosed);
    function setServiceMod(){
        var w = Math.floor(serviceMod.outerWidth()/2);
        var h = Math.floor(serviceMod.outerHeight()/2);
       /* serviceMod.css({
            position: 'fixed',
            right: 0,
            top: '50%',
            marginLeft:-w,
            marginTop:-h
        });      */   
    }
    setServiceMod();
    serviceClosed.bind('click',function(event){
        event.preventDefault();
        $(this).parents("#service-mod").hide();
    })
    $win.resize(function() {
        setServiceMod();
    });
}



