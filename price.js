// price.js — single client-side source of the product price.
// The value itself lives in the payment worker (payments/worker/src/pricing.js:
// DEFAULTS.priceRu / PRICE_RU env) and is served by GET /api/price, the same
// endpoint the home page and the checkout page already use. Any element marked
// with data-price is filled from that response, so the offer (terms) can never
// drift from the price charged on the site.
(function () {
  var API_BASE = 'https://clipboardmanager-payments.sova11.workers.dev';

  function fmtRub(v) { return Number(v).toLocaleString('ru-RU') + ' \u20BD'; }
  function fmtRubEn(v) { return Number(v).toLocaleString('en-US') + ' RUB'; }
  function fmtUsd(v) { return '$' + Number(v).toLocaleString('en-US'); }

  function apply(p) {
    document.querySelectorAll('[data-price="rub"]').forEach(function (el) {
      el.textContent = fmtRub(p.ru);
    });
    document.querySelectorAll('[data-price="rub-en"]').forEach(function (el) {
      el.textContent = fmtRubEn(p.ru);
    });
    document.querySelectorAll('[data-price="usd"]').forEach(function (el) {
      el.textContent = fmtUsd(p.priceUsd);
    });
  }

  fetch(API_BASE + '/api/price')
    .then(function (r) { if (!r.ok) throw new Error('price'); return r.json(); })
    .then(apply)
    .catch(function () { /* markup keeps its last known value */ });
})();
