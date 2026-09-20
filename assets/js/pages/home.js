/* Home: newest listings (sold ones last). */
(function () {
  'use strict';
  var FEATURED = 3;

  IL.onRender(function () {
    var el = document.getElementById('featured');
    var list = IL.properties.slice().sort(function (a, b) {
      var sa = a.status === 'sold' ? 1 : 0, sb = b.status === 'sold' ? 1 : 0;
      if (sa !== sb) return sa - sb;
      return (b.listedAt || '').localeCompare(a.listedAt || '');
    }).slice(0, FEATURED);
    el.classList.toggle('cards--solo', list.length === 1);
    el.innerHTML = list.map(IL.cardHTML).join('');
  });
})();
