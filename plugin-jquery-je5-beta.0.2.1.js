///////////////////
// Author: Juan Chaves
// Email: juan.cha63@gmail.com
// URL: http://www.je5.es
// Version: 0.0.1
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
				
            if(options) {
                d = $.extend(options);
            }
			//type canvas
			if(d.sort=='canvas'){
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
							} else {
								alert('An id of video and output and scale is necessary');
							}
						});					
					}
				}
			//type svg
			} else if(d.sort == 'svg'){			
				if(d.draw) {
					d.app = $(this).append(makeTags(d.draw.type, d.draw.att, 'svg'));
					if(d.draw.type == 'text' && d.draw.att.id && d.draw.text) {
						$('#'+d.draw.att.id).append(d.draw.text);
					} 
					if(d.draw.type == 'tspan' && d.draw.att.id) {
						$('#'+d.draw.att.id).append(d.text);
					}
				}
			//type streaming
			} else if(d.sort == 'streaming'){			
				var express = require('express'), http = require('http');
				var app = express();
				var server = http.createServer(app);
				server.listen(d.ip);
				var io = require('socket.io').listen(server);
				io.sockets.on('connection',function(socket){
					socket.on('newFrame',function(img){
						io.sockets.emit('setFrame',img);
					});
				});
			}
        });
    }
})(jQuery);
