import InsticatorSession from "./main.js";

(() => {
  window.InsticatorSession = new InsticatorSession({
    thresholdTime: 30,
    customActiveEvents: [],
  });
  window.InsticatorSession.init();
})();
