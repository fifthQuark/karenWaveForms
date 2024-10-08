document.addEventListener("DOMContentLoaded", function () {
    const sliderWrapper = document.getElementById('slider-wrapper');
    let options = ["Scale", "fft Size", "min Decibles", "Smoothing", "Channels", "Width"]
    let mins=[1,16, -200, .1,1,1]
    let maxs=[100,2048,100,1,16,100]
    let values = [1, 128, -60,.8,6, 20]
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
    // Create 6 sliders
    for (let i = 0; i <5; i++) {
        createSlider(i+1, options[i], mins[i],maxs[i],values[i]);
    }
});
