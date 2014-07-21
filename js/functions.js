// JavaScript Document
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var perc=1.4
$(document).ready(function() {
	    $('.mother-wrapper').height(h);
	$('#background').height(h).width(w);
	$('.overlay').height(h);
	//$('body').height(h);
	
	//dropdown();
});
window.onload=function(){

	$('#tagline').delay(500).slideToggle(1000);
	$('#warning').delay(2000).slideToggle(1000);
	$('#OK').delay(3000).slideToggle(500);
}
$('#background div').each(function(index, element) {
	var id=$(this).attr('id');
	$(this).css('background-image','url(images/svg/'+id+'.svg)');
	//$(this).delay(Math.random()*3000).animate({opacity:1},1000);
		//alert('hi');

	prefix($(this),'animation','fade 3s linear '+ $('#background div').index(this)/9*3 +'s infinite');
});
$('#OK').click(function(e) {
    $('aside').slideToggle(1000,function(){
		$('.mother-wrapper').show('fast');
		$('#background div').css('opacity',0.5);
		prefix($('#background div'),'animation','none');
		
	});
	init_positions();
});
var temp;
/*var tv=[140,140,h-80,h-80],lv=[50,50,50,50],yrot=[],xrot=[];
var zv=[];
var radius=[300,350,400,450];
var scale=[1,0.5,0.4,0.3];*/
function prefix(t,p,v){
		$(t).css(p,v);
		$(t).css("-webkit-"+p,v);
	$(t).css("-moz-"+p,v);
	$(t).css("-ms-"+p,v);

}


$('.mother-wrapper').on('mousemove',this,revolve);
function revolve(e) {
	var factor=50;
	prefix($(this),'transform','rotateY('+ (e.pageX-w/2)/factor +'deg)');
	//$('#portfolio0 .front p').html(e.pageX+","+e.pageY);
};


/*
function dropdown(){
	//$('.widget').css('margin-top','-100%');	
	$('.widget').each(function(index, element) {
        temp=Math.random();
		$(this).animate({marginTop:-90},500+2000*temp,"easeOutCubic");
    });
}*/
/*hover effects*/
$('.widget').not('#logo').on('mouseenter',this,inmouse);
$('.widget').not('#logo').on('mouseleave',this,outmouse);

function inmouse(e) {
    var id=$(this).attr('id');
	id=id.substring(0,id.length-1);
	temp=id+'0';							//get group class
	$('#'+temp).addClass('hovered');
	//flip the main box
	//$('#'+temp + " .content-wrapper").css('animation','flip 0.5s forwards');
	$('#'+temp + " .content-wrapper").toggleClass('flip');
	id=id+"-widget";
	$('.'+id).each(function(index, element) {	//add class hovered
        $(this).addClass('hovered');
    });
	
	/*dim everything else*/
	$('.widget').not('.hovered').not('#logo').each(function(index, element) {
		$(this).addClass('dimmed');
        if($(this).hasClass('layer2'))
			$(this).addClass('dimmed-layer2');
		else if($(this).hasClass('layer3'))
			$(this).addClass('dimmed-layer3');
		else if($(this).hasClass('layer4'))
			$(this).addClass('dimmed-layer4');
		else
			$(this).addClass('dimmed-main');
    });
};

function outmouse(e) {
    var id=$(this).attr('id');
	id=id.substring(0,id.length-1);
	temp=id+'0';
	$('#'+temp).removeClass('hovered');
	//$('#'+temp+" .content-wrapper").css('animation','flipback 0.5s forwards');
	$('#'+temp + " .content-wrapper").toggleClass('flip');
	id=id+"-widget";
	$('.'+id).each(function(index, element) {
        $(this).removeClass('hovered');
    });
	
	/*remove dimming*/
	$('.widget').not('.hovered').each(function(index, element) {
		$(this).removeClass('dimmed');
        if($(this).hasClass('layer2'))
			$(this).removeClass('dimmed-layer2');
		else if($(this).hasClass('layer3'))
			$(this).removeClass('dimmed-layer3');
		else if($(this).hasClass('layer4'))
			$(this).removeClass('dimmed-layer4');
		else
			$(this).removeClass('dimmed-main');
    });
};

