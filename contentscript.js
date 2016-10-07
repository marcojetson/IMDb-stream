function key(success) {
  chrome.storage.sync.get(null, store => {
    let key = store[OPTION_PREFIX + 'key'];
    if (key) {
      success(key);
    }
  });
}

function get(url, success) {
  let req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      success(this.response);
    }
  }
  req.send();
};

function url(key) {
  return STREAM_URL_ENDPOINT + '&apikey=' + key + '&imdbid=' + location.href.match(/\/title\/tt(\d+)/)[1];
}

function notify(url) {
  chrome.runtime.sendMessage({url});
}

key(key => get(url(key), res => notify(res.match(/"EmbedUrl":\s*"([^"]+)"/)[1])));