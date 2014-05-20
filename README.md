jquery-je5
==========

Plugin jquery to simplify the use of html5


The aim of this project is to make the interaction between javascript, jquery and HTML5 easier. We have started working with canvas, but our purpose is to expand it to all kind of components of HTML5, like sockets, etc.

Section "Canvas"
Section "SVG"
Section "Animate"
Section "Media"

Audio, video, webcam

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
