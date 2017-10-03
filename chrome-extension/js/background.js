class Scraper {

  static async scrapePostedDate() {
    const url = await this._getUrl();

    if (!this._isMachedUrl(url)) {
      return null;
    }

    let pageDOM = await this._fetchRevisionPageDOM(url, 1);

    if (pageDOM.querySelector('.pagination')) {
      const link = pageDOM.querySelector('.pagination > li:last-child > a');
      const href = link. getAttribute('href');
      const m = href.match(/page=([\d]+)$/);

      if (!m) {
        return null;
      }

      pageDOM = await this._fetchRevisionPageDOM(url, m[1]);
    }

    const time = pageDOM.querySelector('.tableList_item:last-child .snapshot_meta time');

    if (!time || !time.getAttribute('datetime')) {
      return null;
    }

    return time.getAttribute('datetime');
  }

  static async _getUrl() {
    return new Promise((resolve) => {
      chrome.windows.getCurrent(currentWindow => {
        chrome.tabs.query({active: true, windowId: currentWindow.id}, activeTabs => {
          resolve(activeTabs[0].url);
        });
      });
    });
  }

  static _isMachedUrl(url) {
    return /^https:\/\/qiita\.com\/.+?\/items\/[0-9a-z]{20}$/.test(url);
  }

  static async _fetchRevisionPageDOM(url, page) {
    const revisionsUrl = `${url}/revisions?page=${page}`;
    const res = await fetch(revisionsUrl);
    const content = await res.text();

    const pageDOM = document.createElement('div');
    pageDOM.innerHTML = content;

    return pageDOM;
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === 'fetchPostedDate') {
    Scraper.scrapePostedDate().then(date => sendResponse(date));
    return true;
  } else {
    sendResponse(null);
  }
});
