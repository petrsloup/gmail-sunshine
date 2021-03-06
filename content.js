// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
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

var observer = new MutationObserver(throttle(function(mutationsList, observer) {
  var xpath = "//td[text()[contains(.,'No new ')]]";
  var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (matchingElement) {
    matchingElement.parentNode.parentNode.parentNode.innerHTML = '<div class="sunshine"></div>';
  }
}, 200)); // throttle in case the document changes very often

observer.observe(document.body, { attributes: false, childList: true, subtree: true });

var style = document.createElement('style');
style.innerHTML = `
  .sunshine,
  .DVI7hd .aRs .aRu:before { /* for tabs */
    content:'';
    display:block;
    width:100%;height:300px;
    background:url('https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/zero/2x/ic_zero_inbox_2x.png');
    background-size:contain;
    background-repeat:no-repeat;
    background-position:center;
    user-select:none;
  }
`;
document.head.appendChild(style);
