const puppeteer = require('puppeteer')

module.exports = class twitchTrack {
    constructor(streamer,id) {
        this.id = id
        this.streamer = streamer;
        this.startTimeStamp = "";
        this.hours = "00";
        this.minutes = "00";
        this.seconds = "00";
        this.hotswitch = true;
        this.cronoInterval;
        this.cronoValue= "00:00:00"
        this.twitchSecondsOffset = 9
    }

    async getTwitchTimestamp() {
        const browser = await puppeteer.launch({ headless: false })
        const page = await browser.newPage()
        await page.goto(`https://twitch.tv/${this.streamer}`)
        this.startTimeStamp = await page.$eval('.live-time', e => e.innerHTML);



        this.startTimeStamp = await page.$eval('.live-time', e => e.innerHTML);
        
        while (this.hotswitch ) {
            let timeDes = await page.$eval('.live-time', e => e.innerHTML);
            if (this.startTimeStamptime != timeDes && parseInt(timeDes.split(":")[2]) > 11) {
                console.log('try')

                this.hotswitch = false
                this.startTimeStamp = await page.$eval('.live-time', e => e.innerHTML);
                this.setCountWithTwitchTimestamp()
                
                this.cronoInterval = setInterval(() => { this.continueWithCrono() }, 1000);
            }
        }
    }

    setCountWithTwitchTimestamp(){
        let timeStartSpit = this.startTimeStamp.split(":")
        this.hours = timeStartSpit.length == 1 ? '0' + timeStartSpit[0] : timeStartSpit[0]
        this.minutes = timeStartSpit[1]
        this.seconds = (parseInt(timeStartSpit[2]) - this.twitchSecondsOffset).toString()
    }

    continueWithCrono() {
        console.log('startcrono')
        this.seconds++

        if (this.seconds < 10) this.seconds = `0` + this.seconds

        if (this.seconds > 59) {
            this.seconds = `00`
            this.minutes++

            if (this.minutes < 10) this.minutes = `0` + this.minutes
        }

        if (this.minutes > 59) {
            this.minutes = `00`
            this.hours++

            if (this.hours < 10) this.hours = `0` + this.hours
        }
        this.cronoValue = `${this.hours}:${this.minutes}:${this.seconds}`
        //console.log(this.cronoValue)
    }
}

/*
(async () => {
    let test = new twitchTrack('newtral_es')
    await test.getTwitchTimestamp()
    setInterval(() => {
        console.log(test.cronoValue)
    }, 1000);
})()*/

