var throttle = function(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

// Select the node that will be observed for mutations
var targetNode = document.body; // TODO: this is ugly, but works

// Options for the observer (which mutations to observe)
var config = { attributes: false, childList: true, subtree: true };

// Callback function to execute when mutations are observed
var callback = throttle(function(mutationsList, observer) {
  var xpath = "//td[text()[contains(.,'No new mail!')]]";
  var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (matchingElement) {
    matchingElement.parentNode.parentNode.parentNode.parentNode.innerHTML = '<center><img width="250" src="//ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/zero/1x/ic_zero_inbox.png" srcset="//ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/zero/2x/ic_zero_inbox_2x.png 2x"></center>';
  }
}, 200);

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
