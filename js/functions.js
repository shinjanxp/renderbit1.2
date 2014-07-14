// JavaScript Document
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
$(document).ready(function() {
    $('#mother-wrapper').height(h);
	//$('body').height(h);
	init_positions();
	dropdown();
});
var temp;
var tv=[5,5,65,65],lv=[50,50,50,50];

function prefix(t,p,v){
	$(t).css(p,v);
	$(t).css("-webkit-"+p,v);
	$(t).css("-moz-"+p,v);
	$(t).css("-ms-"+p,v);
}
function init_positions(){
		$('.sub').each(function() {
			temp=Math.random();
			if(temp<0.3)
				$(this).addClass('layer2');
			else if(temp<0.6)
				$(this).addClass('layer3');
			else
				$(this).addClass('layer4');
			temp=(0.8*h)*Math.random();
			$.merge(tv,[temp]);
			$(this).css('top',temp+'px');
        });
		
		$('.philosophy-widget').each(function(index, element) {
			temp=-20 + Math.random()*30;
			$.merge(lv,[temp]);
            $(this).css('left',temp+"%");
        });
		$('.rates-widget').each(function(index, element) {
			temp=-20 + Math.random()*30;
			$.merge(lv,[temp]);
            $(this).css('left',temp+"%");
        });
		$('.portfolio-widget').each(function(index, element) {
			temp=70 + Math.random()*30;
			$.merge(lv,[temp]);
            $(this).css('left',temp+"%");
        });
		$('.contact-widget').each(function(index, element) {
			temp=70 + Math.random()*30;
			$.merge(lv,[temp]);
            $(this).css('left',temp+"%");
        });
		
}
$('#mother-wrapper').mousemove(function(e) {
	var factor=100;
	prefix($(this),'transform','rotateY('+ (e.pageX-w/2)/factor +'deg)');
/*	$('#portfolio0 .front p').html(e.pageX+","+e.pageY);
*/});

function dropdown(){
	$('.widget').css('margin-top','-100%');	
	$('.widget').each(function(index, element) {
        temp=Math.random();
		$(this).animate({marginTop:0},500+2000*temp,"easeOutCubic");
    });
}
/*hover effects*/
$('.widget').mouseenter(function(e) {
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
	$('.widget').not('.hovered').each(function(index, element) {
        if($(this).hasClass('layer2'))
			$(this).addClass('dimmed-layer2');
		else if($(this).hasClass('layer3'))
			$(this).addClass('dimmed-layer3');
		else if($(this).hasClass('layer4'))
			$(this).addClass('dimmed-layer4');
		else
			$(this).addClass('dimmed-main');
    });
});

$('.widget').mouseleave(function(e) {
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
        if($(this).hasClass('layer2'))
			$(this).removeClass('dimmed-layer2');
		else if($(this).hasClass('layer3'))
			$(this).removeClass('dimmed-layer3');
		else if($(this).hasClass('layer4'))
			$(this).removeClass('dimmed-layer4');
		else
			$(this).removeClass('dimmed-main');
    });
});

/*$('.widget').click(function(e) {
   	alert("hi"); 
});*/
var stack=["null","null"];
var head=-1;
$('.widget').click(function(e) {

    if(head==-1)
	{
		arrange($(this));
	}
	else if(head==0)
	{
		view();
	}
});

function arrange(t)
{
	var type=t.attr('id');
	type=type.substring(0,type.length-1);
	var nodes=$('.'+type+'-widget');
/*	nodes.each(function(index, element) {
	alert($(this).attr('id'));
    });*/
	temp='#'+type+'0';
	if(temp=="#philosophy0")
		$(temp).addClass('active-top-left');
	if(temp=="#rates0")
		$(temp).addClass('active-bottom-left');
	if(temp=="#portfolio0")
		$(temp).addClass('active-top-right');
	if(temp=="#contact0")
		$(temp).addClass('active-bottom-right');

	var x,y,z,index,radius,n,angle;
	n=$('.'+type+'-widget').length;
	angle=360/n;
	radius=Math.min($(temp).width(),$(temp).height());
	$('.'+type+'-widget').each(function(i, element) {
		x=0;y=0;z=0;
       index=$('.widget').index(this);
		x=radius*Math.cos(Math.PI/180*(90+i*angle));
		y=radius*Math.sin(Math.PI/180*(90+i*angle));
		x=x+0.5*w;
		y=-y+0.5*h;
/*		alert(x+","+y);*/
		x=x-0.8*0.5*$(this).width();
		y=y-0.8*0.5*$(this).height();
		//alert(x+","+y);
		x=x-lv[index]*w/100;
		y=y-tv[index];
		alert(x+","+y);
		prefix($(this),"transform","translateX("+x+"px) translateY("+y+"px) translateZ(0px) scale(0.8)");
		
    });
}
 /*alert($(this).attr('id'));
 
 Math.PI/180*
 */