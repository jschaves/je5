///////////////////
// Author: Juan Chaves
// Email: juan.cha63@gmail.com
// URL: http://www.je5.es
// Version: 0.2.1.3
// Plugin-jquery-je5
///////////////////
//////////////////
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.
//////////////////
(function($){
    $.fn.je5 = function(options){
        return this.each(function(){
			//Functions WEBCAM
			//Check the different engines that support
			function userMedia() {
				return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
			}
			//If getUserMedia the stream we collect is displayed.
			function ok(stream) {
				cam.src = window.URL.createObjectURL(stream);
			}
			//Error alert
			function errors() {
				alert('Error when booting the web cam');
			}
			//Functions Animate
			//animate
			function animation() {
				//informs the browser that you want to make an animation
				window.requestAnimationFrame = function() {
					return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
					function(f) {
						window.setTimeout(f, 1e3/60);
					}
				}();
				img.src=d.img;
				//non stop animation
				(function renderAnimation() {
					window.requestAnimationFrame(renderAnimation);
					je5.clearRect(0, 0, d.width, d.height);
					je5.fillStyle = d.fillStyle;
					je5.fillRect(0, 0, d.width, d.height);
					je5.drawImage(img, d.x, d.y, d.width, d.height);
									
					if(d.tox == 'left') {
						if(d.x > d.lxmin) {	
							d.x -= d.shiftx;
						}
					} else if(d.tox == 'right') {
						if(d.x < d.lxmore) {					
							d.x += d.shiftx;	
						} 
					}
					
					if(d.toy == 'up') {
						if(d.y > d.lymin) {
							d.y -= d.shifty;
						}
					} else if(d.toy == 'down') {
						if(d.y < d.lymore) {
							d.y += d.shifty;
						}
					}					
				}());							
			}
			//create tags
			function makeTags(tag, attrs, type) {
				if(type == 'svg') {
					var element = document.createElementNS('http://www.w3.org/2000/svg', tag);
					if(attrs['xlink:href']) {
						element.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', attrs['xlink:href']);
					}
				} else {
					var element = document.createElement(tag);
				}
				for (var k in attrs) {
					element.setAttribute(k, attrs[k]);
				}
				return element;
			}
			//conver Object to attributes
			function converObjectAttr(name, attr_) {
				for (var k in attr_) {
					$(name).attr(k, attr_[k]);
				}
			}
			
			//functions stats
			//Calculate position coordenates pie
			function calculate_position(this_, data, x1, y1, linetox, linetoy, a, arc) {
				//calcule case draw %   
				var casea = Math.atan((y1 - linetox) / (x1 - linetox));
				var caseb = Math.atan((y2 - linetox) / (x2 - linetox));
				var casec;
				//Case a
				if(
					(
						x1 < linetox &&
						y1 >= linetox
					) || (
						x1 < linetox &&
						y1 < linetox
					)
				) {
				casea = casea + Math.PI;
				}
				//case b
				if(
					(
						x2 < linetox &&
						y2 >= linetox
					) || (
						x2 < linetox &&
						y2 < linetox
					)
				) {
					caseb = caseb + Math.PI;
				}
				
				//case a
				if(casea < 0) {
					casea = casea + 2*Math.PI;
				}
				//case b
				if(caseb < 0) {
					caseb = caseb + 2*Math.PI;
				}
				//case c
				casec = (casea + caseb) / 2;
				if(casea > caseb) {
					casec = casec + Math.PI;
				}
				//get coordenates x y
				x_ = ((Math.cos(casec)) * (linetoy / data['text-perc'].position)) + linetox;
				y_ = ((Math.sin(casec)) * (linetoy / data['text-perc'].position)) + linetox;   
			}
			//render element svg
			function render_element(this_, element, order) {
				$(this_).je5({
					sort:'svg',
					draw:{
						type:'g',
						att:{
							id:element,
							'render-order':order
						}
					}
				}); 
			}
			//if text percent
			function text_perc(this_, a, d) {
				//draw % in pie	
				$('#text_perc').je5({
					sort:'svg',
					draw:{
						type:'text',
						att:{
							id:'text' + a,
							x:x_, 
							y:y_
						},
						app_:d.perc[a] + '%'
					}
				}); 
				//add rest attrs
				$('#text' + a).attr(d['text-perc'].att);
			}
			//if squares 
			function squares(this_, a, separation, attrs, arc_fill, type) {	
				//draw square in pie	
				$('#' + type).je5({
					sort:'svg',
					draw:{
						type:'rect',
						att:{
							id:type + a,
						}
					}
				}); 
				//increment position x
				var sep = separation;
				if(a > 0) {
					attrs.y += sep;
				}
				//Add rest attrs
				$('#' + type + a).attr(attrs).attr('fill', arc_fill);	
			}	
			//if balloon 
			function balloon(this_, a, d, type) {	
				//draw square in pie	
				$('#' + type).je5({
					sort:'svg',
					draw:{
						type:'rect',
						att:{
							id:type + a,
							display:'none'
						}
					}
				}); 
				//Add rest attrs
				$('#' + type + a).attr(d.att);	
			}	
			//if balloon 
			function text_balloon(this_, a, d, t, ts, type) {
				$('#' + type).je5({
					sort:'svg',
					draw:{
						type:'text',
						att:{
							id:type + a,
							display:'none'
						},
						app_:t
					}
				}); 
				//Add rest attrs
				d.x = d.x + ts.x;
				d.y = d.y + ts.y;
				$('#' + type + a).attr(d);	
			}				
			//if text titles
			function text_titles(this_, text_titles, a, text_attrs, porc) {
				//draw square in pie	
				$('#text_titles').je5({
					sort:'svg',
					draw:{
						type:'text',
						att:{
							id:'text-titel' + a,
						},
						app_:porc + '% ' + text_attrs
					}
				}); 
				//increment position x
				var sep = text_titles.separation;
				if(a > 0) {
					text_titles.att.y += sep;
				}
				//add rest attrs
				$('#text-titel' + a).attr(text_titles.att);	
			}

			//pie
			var x1, x2, y1, y2, x_, y_;
			function arcs(this_, data, attrs){
				//Get total value porcent array
				var linetox = 200 * attrs.size;
				var linetoy = 195 * attrs.size;

				var t = data.perc.reduce(
							function(ac, th) {
								return th + ac; 
							}, 0);
				//Get the areas from the sector Angle array
				var sector = data.perc.map(
								function(value) { 
									return 360 * value / t; 
								});
				//Start and End of Angle
				var ini = -90;
				var end = -90;
				
				//render position element svg
				render_element(this_, 'g', 1);	
				//if squares render element
				if(data.squares) {	
					render_element('#g', 'squares', 1);
				}								
				//render path
				render_element('#g', 'path');			
				//if text percent render element
				if(data['text-perc']) {
					render_element('#g', 'text_perc', 1);
				}	
				//if balloon render element
				if(data.balloon) {
					render_element('#g', 'balloon', 1);
					render_element('#g', 'text_balloon', 1);
					render_element('#g', 'comments_balloon', 1);
				}	
				//if text titles render element
				if(data['text-titles']) {
					render_element('#g', 'text_titles', 1);
				}		
				//each path 
				for (a = 0; a < sector.length; a++){
					ini = end;
					end = ini + sector[a];
					//Carculate coordinates
					x1 = parseInt(Math.round(linetox + linetoy * Math.cos(Math.PI * ini / 180)));
					y1 = parseInt(Math.round(linetox + linetoy * Math.sin(Math.PI * ini / 180)));
					x2 = parseInt(Math.round(linetox + linetoy * Math.cos(Math.PI * end / 180)));
					y2 = parseInt(Math.round(linetox + linetoy * Math.sin(Math.PI * end / 180)));
					
					if(end - ini > 180) {
						position = 1;
					} else {
						position = 0;					
					}
					//Path values
					var d = 'M' + linetox + ',' + linetox + ' L' + x1 + ', ' + y1 + ' A' + linetoy + ',' + linetoy + ' 0 ' + position + ',1 ' + x2 + ', ' + y2 + ' z';
					
					var arc = new Object();
				
					$.each(data.attrs, function(index, value) {
						arc[index] = value[a];
					}); 
					//if colors are not custom
					if(!data.attrs.fill) {
						var c_ = parseInt(a / sector.length * 360);
						arc.fill = 'hsl(' + c_ + ', 50%, 50%)';
					}
					//add atributes arc
					arc.d = d;
					arc.id = 'path' + a;
					arc.class = 'path';
					arc.ball = a;
					arc['pointer-events'] = 'all';
					arc.onmouseover = 'over_path(' + a + ', 1, \'path\')';
					arc.onmouseout = 'over_path(' + a + ', 0, \'path\')';
					//create pie portion
					var arc_ = makeTags('path', arc, 'svg');
					//add path
					$('#' + 'path').append(arc_)
					//calculate position text percent
					if(data['text-perc']) {
						calculate_position(this_, data, x1, y1, linetox, linetoy, a, arc);
						text_perc(this_, a, data)
					}					
					//if squares 
					if(data.squares) {	
						squares(this_, a, data.squares.separation, data.squares.att, arc.fill, 'squares');
					}					
					//if text titles
					if(data['text-titles']) {
						text_titles(this_, data['text-titles'], a, data.attrs.titles[a], data.perc[a])
					}					
					//if balloon
					if(data.balloon) {
						calculate_position(this_, data, x1, y1, linetox, linetoy, a, arc);
						data.balloon.att.x = x_;
						data.balloon.att.y = y_;
						data.balloon.att.onmouseover = 'over_path(' + a + ', 1, \'#balloon\')';
						data.balloon.att.onmouseout = 'over_path(' + a + ', 0, \'#balloon\')';
						balloon(this_, a, data.balloon, 'balloon');
						data.balloon.text.x = x_;
						data.balloon.text.y = y_;
						data.balloon.text.onmouseover = 'over_path(' + a + ', 1, \'#text_balloon\')';
						data.balloon.text.onmouseout = 'over_path(' + a + ', 0, \'#text_balloon\')';
						text_balloon(this_, a, data.balloon.text, data.attrs.titles[a], data.balloon.text_separation, 'text_balloon');
						data.balloon.comments.x = x_;
						data.balloon.comments.y = y_;	
						data.balloon.comments.onmouseover = 'over_path(' + a + ', 1, \'#comments_balloon\')';
						data.balloon.comments.onmouseout = 'over_path(' + a + ', 0, \'#comments_balloon\')';
						text_balloon(this_, a, data.balloon.comments, data.attrs.comments[a], data.balloon.comments_separation, 'comments_balloon');
					}
				}	
			}
			
			//end pie
			//bars
			function bar(this_, data, attrs){
				var spacing = attrs.spacing;//spacing between bars
				for(a = 0; a < attrs.percentage.length; a++) {//total bar count
					var c = attrs.color[a];//bar color
					var title = attrs.text[a];//Text data
					var i_ = attrs.id[a];//id bar
					var s_ = attrs.textstyle;//styles bars
					var idtext_ = attrs.idtext;//svg text id
					var tra_ = attrs.transform;//Rotate the bars. rotate to any values â€‹â€‹(0, 0, 0)
					if(attrs.orientation == 'v') {//orientation vertical (v) 
						var x_ = attrs.x;
						var y_ = spacing;//spacing between bars
						var t_ = attrs.thickness;
						var p_ = attrs.percentage[a];
					} else if(attrs.orientation == 'h') {//orientation horizontal (h)
						var x_ = spacing;//spacing between bars
						var y_ = attrs.y;//y position
						var t_ = attrs.percentage[a];//Percentage of each bar. the total must be 100
						var p_ = attrs.thickness;//thickness of the bars					
					}
					$(this_).je5({
						sort:'svg',
						draw:{
							type:'rect',
							att:{
								id:c,
								x:x_,
								y:y_,
								height:t_,
								width:p_,
								ry:attrs.ry,
								rx:attrs.rx,
								transform:tra_,
								title:title + ' ' + attrs.percentage[a],
								style: 'fill:' + c + ';' + attrs.style
							}
						}	
					});
					$('#' + idtext_).je5({
						sort:'svg',
						draw:{
							type:'text',
							att:{
								id:i_,
								x:attrs.thickness,
								y:attrs.percentage[a],
								style:'fill:' + c + ';' + s_
							},	
							app_:title + ' - ' + attrs.percentage[a]//append text
						}
					});
					spacing += attrs.spacing;//increase the separation between bars
				}
			}
			//end bar	
			//lines
			function line(this_, data, attrs){
				var x_ = attrs.center.x + attrs.zoomIn;
				var y_ = attrs.center.y - attrs.zoomIn;
				var y2 = attrs.center.y;
				for(x = 0; x < data.valuesy.length; x++) {
					yend = data.valuesy[x] * attrs.zoomIn;
					$(this_).je5({ 
						sort:'canvas', 
						draw:'line', 
						strokeStyle:data.strokeStyle, 
						lineWidth:data.lineWidth, 
						lineCap:data.lineCap, 
						moveTo_x:x_, 
						moveTo_y:y_, 
						lineTo_x:x_ + attrs.zoomIn, 
						lineTo_y:y2 - yend 
					});
					if(data.x.textx[x]) {
						$(this_).je5({ 
							sort:'canvas', 
							draw:'tex', 
							font:data.x.font, 
							text:data.x.textx[x], 
							fillStyle:data.x.fillStyle, 
							x:x_, 
							y:y2 - data.x.adjust
						});
					}
					if(data.y.texty[x]) {
						$(this_).je5({ 
							sort:'canvas', 
							draw:'tex', 
							font:data.y.font, 
							text:data.y.texty[x], 
							fillStyle:data.y.fillStyle, 
							x:attrs.center.x, 
							y:(attrs.center.y - attrs.zoomIn) - (attrs.zoomIn * x)
						});
					}
					x_ = x_ + attrs.zoomIn;
					y_ = y2 - yend;
				}
			}
			//end lines	
			//ini background
			function background(t, b, d) {
				$(t).delay(d).queue( function(next){ 
					$(t).css({
						'background' : 'url("' + b + '") no-repeat fixed center',
						'-webkit-background-size' : 'cover',
						'-moz-background-size' : 'cover',
						'-o-background-size' : 'cover',
						'background-size' : 'cover'
					});
					next(); 
				});
			}
			//end background
			
			//je5
            if(options) {
                d = $.extend(options);
            }
			//type canvas
			if(d.sort == 'canvas'){
                c=document.getElementById(this.id);
                var je5=c.getContext("2d");
                je5.beginPath();
                
                if(d.fillStyle){
                    je5.fillStyle=d.fillStyle;
                }
                if(d.strokeStyle){
                    je5.strokeStyle=d.strokeStyle;
                }
                if(d.shadow_c){
                    je5.shadowColor=d.shadow_c;
                    je5.shadowBlur=d.shadow_b;
                    je5.shadowOffsetX=d.shadow_ox;
                    je5.shadowOffsetY=d.shadow_oy;
                    d.shadow_c=false;
                }
                if(d.lineWidth){
                    je5.lineWidth=d.lineWidth;
                    d.lineWidth=false;
                }
                if(d.rotate){
                    je5.rotate(d.rotate);
                    d.rotate=false;
                }
                if(d.globalAlpha){
					je5.globalAlpha=d.globalAlpha;
                }                
                if(d.traslate_x && d.traslate_y) {
                    je5.translate(d.traslate_x, d.traslate_y);
                    d.traslate_x=false;
                    d.traslate_y=false;
                }
                switch(d.draw){
                    case 'rectangle':
                        je5.rect(d.x, d.y, d.width, d.height);
                    break;
                    case 'gradient':
                        je5.rect(d.x, d.y, d.width, d.height);
                        var grd = je5.createLinearGradient(d.x, d.y, d.width, d.height);
                        grd.addColorStop(0, d.color1);
                        grd.addColorStop(1, d.color2);
                        je5.fillStyle=grd;
                    break;
                     case 'delRectangle':
                         je5.clearRect(d.x, d.y, d.width, d.height);
                    break;
                    case 'line':
                        je5.moveTo(d.moveTo_x, d.moveTo_y);
                        je5.lineTo(d.lineTo_x, d.lineTo_y);
                        je5.lineCap=d.lineCap;
                    break;
                    case 'arc':
                        je5.arc(d.x, d.y, d.r, d.start*Math.PI, d.stop*Math.PI, d.clockwise);
                        if(d.clockwise){
                            d.clockwise=false;
                        }
                    break;
                    case 'circle':
                        je5.arc(d.x, d.y, d.r, d.start, d.stop*Math.PI, d.clockwise);
                        if(d.clockwise){
                            d.clockwise=false;
                        }
                    break;
                    case 'oval':
                        je5.save();
                        je5.scale(d.scale_x, d.scale_y);
                        je5.arc(d.x, d.y, d.r, 0, 2 * Math.PI, false);
                        je5.restore();
                    break;
                    case 'quadratic_curve':
                        je5.moveTo(d.x, d.y);
                        je5.quadraticCurveTo(d.x1, d.y1, d.x2, d.y2);
                    break;
                    case 'bezier_curve':
                        je5.moveTo(d.x, d.y);
                        je5.bezierCurveTo(d.x1, d.y1, d.x2, d.y2, d.x3, d.y3);
                    break;
                    case 'pattern':
                        var xPattern=d.x;
                        var yPattern=d.y;
                        var imageObj = new Image();
                        var widthPattern = d.width;
                        var heightPattern = d.height;
                        var r = d.repeat;
                        imageObj.onload = function() {
                            var pattern = je5.createPattern(imageObj, r);
                            je5.rect(xPattern, yPattern, widthPattern, heightPattern);
                            je5.fillStyle=pattern;
                            je5.fill();
                        };
                        imageObj.src = d.img;
                    break;
                    case 'img':
                        var img=new Image();
                        img.src=d.img;
                        var xImage=d.x;
                        var yImage=d.y;
                        var widthImg = d.width;
                        var heightImg = d.height;
                        img.onload = function(){
                            if(widthImg && heightImg){
                                je5.drawImage(img, xImage, yImage, widthImg, heightImg);
                            }else{
                                je5.drawImage(img, xImage, yImage);
                            }
                        }
                    break;
                    case 'imgCrop':
                        var img=new Image();
                        img.src=d.img;
                        var xImage=d.x;
                        var yImage=d.y;
                        var widthImg = d.width;
                        var heightImg = d.height;
                        var moveXImage=d.xMove;
                        var moveYImage=d.yMove;
                        var moveWidthImg = d.widthMove;
                        var moveHeightImg = d.heightMove;
                        img.onload = function(){
                            je5.drawImage(img, xImage, yImage, widthImg, heightImg, moveXImage, moveYImage, moveWidthImg, moveHeightImg);
                        }
                    break;
                    case 'tex':
                        je5.font=d.font;
                        if(d.fillStyle){
                            je5.fillText(d.text, d.x, d.y);
                            d.fillStyle=false;
                        }
                        if(d.strokeStyle){
                            je5.strokeText(d.text, d.x, d.y);
                            d.strokeStyle=false;
                        }
                    break;
                }
                if(d.closePath){
                    je5.closePath();
                    d.closePath=false;
                }
                if(d.fillStyle || grd){
                    je5.fill();
                    d.fillStyle=false;
    				grd=false;
                }
                if(d.strokeStyle){
                    je5.stroke();
                    d.strokeStyle=false;
                }
				if(d.sliding) {
					animation();
				}
			//type media
			} else if(d.sort.media) {
				//media video
				if(d.sort.media == 'video') {
					$(this).append(makeTags('source', d.att.source, 'source'));
					converObjectAttr($(this), d.att.video);
					if(d.att.alert) {
						$(this).append(d.att.alert);
					}
					d = false;	
				//media audio
				} else if(d.sort.media == 'audio') {
					$(this).append(makeTags('source', d.att.source, 'source'));
					converObjectAttr($(this), d.att.video);
					if(d.att.alert) {
						$(this).append(d.att.alert);
					}
					d = false;
				//media capture webcam
				} else if(d.sort.media == 'capture'){//captute instant webcam
					var snap = [];
					var cam_id = $(this).attr('id');
					converObjectAttr($(this), d.att);
					var cam = document.getElementById(cam_id); 
					//warns if UserMedia is supported by the browser
					if(userMedia()) {
						console.log('getUserMedia is supported on your browser');
					} else {
						alert('getUserMedia is not supported on your browser');
					}
					//Contain possible objects used by each browser
					navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
					window.URL = window.URL || window.webkitURL;
					//We check if there getUserMedia and if not launched a errors
					if(navigator.getUserMedia) {
						navigator.getUserMedia({
							video:d.att.video,
							audio:d.att.audio,
							controls:d.att.controls
						}, ok, errors);
					} else {
						errors();
					}
					//capture image
					if(d.capture) {	
						 $('#'+d.capture.btton_id).click(function() {
							if(d.capture.video_out && d.capture.scale) {
								var image_in  = document.getElementById(cam_id);
								var output = document.getElementById(d.capture.video_out);
								var w = image_in.videoWidth * d.capture.scale;
								var h = image_in.videoHeight * d.capture.scale;
								var canvas = document.createElement('canvas');
								canvas.width  = w;
								canvas.height = h;
								var ctx = canvas.getContext('2d');
								ctx.drawImage(image_in, d.capture.x, d.capture.y, w, h);
								snap.unshift(canvas);
								output.innerHTML = '';
								output.appendChild(snap[0]);
								dataStreaming = canvas.toDataURL('image/png');
							} else {
								alert('An id of video and output and scale is necessary');
							}
						});					
					}
				}
			//type svg
			} else if(d.sort == 'svg'){			
				if(d.draw) {
					$(this).append(makeTags(d.draw.type, d.draw.att, 'svg'));
					//append atributes
					if(d.draw.app) {
						$(d.draw.type).append(makeTags(d.draw.app.type, d.draw.app.att, 'svg'));
					} 
					//append text
					if(d.draw.app_) {
						$('#' + d.draw.att.id).append(d.draw.app_);
					} 					
				}
			//type stats
			} else if(d.sort == 'stats'){
				switch(d.draw.type){
					case 'pie':
						if(d.draw.att.data) {
							arcs(this, d.draw.att.data, d.draw.att); 
						}
                    break;
					case 'bar':
						if(d.draw.att) {
							bar(this, d.draw.att.data, d.draw.att); 
						}
                    break;
					case 'line':
						if(d.draw.att) {
							line(this, d.draw.att.data, d.draw.att); 
						}
                    break;
				}
			//type background 100% and animate
			} else if(d.sort == 'background'){
				var t = this;
				//array images
				var i_ = [];
				//preload imges
				for(a = 0; a < d.attrs.src.length; a++) {
					i_[a] = new Image();
					i_[a].src = d.attrs.src[a];
				}
				//play frames
				if(!d.attrs.change) {
					background(t, d.attrs.src[0], 0);
				} else {
					for(x = 0; x < d.attrs.change.rerun; x++) {
						for(a = 0; a < d.attrs.src.length; a++) {
							background(t, d.attrs.src[a], d.attrs.change.time);
						}
					}
				}
			}
        });
    }
})(jQuery);
//functions stats
//over path
function over_path(b, x, type) {
	if(type == 'path' && x == 1) {
		$('#balloon' + b + ', #text_balloon' + b + ', #comments_balloon' + b).attr('display', 'block');	
	} else if(type != 'path' && x == 1) {
		$('#balloon' + b + ', #text_balloon' + b + ', #comments_balloon' + b).attr('display', 'block');
	} else if(type == 'path' && x == 0) {
		$('#balloon' + b + ', #text_balloon' + b + ', #comments_balloon' + b).attr('display', 'none');
	} else if(type != 'path' && x == 0) {
		$('#balloon' + b + ', #text_balloon' + b + ', #comments_balloon' + b).attr('display', 'none');
	}			
}