const DOMNodeCollection = require('./dom_node_collection.js');

const functionQueue = [];
let docReady = false;

window.$q = $q;

document.addEventListener('DOMContentLoaded', () => {
  docReady = true;
  functionQueue.forEach((fn) => {
    fn();
  });
});

function $q(selector) {
  if (typeof selector === 'string') {
    return getNodesFromDOM(selector);
  } else if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  } else if (typeof selector === 'function') {
    return documentReadyCallback(selector);
  }
}

$q.extend = function(...args) {
  let merged = args[0];
  args.slice(1).forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      merged[key] = obj[key];
    });
  });

  return merged;
};

$q.ajax = function (options) {
  const defaults = {
    type: 'GET',
    url: document.URL,
    success: () => {},
    error: () => {},
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  const xhr = new XMLHttpRequest();

  options = $q.extend(defaults, options);
  options.type = options.type.toUpperCase();


  return new Promise((resolve, reject) => {
    xhr.open(options.type, options.url, true);
    xhr.onload = (e) => {
      if (xhr.status === 200) {
        options.success(options.data);
        resolve(JSON.parse(xhr.response));
      } else {
        reject(JSON.parse(xhr.response));
      }

      if (options.success) {
        console.log(JSON.parse(xhr.response));
      }
    };



    xhr.send(options.data);
  });


};
// helper methods

function getNodesFromDOM(selector) {
  const nodes = document.querySelectorAll(selector);
  const nodesArr = Array.from(nodes);
  return new DOMNodeCollection(nodesArr);
}

function documentReadyCallback(fn) {
  if (docReady) {
    fn();
  } else {
    functionQueue.push(fn);
  }
}
