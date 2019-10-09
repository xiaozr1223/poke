/*
* @Author: Administrator
* @Date:   2017-05-27 09:04:34
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-06 18:36:10
*/

'use strict';
$(function(){


let poke = [];
let color = ['h','c','s','d'];
//红桃  方块 黑桃  梅花
let biao = {};//存储已产生的扑克
//baio = {c_9:true,s_5:true}

// let dir = {
// 	'1':'A',
// 	'2':'2',
// 	'3':'3',
// 	'4':'4',
// 	'5':'5',
// 	'6':'6',
// 	'7':'7',
// 	'8':'8',
// 	'9':'9',
// 	'10':'T',
// 	'11':'J',
// 	'12':'Q',
// 	'13':'K',
// }

//产生
while(poke.length<52){
	let huase = color[Math.floor(Math.random()*4)];
	let shuzi = Math.floor(Math.random()*13+1);
	if(!biao[huase+"_"+shuzi]){
		biao[huase+"_"+shuzi]=true;
		poke.push({huase,shuzi});
	}
	console.log(poke);
}
//发牌
//
let index = 0;//用来记录当前发的第几张
for(let i=0;i<7;i++){
	for(let j=0;j<=i;j++){
		let item = poke[index];
		//item = {huase:'h',shuzi:5}
		index++;
		// let src = "url(img/"+dir[item.shuzi]+item.huase+'.png)';
		let src = "url(img/"+item.shuzi+item.huase+'.png)';
		$('<div>').addClass('poke').prop({id:i+"_"+j}).data('num',item.shuzi).css('backgroundImage',src)
		.delay(30*index).animate({left: 300-i*50+100*j,top: 50*i,opacity:1}).appendTo('.table')
	}
}

//可写可不写，但;必须写
for(;index<poke.length;index++){
	let item = poke[index];
		//item = {huase:'h',shuzi:5}
		// let src = "url(img/"+dir[item.shuzi]+item.huase+'.png)';
		let src = "url(img/"+item.shuzi+item.huase+'.png)';
		//poke zuo  分开
		$('<div>').css('backgroundImage',src).addClass('poke zuo').data('num',item.shuzi)
		.delay(30*index).animate({left: 100,top: 460,opacity:1}).appendTo('.table')
}


let first=null;
$('.poke').click(function(){
	//6,2  被  7,2  7,3  压着
	//'1_1'   
	//'1','1'
	//2,2
	//'#2_2'
	let zuob = $(this).prop('id').split('_');
	// parseInt(zuob[0])+1,zuob[1]
	// parseInt(zuob[1])+1,

	let ele = $(`#${parseInt(zuob[0])+1}_${zuob[1]}`)
	let ele1 = $(`#${parseInt(zuob[0])+1}_${parseInt(zuob[1])+1}`)
	// $('#ele')4
	console.log(ele,ele1)

//被压的不能起来
	if(ele.length||ele1.length){
		return;
	}
	$(this).toggleClass('active');
	if($(this).hasClass('active')){
		$(this).animate({top:'-=20'})
	}else{
		$(this).animate({top:'+=20'})
	}

	// console.log($(this).data('num'))//不是很理解
	  
	if(!first){
	 	first = this;
	 	if($(first).data('num')==13){
	 		$('.active').animate({top:0,left:600},function(){
	 			$(this).remove();
	 		})
	 	first = null;
	 	}
	}else{
	 	let sum = $(first).data('num')+$(this).data('num')
	 	if(sum == 13){
	 		$('.active').animate({top:0,left:600},function(){
	 			$(this).remove();
	 		})
	 	}else{
	 		$('.active').animate({top:'+=20'}).removeClass('active')
	 	}
	 	first = null;
	}
})

//队列才能延迟；

let moveR = $('.moveR');
let moveL = $('.moveL')

let z = 1;

moveR.on('click',function(){
	if($('.zuo').hasClass('active')){
		$('.zuo.active').animate({top:'+=20'}).removeClass('active')
		first = null;
	}
	z++;
	$('.zuo:last').css('zIndex',z).removeClass('zuo').addClass('you').animate({left:'+=400'})
})


// moveR.on('click',function(){
	// z++;
	// $('.zuo:last').css('zIndex',z).removeClass('zuo').addClass('you').animate({left:'+=400'})
// })


moveL.on('click',function(){
	let you = $(".you")
	if(you.length==0){
		return;
	}
	for(let i=you.length-1;i>=0;i--){
		$(you[i]).delay(30*i).removeClass('you').addClass('zuo').animate({left:'-=400'},function(){
			$(this).css('zIndex',0);//动画完成后再将层级调上来
		})
	}
})

})