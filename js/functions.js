// JavaScript Document
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
$(document).ready(function() {
    $('.mother-wrapper').height(h);
	$('.overlay').height(h);
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
$('.mother-wrapper').on('mousemove',this,rotate);
function rotate(e) {
	var factor=100;
	prefix($(this),'transform','rotateY('+ (e.pageX-w/2)/factor +'deg)');
/*	$('#portfolio0 .front p').html(e.pageX+","+e.pageY);
*/};



function dropdown(){
	$('.widget').css('margin-top','-100%');	
	$('.widget').each(function(index, element) {
        temp=Math.random();
		$(this).animate({marginTop:0},500+2000*temp,"easeOutCubic");
    });
}
/*hover effects*/
$('.widget').on('mouseenter',this,inmouse);
$('.widget').on('mouseleave',this,outmouse);

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
$('.widget').on('click',this,arrange);
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
	radius=1.2*Math.min($(temp).width(),$(temp).height());
	//move sub widgets to circular position
	$('.'+type+'-widget').each(function(i, element) {
		x=0;y=0;z=0;
       index=$('.widget').index(this);
		x=radius*Math.cos(Math.PI/180*(90+i*angle));
		y=radius*Math.sin(Math.PI/180*(90+i*angle));
		x=x+0.5*1.4*w;
		y=-y+0.5*h;
/*		alert(x+","+y);*/
		x=x-0.5*$(this).width();
		y=y-0.5*$(this).height();
		$(this).addClass('active-sub');
		$(this).animate({left:x, top:y},500,"easeOutCubic",function(){
					$(this).on('click',this,zoomin);
			});

    });
		$('.overlay').css('display','block');
	$('.overlay p').html(type);
$('.sub .front p').slideToggle(500,"easeOutCubic");
		$('.overlay').animate({opacity:0.9},500,"easeOutCubic");
		$('#cross').css('display','block');
}

//$('#cross').click(rearrange);
$('.overlay').click(rearrange);

function rearrange(){
	$('.overlay').animate({opacity:0},500,"easeOutCubic");
	$('.sub .front p').slideToggle(500,"easeOutCubic");
	$('.overlay').css('display','none');
	
	$('.'+type+'-widget').each(function(i, element) {
		x=0;y=0;z=0;
       index=$('.widget').index(this);
		x=lv[index];
		y=tv[index];
		$(this).removeClass('active-sub').removeClass('hovered');
		$(this).animate({left:x+"%", top:y},500,"easeOutCubic");
    });
	temp='#'+type+'0';
	if(temp=="#philosophy0")
		$(temp).removeClass('active-top-left');
	if(temp=="#rates0")
		$(temp).removeClass('active-bottom-left');
	if(temp=="#portfolio0")
		$(temp).removeClass('active-top-right');
	if(temp=="#contact0")
		$(temp).removeClass('active-bottom-right');
	$('.widget').on('click',this,arrange);
	$('.widget').on('mouseenter',this,inmouse);
	$('.widget').on('mouseleave',this,outmouse);
	$(temp).trigger('mouseleave');
	$('.mother-wrapper').on('mousemove',this,rotate);
	$('.widget').unbind('click').on('click',this,arrange);
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
	$(this).animate({left:"50%",top:"30%",marginLeft:"-10%"},500,"easeOutCubic");
	$('.active-sub').not(this).animate({opacity:0.3},500,"easeOutCubic");
	$('.active-sub').unbind('click');
	//$('#cross').unbind('click').on('click',this,zoomout);
	$('.overlay').unbind('click').on('click',this,zoomout);
	
}
function zoomout() {
	var id=$('.viewing').attr('id');
	$('#'+id+" .content-wrapper").removeClass('flip')
	$('#'+id).removeClass('viewing').animate({left:cx,top:cy,marginLeft:"0"},500,"easeOutCubic");
	$('.active-sub').animate({opacity:1},500,"easeOutCubic");
	$('.active-sub').on('click',this,zoomin);
	//$('#cross').unbind('click').on('click',this,rearrange);
	$('.overlay').unbind('click').on('click',this,rearrange);
}
