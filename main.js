import {
  getCookie,
  setCookie,
  randomIdGenerator,
  getQueryParamValue,
} from "./utils.js";

export default class InsticatorSession {
  #DEFAULT_ACTIVE_EVENTS = [
    "mousemove",
    "mousedown",
    "keypress",
    "DOMMouseScroll",
    "mousewheel",
    "touchmove",
    "MSPointerMove",
  ];
  #MINUTES_TO_MILLISECONDS = 1000 * 60;
  #inactiveThresholdTime;
  #activeEvents;
  #cookieName;

  constructor({
    thresholdTime = 30,
    customActiveEvents = [],
    cookieName = "insticator_session",
  }) {
    this.#inactiveThresholdTime = thresholdTime;
    this.#activeEvents = [
      ...this.#DEFAULT_ACTIVE_EVENTS,
      ...customActiveEvents,
    ];
    this.#cookieName = cookieName;
  }

  /**
   * Setup Window Events for Activity of User
   * @method setupEvents
   */
  #setupEvents = () => {
    this.#activeEvents.map((eventName) => {
      window.addEventListener(eventName, this.#goActive, false);
    });
  };

  /**
   * Checks wether current & new campaign are same
   * @method #isSameCampaign
   * @returns boolean for same campaign check
   */
  #isSameCampaign = (cookieData) => {
    const newCampaign = getQueryParamValue("campaign"),
      currentCampaign = cookieData.campaign;

    if (newCampaign && newCampaign !== currentCampaign) {
      return false;
    }

    return true;
  };

  /**
   * Returns expiry time
   * @method #getExpiration
   * @param {number} timeThreshold
   * @returns {string}
   */
  #getExpiration = (timeThreshold) => {
    let currentDate = new Date(),
      newDate = new Date();

    newDate.setTime(newDate.getTime() + timeThreshold);

    if (currentDate.getDay() !== newDate.getDay()) {
      currentDate.setHours(23, 59, 59, 999);
      return currentDate.toUTCString();
    }

    return newDate.toUTCString();
  };

  #getCookieData = async () => {
    let cookieData = await cookieStore.get(this.#cookieName);
    return cookieData?.value ? JSON.parse(cookieData.value) : {};
  };

  /**
   * Get cookie's configuration
   * @method #getCookieConfig
   * @returns cookie configuration
   */
  #getCookieConfig = async () => {
    let cookieData = await this.#getCookieData(),
      currentId = cookieData.id,
      timeThreshold = this.#inactiveThresholdTime,
      expiration,
      value;

    timeThreshold *= this.#MINUTES_TO_MILLISECONDS;

    expiration = this.#getExpiration(timeThreshold);

    value = JSON.stringify({
      id:
        currentId && this.#isSameCampaign(cookieData)
          ? currentId
          : randomIdGenerator(),
      expiration: expiration,
      referrer: document.referrer,
      campaign: getQueryParamValue("campaign"),
    });

    return {
      expiration,
      value,
      timeThreshold,
    };
  };

  /**
   * @method #goActive
   */
  #goActive = async () => {
    let cookieConfig = await this.#getCookieConfig();
    setCookie(this.#cookieName, cookieConfig.value, cookieConfig.expiration);
  };

  /**
   * @method getSession
   * @returns current cookie config
   */
  getSession = () => {
    let cookieData = getCookie(this.#cookieName);
    return cookieData ? JSON.parse(cookieData) : {};
  };

  /**
   * Initialise the cookie
   * @method init
   */
  init = () => {
    this.#setupEvents();
    this.#goActive();
  };
}
