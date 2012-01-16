/***********************************************
	
	From Widthy 0.1: Full Width Photosets for Tumblr
	(c) Fred Stevens-Smith (except Tumblr.lightbox code, (c) Tumblr)
	https://github.com/fredsterss/Widthy
	@fredsters_s
	fredstevenssmith.tumblr.com
	
	widthy-0.1.js:
	The code to interpret the dynamic photoset layout, chosen from within the Tumblr dashboard.
	
	including Tumblr.lightbox:
	http://engineering.tumblr.com/post/9294264070/building-a-faster-lightbox
	(c) Tumblr.
	

***********************************************/

// Tumblr.lightbox.
if(!Tumblr){var Tumblr={}}Tumblr.flashVersion=function(){if(navigator.plugins&&navigator.plugins.length>0){var mimeData=navigator.mimeTypes;if(mimeData&&mimeData["application/x-shockwave-flash"]&&mimeData["application/x-shockwave-flash"].enabledPlugin&&mimeData["application/x-shockwave-flash"].enabledPlugin.description){return parseInt(mimeData["application/x-shockwave-flash"].enabledPlugin.description.split(" ")[2].split(".")[0],10)}}else{if(navigator.appVersion.indexOf("Mac")==-1&&window.execScript){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");var version=axo.GetVariable("$version");return version.split(",")[0].split(" ")[1]}catch(e){}return 0}}};Tumblr.replaceIfFlash=function(version,element_id,replacement_string){if(Tumblr.flashVersion()>=version){document.getElementById(element_id).innerHTML=replacement_string}};Tumblr.renderVideo=function(element_id,src,width,height,flashvars){var agent=navigator.userAgent.toLowerCase();var is_iphone=(agent.indexOf("iphone")!=-1);if(is_iphone){document.getElementById(element_id).innerHTML='<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" width="'+width+'" height="'+height+'" codebase="http://www.apple.com/qtactivex/qtplugin.cab"><param name="src" value="'+src+'"><param name="qtsrc" value="'+src+'"><param name="autoplay" value="false"><embed src="'+src+'" qtsrc="'+src+'" width="'+width+'" height="'+height+'" pluginspage="http://www.apple.com/quicktime/"></embed></object>'}else{replaceIfFlash(10,element_id,'<embed type="application/x-shockwave-flash" src="http://assets.tumblr.com/swf/video_player.swf?22" bgcolor="#000000" quality="high" class="video_player" wmode="transparent" allowfullscreen="true" height="'+height+'" width="'+width+'" flashvars="file='+encodeURIComponent(src)+(flashvars?"&amp;"+flashvars:"")+'"></embed>')}};Tumblr.windowDimensions=function(){if(window.innerWidth!==undefined){return{width:window.innerWidth,height:window.innerHeight}}else{if(document.documentElement){return{width:document.documentElement.clientWidth,height:document.documentElement.clientHeight}}else{return{width:document.body.clientWidth,height:document.body.clientHeight}}}};Tumblr.Lightbox=(function(){var _initialized=false;var _original_onkeydown=false;var _original_onresize=false;var _image_urls=[];var _just_clicked_photo=false;var _position=false;var _cas=false;var _show_vignette_timeout=false;var _images={left:false,center:false,right:false};function init(image_urls,position){if(document.getElementById("tumblr_lightbox")){return}if(!position){position=1}_image_urls=image_urls;if(navigator&&navigator.userAgent.indexOf("Firefox")!=-1){var focus_input=document.createElement("input");focus_input.setAttribute("id","Tumblr_Lightbox_focus_input");focus_input.setAttribute("type","text");focus_input.style.position="fixed";focus_input.style.top=0;focus_input.style.left=0;document.body.appendChild(focus_input);focus_input.focus();document.body.removeChild(focus_input)}else{window.focus()}if(!_initialized){if(window.onkeydown){_original_onkeydown=window.onkeydown}window.onkeydown=function(e){if(document.getElementById("tumblr_lightbox")){if(!e){e=window.event}var code=e.charCode?e.charCode:e.keyCode;if(!e.shiftKey&&!e.ctrlKey&&!e.altKey&&!e.metaKey){if(code==37){if(_position>1){setPosition(_position-1)}}else{if(code==39){if(_position<_image_urls.length){setPosition(_position+1)}}else{if(code==27||code==32||code==74||code==75){close()}}}}else{if((e.ctrlKey||e.metaKey)&&code==87){close();return false}}}if(_original_onkeydown){_original_onkeydown()}};if(window.onresize){_original_onresize=window.onresize}window.onresize=function(){if(document.getElementById("vignette")){document.getElementById("vignette").style.display="none";if(_show_vignette_timeout){clearTimeout(_show_vignette_timeout)}_show_vignette_timeout=setTimeout(function(){document.getElementById("vignette").style.display="inline-block"},100)}draw();if(_original_onresize){_original_onresize()}};if(navigator&&navigator.userAgent.search("iPad")!=-1){document.addEventListener("touchmove",function(){close()},false)}_initialized=true}document.body.style.overflow="hidden";var container=document.createElement("div");container.setAttribute("id","tumblr_lightbox");if(navigator&&navigator.userAgent.search("iPad")!=-1){container.style.position="absolute";container.style.top=document.body.scrollTop+"px";container.style.height=window.innerHeight+"px"}else{container.style.position="fixed";container.style.top="0px";container.style.bottom="0px"}container.style.left="0px";container.style.right="0px";container.style.zIndex=4294967294;container.style.overflow="hidden";container.style.backgroundColor=(navigator&&navigator.userAgent.indexOf("MSIE")!=-1)?"#222":"rgba(15,15,15,0.95)";container.onclick=function(){if(_just_clicked_photo){_just_clicked_photo=false}else{close()}};if(!(navigator&&navigator.userAgent.search("iPad")!=-1)&&!(navigator&&navigator.userAgent.search("MSIE")!=-1)){var vignette=document.createElement("img");vignette.setAttribute("id","vignette");vignette.setAttribute("src","http://assets.tumblr.com/images/full_page_vignette.png");vignette.style.position="absolute";vignette.style.width="100%";vignette.style.height="100%";vignette.style.left="0px";vignette.style.top="0px";container.appendChild(vignette);var vignette_cover=document.createElement("div");vignette_cover.style.position="absolute";vignette_cover.style.width="100%";vignette_cover.style.height="100%";vignette_cover.style.left="0px";vignette_cover.style.top="0px";container.appendChild(vignette_cover)}var center_container=document.createElement("div");center_container.style.position="absolute";center_container.style.left="50%";center_container.style.top="50%";container.appendChild(center_container);var stages=["left","center","right"];while(stage_name=stages.pop()){var link=document.createElement("a");link.setAttribute("id","tumblr_lightbox_"+stage_name+"_link");link.setAttribute("href","#");if(_image_urls.length<2){link.style.cursor="default"}center_container.appendChild(link);var img=document.createElement("img");img.setAttribute("id","tumblr_lightbox_"+stage_name+"_image");img.setAttribute("src","http://assets.tumblr.com/images/x.gif");img.style.mozBorderRadius="3px";img.style.webkitBorderRadius="3px";img.style.borderRadius="3px";if(navigator&&navigator.userAgent.indexOf("Chrome")!=-1){img.style.moxBoxShadow="0 4px 30px rgba(0,0,0,1)";img.style.webkitBoxShadow="0 4px 30px rgba(0,0,0,1)";img.style.boxShadow="0 4px 30px rgba(0,0,0,1)"}img.style.borderWidth="0px";img.style.position="absolute";if(stage_name=="center"){img.style.zIndex=4294967295}link.appendChild(img)}var caption=document.createElement("div");caption.setAttribute("id","tumblr_lightbox_caption");caption.style.position="absolute";caption.style.textAlign="center";caption.style.font="bold 17px 'HelveticaNeue','Helvetica','Arial',sans-serif";caption.style.color="#fff";caption.style.paddingTop="20px";caption.style.textShadow="0 4px 30px rgba(0,0,0,1)";caption.style.display="inline-block";caption.style.textRendering="optimizeLegibility";center_container.appendChild(caption);document.body.appendChild(container);setPosition(position);draw()}function close(){document.body.style.overflow="";document.getElementById("tumblr_lightbox").style.display="none";document.body.removeChild(document.getElementById("tumblr_lightbox"))}function setPosition(position){_position=position;_cas=Math.round(Math.random()*1000000000000);document.getElementById("tumblr_lightbox_left_link").onclick=function(){_just_clicked_photo=true;setPosition(position-1);return false};if(_image_urls.length==1){document.getElementById("tumblr_lightbox_center_link").onclick=function(){return false}}else{if(position<_image_urls.length){document.getElementById("tumblr_lightbox_center_link").onclick=function(){_just_clicked_photo=true;setPosition(position+1);return false}}else{document.getElementById("tumblr_lightbox_center_link").onclick=function(){_just_clicked_photo=true;setPosition(1);return false}}}document.getElementById("tumblr_lightbox_right_link").onclick=document.getElementById("tumblr_lightbox_center_link").onclick;_images.left=false;_images.center=false;_images.right=false;loadImage("center",position-1);if(position>1){loadImage("left",position-2)}if(position<_image_urls.length){loadImage("right",position)}if(position+1<_image_urls.length){var preload_img=new Image();preload_img.src=_image_urls[position+1].low_res}}function loadImage(stage,image_offset){var high_res_img=new Image();var low_res_img=false;high_res_img.className=_cas;high_res_img.onload=function(){if(this.className==_cas){this.className="high-res";_images[stage]=this;draw()}};high_res_img.src=_image_urls[image_offset].high_res;if(!high_res_img.complete){low_res_img=new Image();low_res_img.className=_cas;low_res_img.onload=function(){if(this.className==_cas&&(!_images[stage]||_images[stage].className=="placeholder")){this.className="low-res";_images[stage]=this;draw()}};low_res_img.src=_image_urls[image_offset].low_res}if(_image_urls[image_offset].width&&_image_urls[image_offset].height){if(low_res_img){low_res_img.style.maxWidth=_image_urls[image_offset].width+"px";low_res_img.style.maxHeight=_image_urls[image_offset].height+"px"}high_res_img.style.maxWidth=_image_urls[image_offset].width+"px";high_res_img.style.maxHeight=_image_urls[image_offset].height+"px"}if(_image_urls[image_offset].width&&_image_urls[image_offset].height){_images[stage]=new Image(_image_urls[image_offset].width,_image_urls[image_offset].height);_images[stage].style.maxWidth=_image_urls[image_offset].width+"px";_images[stage].style.maxHeight=_image_urls[image_offset].height+"px";_images[stage].src="http://assets.tumblr.com/images/x.gif";_images[stage].className="placeholder"}}function draw(){var stages=["right","left","center"];while(stage_name=stages.pop()){var stage=document.getElementById("tumblr_lightbox_"+stage_name+"_image");if(!stage){continue}var image=_images[stage_name];if(!image){stage.style.display="none";continue}else{stage.style.display="inline-block"}var image_width=image.style.maxWidth?parseInt(image.style.maxWidth,10):image.width;var image_height=image.style.maxHeight?parseInt(image.style.maxHeight,10):image.height;if(Tumblr.windowDimensions().width/Tumblr.windowDimensions().height<image_width/image_height){var scale=(_image_urls.length==1)?0.85:0.75;if(Tumblr.windowDimensions().width*scale>image_width&&(image.className=="high-res"||image.style.maxWidth)){stage.style.width=image_width+"px";stage.style.height=image_height+"px"}else{stage.style.height=(image_height*((Tumblr.windowDimensions().width*scale)/image_width))+"px";stage.style.width=(Tumblr.windowDimensions().width*scale)+"px"}}else{if(Tumblr.windowDimensions().height*0.85>image_height&&(image.className=="high-res"||image.style.maxHeight)){stage.style.width=image_width+"px";stage.style.height=image_height+"px"}else{stage.style.width=(image_width*((Tumblr.windowDimensions().height*0.85)/image_height))+"px";stage.style.height=(Tumblr.windowDimensions().height*0.85)+"px"}}if(stage_name=="center"){stage.style.left=(0-parseInt(stage.style.width,10)/2)+"px";stage.style.top=(0-parseInt(stage.style.height,10)/2)+"px"}else{stage.style[stage_name]=(0-(parseInt(stage.style.width,10)+Tumblr.windowDimensions().width*0.42))+"px";stage.style.top=(0-parseInt(stage.style.height,10)/2)+"px"}stage.src=image.src;stage.style.backgroundColor=(image.className=="placeholder")?((navigator&&navigator.userAgent.indexOf("MSIE")!=-1)?"#444":"rgba(255,255,255,0.05)"):"transparent";if(stage_name=="center"&&_image_urls[_position-1].caption){document.getElementById("tumblr_lightbox_caption").innerHTML=_image_urls[_position-1].caption;document.getElementById("tumblr_lightbox_caption").style.width=(Tumblr.windowDimensions().width*0.7)+"px";document.getElementById("tumblr_lightbox_caption").style.top=(parseInt(stage.style.height,10)*0.5)+"px";document.getElementById("tumblr_lightbox_caption").style.left=(0-Tumblr.windowDimensions().width*0.35)+"px";document.getElementById("tumblr_lightbox_caption").style.display="block"}else{if(stage_name=="center"){document.getElementById("tumblr_lightbox_caption").style.display="none"}}}}return{init:init}})();function flashVersion(){return Tumblr.flashVersion()}function renderVideo(element_id,src,width,height,flashvars){Tumblr.renderVideo(element_id,src,width,height,flashvars)}function replaceIfFlash(version,element_id,replacement_string){Tumblr.replaceIfFlash(version,element_id,replacement_string)};


// Renders existing photoset by id and order
function render_photoset ( id, order ) {
  	
  	// Get the width of the containing div	
	var container_width = $("#" + id).width();
	
	// Array to hold the img order in
	var img_order = new Array();
	
	var counter = 0;
	
	// Transform the order array so that we can use if to set the widths per image, so from [3,1] to 0:3, 1:3, 2:3, 3:1
	for (var i = 0; i < order.length; i++) {
		
		var current_order = order[i];
		for (var j = 0; j < current_order; j++) {
			
			img_order[counter] = current_order;
			counter++;
			
		}
	}
	
	
	// Iterate through photoset divs, setting their width to the calculated amount, and swapping in hires versions if needed
	$("#" + id +" > .photoset_img").each(function(index) {
		
		// Calculate and set width of containing div
		var width = calculate_width( container_width, img_order[index] );
		$(this).css("width ", width[0] + "%");
		
		// Clear: left if new row
		if (img_order[index] !== img_order[(index-1)]) {
			$(this).css("clear", "left");
		}
		
		// If the image is larger than 500px, replace lores with hires
		if (width[1] > 500) {
			// Get the hires img url
			var hires = $(this).children(".highres").val();
			// Replace the image
			$(this).children(".image").attr("src", hires);
		}
	});
}

function calculate_width ( width, divisions ) {
	
	// Add 10px to the width so that the images are flush to the right of the container.
	var width_minus_margins = (width) - (divisions * 10);
	var width_of_image = width_minus_margins / divisions;
	var width_as_percentage = (width_of_image / width) * 100;
	
	// Return object with percentage and px sizing.
	return [width_as_percentage, width_of_image];
}
