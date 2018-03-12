var translated = false;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.action === 'translate' && !translated) {
    appendStyle();
    translate();
    translated = true;
  }
});

chrome.storage.sync.get({
  auto: false
}, function(items) {
  if(items.auto) {
    appendStyle();
    translate();
  }
});
