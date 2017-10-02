document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.sendMessage({ command: 'fetchPostedDate' }, datetime => {
    console.debug('datetime:', datetime);
  });
});