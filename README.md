# Insticator Cookie Task

### Please host the index.html file:
- Command for Hosting in Mac: python3 -m http.server --cgi 8080

### Explanation
- index.js file is used for initialising & show casing the usage of InsticatorSession.
- main.js file is where the definition of InsticatorSession is written.
- utils.js file is for some utility functions that are used.

### Initialisation & Parameters
- InsticatorSession class can take 3 values as of now
  - thresholdTime: which defines the inactivity time in minutes to wait before the cookie expires (default : 30 mins)
  - customActiveEvents: apart from the default values for events to check inactivity of a user, one can add more custom events which will be binded to the window. (default : ["mousemove", "mousedown", "keypress", "DOMMouseScroll", "mousewheel", "touchmove", "MSPointerMove"])
  - cookieName: user can set a custom cookie name (default : cookieName)
- Have kept all methods private apart from InsticatorSession.init() & InsticatorSession.getSession(). (Have used Private class fields for privatising methods & fields)

### Assumptions
- Threshold time passed to the InsticatorSession would be less than 60 mins.

### Testing
- In console window you can use InsticatorSession.getSession() method to validate the values for the cookie for all the scenarios.
