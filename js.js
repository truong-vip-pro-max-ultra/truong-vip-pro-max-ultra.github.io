//StopWatch
var save = 0;
var account = document.getElementById('account');
var payment = document.getElementById('payment');
var selectCL = document.getElementById('selectCL');
var noti = document.getElementById('noti');
account.innerText += "9999999999";
function Stopwatch(elem) {
    var time = 0;
    var offset;
    var interval;

    function lapOn() {
        var lapTime = lapContainer.appendChild(document.createElement("li"))
        lapTime.innerHTML = elem.textContent;
        lapTime.classList = 'lapItem'
    }

    function lapOff() {
        return;
    }

    function update() {
        if (this.isOn) {
            time += delta();
        }
        elem.textContent = timeFormatter(time);
    }

    function delta() {
        var now = Date.now();
        var timePassed = now - offset;

        offset = now;

        return timePassed;
    }

    function timeFormatter(time) {
        time = new Date(time);

        var minutes = time.getMinutes().toString();
        var seconds = time.getSeconds().toString();
        var milliseconds = parseInt(time.getMilliseconds()/10)
        save = milliseconds;
        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }

        if (seconds.length < 2) {
            seconds = '0' + seconds;
        }

        // while (milliseconds.length < 3) {
        //     milliseconds = '0' + milliseconds;
        // }

        var result = minutes + ' : ' + seconds + ' . ' + milliseconds.toString();;

        return result;
    }

    this.start = function () {
        interval = setInterval(update.bind(this), 1);
        offset = Date.now();
        this.isOn = true;
        account.innerText = (parseInt(account.innerText) - payment.value).toString();
    };

    this.stop = function () {
        clearInterval(interval);
        interval = null;
        this.isOn = false;
        if((selectCL.value=='0' && save%2==0) || (selectCL.value=='1' && save%2==1)){
            account.innerText = (parseInt(account.innerText) + payment.value*2).toString();
            noti.innerText = 'Thắng + '+ payment.value*2;
            
        }
        else{
            noti.innerText = 'Thua';
        }
    };

    this.reset = function () {
        time = 0;
        lapContainer.innerHTML = '';
        interval = null;
        this.isOn = false;
        update();
    };

    this.lapOn = function () {
        lapOn();
    }

    this.lapOff = function () {
        lapOff();
    }

    this.isOn = false;
}

//Main
var timer = document.querySelector('.timer');
var toggleBtn = document.querySelector('.toggle');
var resetBtn = document.querySelector('.reset');
var lapBtn = document.querySelector('.lap');
var lapContainer = document.querySelector('.lapContainer')

var watch = new Stopwatch(timer);

function start() {
    toggleBtn.textContent = 'Stop';
    toggleBtn.classList.toggle("on");
    watch.start();
}

function stop() {
    toggleBtn.textContent = 'Start';
    toggleBtn.classList.toggle("on")
    watch.stop();
}

function stopWhenOn() {
    toggleBtn.textContent = 'Start';
    toggleBtn.classList.toggle("on")
    watch.stop();
    watch.reset();
}

toggleBtn.addEventListener('click', function () {
    watch.isOn ? stop() : start();
});

resetBtn.addEventListener('click', function () {
    watch.isOn ? stopWhenOn() : watch.reset();
    // stop();
});

lapBtn.addEventListener('click', function () {
    watch.isOn ? watch.lapOn() : watch.lapOff();
})