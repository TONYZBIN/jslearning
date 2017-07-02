Date.prototype.updateSeconds = function(){
	this.setSeconds(this.getSeconds()+1);
}

Date.prototype.autoClock = function(isAuto){
  
   if(isAuto){
   	   Date.addToInterval(this);
   }

}

//定时器
Date.__interval = null;
//所管理的所有时间对象
Date.__dates = [];
//新增时间对象，纳入定时器更新管理范畴
Date.addToInterval = function(date){
   Date.__dates.push(date);
   if(!Date.__interval){
   	   Date.__interval = setInterval(function(){Date.updateDates();},1000);
   }
};

Date.updateDates = function(){
	console.log("update "+Date.__dates.length+" clocks!");
	for(var i=0;i<Date.__dates.length;i++)
	   Date.__dates[i].updateSeconds();
};


window.onload = ready;

function ready(){

	var clock1 = new Clock("clock");
	var clock2 = new Clock("clock2","北京",480);
	var clock3 = new Clock("clock3","墨尔本",600);
	var clock4 = new Clock("clock4","曼谷",420);
	var clock5 = new Clock("clock5","德黑兰",180);

}

function Clock(clockId,city,offset){

	this.city = city || "UTC";	
	offset = offset || 0;
	this.clockId = clockId;
	this.offset =(offset+new Date().getTimezoneOffset())*60*1000; //毫秒级别的时间偏移量
	this.clockTime = new Date(this.offset+new Date().getTime());    
    this.clockTime.autoClock(true);

    var that = this;
    setInterval(function(){that.updateDate();},1000);

}

Clock.version = "1.01";
Clock.author = "joeyang";

//把时钟所自带的Date对象的数据显示出来
Clock.prototype = {
       constructor:Clock,
       updateDate:function(){

						  var clockArea = document.getElementById(this.clockId);
						  clockArea.innerHTML = this.formatDigital(this.clockTime.getHours())
						                         +":"+this.formatDigital(this.clockTime.getMinutes())
						                         +":"+this.formatDigital(this.clockTime.getSeconds())+" "+this.city;		
		          },
	   formatDigital:function(num){
							if(num<10)
								return "0"+num;
							else
								return num;
					}
};


