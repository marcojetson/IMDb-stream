const OPTION_SELECTOR = '.option';

const SAVE_SELECTOR = '#save';

let inputs = document.querySelectorAll(OPTION_SELECTOR);

chrome.storage.sync.get(null, store => {
  inputs.forEach(input => { input.value = store[OPTION_PREFIX + input.name] || ''; });
});

document.querySelector(SAVE_SELECTOR).addEventListener('click', () => {
  let options = {};
  inputs.forEach(input => { options[OPTION_PREFIX + input.name] = input.value; });
  chrome.storage.sync.set(options);

  close();
});

