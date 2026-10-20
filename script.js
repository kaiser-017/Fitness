/* LK FITNESS - navigation, gallery lightbox and WhatsApp enquiry form */
(() => {
  'use strict';
  const WA_NUMBER = '918650440510';
  const $ = (s, c = document) => c.querySelector(s);

  // Footer year
  $('#year').textContent = new Date().getFullYear();

  // Mobile navigation
  const toggle = $('.nav-toggle'), nav = $('#nav');
  const setNav = open => { nav.classList.toggle('open', open); toggle.setAttribute('aria-expanded', open); };
  toggle.addEventListener('click', () => setNav(!nav.classList.contains('open')));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setNav(false); });

  // Gallery lightbox
  const box = $('#lightbox'), boxImg = $('img', box);
  const items = [...document.querySelectorAll('.gallery button')];
  let idx = 0, opener = null;
  const show = i => {
    idx = (i + items.length) % items.length;
    const img = $('img', items[idx]);
    boxImg.src = items[idx].dataset.full; boxImg.alt = img.alt;
  };
  const open = i => { opener = items[i]; show(i); box.hidden = false; document.body.style.overflow = 'hidden'; $('.lb-close').focus(); };
  const close = () => { box.hidden = true; document.body.style.overflow = ''; if (opener) opener.focus(); };
  items.forEach((b, i) => b.addEventListener('click', () => open(i)));
  $('.lb-close').addEventListener('click', close);
  $('.lb-prev').addEventListener('click', () => show(idx - 1));
  $('.lb-next').addEventListener('click', () => show(idx + 1));
  box.addEventListener('click', e => { if (e.target === box) close(); });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { setNav(false); if (!box.hidden) close(); }
    if (box.hidden) return;
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  // Enquiry form: validate, then open WhatsApp with a pre-filled message
  const form = $('#enquiry');
  const checks = {
    name: v => v.trim().length >= 2 || 'Enter your full name.',
    phone: v => {
      const d = v.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');
      return /^[6-9]\d{9}$/.test(d) || 'Enter a valid 10-digit mobile number.';
    },
    interest: v => v !== '' || 'Choose what you are enquiring about.'
  };
  const validate = f => {
    const ok = checks[f.name](f.value);
    $('#' + f.name + '-err').textContent = ok === true ? '' : ok;
    f.setAttribute('aria-invalid', ok !== true);
    return ok === true;
  };
  Object.keys(checks).forEach(n => form.elements[n].addEventListener('input', e => validate(e.target)));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const fields = Object.keys(checks).map(n => form.elements[n]);
    const bad = fields.filter(f => !validate(f));
    if (bad.length) { bad[0].focus(); return; }
    const msg = form.elements.message.value.trim();
    const text = 'Hello LK FITNESS,\n' +
      'Name: ' + form.elements.name.value.trim() + '\n' +
      'Phone: ' + form.elements.phone.value.trim() + '\n' +
      'Interested in: ' + form.elements.interest.value +
      (msg ? '\nMessage: ' + msg : '');
    window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    $('#status').textContent = 'WhatsApp is opening with your details. Press Send in WhatsApp to submit your enquiry.';
  });
})();
