document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.sendMessage({ command: 'fetchPostedDate' }, datetime => {
    console.debug('datetime:', datetime);

    const postedDate = new Date(Date.parse(datetime));
    const formattedDate = [
      postedDate.getFullYear(), '年',
      ('0' + (postedDate.getMonth() + 1)).slice(-2), '月',
      ('0' + postedDate.getDate()).slice(-2), '日'
    ].join('');

    const dom = document.createElement('div');
    dom.className = 'ArticleAsideHeader__date';
    dom.innerText = formattedDate;

    const target = document.querySelector('.ArticleAsideHeader__date');
    target.parentNode.insertBefore(dom, target);
  });
});