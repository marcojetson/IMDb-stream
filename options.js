document.querySelectorAll('[i18n-content]').forEach(element => {
  element.innerHTML = chrome.i18n.getMessage(element.getAttribute('i18n-content'));
});

let inputs = document.querySelectorAll('.option');

chrome.storage.sync.get(null, store => {
  inputs.forEach(input => { input.value = store['option.' + input.name] || ''; });
});

document.querySelector('#save').addEventListener('click', () => {
  let options = {};
  inputs.forEach(input => { options['option.' + input.name] = input.value; });
  chrome.storage.sync.set(options);

  close();
});
