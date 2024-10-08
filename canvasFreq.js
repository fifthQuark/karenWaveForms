var canvas = document.getElementById("waveform")
var ctx = canvas.getContext("2d")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//The initial x and y values for the waveform
var x =0
var y= innerHeight/2
//The waveform color and key
var color ="green"
var initKey="g"
//The keypress is for switching between the faces
var rec="w"
var ang =1
//const audioContext = new (window.AudioContext || window.webkitAudioContext)()
const analyser = audioContext.createAnalyser()
analyser.fttSize=128
analyser.minDecibels=-60
analyser.smoothingTimeConstant=.8
analyser.channelCount=6
const bufferLength = analyser.frequencyBinCount
const dataArray = new Uint8Array(bufferLength)
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
    })
    .catch(err => {
        console.error('Error accessing audio input:', err);
    });


//Karens default face
function drawWaveform(){
   var k = 1
   if (rec !=initKey){
      return 0
   }
   requestAnimationFrame(drawWaveform)
   analyser.getByteFrequencyData(dataArray)
   ctx.beginPath()
   ctx.clearRect(0,0, innerWidth,innerHeight)
   ctx.strokeStyle=color
   ctx.lineWidth=10
   x=innerWidth/2.75
   y=innerHeight/2
   ctx.moveTo(0,y)
   ctx.lineTo(x,y)
   ctx.moveTo(x,y)
   for (var i=0; i<6; i++){
      ang*=-1
      var lk=ang*dataArray[i]/128*innerHeight/6
      if (i<3){
         k+=1
      } else{
         k-=1
      }
      ctx.lineTo(x+innerWidth/36, y+lk*k)
      ctx.moveTo(x+innerWidth/36, y+lk*k)
      ctx.lineTo(x+innerWidth/18,y)
      x+=innerWidth/18
      ctx.moveTo(x,y)
   }
   ctx.lineTo(innerWidth,y)
   ctx.stroke()
   
}
//Shows the icon
function icon(){
   ctx.clearRect(-10,-10, innerWidth,innerHeight)
   const logo = new Image();
   logo.addEventListener("load", () => {
      ctx.drawImage(logo, 0, 0);
    });    
   logo.src="icon.svg"
}
function gui(){

}
document.querySelector('button').addEventListener('click', function() {
   audioContext.resume().then(() => {
     console.log('Playback resumed successfully');
   });
   var button = document.getElementById('start')
   button.style.display="none"
 });

document.addEventListener('keydown', (event) => {
   rec=event.key
   if (rec=="1"){
      audioContext.resume()
   }
  if (rec=="g"){
   color="green"
   initKey="g"
   drawWaveform()
  }
  if (rec=="r"){
   color="red"
   initKey="r"
   drawWaveform()
  }
  if (rec=="l"){
   icon()
  }
});