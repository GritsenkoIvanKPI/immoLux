/* Contact page. ?subject=search|buy|sell|other preselects the subject. */
(function () {
  'use strict';

  var SUBJECTS = ['buy', 'search', 'sell', 'other'];
  var preset = new URLSearchParams(location.search).get('subject');
  if (SUBJECTS.indexOf(preset) === -1) preset = 'buy';

  IL.onRender(function () {
    var t = IL.t, esc = IL.esc, icon = IL.icon, c = IL.config.contact;
    var agent = IL.config.agents[Object.keys(IL.config.agents)[0]];
    var root = document.getElementById('contact');

    root.innerHTML =
      '<div class="reveal">' +
        '<div class="contact-list">' +
          '<a class="contact-item" href="tel:' + c.phoneHref + '">' + icon('phone') + '<span><small>' + esc(t('contact.phone')) + '</small><strong>' + esc(c.phone) + '</strong></span></a>' +
          '<a class="contact-item" href="mailto:' + c.email + '">' + icon('mail') + '<span><small>' + esc(t('contact.email')) + '</small><strong>' + esc(c.email) + '</strong></span></a>' +
          '<div class="contact-item">' + icon('pin') + '<span><small>' + esc(t('contact.region')) + '</small><strong>' + esc(IL.L(IL.config.region)) + '</strong></span></div>' +
        '</div>' +
        (agent ? '<div class="contact-person"><p class="agent-card__label">' + esc(t('prop.contact')) + '</p>' +
          '<div class="agent"><div class="agent__avatar">' + (agent.photo ? '<img src="' + agent.photo + '" alt="">' : esc(agent.initials)) + '</div>' +
          '<div><p class="agent__name">' + esc(agent.name) + '</p><p class="agent__role">' + esc(t('prop.contact.role')) + '</p></div></div></div>' : '') +
      '</div>' +
      '<div class="form-card reveal">' +
        '<h2 class="form-card__title">' + esc(t('form.contact.title')) + '</h2>' +
        '<form class="form" id="contact-form">' +
          '<div class="form__grid">' +
            IL.field('subject', 'form.subject', {
              prefix: 'ct', type: 'select', required: true, cls: 'field--full',
              options: SUBJECTS.map(function (s) { return { value: t('form.subject.' + s), label: t('form.subject.' + s), selected: s === preset }; })
            }) +
            IL.field('salutation', 'form.salutation', { prefix: 'ct', type: 'select', required: true, options: IL.salutationOptions(), cls: 'field--half' }) +
            IL.field('title', 'form.title', { prefix: 'ct', cls: 'field--half', autocomplete: 'honorific-prefix' }) +
            IL.field('firstName', 'form.firstName', { prefix: 'ct', required: true, cls: 'field--half', autocomplete: 'given-name' }) +
            IL.field('lastName', 'form.lastName', { prefix: 'ct', required: true, cls: 'field--half', autocomplete: 'family-name' }) +
            IL.field('email', 'form.email', { prefix: 'ct', type: 'email', required: true, cls: 'field--half', autocomplete: 'email' }) +
            IL.field('phone', 'form.phone', { prefix: 'ct', type: 'tel', cls: 'field--half', autocomplete: 'tel' }) +
            IL.field('message', 'form.message', { prefix: 'ct', type: 'textarea', required: true, cls: 'field--full' }) +
          '</div>' +
          '<p class="form__note">' + esc(t('form.required')) + '</p>' +
          IL.consentField('ct') +
          '<div class="form__status" hidden role="alert"></div>' +
          '<div class="form__actions"><button type="submit" class="btn btn--primary">' + esc(t('form.submit')) + '</button></div>' +
        '</form>' +
      '</div>';

    var form = root.querySelector('#contact-form');
    IL.bindForm(form, {
      get subject() { return 'ImmoLux: ' + form.querySelector('[name="subject"]').value; },
      to: c.email
    });
  });
})();
