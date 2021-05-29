import InsticatorSession from './main.js'

(()=>{
    window.InsticatorSession = new InsticatorSession({
        thresholdTime: 1,
        customActiveEvents: []
    });
    window.InsticatorSession.init();
})()