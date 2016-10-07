chrome.storage.sync.get(null, store => {
    console.log(store);
  document.querySelectorAll('.option').forEach(input => {
    input.addEventListener('change', e => {
      chrome.storage.sync.set({[OPTION_PREFIX + e.target.name]: e.target.value});
    });

    input.value = store[OPTION_PREFIX + input.name] || '';
  });
});

