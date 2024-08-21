const hours = document.getElementById('hour'),
  minutes = document.getElementById('min'),
  dayOrNight = document.getElementById('am/pm'),
  currentTime = document.querySelector('h1'),
  setAlarmBtn = document.querySelector('button'),
  alarmSound = document.getElementById('aud');

let alarmTime;
let isAlarmSet = false;

function addOptions(end, htmlElement) {
  for (let i = 1; i <= end; i++) {
    const option = document.createElement('option');
    option.value = i<10?"0"+i:i;
    option.textContent = i;
    htmlElement.appendChild(option);
  }
}

addOptions(12, hours);
addOptions(60, minutes);

function ring() {
  alarmSound.play();
  alarmSound.loop = true;
}

setInterval(() => {
  let d = new Date();
  let s = d.getSeconds();
  let ampm = "AM";
  let h = d.getHours();
  let m = d.getMinutes();

  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }
  h = h == 0 ? 12 : h;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

  if (isAlarmSet && alarmTime === `${h}:${m} ${ampm}`) {
    ring();
  }
}, 1000);

setAlarmBtn.addEventListener('click', () => {
  if (isAlarmSet) {
    alarmTime = "";
    alarmSound.pause();
    setAlarmBtn.innerText = "Set Alarm";
    isAlarmSet = false;
    return;
  }

  let time = `${hours.value}:${minutes.value} ${dayOrNight.value}`;
  if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
    alert('Select the Time!!!');
    return;
  } else {
    minutes.value=minutes.value<0?"0"+minutes.value:minutes.value;
    var setOrReset = confirm(`Alarm has been set for ${hours.value}:${minutes.value} ${dayOrNight.value}`);
  }

  if (setOrReset) {
    alarmTime = time;
    setAlarmBtn.innerText = "Clear Alarm";
    isAlarmSet = true;
  }
});