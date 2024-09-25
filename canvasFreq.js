var canvas = document.getElementById("waveform")
var ctx = canvas.getContext("2d")
//ctx.fillStyle="green"
//ctx.fillRect(40,40,100,130)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var x =0
var y= innerHeight/2
var r = 1
var v = .005
var rads =0
let ang =1
var k=30
// ctx.beginPath()
// ctx.bezierCurveTo(0, 200, 0, 400,300,100,)
const audioContext = new (window.AudioContext || window.webkitAudioContext)()
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
var k = 1
export function drawWaveform(){
   requestAnimationFrame(drawWaveform)
   analyser.getByteFrequencyData(dataArray)
   ctx.beginPath()
   ctx.clearRect(-10,-10, innerWidth,innerHeight)
   ctx.strokeStyle="green"
   ctx.lineWidth=5
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
      k=1
      ctx.lineTo(x+innerWidth/36, y+lk*k)
      ctx.moveTo(x+innerWidth/36, y+lk*k)
      ctx.lineTo(x+innerWidth/18,y)
      x+=innerWidth/18
      ctx.moveTo(x,y)
   }
   ctx.lineTo(innerWidth,y)
   ctx.stroke()
}
drawWaveform()
