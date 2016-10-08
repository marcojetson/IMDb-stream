function key(success) {
  chrome.storage.sync.get(null, store => {
    let key = store['option.key'];
    if (key) {
      success(key);
    }
  });
}

function fetch(key, success) {
  let client = new VidSourceClient(key);

  switch (document.querySelector('meta[property="og:type"]').content) {
    case 'video.episode':
      client.show(
        document.querySelector('.titleParent > a').href.match(/\/title\/tt(\d+)/)[1],
        document.querySelector('.bp_heading').innerHTML.match(/(\d+)/g)[0],
        document.querySelector('.bp_heading').innerHTML.match(/(\d+)/g)[1],
        success
      );
      break;
    default:
      client.movie(location.href.match(/\/title\/tt(\d+)/)[1], success);
  }
}

function notify(url) {
  chrome.runtime.sendMessage({url});
}

key(key => fetch(key, notify));
