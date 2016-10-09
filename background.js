let urls = {};

let menu = {
  search: () => {
    let q = prompt();
    q && chrome.tabs.create({url: 'http://www.imdb.com/find?s=all&q=' + encodeURIComponent(q)});
  },
  history: () => {
    chrome.tabs.create({url: 'chrome://history/#q=imdb.com/title/tt'});
  }
};

Object.keys(menu).forEach(item => {
  chrome.contextMenus.create({
    id: item,
    title: chrome.i18n.getMessage('menu_' + item),
    contexts: ['page_action']
  });
});

chrome.contextMenus.onClicked.addListener(info => {
  menu[info.menuItemId]();
});


chrome.runtime.onMessage.addListener((req, sender) => {
  urls[sender.tab.id] = req.url;
  chrome.pageAction[req.url ? 'show' : 'hide'](sender.tab.id);
});

chrome.pageAction.onClicked.addListener(tab => {
  chrome.windows.create({url: urls[tab.id], type: 'popup', state: 'fullscreen'});
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.openOptionsPage();
});
