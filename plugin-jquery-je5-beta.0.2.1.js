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
			function errors(e) {
				throw new errors('Error when booting the web cam');
			}			
			
            if(options){
                d = $.extend(options);
            }
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
			} else if(d.sort == 'media'){
				if($(this)[0].tagName == 'VIDEO') {
					if(d.link){
						var nLinks = d.link.split(',').length;
						if(d.codecs) {
							var nCodecs = d.codecs.split(',');
						}
						if(nLinks == 1) {
							var format = d.link.split('.').pop(-1);
							if(
								format == 'mp4' || 
								format == 'webm' || 
								format == 'ogg' ||
								format == 'ogv'
							) {
								tipe = 'video';
							}
							if(d.codecs) {
								video_je5 = $(this).attr('codecs', d.codecs);
							}
							video_je5 = $(this).attr('src', d.link);
							video_je5 = $(this).attr('tipe', tipe+'/'+format);					
						} if(nLinks > 1) {	
							var nl = d.link.split(',');
							for(a = 0; a < nLinks; a++) {
								var format = nl[a].split('.').pop(-1);
								b=a+1;
								if(format == 'mp4' || format == 'webm' || format == 'ogg') {
									tipe = 'video';
								}
								if(nCodecs) {
									var c = 'codecs="'+nCodecs[a]+'"';
								}
								video_je5 = $(this).append('<source tipe="'+tipe+'/'+format+'" '+c+' src="'+nl[a]+'">');
							}
						}
						if(d.auto) {
							video_je5 = $(this).prop('autoplay', true);
						}
						if(d.img){
							video_je5 = $(this).attr('poster', d.img);
						}
						if(d.width) {
							video_je5 = $(this).attr('width', d.width);						
						}
						if(d.height) {
							video_je5 = $(this).attr('height', d.height);						
						}
						if(d.muted) {
							video_je5 = $(this).prop('muted', true);
						}	
						if(d.controls) {
							video_je5 = $(this).prop('controls', true);
						}
						if(d.loop) {
							video_je5 = $(this).prop('loop', true);
						}
						if(d.preload) {
							video_je5 = $(this).prop('preload', d.preload);
						}					
						if(d.alert) {
							video_je5 = $(this).append(d.alert);
						}
					}
					video_je5 = false;
				} else if($(this)[0].tagName == 'AUDIO') {
					if(d.link){
						var nLinks = d.link.split(',').length;
						if(d.codecs) {
							var nCodecs = d.codecs.split(',');
						}
						if(nLinks == 1) {
							var format = d.link.split('.').pop(-1);
							if(format == 'mp3' || format == 'acc' || format == 'ogg') {
								tipe = 'audio';
							}
							if(d.codecs) {
								audio_je5 = $(this).attr('codecs', d.codecs);
							}
							audio_je5 = $(this).attr('src', d.link);
							audio_je5 = $(this).attr('tipe', tipe+'/'+format);					
						} if(nLinks > 1) {	
							var nl = d.link.split(',');
							for(a = 0; a < nLinks; a++) {
								var format = nl[a].split('.').pop(-1);
								b=a+1;
								if(
									format == 'mp3' || 
									format == 'm4a' || 
									format == 'acc' || 
									format == 'ogg' || 
									format == 'oga' || 
									format == 'webma' || 
									format == 'wav'
								) {
									tipe = 'audio';
								}
								audio_je5 = $(this).append('<source tipe="'+tipe+'/'+format+'" src="'+nl[a]+'">');
							}
						}
						if(d.auto) {
							audio_je5 = $(this).prop('autoplay', true);
						}
						if(d.muted) {
							audio_je5 = $(this).prop('muted', true);
						}	
						if(d.controls) {
							audio_je5 = $(this).prop('controls', true);
						}
						if(d.loop) {
							audio_je5 = $(this).prop('loop', true);
						}
						if(d.preload) {
							audio_je5 = $(this).prop('preload', d.preload);
						}					
						if(d.alert) {
							audio_je5 = $(this).append(d.alert);
						}
					}
					audio_je5 = false;
				}
			} else if(d.sort == 'webcam'){
				var v = false;
				var a = false;
				var snap = [];
				if(d.video) {
					v = true
				} 
				if(d.audio) {
					a = true
				}
				if(d.controls) {
					webcam_je5 = $(this).attr('controls', true);
				}				
				if(d.width) {
					webcam_je5 = $(this).attr('width', d.width);						
				}
				if(d.height) {
					webcam_je5 = $(this).attr('height', d.height);						
				}	
				if(d.muted) {
					webcam_je5 = $(this).attr('muted', true);						
				}
				if(d.autoplay) {
					webcam_je5 = $(this).attr('autoplay', true);						
				}
				
				if(d.id) {
					var cam = document.getElementById(d.id); 
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
							video:v,
							audio:a,
							controls:c
						}, ok, errors);
					} else {
						errors();
					}
				} else {
					alert('Need an id');
				}
				if(d.capture) {
					$(document).ready(function() {				
						 $('#'+d.btton_id).click(function() {
							if(d.video_in && d.video_out && d.scale) {
								var video  = document.getElementById(d.video_in);
								var output = document.getElementById(d.video_out);
								var w = video.videoWidth * d.scale;
								var h = video.videoHeight * d.scale;
								var canvas = document.createElement('canvas');
								canvas.width  = w;
								canvas.height = h;
								var ctx = canvas.getContext('2d');
								ctx.drawImage(video, d.x, d.y, w, h);
								snap.unshift(canvas);
								output.innerHTML = '';
								output.appendChild(snap[0]);
							} else {
								alert('An id of video and output and scale is necessary');
							}
						});
					});						
				}
			}
        });
    }
})(jQuery);
