chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.sendMessage(tab.id, { action: 'translate' });
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.status === 'complete') {
		chrome.tabs.sendMessage(tabId, {
			message: 'reset'
		});
	}
});
