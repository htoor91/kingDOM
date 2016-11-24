/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

	const funcQueue = [];

	document.addEventListener('DOMContentLoaded', () => {
	  funcQueue.forEach((fn) => {
	    fn();
	  });
	});

	window.$l = function(selector) {
	  let arrEls = [];

	  if (typeof selector === 'string') {
	    const list = document.querySelectorAll(selector);
	    arrEls = Array.from(list);
	    return new DOMNodeCollection(arrEls);
	  } else if (selector instanceof HTMLElement) {
	      return new DOMNodeCollection([selector]);
	  } else if (typeof selector === 'function') {
	    funcQueue.push(selector);
	  }

	};

	$l.extend = function(...args) {
	  let merged = { };
	  args.forEach((obj) => {
	    Object.keys(obj).forEach((key) => {
	      merged[key] = obj[key];
	    });
	  });

	  return merged;
	};

	$l.ajax = function (options) {
	  const defaults = {
	    type: 'GET',
	    url: document.URL,
	  };

	  const data = $l.extend(defaults, options);

	  const xml = new XMLHttpRequest();

	  xml.open(data.type, data.url);

	  xml.send();
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(els){
	    this.els = els;
	  }

	  html(arg) {
	    if (arg) {
	      this.els.forEach((el) => {
	        el.innerHTML = arg;
	      });
	    } else {
	      return this.els[0].innerHTML;
	    }
	  }

	  empty() {
	    this.html("");
	  }

	  append(outerEls) {
	    this.els.forEach((innerEl) => {
	      outerEls.forEach((outerEl) => {
	        innerEl.innerHTML.appendChild(outerEl);
	      });
	    });
	  }

	  attr(attribute, value) {
	    this.els.forEach( (el) => {
	      if (value) {
	        el.setAttribute(attribute, value);
	        return this;
	      } else {
	        return el.getAttribute(attribute);
	      }
	    });
	  }

	  addClass(classTitle) {
	    this.els.forEach( (el) => {
	      el.classList.add(classTitle);
	    });
	  }

	  removeClass(classTitle) {
	    this.els.forEach( (el) => {
	      el.classList.remove(classTitle);
	    });
	  }

	  children() {
	    let childrenArr = [];

	    this.els.forEach((el) => {
	      childrenArr.push(el.children);
	    });

	    return new DOMNodeCollection(childrenArr);
	  }

	  parent() {
	    let parents = [];

	    this.els.forEach((el) => {
	      parents.push(el.parentElement);
	    });

	    return new DOMNodeCollection(parents);
	  }

	  find(selector) {
	    let found = [];

	    this.els.forEach((el) => {
	      found.push(el.querySelectorAll(selector));
	    });

	    return new DOMNodeCollection(found);
	  }

	  remove() {
	    this.empty();
	    this.els = [];
	  }

	  on(action, func) {
	    this.els.forEach((el) => {
	      el.addEventListener(action, func);
	    });
	  }

	  off(action, func) {
	    this.els.forEach((el) => {
	      el.removeEventListener(action, func);
	    });
	  }

	}



	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);