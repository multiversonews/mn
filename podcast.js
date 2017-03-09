// Carrega a metada
var vid = document.getElementById("podcast");
vid.volume = 1;

// Cria os botões
function setVolumeZero() { 
    vid.volume = 0;
} 
function setVolumeHalf() { 
    vid.volume = 0.5;
} 
function setVolumeFull() { 
    vid.volume = 1;
} 
function setNormalSpeed() { 
    vid.playbackRate = 1.0;
} 
function setOneHalfSpeed() { 
    vid.playbackRate = 1.5;
} 
function setDoubleSpeed() { 
    vid.playbackRate = 2.0;
} 
function PlayPodcast() { 
    vid.play(); 
} 
function PausePodcast() { 
    vid.pause(); 
}
function StopPodcast() { 
    vid.pause(); 
	vid.currentTime = 0;
}
function gotoTIME(secs) { 
    vid.currentTime = secs;
} 

// Formata o tempo
function formatSecondsAsTime(secs, format) {
  var hr  = Math.floor(secs / 3600);
  var min = Math.floor((secs - (hr * 3600))/60);
  var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

  if (min < 10){ 
    min = "0" + min; 
  }
  if (sec < 10){ 
    sec  = "0" + sec;
  }
  
  if (hr < 1) {
  	return min + ':' + sec;
  }
  else {
  	return hr + ':' + min + ':' + sec;
  }
}


// Calcula e mostra quanto falta para acabar
vid.ontimeupdate = function() {ExibeTempo()};
function ExibeTempo() {
	MatOp = vid.duration - vid.currentTime;
	document.getElementById("toend").innerHTML = '-' + formatSecondsAsTime(MatOp);
}

// Cria as barras de play e buffer
var player = document.getElementById("podcast");
var progressBar = document.getElementById("playback-bar");
progressBar.addEventListener("click", seek);

function seek(e) {
    var percent = e.offsetX / this.offsetWidth;
    player.currentTime = percent * player.duration;
    progressBar.value = percent / 100;
}

var myAudio = document.getElementById('podcast');

myAudio.addEventListener('progressbarrr', function() {
var bufferedEnd = myAudio.buffered.end(myAudio.buffered.length - 1);
var duration =  myAudio.duration;
if (duration > 0) {
  document.getElementById('buffered-amount').style.width = ((bufferedEnd / duration)*100) + "%";
}
});

myAudio.addEventListener('timeupdate', function() {
var duration =  myAudio.duration;
if (duration > 0) {
  document.getElementById('progress-amount').style.width = ((myAudio.currentTime / duration)*100) + "%";
}
});

// Faz a barra de progresso clicável
$('#podcast').on('timeupdate', function() {
    $('#podcast #seekbar').attr("value", this.currentTime / this.duration);
});

// Cria a agulha que segue o cursor
var mouseX = 0, mouseY = 0, limitX = 9999, limitY = 150-15;
$('.needle').mousemove(function(e){
   $("#needleposition").show();
  var offset = $('.needle').offset();
    console.log(e);
   mouseX = Math.min(e.pageX - offset.left, limitX);
   if (mouseX < 0) mouseX = 0;
});

$('.podcast_player_wrapper').mouseleave(function() {
        $("#needleposition").hide(); 
});    
var follow = $("#needleposition");
var xp = 0;
var loop = setInterval(function(){
    // change 12 to alter damping higher is slower
    xp += (mouseX - xp) / 3;
    follow.css({width:xp});
    
}, 30);
$(document).ready(function(){
		$(".controls .podcast_play").click(function(){
			$(".controls .podcast_pause").removeClass("hide-b");
			$(".controls .podcast_play").addClass("hide-b");
			$(".play-warning").toggle();
		});
		$(".controls .podcast_pause").click(function(){
			$(".controls .podcast_play").removeClass("hide-b");
			$(".controls .podcast_pause").addClass("hide-b");
			$(".controls .play-warning").toggle();
		});
		$(".controls .podcast_onehalfspeed").click(function(){
			$(".controls .podcast_doublespeed").removeClass("hide-b");
			$(".controls .podcast_onehalfspeed").addClass("hide-b");
		});
		$(".controls .podcast_doublespeed").click(function(){
			$(".controls .podcast_normalspeed").removeClass("hide-b");
			$(".controls .podcast_doublespeed").addClass("hide-b");
		});
		$(".controls .podcast_normalspeed").click(function(){
			$(".controls .podcast_onehalfspeed").removeClass("hide-b");
			$(".controls .podcast_normalspeed").addClass("hide-b");
		});
		$(".controls .podcast_fullvolume").click(function(){
			$(".controls .podcast_mute").removeClass("hide-b");
			$(".controls .podcast_fullvolume").addClass("hide-b");
		});
		$(".controls .podcast_mute").click(function(){
			$(".controls .podcast_halfvolume").removeClass("hide-b");
			$(".controls .podcast_mute").addClass("hide-b");
		});
		$(".controls .podcast_halfvolume").click(function(){
			$(".controls .podcast_fullvolume").removeClass("hide-b");
			$(".controls .podcast_halfvolume").addClass("hide-b");
		});
});
