## kingDOM

A lightweight library to manage core DOM functionality.  Features include DOM manipulation, DOM traversal, event handling, and the creation of AJAX requests with promises.

### Usage

1. Download the project files in `./kingDOM/lib` and place them in your project directory.
2. Require kingDOM in any files you need to manipulate the DOM
``` javascript
const $d = require('./../kingDOM/lib/kingDOM')
```

### Methods

#### $d

Suppose we have some html elements:
``` html
<div class="red"> red div </div>
<div class="blue"> blue div </div>
<h1 class="red"> red header </div>
```
$d can grab by class:
``` javascript
// Grab all elements with the class "red"
const $reds = $d(".red");
```
$d can grab by html element:
``` javascript
// Grab all divs
const $divs = $d("div");
```
$d can accept function arguments and will only trigger them once the document is ready. If the document is not ready, it pushes the functions into a queue.  All functions in the queue will then trigger once the document is ready.
``` javascript
// Triggers popup only when the document is fully loaded
$d(alert("Document is now ready"));
```
$d can make AJAX calls with Promise functionality.
``` javascript
// Receives an options object argument and sends an AJAX request
// with native JavaScript using an XMLHttpRequest object.

// Upon success, the following will log "We have your weather!"
//and log the JSON parsed object that we get from the JSON response
$d.ajax({
  type: 'GET',
  url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
  success(data) {
    console.log("We have your weather!")
    console.log(data);
  },
  error() {
    console.error("An error occurred.");
  },
});

// Since each $d.ajax call returns a promise, we can use .then()
// to trigger callbacks upon fulfillment of the AJAX request.
$d.ajax({
    type: 'GET',
    url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
  }).then((data) => {
    console.log("We have your weather!");
    console.log(data);
});

```


### `DOMNodeCollection.prototype` methods

#### `html`
* `html` can act as a getter or setter method depending on if it receives an optional string argument
* Without argument: it acts as a getter and returns the `innerHTML` of the first node
* With argument: it acts as a setter and the string will be set as the `innerHTML` of each node

#### `empty`
* Empties out or clears all nodes in the node collection

#### `append`
* Accepts a kingDOM wrapped collection, an HTML element, or a string
* Appends the `outerHTML` of each element in argument to `innerHTML` of each element in the node collection

#### `attr`
* Takes in up to two parameters (attribute, value), with the second being optional
* If one parameter is passed in, acts as a getter method and returns the first element in the node collection's matched attribute
* If second parameter is passed in, acts as a setter method and sets the matched attribute to the passed in value for all nodes in the collection

#### `addClass`
* Takes one or more classes as arguments (separated by spaces) and adds it to the class list of the HTML elements in the node collection

#### `removeClass`
* Takes one or more classes as arguments (separated by spaces) and removes it from the class list of the HTML elements in the node collection

#### `children`
* Finds all the child nodes and returns them as a node collection

#### `parent`
* Finds all the parent nodes and returns them as a node collection

#### `find`
* Accepts a selector as an argument and returns all descendant nodes that are matches

#### `remove`
* Removes the html of all the nodes in the collection from the DOM
* Also removes all of the nodes from the node collection

#### `on`
* Accepts an event and a callback and adds the event handler from every element in the node collection
* Saves the callback to a key on the node for easier removal on `off`

#### `off`
* Accepts an event and removes the event handler from every element in the node collection
* Doesn't require the user to pass in a callback, since the callback will be saved on any particular node's keys
