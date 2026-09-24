
(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

 
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function safeUrl(url) {
    if (!url) return '#';
    return /^(https?:|mailto:|tel:|#|\/)/i.test(url) ? url : '#';
  }

  
  function renderHero() {
    const host = $('[data-hero-text]');
    if (!host) return;

    const eyebrow = el('p', 'hero__eyebrow', SITE.role);

    const name = el('h1', 'hero__name');
    name.appendChild(document.createTextNode(SITE.name));
    if (SITE.nameJa) {
      name.appendChild(el('span', 'name-ja', SITE.nameJa));
    }

    const intro = el('p', 'hero__intro', SITE.intro);

    const meta = el('div', 'hero__meta');
    const hanko = el('span', 'hanko', SITE.hanko);
    hanko.setAttribute('aria-hidden', 'true');
    meta.appendChild(hanko);
    if (SITE.location) {
      meta.appendChild(el('span', 'hero__location', SITE.location));
    }

    host.append(eyebrow, name, intro, meta);

    // Stagger the hero text in
    $$('.hero__text > *').forEach((node, i) => {
      node.style.setProperty('--d', `${120 + i * 90}ms`);
    });
  }

  
  function renderPortrait() {
    const host = $('[data-portrait]');
    if (!host) return;

    const frame = el('div', 'portrait__frame');
    frame.setAttribute('role', 'button');
    frame.setAttribute('tabindex', '0');
    frame.setAttribute('aria-label', 'Open photo');

    const img = el('img', 'portrait__img');
    img.src = SITE.photo;
    img.alt = SITE.photoAlt || '';
    img.loading = 'eager';
    img.decoding = 'async';
    
    img.addEventListener('error', () => { img.style.visibility = 'hidden'; });

    const curtain = el('div', 'portrait__curtain');
    curtain.setAttribute('aria-hidden', 'true');

    const caption = el('figcaption', 'portrait__caption');
    caption.appendChild(document.createTextNode((SITE.name || '').split(' ')[0]));
    if (SITE.photoNote) {
      caption.appendChild(el('span', null, ' · ' + SITE.photoNote));
    }

    const seal = el('span', 'hanko portrait__hanko', SITE.hanko);
    seal.setAttribute('aria-hidden', 'true');

    frame.append(img, curtain, caption, seal);
    host.appendChild(frame);

    /* Lightbox open */
    const open = () => openLightbox(img.src, img.alt);
    frame.addEventListener('click', open);
    frame.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });
  }

  
  function renderAbout() {
    const titleHost = $('[data-about-title]');
    const bodyHost  = $('[data-about-body]');
    if (titleHost && SITE.about?.title) {
      titleHost.textContent = SITE.about.title;
      if (SITE.about.titleJa) titleHost.dataset.ja = SITE.about.titleJa;
    }
    if (!bodyHost || !SITE.about?.paragraphs) return;

    SITE.about.paragraphs.forEach((text, i) => {
      const p = el('p', null, text);
      p.setAttribute('data-reveal', '');
      p.style.setProperty('--d', `${i * 80}ms`);
      bodyHost.appendChild(p);
    });
  }

  
  function renderWork() {
    const titleHost = $('[data-work-title]');
    const noteHost  = $('[data-work-note]');
    const listHost  = $('[data-work]');

    if (titleHost && SITE.work?.title) {
      titleHost.textContent = SITE.work.title;
      if (SITE.work.titleJa) titleHost.dataset.ja = SITE.work.titleJa;
    }
    if (noteHost && SITE.work?.note) noteHost.textContent = SITE.work.note;

    if (!listHost || !SITE.work?.items) return;

    SITE.work.items.forEach((item, i) => {
      const li = el('li', 'work__item');
      li.setAttribute('data-reveal', '');
      li.style.setProperty('--d', `${i * 70}ms`);

      const a = el('a', 'work__link');
      a.href = safeUrl(item.url);
      if (/^https?:/i.test(item.url || '')) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }

      a.appendChild(el('span', 'work__num', item.num || String(i + 1)));

      const mid = el('span');
      mid.appendChild(el('span', 'work__title', item.title || 'Untitled'));
      if (item.desc) mid.appendChild(el('span', 'work__desc', item.desc));
      a.appendChild(mid);

      if (item.year) a.appendChild(el('span', 'work__year', item.year));

      li.appendChild(a);
      listHost.appendChild(li);
    });
  }

  
  function renderContact() {
    const host = $('[data-contact]');
    if (!host || !SITE.contact) return;

    const c = SITE.contact;

    if (c.lead) host.appendChild(el('p', 'contact__lead', c.lead));

    if (c.email) {
      const a = el('a', 'contact__email', c.email);
      a.href = 'mailto:' + c.email;
      host.appendChild(a);
    }

    if (Array.isArray(c.links) && c.links.length) {
      const wrap = el('div', 'contact__links');
      c.links.forEach((link) => {
        const a = el('a', 'contact__link', link.label);
        a.href = safeUrl(link.url);
        if (/^https?:/i.test(link.url || '')) {
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
        }
        wrap.appendChild(a);
      });
      host.appendChild(wrap);
    }
  }

  
  function renderFooter() {
    const line = $('[data-footer]');
    const meta = $('[data-footer-meta]');
    if (line && SITE.footer?.line) line.textContent = SITE.footer.line;
    if (meta && SITE.footer?.meta) meta.textContent = SITE.footer.meta;
  }

  
  function renderTitle() {
    if (SITE.name && SITE.role) {
      document.title = `${SITE.name} — ${SITE.role}`;
    }
    const nameNode = $('[data-name]');
    if (nameNode && SITE.name) nameNode.textContent = SITE.name;
  }

  
  let lastFocused = null;

  function openLightbox(src, alt) {
    const box = $('[data-lightbox]');
    const img = $('[data-lightbox-img]');
    if (!box || !img) return;

    lastFocused = document.activeElement;
    img.src = src;
    img.alt = alt || '';

    box.hidden = false;
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      box.classList.add('is-open');
      $('[data-lightbox-close]')?.focus();
    });
  }

  function closeLightbox() {
    const box = $('[data-lightbox]');
    if (!box || box.hidden) return;

    box.classList.remove('is-open');
    document.body.style.overflow = '';

    window.setTimeout(() => {
      box.hidden = true;
      $('[data-lightbox-img]').src = '';
    }, 320);

    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  function initLightbox() {
    const box = $('[data-lightbox]');
    if (!box) return;

    $('[data-lightbox-close]')?.addEventListener('click', closeLightbox);
    box.addEventListener('click', (e) => {
      if (e.target === box) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  
  function initScroll() {
    const header = $('[data-header]');
    const hero   = $('.hero');

    
    if (header) {
      const onScroll = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 12);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    
    const portrait = $('[data-portrait]');
    if (portrait && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed', 'is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });
      io.observe(portrait);
    } else if (portrait) {
      portrait.classList.add('is-revealed', 'is-visible');
    }
  }

  
  function initReveal() {
    const nodes = $$('[data-reveal]');
    if (!nodes.length) return;

    // No IntersectionObserver → show everything immediately
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    });

    nodes.forEach((n) => io.observe(n));
  }

  
  function init() {
    renderTitle();
    renderHero();
    renderPortrait();
    renderAbout();
    renderWork();
    renderContact();
    renderFooter();

    initLightbox();
    initScroll();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();