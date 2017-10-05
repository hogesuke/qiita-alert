document.addEventListener('DOMContentLoaded', () => {

  const postDateDom = document.querySelector('meta[itemprop="datePublished"]');
  const datetime = postDateDom && postDateDom.getAttribute('content');

  if (!datetime) {
    return;
  }

  const modified = !!document.querySelector('time[itemprop="dateModified"]');

  // 更新していない記事には投稿日時が表示されているので投稿日時の挿入処理をスキップ
  if (modified) {
    const postedDate = new Date(Date.parse(datetime));
    const formattedDate = [
      postedDate.getFullYear(), '年',
      ('0' + (postedDate.getMonth() + 1)).slice(-2), '月',
      ('0' + postedDate.getDate()).slice(-2), '日',
      'に投稿'
    ].join('');

    const dom = document.createElement('div');
    dom.className = 'ArticleAsideHeader__date';
    dom.innerText = formattedDate;

    const target = document.querySelector('.ArticleAsideHeader__date');
    target.parentNode.insertBefore(dom, target);
  }
});