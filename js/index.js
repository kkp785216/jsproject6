// Exercise 6

// you have to create an Alarm clock in javascript (Use your cretivity)
// Allow user to set alerm for a certain time

// Solving:
let currentTime = document.getElementById('currentTime');
let currentDate = document.getElementById('currentDate');
let time;
function showTime() {
    time = new Date();
    function formator(value) {
        if (value <= 9) {
            return `0${value}`;
        }
        else {
            return value;
        }
    }
    let hour;
    let ampm;
    if (time.getHours() <= 12) {
        hour = time.getHours();
        ampm = 'am';
    }
    else {
        hour = time.getHours() - 12;
        ampm = 'pm';
    }
    hour = formator(hour);
    let minute = time.getMinutes();
    minute = formator(minute);
    currentTime.innerText = `${hour}:${minute} ${ampm}`;
    let date = time.getDate();
    date = formator(date);
    let month;
    switch (time.getMonth()) {
        case 0: month = 'Jan'; break;
        case 1: month = 'Feb'; break;
        case 2: month = 'Mar'; break;
        case 3: month = 'Apr'; break;
        case 4: month = 'May'; break;
        case 5: month = 'Jun'; break;
        case 6: month = 'Jul'; break;
        case 7: month = 'Aug'; break;
        case 8: month = 'Sep'; break;
        case 9: month = 'Oct'; break;
        case 10: month = 'Novr'; break;
        case 11: month = 'Dec'; break;
    }
    let year = time.getFullYear();
    currentDate.innerText = `${date} ${month} ${year}`;
}
showTime();
setInterval(() => {
    showTime();
}, 1000);


let setAlermTime = document.getElementById('setAlermTime');
let setAlermDate = document.getElementById('setAlermDate');
let setAlermBtn = document.getElementById('setAlermBtn');
validSetAlermTime = false;
validSetAlermDate = false;
setAlermTime.addEventListener('blur', () => {
    if (/([0-9])?([0-9])\:([0-9])?([0-9])\:?([0-9])?([0-9])?/.test(setAlermTime.value)) {
        validSetAlermTime = true;
        setAlermTime.classList.remove('is-invalid');
    }
    else {
        setAlermTime.classList.add('is-invalid');
    }
});
setAlermDate.addEventListener('blur', () => {
    if (/([0-9]){4}\-([0-9])?([0-9])\-([0-9])?([0-9])/.test(setAlermDate.value)) {
        validSetAlermDate = true;
        setAlermDate.classList.remove('is-invalid');
    }
    else {
        setAlermDate.classList.add('is-invalid');
    }
});
setAlermBtn.addEventListener('click', function () {
    if (validSetAlermTime && validSetAlermDate) {
        setAlermTime.classList.remove('is-invalid');
        setAlermDate.classList.remove('is-invalid');
        setAlerm()
        let form = document.querySelector('form');
        form.reset();
        validSetAlermTime = false;
        validSetAlermDate = false;
    }
    else {
        if (!validSetAlermTime) {
            setAlermTime.classList.add('is-invalid');
        }
        if (!validSetAlermDate) {
            setAlermDate.classList.add('is-invalid');
        }
    }
});

let alerm;
function setAlerm() {
    alerm = new Date(`${setAlermDate.value} ${setAlermTime.value}`);
    alert('success', 'Success', 'The Alerm has been set successfully');
    ringAlarm();
}

function alert(status, heading, message) {
    let alertBox = document.querySelector('.alertBox');
    alertBox.innerHTML = `<div class="alert ${status}">
                              <strong>${heading}! </strong><span>${message}</span>
                              <div class="close"></div>
                          </div>`
    showAlert = document.querySelector(`.${status}`);
    setTimeout(() => { showAlert.classList.add('active') }, 0);
    setTimeout(() => { showAlert.classList.remove('active') }, 5000);
    setTimeout(() => { alertBox.innerHTML = '' }, 5500);
}

let alermTone = new Audio('./music/Marcus Scotty  Lifting You by Sander Kleinenberg especially for NowPlaying.mp3');
function ringAlarm() {
    let timeInterval = setInterval(() => {
        if (alerm.getHours() == time.getHours() && alerm.getMinutes() == time.getMinutes() && alerm.getDate() == time.getDate() & alerm.getMonth() == time.getMonth() && alerm.getFullYear() == time.getFullYear()) {
            alermTone.play();
            displayAlerm();
            clearInterval(timeInterval);
        }
    }, 1000);
}

let alermDisplay = document.querySelector('.alermDisplay');
function displayAlerm() {
    alermDisplay.innerHTML = `<div class="alermRinging">
                                   <div class="alermRingingContent">
                                       <img src="./img/close-outline.svg" alt="" class="alermDialogClose" onclick="closeDisplayAlerm()">
                                       <h1>Ringing Alerm...</h1>
                                   </div>
                               </div>`;
}
function closeDisplayAlerm() {
    alermDisplay.innerHTML = '';
    alermTone.pause();
}