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
