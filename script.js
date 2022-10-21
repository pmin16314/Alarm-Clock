const selectMenu = document.querySelectorAll("select"),
cTime= document.querySelector(".current_time"),
content = document.querySelector(".content"),
setAlarmBtn = document.querySelector("button"),
settedAlarm = document.querySelector(".settedalarm");


let alarmTime, isAlarmSet
alarmTone = new Audio("./tone.mp3");

//hour list
for(let i = 12; i > 0; i--){
    i = i < 10 ? `0${i}` : i;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",`<option value="${i}">${i}</option>`);
}

//minute list
for(let i = 59; i >= 0; i--){
    i = i < 10 ? `0${i}` : i;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",`<option value="${i}">${i}</option>`);
}

//
for(let i = 1; i > 0; i--){
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",`<option value="PM">PM</option>`);
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",`<option value="AM">AM</option>`);
}

setInterval(() => {
    let date = new Date();
    h = date.getHours();
    m = date.getMinutes();
    s = date.getSeconds();

    ampm = 'AM';

    if(h>12){
        h = h-12;
        ampm = "PM"
    }

    h = h < 10 ? `0${h}` : h;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;

    cTime.innerHTML = (`${h} : ${m} : ${s} ${ampm}`);

    if(alarmTime ===(`${h} : ${m} ${ampm}`)){
        alarmTone.play();
        alarmTone.loop = true;
        console.log("alarm");
    };    
}, 1000);

function setAlarm(){
    if(isAlarmSet){
        alarmTime="";
        alarmTone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    };


    let time = `${selectMenu[0].value} : ${selectMenu[1].value} ${selectMenu[2].value}`;
    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please, select a valid time to set Alarm!");
    }
    console.log(time);

    alarmTime = time;
    isAlarmSet = true;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
    settedAlarm.innerHTML = "Alarm Set to : "+time;


    console.log(time);
};

setAlarmBtn.addEventListener("click", setAlarm);




