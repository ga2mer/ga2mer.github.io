!function(e,t){if("function"==typeof define&&define.amd)define(["exports","module"],t);else if("undefined"!=typeof exports&&"undefined"!=typeof module)t(exports,module);else{var n={exports:{}};t(n.exports,n),e.fetchJsonp=n.exports}}(this,function(e,t){"use strict";function n(){return"jsonp_"+Date.now()+"_"+Math.ceil(1e5*Math.random())}function o(e){try{delete window[e]}catch(t){window[e]=void 0}}function i(e){var t=document.getElementById(e);document.getElementsByTagName("head")[0].removeChild(t)}var u={timeout:5e3,jsonpCallback:"callback",jsonpCallbackFunction:null},a=function(e){var t=void 0===arguments[1]?{}:arguments[1],a=null!=t.timeout?t.timeout:u.timeout,r=null!=t.jsonpCallback?t.jsonpCallback:u.jsonpCallback,l=void 0;return new Promise(function(u,c){var s=t.jsonpCallbackFunction||n();window[s]=function(e){u({ok:!0,json:function(){return Promise.resolve(e)}}),l&&clearTimeout(l),i(r+"_"+s),o(s)},e+=-1===e.indexOf("?")?"?":"&";var d=document.createElement("script");d.setAttribute("src",e+r+"="+s),d.id=r+"_"+s,document.getElementsByTagName("head")[0].appendChild(d),l=setTimeout(function(){c(new Error("JSONP request to "+e+" timed out")),o(s),i(r+"_"+s)},a)})};t.exports=a});
