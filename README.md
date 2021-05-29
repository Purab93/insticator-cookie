# Insticator Cookie Task

### Hosting
- Please host the index.html file
  - Command for Hosting in Mac: python3 -m http.server --cgi 8080

### Usage
- Import the main.js file and see its initialisation & usage in index.js.
- Remember there is a dependency of main.js on utils.js so move it at the same position in the project as main.js or please update the path in main.js.

### Explanation
- index.js file is used for initialising & show casing the usage of InsticatorSession.
- main.js file is where the definition of InsticatorSession is written.
- utils.js file is for the utility functions.

### Initialisation & Parameters
- Initialisation can be seen in index.js file
- InsticatorSession class can take 3 values as of now
  - thresholdTime: which defines the inactivity time in minutes to wait before the cookie expires (default : 30 mins)
  - customActiveEvents: apart from the default values for events to check inactivity of a user, one can add more custom events which will be bind to the window. (default : ["mousemove", "mousedown", "keypress", "DOMMouseScroll", "mousewheel", "touchmove", "MSPointerMove"])
  - cookieName: user can set a custom cookie name (default : insticator_session)
- All methods are private, except InsticatorSession.init() & InsticatorSession.getSession().

### Assumptions
- Threshold time passed to the InsticatorSession would be less than 60 mins.
- Used GMT timezone across.

### Unit Testing
- Validated the expiry of the cookie, on account of user inactivity for thresholdTime.
- Validated the expiry of the cookie, in case of day change, even when the thresholdTime is not met.
- Added different values for "?campaign" query param, and validated the change in the cookie.
- Validated the values using InsticatorSession.getSession() method in console window for all the scenarios.
- Used 2 pages i.e index.html & secondPage.html, to check the referrer URL.
- Traversed between page and validated the consistency of the cookie.
- Printed the data in a div on the HTML pages for testing across both 1st & 2nd page.

