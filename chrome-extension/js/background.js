const onMessage = (request, sender, sendResponse) => {
  if (request.command === 'fetchPostedDate') {
    chrome.windows.getCurrent(currentWindow => {
      chrome.tabs.query({ active: true, windowId: currentWindow.id }, async activeTabs => {

        if (!/^https:\/\/qiita\.com\/.+?\/items\/[0-9a-z]{20}$/.test(activeTabs[0].url)) {
          sendResponse(null);
          return;
        }

        const url = activeTabs[0].url + '/revisions';
        const res = await fetch(url);
        const content = await res.text();

        const revisionsPage = document.createElement('div');
        revisionsPage.innerHTML = content;

        const time = revisionsPage.querySelector('.tableList_item:last-child .snapshot_meta time');

        sendResponse(time.getAttribute('datetime'));
      });
    });

    return true;
  } else {
    sendResponse(null);
  }
};

chrome.runtime.onMessage.addListener(onMessage);
