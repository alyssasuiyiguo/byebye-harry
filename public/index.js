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
            this.startCountdown();
        }
    }
    startCountdown() {
        this.countdownFunc = setInterval(() => {
            this.subtract(this.time);
            this.render();
        }, 1000);
    }

    render(){
        let classNames = ["days", "hours", "minutes", "seconds"];
        for(let i = 0;i < this.time.length; i++){
            let text = "";
            if(this.time[i] < 10){
                text += "0";
            }
            text += this.time[i].toString();
            document.querySelectorAll(`.${classNames[i]}`)[0].innerHTML = text;
        }
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
let countdown = new Countdown();
window.onload = loadImages;
function loadImages(){
    console.log("starting load");
    document.querySelectorAll("img").forEach(element=>{
        element.src = element.getAttribute("data-lazysrc")
        // element.style.background = `url("${element.getAttribute("data-lazysrc")}")`;
        // element.style.backgroundCover = "cover";
        // element.src = "./temp.png";
    });
}