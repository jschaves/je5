jquery-je5
==========

Plugin jquery to simplify the use of html5


The aim of this project is to make the interaction between javascript, jquery and HTML5 easier. We have started working with canvas, but our purpose is to expand it to all kind of components of HTML5, like sockets, etc.

Section "Canvas"

Rectangle examples of "jquery-je5 Canvas"
Circle examples of "jquery-je5 Canvas"
Line examples of "jquery-je5 Canvas"
Oval examples of "jquery-je5 Canvas"
Quadratic Curve examples of "jquery-je5 Canvas
Bezier Curve examples of "jquery-je5 Canvas"
Pattern examples of "jquery-je5 Canvas"
Text examples of "jquery-je5 Canvas"
Image examples of "jquery-je5 Canvas"

Section "Media"

Audio, video, webcam


Code example WebCam


<!DOCTYPE html>
<html>
  <head>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="http://je5.es/js/plugin-jquery/plugin-jquery-je5-beta.0.1.js"></script>  
    <title>Instant video and webcam with JE5 "MEDIA"</title>
    <meta charset="utf8">
  </head>
  <body>
    <table>
      <tr>
        <td></td>
        <td colspan="2"><h1>Instant webcam photo with je5 "Media" Chrome 32.0.1700.102 m Firefox 27.0</h1></td>
      </tr>
      <tr>    
        <td><video  id="video" autoplay></video></td>
      </tr>
    </table>
    <div style="border: solid 1px #ccc; padding: 10px; text-align: center;position:relative">
      <p><button id="cap"><h2>Capture Photo</h2></button></p>
      <div id="output" style="display: inline-block; top: 4px; position: relative ;border: dotted 1px #ccc; padding: 2px;"></div>
    </div>
    <script type="text/javascript">
      $('#video').je5({
        sort:'webcam',//select webcam
        id:'video',//id container
        video:true,
        audio:true,
        width:450,
        controls:true,
        muted:true,
        capture:true,//capture instant webcam
        video_in:'video',//id capture
        video_out:'output',//id output img
        btton_id:'cap',//id button of capture img
        scale:1,//scale img
        x:0,//ini img x
        y:0//ini img y
      });
    </script>    
  </body>
</html>
