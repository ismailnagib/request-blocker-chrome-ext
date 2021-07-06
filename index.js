const activeToggle = () => {
  chrome.storage.local.get(['active'], (data) => {
    const active = data.active || false;
    
    chrome.storage.local.set({ active: !active })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#actv-btn').addEventListener('click', activeToggle);
});