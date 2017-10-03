document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.sendMessage({ command: 'fetchPostedDate' }, datetime => {
    console.debug('datetime:', datetime);

    const dom = document.createElement('div');
    dom.innerText = datetime;
    dom.style.backgroundColor = '#000';
    dom.style.color = '#FFF';

    const target = document.querySelector('.ArticleMainHeader');
    target.parentNode.insertBefore(dom, target.nextSibling);
  });
});