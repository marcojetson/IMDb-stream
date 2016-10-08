let urls = {};

chrome.runtime.onMessage.addListener((req, sender) => {
  urls[sender.tab.id] = req.url;
  chrome.pageAction[req.url ? 'show' : 'hide'](sender.tab.id);
});

chrome.pageAction.onClicked.addListener(tab => {
  window.open(urls[tab.id], '', 'menubar=no&status=0&titlebar=0');
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.openOptionsPage();
});