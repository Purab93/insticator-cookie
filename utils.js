/**
 * Returns cookie data
 * @param {string} cname 
 * @returns 
 */
export const getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
}

/**
 * Returns expiry time
 * @method getExpiration
 * @param {number} timeThreshold 
 * @returns {string}
 */
export const getExpiration = (timeThreshold) => {
    let currentDate = new Date(),
        newDate = new Date();

    newDate.setTime(newDate.getTime() + timeThreshold);

    if(currentDate.getDay() !== newDate.getDay()){
        currentDate.setHours(23,59,59,999);
        return currentDate.toUTCString();
    }

    return newDate.toUTCString();
}

/**
 * Set cookie with expiration & value
 * @method setCookie
 * @param {string} cname 
 * @param {*} value 
 * @param {number} expiration 
 */
export const setCookie = (cname,value,expiration) => {
    document.cookie = cname + "=" + value + ";" + "expires=" + expiration + ";path=/";
}

/**
 * Generates a random 16 digit ID
 * @method randomIdGenerator
 * @returns {string}
 */
export const randomIdGenerator = () => {
    var S4 = function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

/**
 * Use to get Query String Param from URL
 * @method getQueryParamValue
 * @param {string} name 
 * @returns {string}
 */
export const getQueryParamValue = (name) => {
    let params = new URLSearchParams(window.location.search);
    return params.get(name) || "";
}