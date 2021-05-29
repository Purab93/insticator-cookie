/**
 * Returns cookie data
 * @param {string} cname
 * @returns
 */
export const getCookie = (cname) => {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
};

/**
 * Set cookie with expiration & value
 * @method setCookie
 * @param {string} cname
 * @param {*} value
 * @param {number} expiration
 */
export const setCookie = (cname, value, expiration) => {
  document.cookie =
    cname + "=" + value + ";" + "expires=" + expiration + ";path=/";
};

/**
 * Generates a random 16 digit ID
 * @method randomIdGenerator
 * @returns {string}
 */
export const randomIdGenerator = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

/**
 * Use to get Query String Param from URL
 * @method getQueryParamValue
 * @param {string} name
 * @returns {string}
 */
export const getQueryParamValue = (name) => {
  let params = new URLSearchParams(window.location.search);
  return params.get(name) || "";
};
