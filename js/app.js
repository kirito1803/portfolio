/* Shared helpers: applies the theme, builds the content. No colors live here. */
(function () {
  const T = window.THEME, S = window.SITE;
  const root = document.documentElement.style;
  Object.entries(T.colors).forEach(([k, v]) => root.setProperty("--c-" + k, v));
  root.setProperty("--font-heading", T.fonts.heading);
  root.setProperty("--font-body", T.fonts.body);
  root.setProperty("--font-ui", T.fonts.ui);
  if (T.googleFontsUrl) {
    const l = document.createElement("link");
    l.rel = "stylesheet"; l.href = T.googleFontsUrl;
    document.head.appendChild(l);
  }

  const $ = (s) => document.querySelector(s);
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };
  const link = (label, href, cls) => {
    const a = el("a", "btn " + cls);
    a.textContent = label; a.href = href;
    if (/^https?:/.test(href)) { a.target = "_blank"; a.rel = "noopener"; }
    return a;
  };
  const img = (src, alt) => { const i = el("img"); i.src = src; i.alt = alt || ""; return i; };

  // Built-in drawing used when no image is set (uses theme colors via CSS vars)
  const CHIP = `<svg viewBox="0 0 120 120" fill="none" stroke="var(--c-onAccent)" stroke-width="5" stroke-linecap="round" aria-hidden="true">
    <rect x="30" y="30" width="60" height="60" rx="8" fill="var(--c-surface)"/><rect x="46" y="46" width="28" height="28" rx="4"/>
    <path d="M45 30V12M60 30V12M75 30V12M45 108V90M60 108V90M75 108V90M30 45H12M30 60H12M30 75H12M108 45H90M108 60H90M108 75H90"/></svg>`;
  const ICONS = {
    github: '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-4 1.5-4-2-6-2m12 4v-3.5a3 3 0 0 0-.8-2.3c2.800-.3 5.800-1.400 5.800-6.200a4.800 4.800 0 0 0-1.300-3.300 4.500 4.500 0 0 0-.1-3.300s-1.100-.3-3.500 1.300a12 12 0 0 0-6.200 0C6.500 2.800 5.400 3.100 5.400 3.100a4.500 4.500 0 0 0-.1 3.300A4.800 4.800 0 0 0 4 9.700c0 4.800 3 5.900 5.800 6.200a3 3 0 0 0-.8 2.300V21"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 4a2 2 0 1 0 0 .01"/></svg>',
    mail: '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>'
  };

  document.title = S.pageTitle;
  const projectHref = (p) => p.link || "project.html?id=" + encodeURIComponent(p.id);

  /* Fixed header: stays at the top; gets a soft background once you scroll */
  function nav() {
    const bar = el("header", "topbar");
    const n = el("nav", "nav wrap");
    n.appendChild(el("a", "brand")).textContent = S.brand;
    n.lastChild.href = "index.html";
    const ul = el("ul");
    S.nav.forEach((i) => {
      const li = el("li"), a = el("a");
      a.textContent = i.label;
      a.href = (document.body.dataset.page === "home" ? "" : "index.html") + i.href;
      li.appendChild(a); ul.appendChild(li);
    });
    n.appendChild(ul);
    bar.appendChild(n);
    const onScroll = () => bar.classList.toggle("scrolled", window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return bar;
  }

  function footer() {
    const f = el("footer");
    f.innerHTML = '<svg viewBox="0 0 1440 200" preserveAspectRatio="none" aria-hidden="true"><path d="M0 70C220 0 420 20 640 70S1100 150 1440 40V200H0Z"/></svg>';
    f.appendChild(el("span")).textContent = S.footer;
    return f;
  }

  /* ---------- HOME ---------- */
  function home() {
    const h = S.hero;
    const hero = el("header", "hero");

    // Visual stack (bottom to top): blob -> photo -> blob wave in front of the photo
    const visual = el("div", "hero-visual");
    visual.innerHTML = '<svg class="blob" viewBox="0 0 600 700" preserveAspectRatio="none" aria-hidden="true"><path d="M210 0H600V600C520 680 400 720 330 680 260 640 250 580 190 520 120 450 0 440 20 320 40 210 200 130 210 0Z"/></svg>';
    const avatar = h.image ? img(h.image, S.brand) : img("assets/avatar_no_bg.png", "Avatar");
    avatar.className = "avatar";
    visual.appendChild(avatar);
    visual.insertAdjacentHTML("beforeend", '<svg class="blob-front" viewBox="0 0 600 700" preserveAspectRatio="none" aria-hidden="true"><path d="M190 520C240 575 300 600 370 588 450 574 530 590 600 548V600C520 680 400 720 330 680 260 640 250 580 190 520Z"/></svg>');

    const wrap = el("div", "wrap hero-copy");
    const text = el("div", "hero-text");
    text.append(el("p", "role"), el("h1"), el("p"));
    text.children[0].textContent = h.role;
    text.children[1].textContent = h.title;
    text.children[2].textContent = h.text;
    const btns = el("div", "btns");
    h.buttons.forEach((b) => btns.appendChild(link(b.label, b.href, b.style)));
    text.appendChild(btns);
    wrap.appendChild(text);
    hero.append(visual, wrap);

    const about = el("section"); about.id = "about";
    const aw = el("div", "wrap about");
    const at = el("div");
    at.append(el("h2"), el("p"));
    at.children[0].textContent = S.about.title;
    at.children[1].textContent = S.about.text;
    at.appendChild(link(S.about.button.label, S.about.button.href, "primary"));
    // const disc = el("div", "disc");
    // if (S.about.image) disc.appendChild(img(S.about.image, S.brand)); else disc.innerHTML = CHIP;
    // aw.append(at, disc); about.appendChild(aw);
    const disc = el("div", "disc");
    disc.appendChild(img("assets/disc_pic.jpg", S.brand));
    aw.append(at, disc);
    about.appendChild(aw);

    const proj = el("section"); proj.id = "projects";
    const pw = el("div", "wrap");
    pw.appendChild(el("h2", "title")).textContent = S.projects.title;
    const cards = el("div", "cards");
    S.projects.items.forEach((p) => {
      const c = el("article", "card");
      const body = el("div", "card-body");
      body.append(el("h3"), el("p"));
      body.children[0].textContent = p.name;
      body.children[1].textContent = p.description;
      body.appendChild(link(S.projects.buttonLabel, projectHref(p), "pill"));
      const pic = el("div", "card-img");
      if (p.image) pic.appendChild(img(p.image, p.name)); else pic.innerHTML = CHIP;
      c.append(body, pic); cards.appendChild(c);
    });
    pw.appendChild(cards); proj.appendChild(pw);

    const C = S.contact, L = C.labels;
    const contact = el("section"); contact.id = "contact";
    const cw = el("div", "wrap");
    cw.appendChild(el("h2", "title")).textContent = C.title;
    const form = el("form", "form");
    form.innerHTML = `<label>${L.name}<input name="name" required></label>
      <label>${L.email}<input name="email" type="email" required></label>
      <label>${L.message}<textarea name="message" required></textarea></label>`;
    const send = el("button", "btn primary"); send.type = "submit"; send.textContent = L.send;
    form.appendChild(send);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const body = d.get("message") + "\n\n" + d.get("name") + " <" + d.get("email") + ">";
      location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent("Portfolio message from " + d.get("name")) + "&body=" + encodeURIComponent(body);
    });
    const soc = el("div", "socials");
    C.socials.forEach((s) => {
      const a = el("a", "", ICONS[s.icon] || "");
      a.href = s.url; a.setAttribute("aria-label", s.label);
      if (/^https?:/.test(s.url)) { a.target = "_blank"; a.rel = "noopener"; }
      soc.appendChild(a);
    });
    cw.append(form, soc); contact.appendChild(cw);

    $("#app").append(nav(), hero, about, proj, contact, footer());
  }

  /* ---------- PROJECT / ARTICLE PAGE ----------
     Content comes from config/articles/<project id>.js (window.ARTICLE). */
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // tiny inline markup for text: `code`, **bold**, [label](url)
  const inline = (s) => esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');

  function caption(b) {
    if (!b.label && !b.caption) return null;
    const c = el("figcaption");
    c.innerHTML = (b.label ? "<strong>" + esc(b.label) + "</strong> " : "") + (b.caption ? inline(b.caption) : "");
    return c;
  }

  function renderBlock(b, i) {
    switch (b.type) {
      case "heading":
      case "subheading": {
        const h = el(b.type === "heading" ? "h2" : "h3");
        h.id = "sec-" + i; h.textContent = b.text; return h;
      }
      case "paragraph": return el("p", "", inline(b.text));
      case "list": {
        const l = el(b.ordered ? "ol" : "ul");
        b.items.forEach((t) => l.appendChild(el("li", "", inline(t))));
        return l;
      }
      case "image": {
        const f = el("figure", "fig");
        if (b.src) f.appendChild(img(b.src, b.alt || b.caption || ""));
        else f.appendChild(el("div", "ph")).textContent = "Image placeholder";
        const c = caption(b); if (c) f.appendChild(c);
        return f;
      }
      case "pdf": {
        const f = el("figure", "fig");
        const fr = el("iframe", "pdf-frame");
        fr.src = b.src + "#view=FitH"; fr.title = b.title || b.caption || "PDF";
        fr.style.height = (b.height || 600) + "px";
        f.appendChild(fr);
        const c = caption(b); if (c) f.appendChild(c);
        const a = link(b.buttonLabel || "Open / download PDF", b.src, "pill");
        a.target = "_blank"; a.rel = "noopener"; a.style.justifySelf = "center";
        f.appendChild(a);
        return f;
      }
      case "code": {
        const f = el("figure", "fig");
        const pre = el("pre"), code = el("code");
        code.textContent = b.code; pre.appendChild(code); f.appendChild(pre);
        const c = caption(b); if (c) f.appendChild(c);
        return f;
      }
    }
    return document.createComment("unknown block");
  }

  function renderArticle(p, A) {
    const main = el("main", "wrap article");
    const back = el("a", "back");
    back.href = "index.html#projects"; back.textContent = "\u2190 " + S.projectPage.backLabel;
    main.appendChild(back);
    main.appendChild(el("h1", "a-title")).textContent = A.title || p.name;

    const bits = [];
    if (A.category || p.type) bits.push(esc(A.category || p.type));
    if (A.author) bits.push("By " + esc(A.author));
    if (A.date) bits.push(esc(A.date));
    if (A.tags && A.tags.length) bits.push(A.tags.map(esc).join(", "));
    main.appendChild(el("p", "a-meta", bits.join(" / ")));

    if (A.series && A.series.length) {
      main.appendChild(el("p", "a-series", A.series.map((s) => '<a href="' + esc(s.href) + '">' + esc(s.label) + "</a>").join(" , ")));
    }
    if (A.cover) { const f = el("figure", "fig"); f.appendChild(img(A.cover, A.title || p.name)); main.appendChild(f); }

    const blocks = A.blocks || [];
    const heads = blocks.map((b, i) => ({ b, i })).filter((x) => x.b.type === "heading" || x.b.type === "subheading");
    if (A.contents !== false && heads.length > 1) {
      const toc = el("nav", "toc");
      toc.setAttribute("aria-label", A.contentsTitle || "Contents");
      toc.appendChild(el("h2")).textContent = A.contentsTitle || "Contents";
      const top = el("ul"); let sub = null;
      heads.forEach(({ b, i }) => {
        const li = el("li"), a = el("a");
        a.href = "#sec-" + i; a.textContent = b.text; li.appendChild(a);
        if (b.type === "heading") { top.appendChild(li); sub = null; }
        else { if (!sub) { sub = el("ul"); (top.lastChild || top).appendChild(sub); } sub.appendChild(li); }
      });
      toc.appendChild(top); main.appendChild(toc);
    }

    const body = el("div", "a-body");
    if (blocks.length) blocks.forEach((b, i) => body.appendChild(renderBlock(b, i)));
    else {
      body.appendChild(el("p")).textContent = p.description;
      body.appendChild(el("p", "a-empty")).textContent = S.projectPage.emptyText;
    }
    main.appendChild(body);
    return main;
  }

  function detail() {
    // const id = new URLSearchParams(location.search).get("id");
    const id = document.body.dataset.project || new URLSearchParams(location.search).get("id");
    const p = S.projects.items.find((x) => x.id === id) || S.projects.items[0];
    document.title = p.name + " | " + S.brand;
    const slot = el("div");
    $("#app").append(nav(), slot, footer());
    const show = (A) => slot.replaceChildren(renderArticle(p, A || {}));
    const s = document.createElement("script");
    s.src = "config/articles/" + p.id + ".js";
    s.onload = () => { const A = window.ARTICLE; window.ARTICLE = undefined; show(A); };
    s.onerror = () => show({});
    document.head.appendChild(s);
  }

  document.body.dataset.page === "home" ? home() : detail();
})();