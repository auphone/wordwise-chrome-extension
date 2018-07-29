var translated = false;
var translateTimeout = null;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'translate' && !translated) {
    translated = true;
    appendStyle();
    translate();
  }
  if (request.message === 'reset') {
    translated = false;
    timeoutTranslate();
  }
});

function timeoutTranslate() {
  if (translateTimeout) {
    clearTimeout(translateTimeout);
  }
  translateTimeout = setTimeout(function() {
    chrome.storage.sync.get(
      {
        auto: false
      },
      function(items) {
        if (items.auto) {
          appendStyle();
          translate();
        }
      }
    );
  }, 500);
}
