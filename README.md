jquery-je5
==========

Plugin jquery to simplify the use of html5


The aim of this project is to make the interaction between javascript, jquery and HTML5 easier. We have started working with canvas, but our purpose is to expand it to all kind of components of HTML5, like sockets, etc.

<p>Section "Canvas"</p>
<p>Section "SVG"</p>
<p>Section "Animate"</p>
<p>Section "Media"</p>
<p>Section "Stats"</p>

Audio, video, webcam, Stats

Code example Stats Pie Graph
<a href="http://je5.es/je5-stats-scalable-vector-graphics-stats-pie-graph.html">Demo "Media" Stats Pie Graph</a>
<pre>
&lt;!DOCTYPE html&gt;
&lt;html&gt;
	&lt;head&gt;
		&lt;title&gt;je5 "stats" Scalable Vector Graphics stats Pie Graph&lt;/title&gt;&lt;meta charset="UTF-8"&gt;

			&lt;script src="http://code.jquery.com/jquery-latest.min.js"&gt;&lt;/script&gt;
			&lt;script src="http://je5.es/js/plugin-jquery/plugin-jquery-je5-beta.0.2.1.js"&gt;&lt;/script&gt;
			&lt;style&gt;
				svg {
					 cursor: pointer;
				}
			&lt;/style&gt;
	&lt;/head&gt;
	&lt;body&gt;
		&lt;svg id="pie" style="display:none" width="100%" height="900" viewBox="193 8 710 1806"&gt;&lt;/svg&gt;
	&lt;script type="text/javascript"&gt;
		$('#pie').je5({
			sort:'stats',
			draw:{
				type:'pie',
				att:{
					size:2,//scale pie
					data:{
						squares:{//colored squares, and titles
							att:{
								x:900,
								y:200,
								width:30,
								height:30
							},
							separation:50	
						},
						perc:[//sharing percentages
							10,
							20,
							30,
							10,
							10,
							20
						],
						'text-perc':{//style text percentages
							att:{
								fill:'#fff',
								'font-size':'180%',
								'font-family':'Arial',
								'text-anchor':'middle'
							},
							position:1.1
						},
						'text-titles':{//style text titles
							att:{
								x:944,
								y:226,
								fill:'red',
								'font-size':'180%',
								'font-family':'Arial',
								'text-anchor':'start'
							},
							separation:50
						},	
						balloon:{//balloons over portions
							att:{
								width:540,
								height:100,
								fill:'#fff',
								opacity:0.7,
								stroke:'#41f',
								'stroke-width':5,
								rx:3,
								ry:3
							},
							separation:50,
							text:{//style text balloons
								fill:'red',
								'font-size':'135%',
								'font-family':'Arial',
								'text-anchor':'start'
							},
							text_separation:{
								x:40,
								y:30
							},
							comments:{
								fill:'#000',
								'font-size':'140%',
								'font-family':'Arial',
								'text-anchor':'start'							
							},
							comments_separation:{
								x:10,
								y:60
							}							
						},						
						attrs:{/* it is not mandatory, only if you want some specific colors
							fill:[
								'purple', 
								'blue', 
								'orange', 
								'#000', 
								'#ccc', 
								'#ddd'
							],*/
							'stroke':[
								'#fff', 
								'#fff', 
								'#fff', 
								'#fff', 
								'#fff', 
								'#fff' 
							], 
							'stroke-width':[
								2, 
								2, 
								2, 
								2,
								2,
								2
							],
							titles:[
								'Cats:', 
								'Ducks:', 
								'Dolphins:', 
								'Horses:', 
								'Dogs:', 
								'Eagles:'
							],
							comments:[
								' &#9632; Domestic carnivorous mammal round head', 
								' &#9632; Aquatic birds Anseriformes flattened peak', 
								' &#9632; Whales and 2-3 m long, with large head',
								' &#9632; Mammal perissodactyle about 1,5 m. in height',
								' &#9632; Domestic carnivorous mammal of the family Canidae',
								' &#9632; raptors hawks, approximately 2 m wingspan'
							]					
						}
					}
				}	
			}
		}).show('slow');
		 	
	&lt;/script&gt;
	&lt;/body&gt;
&lt;/html&gt;
</pre>
Code example WebCam
<a href="http://je5.es/plugin-jquery-je5-media-section/jquery-je5-media-plugin-jquery-je5-media-webcam-examples-html.html">Demo "Media" WebCam je5</a>
<pre>
&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;script src="http://code.jquery.com/jquery-latest.min.js"&gt;&lt;/script&gt;
    &lt;script src="http://je5.es/js/plugin-jquery/plugin-jquery-je5-beta.0.2.1.js"&gt;&lt;/script&gt;  
    &lt;title&gt;Instant video and webcam with JE5 "MEDIA"&lt;/title&gt;
    &lt;meta charset="utf8"&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;table&gt;
      &lt;tr&gt;
        &lt;td&gt;&lt;/td&gt;
        &lt;td colspan="2"&gt;&lt;h1&gt;Instant webcam photo with je5 "Media"
		Chrome 32.0.1700.102 m Firefox 27.0&lt;/h1&gt;&lt;/td&gt;
      &lt;/tr&gt;
      &lt;tr&gt;    
        &lt;td&gt;&lt;video  id="video" autoplay&gt;&lt;/video&gt;&lt;/td&gt;
      &lt;/tr&gt;
    &lt;/table&gt;
    &lt;div style="border: solid 1px #ccc; padding: 10px; text-align: center;position:relative"&gt;
      &lt;p&gt;&lt;button id="cap"&gt;&lt;h2&gt;Capture Photo&lt;/h2&gt;&lt;/button&gt;&lt;/p&gt;
      &lt;div id="output" style="display: inline-block; top: 4px; position: relative ;border: dotted 1px #ccc; padding: 2px;"&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;script type="text/javascript"&gt;deo:true,
$('#video').je5({
	sort:{media:'capture'},//select webcam
	att:{
		video:true,
		audio:true,
		width:450,
		controls:false,
		muted:true
	},
	capture:{
		video_in:'video',//id capture
		video_out:'output',//id output img
		btton_id:'cap',//id button of capture img
		scale:0.7,//scale img
		x:0,//ini img x
		y:0//ini img y
	}
});
    &lt;/script&gt;    
  &lt;/body&gt;
&lt;/html&gt;
</pre>

Mores examples:
<a href="http://je5.es">je5 site</a>
