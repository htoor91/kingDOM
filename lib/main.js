const DOMNodeCollection = require('./dom_node_collection.js');

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
