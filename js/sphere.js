// JavaScript Document

var radius=[-850,-900,-1000,-1200];
var scale=[1,0.4,0.3,0.2];
var d=12.5;
var rot=[[0,0,0],[-d,d,0],[d,d,0],[-d,-d,0],[d,-d,0]];
var newX,newY;
function init_positions()
{
	$('.main').each(function(index, element) {
        var index=$('.widget').index(this);
		
		prefix($(this),'transform',"rotateX("+rot[index][0]+"deg) rotateY("+rot[index][1]+"deg) rotateZ(0deg) scale("+scale[0]+") translateZ("+radius[0]+"px)");
	
    });
	//alert('hi');
	$('.sub').each(function() {
			temp=Math.random();
			if(temp<0.3)
			{
				$(this).addClass('layer2');
				rotate($(this),1);
			}
			else if(temp<0.6)
			{
				$(this).addClass('layer3');
				rotate($(this),2);
			}
			else
			{
				$(this).addClass('layer4');
				rotate($(this),3);
			}
        });	
}
function rotate(t,layer)
{
	//var index=$('.widget').index(t);
	if(Math.random()>0.5)
	{
		newY=-10-Math.random()*40;
	}
	else
	{
		newY=10+Math.random()*40;
	}
	newX=-20+Math.random()*40;
	//alert(t.attr('id')+","+newX+","+newY);
	prefix(t,'transform',"rotateX("+newX+"deg) rotateY("+newY+"deg) rotateZ(0deg) scale("+scale[layer]+") translateZ("+radius[layer]+"px)");
	$.merge(rot,[[newX,newY,0]]);
}

