const store = {};

chrome.storage.onChanged.addListener((changes) => {
  for (const key in changes) store[key] = changes[key].newValue;
});

chrome.storage.local.get('active', (data) => {
  const active = data.active || false;
  store.active = active;
});

chrome.webRequest.onBeforeRequest.addListener(
  (data) => {
    console.log(data);
    const { initiator, url } = data;
    const active = store.active || false;

    const { protocol } = new URL(initiator || url);
    const cancel = active && protocol !== 'chrome-extension:';

    return { cancel };
  },
  {
    urls: ["<all_urls>"]
  },
  ["blocking"]
);
