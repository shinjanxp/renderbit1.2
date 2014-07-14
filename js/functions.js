// JavaScript Document
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
$(document).ready(function() {
    $('#mother-wrapper').height(h);
	//$('body').height(h);
	init_positions();
	alert(tv);
	alert(tv.length);
	dropdown();
});
var temp;
var tv=[5,5,65,65],lv=[];
function init_positions(){
		$('.sub').each(function() {
			temp=Math.random();
			if(temp<0.3)
				$(this).addClass('layer2');
			else if(temp<0.6)
				$(this).addClass('layer3');
			else
				$(this).addClass('layer4');
			$.merge(tv,[(0.8*h)*Math.random()]);
			$(this).css('top',(0.8*h)*Math.random()+'px');
        });
		
		$('.philosophy-widget').each(function(index, element) {
            $(this).css('left',-20 + Math.random()*30+"%");
        });
		$('.rates-widget').each(function(index, element) {
            $(this).css('left',-20 + Math.random()*30+"%");
        });
		$('.portfolio-widget').each(function(index, element) {
            $(this).css('left',70 + Math.random()*30+"%");
        });
		$('.contact-widget').each(function(index, element) {
            $(this).css('left',70 + Math.random()*30+"%");
        });
		
}
$('#mother-wrapper').mousemove(function(e) {
	var factor=100;
    /*$('#philosophy').html(e.pageX);*/
	$(this).css('transform','rotateY('+ (e.pageX-w/2)/factor +'deg)');
	$(this).css('webkit-transform','rotateY('+ (e.pageX-w/2)/factor +'deg)');
	$(this).css('-moz-transform','rotateY('+ (e.pageX-w/2)/factor +'deg)');
	$(this).css('-ms-transform','rotateY('+ (e.pageX-w/2)/factor +'deg)');
});

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
$('.widget').click(function(e) {
    
});