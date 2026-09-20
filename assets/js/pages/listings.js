/* Listings: all properties, newest first (sold ones last), with "Mehr anzeigen" paging. */
(function () {
  'use strict';

  var shown = IL.config.pageSize;
  var $results = document.getElementById('results');
  var $count = document.getElementById('count');
  var $more = document.getElementById('more');

  function sorted() {
    return IL.properties.slice().sort(function (a, b) {
      var sa = a.status === 'sold' ? 1 : 0, sb = b.status === 'sold' ? 1 : 0;
      if (sa !== sb) return sa - sb;
      return (b.listedAt || '').localeCompare(a.listedAt || '');
    });
  }

  function render() {
    var t = IL.t;
    var list = sorted();
    $count.textContent = list.length === 1 ? t('list.found.one') : t('list.found.many', { n: list.length });
    $results.innerHTML = list.slice(0, shown).map(IL.cardHTML).join('');
    $more.innerHTML = list.length > shown
      ? '<button type="button" class="btn btn--outline-wide" data-more>' + IL.esc(t('list.more')) + '</button>'
      : '';
    IL.observeReveals();
  }

  $more.addEventListener('click', function (e) {
    if (e.target.closest('[data-more]')) { shown += IL.config.pageSize; render(); }
  });

  IL.onRender(render);
})();
