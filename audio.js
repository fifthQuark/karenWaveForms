const audioContext = new (window.AudioContext || window.webkitAudioContext)()
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
    })
    .catch(err => {
        console.error('Error accessing audio input:', err);
    });
document.querySelector('button').addEventListener('click', function() {
   audioContext.resume().then(() => {
     console.log('Playback resumed successfully');
   });
   var button = document.getElementById('start')
   button.style.display="none"
 });
