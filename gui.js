document.addEventListener("DOMContentLoaded", function () {
    const sliderWrapper = document.getElementById('slider-wrapper');
    let options = ["Scale", "fft Size", "min Decibles", "Smoothing", "Channels", "Width"]
    let mins=[1,16, -200, 1,1,1]
    let maxs=[100,2048,100,10,16,100]
    let values = [1, 128, -60,8,6, 10]
    // Function to create a slider with label
    function createSlider(id, label,min,max,value) {
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'slider-container';
        
        const sliderLabel = document.createElement('div');
        sliderLabel.className = 'slider-label';
        sliderLabel.innerHTML = `<span>${label}</span><span id="value${id}">${value}</span>`;
        
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = `${min}`;
        slider.max = `${max}`;
        slider.value = `${value}`;
        slider.id = `slider${id}`;
        
        slider.addEventListener('input', function () {
            document.getElementById(`value${id}`).textContent = slider.value;
        });
        
        sliderContainer.appendChild(sliderLabel);
        sliderContainer.appendChild(slider);
        sliderWrapper.appendChild(sliderContainer);
    }
    function loadCookie(){
        return document.cookie.split(",")

    }
    // Create 6 sliders
    var cookie = loadCookie()
    if (cookie[0] != "" || cookie[0] != null || cokkie[0]!=0){
        values=cookie
    }
    for (var i = 0; i <6; i++){
        createSlider(i, options[i], mins[i],maxs[i],values[i]);
    }

});
document.querySelector('button').addEventListener('click', function() {

    var strings=""
    for(var i =0; i<6; i++){
        strings += document.getElementById("slider" + i).value + ","
    }
    document.cookie = strings + ";" + "cookieMonster; SameSite=None; secure"
    var button = document.getElementById('page2')
    window.location.href="waveform.html"
  });