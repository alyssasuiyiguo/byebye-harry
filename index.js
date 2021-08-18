class Countdown {
    targetTime = new Date(2021, 11, 15);
    now;
    time = [0, 0, 0, 0]; //day, hours, minutes, seconds
    milis = [24 * 60 * 60 * 1000, 60 * 60 * 1000, 60 * 1000, 1000];
    countdownFunc;
    constructor() {
        this.now = Date.now();
        let diff = this.targetTime.getTime() - this.now;
        if (diff < 0) {
            //date passed
            console.log("harry home");
        } else {
            for (let i = 0; i < 4; i++) {
                this.time[i] = Math.floor(diff / this.milis[i]);
                diff %= this.milis[i];
            }
        }
    }
    startCountdown() {
        this.countdownFunc = setInterval(() => {
            this.subtract(this.time);
            this.render();
        }, 1000);
    }

    render(){

    }

    subtract(time) {
        let i = 3;
        while (time[i] - 1 < 0 && i > 0) {
            time[i] = i == 1 ? 23: 59;
            i--;
        }
        time[i]--;
    }
}

window.onload = ()=>{
    let countdown = new Countdown();
}