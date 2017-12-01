document.addEventListener('DOMContentLoaded', () => {

  const postDateDom = (
    document.querySelector('meta[itemprop="datePublished"]') ||
    document.querySelector('time[itemprop="datePublished"]')
  );
  const datetime = (
    (postDateDom && postDateDom.getAttribute('content')) ||
    (postDateDom && postDateDom.getAttribute('datetime'))
  );

  if (!datetime) {
    return;
  }

  moment.locale('ja');

  const postedDate = moment(Date.parse(datetime));
  const noticeLevel = (() => {
    if (postedDate.isBefore(moment().subtract(2, 'year'))) {
      return 'danger';
    }
    if (postedDate.isBefore(moment().subtract(1, 'year'))) {
      return 'warning';
    }
    return 'safety';
  })();

  const modified = !!document.querySelector('time[itemprop="dateModified"]');

  if (modified) {
    const formattedDate = [
      postedDate.format('YYYY年MM月DD日'),
      'に投稿',
      ` (${postedDate.fromNow()})`
    ].join('');

    const dom = document.createElement('div');
    dom.className = `ArticleAsideHeader__date qiita-alert ${noticeLevel}`;
    dom.innerText = formattedDate;

    const target = document.querySelector('.it-Header_time');
    target.parentNode.insertBefore(dom, target);
  } else {
    const dom = document.createElement('span');
    dom.innerText = ` (${postedDate.fromNow()})`;

    const target = document.querySelector('.it-Header_time span');
    target.className = `qiita-alert ${noticeLevel}`;
    target.appendChild(dom);
  }
});