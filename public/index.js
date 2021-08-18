var firebaseConfig = {
    apiKey: "AIzaSyCX6rsagBUlP-oCZ63UFu96z4d8C8dnPdg",
    authDomain: "byebye-harry.firebaseapp.com",
    projectId: "byebye-harry",
    storageBucket: "byebye-harry.appspot.com",
    messagingSenderId: "38370028583",
    appId: "1:38370028583:web:910d77985440eabe517202",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
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

    render() {
        let classNames = ["days", "hours", "minutes", "seconds"];
        for (let i = 0; i < this.time.length; i++) {
            let text = "";
            if (this.time[i] < 10) {
                text += "0";
            }
            text += this.time[i].toString();
            document.querySelectorAll(`.${classNames[i]}`)[0].innerHTML = text;
        }
    }

    subtract(time) {
        let i = 3;
        while (time[i] - 1 < 0 && i > 0) {
            time[i] = i == 1 ? 23 : 59;
            i--;
        }
        time[i]--;
    }
}
let countdown = new Countdown();

const storage = firebase.storage();
class FirebaseStorageWrapper {
    storage;
    constructor(storage) {
        this.storage = storage;
    }

    async getImage(path) {
        let ref = this.storage.ref(path);
        return await ref.getDownloadURL();
    }
}
let storage_wrapper = new FirebaseStorageWrapper(storage);
// let special = ["1_5H-P1TTj48A_A7PQAIhjlxR3-7zD-sz", "1NkyDQFfpz52VEmhMZIDWukPa2kUEQFJB", "1TCLcvtguQnShYi9tePu_snTtM_qShJXB", "1U5mXFSt86P0-MhUBkSLZUOqay386A-gJ"];
window.onload = loadImages;

function loadImages() {
    console.log("starting load");
    document.querySelectorAll("img").forEach(async (element) => {
        let name = element.getAttribute("data-lazysrc");
        element.src = await storage_wrapper.getImage(`${name}.jpg`);
    });
}
