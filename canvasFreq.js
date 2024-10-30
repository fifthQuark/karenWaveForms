var canvas = document.getElementById("waveform")
var ctx = canvas.getContext("2d")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log("Cookie: " + document.cookie)
//The initial x and y values for the waveform
var vars = document.cookie.split(",")
console.log(vars)
var x =0
var y= innerHeight/2
//The waveform color and key
var color ="green"
var initKey="g"
//The keypress is for switching between the faces
var rec="w"
var ang =1
const audioContext = new (window.AudioContext || window.webkitAudioContext)()
const analyser = audioContext.createAnalyser()
analyser.fttSize=vars[1]
analyser.minDecibels=vars[2]
analyser.smoothingTimeConstant=vars[3]/10
analyser.channelCount=vars[4]
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
   var scale = vars[0]/10.0
   if (rec !=initKey){
      return 0
   }
   requestAnimationFrame(drawWaveform)
   analyser.getByteFrequencyData(dataArray)
   ctx.beginPath()
   ctx.clearRect(0,0, innerWidth,innerHeight)
   ctx.strokeStyle=color
   ctx.lineWidth=vars[5]
   x=innerWidth/16
   y=innerHeight/2
   y2=0
   ctx.moveTo(0,y)
   ctx.lineTo(x+1,y)
   ctx.moveTo(x+1,y)
   for (var i=0; i<16; i++){
      ang*=-1
      var lk=dataArray[i]/128*innerHeight/6
      if (i<8){
         k+=1
      } else{
         k-=1
      }
      y2=y+lk*k*scale
      if (innerHeight>y2 >0){
         y2=y + lk*ang*k*scale
      }else{
         y2=innerHeight/2+ ang*innerHeight/2
      }
      ctx.lineTo(x+innerWidth/36,y2)
      ctx.moveTo(x+innerWidth/36-1,y2)
      ctx.lineTo(x+innerWidth/18-1,y)
      x+=innerWidth/18
      ctx.moveTo(x-2,y)
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
   var press = document.getElementById('start')
   press.style.display="none"
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
  if (rec=="b"){
   window.location.href="index.html"
  }
});