var stack=["null","null"];
var head=-1;
$('.widget').not('#logo').on('click',this,arrange);
var type;
function arrange()
{
	t=$(this);
	type=t.attr('id');
	type=type.substring(0,type.length-1);
	var nodes=$('.'+type+'-widget');
		//remove widget handlers from all elements
	$('.widget').unbind('click');
	$('.widget').off('mouseenter').off('mouseleave');
	$('.mother-wrapper').off("mousemove");
	
	temp='#'+type+'0';
/*	if(temp=="#philosophy0")
		$(temp).addClass('active-top-left');
	if(temp=="#rates0")
		$(temp).addClass('active-bottom-left');
	if(temp=="#portfolio0")
		$(temp).addClass('active-top-right');
	if(temp=="#contact0")
		$(temp).addClass('active-bottom-right');*/

	var x,y,z,index,radius,n,angle;
	n=$('.'+type+'-widget').length;
	angle=360/n;
	radius=1.2*Math.min($(temp).width(),$(temp).height());
	//move sub widgets to circular position
	$('.'+type+'-widget').each(function(i, element) {
		x=0;y=0;z=0;
       index=$('.widget').index(this);
		x=radius*Math.cos(Math.PI/180*(90+i*angle));
		y=radius*Math.sin(Math.PI/180*(90+i*angle));
		x=x+0.5*w;
		y=-y+0.5*h;
/*		alert(x+","+y);*/
/*		x=x-0.5*$(this).width();
		y=y-0.5*$(this).height();*/
		$(this).addClass('active-sub').removeClass('hovered');
		prefix($(this),'transform','translateZ(10px) rotateY(0deg) rotateX(0deg) scale(0.8)');
		$(this).animate({left:x, top:y},500,"easeOutCubic",function(){
					$(this).on('click',this,zoomin);
			});

    });
		$('.overlay').css('display','block');
	$('.overlay p').html(type);
$('.sub .front p').slideToggle(500,"easeOutCubic");
		$('.overlay').animate({opacity:0.9},2000,"easeOutCubic");
		$('#cross').css('display','block');
}

//$('#cross').click(rearrange);
$('.overlay').click(rearrange);
function getlayer(t)
{	
	var layer;
	if($(t).hasClass('layer2'))
			layer=1;
		else if($(t).hasClass('layer3'))
			layer=2;
		else if($(t).hasClass('layer4'))
			layer=3;
		else
			layer=0;
	//alert($(t).attr('id')+" "+layer);
	return layer;
}
function rearrange(){
	$('.overlay').animate({opacity:0},500,"easeOutCubic");
	$('.sub .front p').slideToggle(500,"easeOutCubic");
	$('.overlay').css('display','none');
	
	$('.'+type+'-widget').each(function(i, element) {
       index=$('.widget').index(this);
		
		$(this).removeClass('active-sub');
		var layer=getlayer($(this));
		prefix($(this),'transform',"rotateX("+rot[index][0]+"deg) rotateY("+rot[index][1]+"deg) rotateZ(0deg) scale("+scale[layer]+") translateZ("+radius[layer]+"px)");
		$(this).animate({left:"50%", top:"50%"},500,"easeOutCubic");
    });
	temp='#'+type+'0';
/*	if(temp=="#philosophy0")
		$(temp).removeClass('active-top-left');
	if(temp=="#rates0")
		$(temp).removeClass('active-bottom-left');
	if(temp=="#portfolio0")
		$(temp).removeClass('active-top-right');
	if(temp=="#contact0")
		$(temp).removeClass('active-bottom-right');*/
	//$('.widget').not('#logo').on('click',this,arrange);
	$('.widget').not('#logo').on('mouseenter',this,inmouse);
	$('.widget').not('#logo').on('mouseleave',this,outmouse);
	$(temp).trigger('mouseleave');
	$('.mother-wrapper').on('mousemove',this,revolve);
	$('.widget').not('#logo').unbind('click').on('click',this,arrange);
}
 /*alert($(this).attr('id'));
 
 Math.PI/180*
 */
 var cx,cy;
function zoomin() {
    cx=$(this).css('left');
	cy=$(this).css('top');
	var id=$(this).attr('id');
	$('#'+id+" .content-wrapper").addClass('flip');
	$(this).addClass('viewing');
	$(this).animate({left:"50%",top:"50%"},500,"easeOutCubic",function(){
		prefix($(this),'transform',"rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1) translateZ(20px)");
		$(this).animate({height:"80%",width:"80%",marginLeft:"-40%",marginTop:"-20%"},500,"easeOutCubic");
	});
	$('.active-sub').not(this).addClass('inactive-viewing')//.animate({opacity:0.3},500,"easeOutCubic");
	$('.overlay p').animate({opacity:0.3},500,"easeOutCubic");
	$('.active-sub').unbind('click');
	//$('#cross').unbind('click').on('click',this,zoomout);
	$('.overlay').unbind('click').on('click',this,zoomout);
	
}
function zoomout() {
	var id=$('.viewing').attr('id');
	$('#'+id+" .content-wrapper").removeClass('flip');
	$('#'+id).removeClass('viewing').animate({left:cx,top:cy},500,"easeOutCubic");
	$('.active-sub').removeClass('inactive-viewing')//.animate({opacity:1},500,"easeOutCubic");
	prefix($('#'+id),'transform',"rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(0.8) translateZ(10px)");
	$('#'+id).animate({height:180,width:320,marginLeft:-160,marginTop:-90},500,"easeOutCubic");
	$('.active-sub').on('click',this,zoomin);
	//$('#cross').unbind('click').on('click',this,rearrange);
	$('.overlay').unbind('click').on('click',this,rearrange);
	$('.overlay p').animate({opacity:1},500,"easeOutCubic");
}
