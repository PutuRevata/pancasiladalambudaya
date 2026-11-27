/* Shared navbar, overlay navigation, and footer. */
(function () {
  "use strict";

  // Chrome may restore a small scroll offset on refresh; start a plain reload at the top.
  const navigationEntry = performance.getEntriesByType?.("navigation")?.[0];
  const resetScrollOnReload = navigationEntry?.type === "reload" && !window.location.hash;
  if (resetScrollOnReload) {
    history.scrollRestoration = "manual";
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    requestAnimationFrame(() => { document.documentElement.style.scrollBehavior = ""; });
    window.addEventListener("pagehide", () => { history.scrollRestoration = "auto"; }, { once: true });
  }

  const site = window.SITE_CONTENT;
  if (!site) return;

  const isuContent = window.contentIsu;
  if (isuContent) {
    document.querySelectorAll("[data-isu-text]").forEach((element) => {
      const value = isuContent[element.dataset.isuText];
      if (typeof value === "string") element.textContent = value;
    });
    document.querySelectorAll("[data-isu-aria-label]").forEach((element) => {
      const value = isuContent[element.dataset.isuAriaLabel];
      if (typeof value === "string") element.setAttribute("aria-label", value);
    });
    const mobileClosingTitle = document.querySelector("[data-isu-mobile-title]");
    if (mobileClosingTitle && typeof isuContent.closingHeadline === "string") {
      const words = isuContent.closingHeadline.trim().split(/\s+/);
      const joinedWords = words.splice(-2).join(" ");
      mobileClosingTitle.append(document.createTextNode(`${words.join(" ")} `));
      const unbrokenPhrase = document.createElement("span");
      unbrokenPhrase.className = "isu__closing-title-unbroken";
      unbrokenPhrase.textContent = joinedWords;
      mobileClosingTitle.append(unbrokenPhrase);
    }

    const isuItems = document.querySelector("[data-isu-items]");
    if (isuItems) {
      const issueCards = [];
      let openCardIndex = null;
      const setOpenCard = (nextIndex) => {
        openCardIndex = nextIndex;
        issueCards.forEach((card, cardIndex) => {
          const isOpen = cardIndex === openCardIndex;
          card.article.dataset.open = String(isOpen);
          card.toggle.setAttribute("aria-expanded", String(isOpen));
          card.panelInner.inert = !isOpen;
        });
      };

      isuContent.items.forEach((item, index) => {
        const article = document.createElement("article");
        article.className = "isu__card";
        article.dataset.open = "false";

        const number = document.createElement("span");
        number.className = "isu__number";
        number.setAttribute("aria-hidden", "true");
        number.textContent = item.number;

        const title = document.createElement("h3");
        title.className = "isu__card-title";
        title.textContent = item.title;

        const body = document.createElement("div");
        body.className = "isu__body";
        const text = document.createElement("p");
        text.className = "isu__text";
        text.textContent = item.text;

        const data = document.createElement("div");
        data.className = "isu__data";
        const dataLabel = document.createElement("span");
        dataLabel.className = "isu__data-label";
        dataLabel.textContent = item.dataLabel;
        const dataText = document.createElement("span");
        dataText.className = "isu__data-text";
        item.data.split(/(\*\*.*?\*\*)/g).forEach((part) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            const strong = document.createElement("strong");
            strong.textContent = part.slice(2, -2);
            dataText.append(strong);
          } else {
            dataText.append(document.createTextNode(part));
          }
        });

        const source = document.createElement("p");
        source.className = "isu__source";
        const sourceLabel = document.createElement("span");
        sourceLabel.textContent = isuContent.sourcePrefix;
        const sourceLink = document.createElement("a");
        sourceLink.href = item.sumberUrl;
        sourceLink.target = "_blank";
        sourceLink.rel = "noopener noreferrer";
        sourceLink.textContent = item.sumberLabel;
        source.append(sourceLabel, sourceLink);
        data.append(dataLabel, dataText, source);

        const sila = document.createElement("div");
        sila.className = "isu__sila";
        const silaTag = document.createElement("span");
        silaTag.className = "isu__sila-tag";
        silaTag.textContent = item.sila;
        const silaText = document.createElement("span");
        silaText.className = "isu__sila-text";
        silaText.textContent = item.silaText;
        sila.append(silaTag, silaText);
        const footer = document.createElement("div");
        footer.className = "isu__footer";
        const toggle = document.createElement("button");
        toggle.className = "isu__toggle";
        toggle.type = "button";
        toggle.id = `isu-toggle-${index + 1}`;
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-controls", `isu-panel-${index + 1}`);
        const toggleLabel = document.createElement("span");
        toggleLabel.textContent = "Data & Sila";
        const chevron = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        chevron.setAttribute("class", "isu__toggle-chevron");
        chevron.setAttribute("viewBox", "0 0 16 16");
        chevron.setAttribute("aria-hidden", "true");
        chevron.setAttribute("focusable", "false");
        const chevronPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        chevronPath.setAttribute("d", "m3 6 5 5 5-5");
        chevronPath.setAttribute("fill", "none");
        chevronPath.setAttribute("stroke", "currentColor");
        chevronPath.setAttribute("stroke-width", "1.5");
        chevronPath.setAttribute("stroke-linecap", "round");
        chevronPath.setAttribute("stroke-linejoin", "round");
        chevron.append(chevronPath);
        toggle.append(toggleLabel, chevron);
        const panel = document.createElement("div");
        panel.className = "isu__panel";
        panel.id = `isu-panel-${index + 1}`;
        panel.setAttribute("role", "region");
        panel.setAttribute("aria-labelledby", toggle.id);
        const panelInner = document.createElement("div");
        panelInner.className = "isu__panel-inner";
        panelInner.inert = true;
        panelInner.append(data, sila);
        panel.append(panelInner);
        toggle.addEventListener("click", () => {
          setOpenCard(openCardIndex === index ? null : index);
        });
        article.addEventListener("keydown", (event) => {
          if (event.key === "Escape" && openCardIndex === index && article.contains(event.target)) {
            event.preventDefault();
            setOpenCard(null);
            toggle.focus();
          }
        });
        footer.append(toggle, panel);
        body.append(text, footer);
        article.append(number, title, body);
        isuItems.append(article);
        issueCards.push({ article, toggle, panelInner });
      });
      setOpenCard(null);
    }
  }

  const budayaContent = window.contentBudaya;
  if (budayaContent) {
    document.querySelectorAll("[data-budaya-text]").forEach((element) => {
      const value = budayaContent[element.dataset.budayaText];
      if (typeof value === "string") element.textContent = value;
    });
    const budayaLink = document.querySelector("[data-budaya-link]");
    if (budayaLink) budayaLink.href = budayaContent.href;

    const panelRoot = document.querySelector("[data-budaya-panels]");
    if (panelRoot) {
      budayaContent.panels.forEach((item) => {
        const panel = document.createElement("article");
        panel.className = "budaya__panel";
        panel.tabIndex = 0;

        const imageWrap = document.createElement("div");
        imageWrap.className = "budaya__image-wrap";
        const image = document.createElement("img");
        image.className = "budaya__photo";
        image.src = item.photo;
        image.alt = item.alt;
        image.width = 800;
        image.height = 1200;
        image.loading = "lazy";
        image.addEventListener("error", () => imageWrap.classList.add("is-missing"), { once: true });
        const placeholder = document.createElement("span");
        placeholder.className = "budaya__placeholder";
        placeholder.textContent = budayaContent.fallbackPrefix + item.placeholder;
        imageWrap.append(image, placeholder);

        const overlay = document.createElement("div");
        overlay.className = "budaya__overlay";
        overlay.setAttribute("aria-hidden", "true");

        const content = document.createElement("div");
        content.className = "budaya__content";
        const base = document.createElement("div");
        base.className = "budaya__base";
        const type = document.createElement("p");
        type.className = "budaya__type";
        type.textContent = item.type;
        const name = document.createElement("h3");
        name.className = "budaya__name";
        name.textContent = item.name;
        const description = document.createElement("p");
        description.className = "budaya__description";
        description.textContent = item.description;
        base.append(type, name, description);

        const reveal = document.createElement("div");
        reveal.className = "budaya__reveal";
        const sila = document.createElement("span");
        sila.className = "budaya__sila";
        sila.textContent = item.sila;
        const message = document.createElement("p");
        message.className = "budaya__pesan";
        message.textContent = item.message;
        reveal.append(sila, message);

        content.append(base, reveal);
        panel.append(imageWrap, overlay, content);
        panelRoot.append(panel);
      });

    }
  }

  const etikaContent = window.contentEtika;
  if (etikaContent) {
    document.querySelectorAll("[data-etika-text]").forEach((element) => {
      const value = etikaContent[element.dataset.etikaText];
      if (typeof value === "string") element.textContent = value;
    });
    const etikaLink = document.querySelector("[data-etika-link]");
    if (etikaLink) etikaLink.href = etikaContent.href;

    const rowRoot = document.querySelector("[data-etika-items]");
    if (rowRoot) {
      etikaContent.items.forEach((item) => {
        const row = document.createElement("article");
        row.className = "etika__row";
        row.tabIndex = 0;

        const number = document.createElement("span");
        number.className = "etika__number";
        number.setAttribute("aria-hidden", "true");
        number.textContent = item.number;

        const main = document.createElement("div");
        main.className = "etika__main";
        const title = document.createElement("h3");
        title.className = "etika__row-title";
        title.textContent = item.title;
        const text = document.createElement("p");
        text.className = "etika__text";
        text.textContent = item.text;
        main.append(title, text);

        const sila = document.createElement("span");
        sila.className = "etika__sila";
        sila.textContent = item.sila;

        row.append(number, main, sila);
        rowRoot.append(row);
      });

    }
  }

  const cekfaktaContent = window.contentCekfakta;
  if (cekfaktaContent) {
    document.querySelectorAll("[data-cekfakta-text]").forEach((element) => {
      const value = cekfaktaContent[element.dataset.cekfaktaText];
      if (typeof value === "string") element.textContent = value;
    });
    const quizLink = document.querySelector("[data-cekfakta-link]");
    if (quizLink) quizLink.href = cekfaktaContent.href;

    const cardRoot = document.querySelector("[data-cekfakta-card]");
    if (cardRoot) {
      const makeElement = (tag, className, text) => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (typeof text === "string") element.textContent = text;
        return element;
      };

      const cardInner = makeElement("div", "cekfakta__inner");
      const front = makeElement("div", "cekfakta__face cekfakta__face--front");
      const back = makeElement("div", "cekfakta__face cekfakta__face--back");
      // Both faces occupy one grid cell so the card height follows the longer answer side.
      front.style.gridArea = "1 / 1";
      back.style.gridArea = "1 / 1";
      front.style.overflow = "visible";
      back.style.overflow = "visible";
      const claimLabel = makeElement("p", "cekfakta__claim-label", cekfaktaContent.claimLabel);
      const claim = makeElement("blockquote", "cekfakta__claim", cekfaktaContent.claim);
      const question = makeElement("p", "cekfakta__question", cekfaktaContent.question);
      const choices = makeElement("div", "cekfakta__choices");
      const hoaxButton = makeElement("button", "cekfakta__choice", cekfaktaContent.hoaxChoice);
      const factButton = makeElement("button", "cekfakta__choice", cekfaktaContent.factChoice);
      hoaxButton.type = factButton.type = "button";
      choices.append(hoaxButton, factButton);
      front.append(claimLabel, claim, question, choices);

      back.setAttribute("aria-hidden", "true");
      back.inert = true;
      const verdictRow = makeElement("div", "cekfakta__result-row");
      const verdictBadge = makeElement("span", `cekfakta__verdict cekfakta__verdict--${cekfaktaContent.verdict}`, cekfaktaContent.verdict.toUpperCase());
      const guessResult = makeElement("p", "cekfakta__guess-result");
      verdictRow.append(verdictBadge, guessResult);
      const factsTitle = makeElement("h3", "cekfakta__facts-title", cekfaktaContent.factsHeading);
      factsTitle.tabIndex = -1;
      const explanation = makeElement("p", "cekfakta__explanation", cekfaktaContent.explanation);
      const stepsTitle = makeElement("h4", "cekfakta__steps-title", cekfaktaContent.stepsHeading);
      const steps = makeElement("ol", "cekfakta__steps");
      cekfaktaContent.steps.forEach((step) => steps.append(makeElement("li", "", step)));
      const source = makeElement("p", "cekfakta__source");
      source.append(document.createTextNode(`${cekfaktaContent.sourcePrefix} `));
      const sourceLink = makeElement("a", "", cekfaktaContent.sourceLabel);
      sourceLink.href = cekfaktaContent.sourceUrl;
      sourceLink.target = "_blank";
      sourceLink.rel = "noopener noreferrer";
      source.append(sourceLink);
      const backFooter = makeElement("div", "cekfakta__back-footer");
      const retry = makeElement("button", "cekfakta__retry");
      retry.type = "button";
      const retryLabel = makeElement("span", "", cekfaktaContent.retry);
      const retryIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      retryIcon.setAttribute("viewBox", "0 0 20 20");
      retryIcon.setAttribute("aria-hidden", "true");
      retryIcon.setAttribute("focusable", "false");
      retryIcon.innerHTML = '<path d="M16 8.2A6.2 6.2 0 1 0 16.1 11M16 4.5v4h-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>';
      retry.append(retryLabel, retryIcon);
      backFooter.append(source, retry);
      back.append(verdictRow, factsTitle, explanation, stepsTitle, steps, backFooter);

      cardInner.append(front, back);
      cardRoot.append(cardInner);
      const liveRegion = document.querySelector("[data-cekfakta-live]");
      let selectedGuess = null;

      function showAnswer(guess) {
        selectedGuess = guess;
        const isCorrect = selectedGuess === cekfaktaContent.verdict;
        verdictBadge.textContent = cekfaktaContent.verdict.toUpperCase();
        guessResult.textContent = isCorrect ? cekfaktaContent.correctGuess : cekfaktaContent.incorrectGuess;
        if (liveRegion) liveRegion.textContent = `${guessResult.textContent} ${cekfaktaContent.verdictAnnouncement}${cekfaktaContent.verdict}.`;
        front.setAttribute("aria-hidden", "true");
        front.inert = true;
        back.setAttribute("aria-hidden", "false");
        back.inert = false;
        cardRoot.classList.add("is-flipped");
        requestAnimationFrame(() => factsTitle.focus());
      }

      function resetCard() {
        selectedGuess = null;
        cardRoot.classList.remove("is-flipped");
        back.setAttribute("aria-hidden", "true");
        back.inert = true;
        front.setAttribute("aria-hidden", "false");
        front.inert = false;
        if (liveRegion) liveRegion.textContent = "";
        requestAnimationFrame(() => hoaxButton.focus());
      }

      hoaxButton.addEventListener("click", () => showAnswer("hoaks"));
      factButton.addEventListener("click", () => showAnswer("fakta"));
      retry.addEventListener("click", resetCard);

    }
  }

  const komitmenContent = window.contentKomitmen;
  if (komitmenContent) {
    document.querySelectorAll("[data-komitmen-text]").forEach((element) => {
      const value = komitmenContent[element.dataset.komitmenText];
      if (typeof value === "string") element.textContent = value;
    });

    const form = document.querySelector("[data-komitmen-form]");
    const optionsRoot = document.querySelector("[data-komitmen-options]");
    const nameLabel = document.querySelector("[data-komitmen-name-label]");
    const nameInput = document.querySelector("[data-komitmen-name]");
    const pledge = document.querySelector("[data-komitmen-pledge]");
    const previewName = document.querySelector("[data-komitmen-card-name]");
    const nameAnnouncement = document.querySelector("[data-komitmen-name-announcement]");
    const commitLink = document.querySelector("[data-komitmen-link]");
    const logo = document.querySelector(".komitmen__logo");
    if (commitLink) commitLink.href = komitmenContent.href;
    if (logo) logo.alt = komitmenContent.logoAlt;
    if (nameLabel && nameInput) {
      nameLabel.textContent = komitmenContent.nameLabel;
      nameLabel.htmlFor = "komitmen-preview-name";
      nameInput.id = "komitmen-preview-name";
      nameInput.placeholder = komitmenContent.namePlaceholder;
    }

    if (form && optionsRoot && pledge && previewName && nameInput) {
      const selectedOptions = [];
      komitmenContent.commitments.forEach((text, index) => {
        const label = document.createElement("label");
        label.className = "komitmen__option";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "komitmen-preview-choice";
        input.value = String(index);
        input.checked = index === 0;
        const indicator = document.createElement("span");
        indicator.className = "komitmen__indicator";
        indicator.setAttribute("aria-hidden", "true");
        const optionText = document.createElement("span");
        optionText.className = "komitmen__option-text";
        optionText.textContent = text;
        label.classList.toggle("is-selected", input.checked);
        label.append(input, indicator, optionText);
        optionsRoot.append(label);
        selectedOptions.push({ input, label, text });
      });

      const legend = document.createElement("legend");
      legend.className = "komitmen__legend";
      legend.textContent = komitmenContent.legend;
      optionsRoot.prepend(legend);
      pledge.textContent = selectedOptions[0]?.text || "";
      previewName.textContent = komitmenContent.defaultName;

      let pledgeTimer = 0;
      selectedOptions.forEach(({ input, label, text }) => {
        input.addEventListener("change", () => {
          selectedOptions.forEach((option) => option.label.classList.toggle("is-selected", option.input.checked));
          window.clearTimeout(pledgeTimer);
          pledge.classList.add("is-changing");
          pledgeTimer = window.setTimeout(() => {
            pledge.textContent = text;
            pledge.classList.remove("is-changing");
          }, 200);
        });
      });

      nameInput.addEventListener("input", () => {
        previewName.textContent = nameInput.value.trim() || komitmenContent.defaultName;
      });
      nameInput.addEventListener("blur", () => {
        if (nameAnnouncement) nameAnnouncement.textContent = `${komitmenContent.nameAnnouncementPrefix}${nameInput.value.trim() || komitmenContent.defaultName}`;
      });
      form.addEventListener("submit", (event) => event.preventDefault());
    }

  }

  const penutupContent = window.contentPenutup;
  if (penutupContent) {
    document.querySelectorAll("[data-penutup-text]").forEach((element) => {
      const value = penutupContent[element.dataset.penutupText];
      if (typeof value === "string") element.textContent = value;
    });
    const penutupLink = document.querySelector("[data-penutup-link]");
    if (penutupLink) penutupLink.href = penutupContent.href;
  }

  // Stagger visible page content as each section enters the viewport.
  const revealGroups = [
    [".isu__intro > *", 80, 0],
    [".isu__card, .isu__note", 90, 0],
    [".isu__closing-content > *, .isu__closing-rule", 80, 0],
    [".budaya__eyebrow, .budaya__title, .budaya__intro p, .budaya__button", 80, 0],
    [".budaya__panel", 90, 0],
    [".rb-card", 90, 0],
    [".etika__eyebrow, .etika__title, .etika__intro", 80, 0],
    [".etika__row", 100, 0],
    [".etika__closing-text, .etika__closing-rule, .etika__button", 80, 0],
    [".cekfakta__eyebrow, .cekfakta__title, .cekfakta__intro", 80, 0],
    [".cekfakta__card", 100, 100],
    [".cekfakta__closing-text, .cekfakta__button", 80, 0],
    [".komitmen__eyebrow, .komitmen__title, .komitmen__intro, .komitmen__fieldset, .komitmen__name-field, .komitmen__button", 80, 0],
    [".komitmen__preview", 80, 120],
    [".penutup__item", 100, 0],
    [".home-content .page-shell > *", 90, 0]
  ];
  const revealElements = new Set();
  revealGroups.forEach(([selector, stagger, initialDelay]) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      if (revealElements.has(element)) return;
      revealElements.add(element);
      element.classList.add("scroll-reveal");
      element.style.setProperty("--reveal-delay", `${initialDelay + index * stagger}ms`);
    });
  });

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          const delay = Number.parseInt(entry.target.style.getPropertyValue("--reveal-delay"), 10) || 0;
          window.setTimeout(() => entry.target.style.removeProperty("--reveal-delay"), delay + 700);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
      element.style.removeProperty("--reveal-delay");
    });
  }

  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  const currentPage = site.pages.find((page) => page.url === currentFile) || site.pages[0];
  const nextPage = currentPage.id === "komitmen" ? site.pages[0] : site.pages[site.pages.indexOf(currentPage) + 1];
  const headerRoot = document.getElementById("site-header");
  const footerRoot = document.getElementById("site-footer");

  if (headerRoot) {
    headerRoot.className = "site-header";
    headerRoot.innerHTML = `
      <div class="site-header__bar">
        <button class="site-header__menu-button" type="button" aria-label="Buka menu" aria-expanded="false" aria-controls="menu-panel">
          <span class="menu-icon" aria-hidden="true"><img class="menu-icon__image" src="assets/iconMenu.svg" width="30" height="25" alt=""><span></span><span></span><span></span></span>
        </button>
        <a class="site-logo" href="index.html" aria-label="${site.name}, beranda">
          <img class="site-logo__full" src="assets/logo.png" width="250" height="80" alt="${site.name}" fetchpriority="high">
          <img class="site-logo__mark" src="assets/logo-mark.png" width="75" height="44" alt="" aria-hidden="true">
        </a>
        <a class="site-header__cta" href="${nextPage.url}">
          <span class="site-header__cta-label"><span class="site-header__cta-long">${currentPage.cta}</span><span class="site-header__cta-short">${currentPage.shortCta}</span></span>
        </a>
      </div>`;

    const menuButton = headerRoot.querySelector(".site-header__menu-button");
    const menuPanel = document.createElement("section");
    menuPanel.className = "menu-panel";
    menuPanel.id = "menu-panel";
    menuPanel.setAttribute("role", "dialog");
    menuPanel.setAttribute("aria-modal", "true");
    menuPanel.setAttribute("aria-label", "Menu navigasi");
    menuPanel.setAttribute("aria-hidden", "true");
    menuPanel.inert = true;
    menuPanel.innerHTML = `
      <div class="menu-panel__topbar">
        <button class="menu-panel__close" type="button" aria-label="Tutup menu"><span class="menu-panel__close-icon" aria-hidden="true"><span></span><span></span></span></button>
      </div>
      <div class="menu-panel__content">
        <nav class="menu-panel__nav" aria-label="Halaman situs"><ol class="menu-panel__list">${site.pages.map((page, i) => `
          <li class="menu-panel__item" style="--menu-index:${i}"><a class="menu-panel__link" href="${page.url}"${page.url === currentPage.url ? ' aria-current="page"' : ""}>
            <span class="menu-panel__number"><span>${String(i + 1).padStart(2, "0")}</span>${page.url === currentPage.url ? '<span class="menu-panel__active-dot" aria-hidden="true"></span>' : ""}</span>
            <span class="menu-panel__label">${page.title}</span>
          </a></li>`).join("")}</ol></nav>
      </div>`;
    document.body.insertBefore(menuPanel, footerRoot || null);
    const menuLinks = [...menuPanel.querySelectorAll("a")];
    let isOpen = false;
    let lockedScrollY = 0;
    let bodyLockStyles = null;
    let scrollBehaviorBeforeMenu = "";
    const backgroundStates = new Map();
    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function setMenu(open) {
      if (open === isOpen) return;
      const scrollAtOpen = open ? window.scrollY : lockedScrollY;
      isOpen = open;
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
      menuPanel.setAttribute("aria-hidden", String(!open));
      menuPanel.inert = !open;
      menuPanel.classList.toggle("is-open", open);
      document.documentElement.classList.toggle("menu-open", open);
      document.body.classList.toggle("menu-open", open);
      if (open) {
        lockedScrollY = scrollAtOpen;
        bodyLockStyles = {
          position: document.body.style.position,
          top: document.body.style.top,
          left: document.body.style.left,
          right: document.body.style.right,
          width: document.body.style.width
        };
        scrollBehaviorBeforeMenu = document.documentElement.style.scrollBehavior;
        document.body.style.position = "fixed";
        document.body.style.top = `-${lockedScrollY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";
        [...document.body.children].forEach((element) => {
          if (element === menuPanel) return;
          backgroundStates.set(element, {
            inert: element.inert,
            ariaHidden: element.getAttribute("aria-hidden")
          });
          element.inert = true;
          element.setAttribute("aria-hidden", "true");
        });
        requestAnimationFrame(() => menuPanel.querySelector(".menu-panel__close").focus({ preventScroll: true }));
      } else {
        [...backgroundStates.entries()].forEach(([element, state]) => {
          element.inert = state.inert;
          if (state.ariaHidden === null) element.removeAttribute("aria-hidden");
          else element.setAttribute("aria-hidden", state.ariaHidden);
        });
        backgroundStates.clear();
        document.body.style.position = bodyLockStyles.position;
        document.body.style.top = bodyLockStyles.top;
        document.body.style.left = bodyLockStyles.left;
        document.body.style.right = bodyLockStyles.right;
        document.body.style.width = bodyLockStyles.width;
        bodyLockStyles = null;
        menuButton.focus({ preventScroll: true });
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo(0, lockedScrollY);
        document.documentElement.style.scrollBehavior = scrollBehaviorBeforeMenu;
        scrollBehaviorBeforeMenu = "";
      }
    }

    menuButton.addEventListener("click", () => setMenu(!isOpen));
    menuPanel.querySelector(".menu-panel__close").addEventListener("click", () => setMenu(false));
    menuPanel.addEventListener("click", (event) => {
      if (!event.target.closest(".menu-panel__nav, .menu-panel__close")) setMenu(false);
    });
    menuLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (event) => {
      if (!isOpen) return;
      if (event.key === "Escape") { event.preventDefault(); setMenu(false); return; }
      if (event.key === "Tab") {
        const focusables = [...menuPanel.querySelectorAll(focusableSelector)];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        else if (!menuPanel.contains(document.activeElement)) { event.preventDefault(); first.focus(); }
      }
    });

    let scheduled = false;
    let compact = false;
    function updateHeader() {
      // Hysteresis avoids repeated resize toggles around the scroll threshold.
      if (!compact && window.scrollY > 48) compact = true;
      else if (compact && window.scrollY < 20) compact = false;
      headerRoot.classList.toggle("is-compact", compact);
      scheduled = false;
    }
    window.addEventListener("scroll", () => {
      if (!scheduled) { scheduled = true; requestAnimationFrame(updateHeader); }
    }, { passive: true });
    updateHeader();
  }

  if (footerRoot) {
    const footerContent = window.contentFooter;
    if (footerContent) {
      const createFooterElement = (tag, className, value) => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (typeof value === "string") element.textContent = value;
        return element;
      };
      footerRoot.className = "footer";
      const inner = createFooterElement("div", "footer__inner");
      const columns = createFooterElement("div", "footer__columns");

      const brand = createFooterElement("div", "footer__brand");
      const logoBox = createFooterElement("div", "footer__logo-box");
      const logo = createFooterElement("img", "footer__logo");
      logo.src = "assets/logo.png";
      logo.alt = footerContent.logoAlt;
      logo.width = 300;
      logo.height = 96;
      logoBox.append(logo);
      brand.append(logoBox,
        createFooterElement("p", "footer__subtitle", footerContent.subtitle),
        createFooterElement("p", "footer__project-note", footerContent.projectNote));

      const navColumn = createFooterElement("div", "footer__nav-column");
      const navTitle = createFooterElement("h2", "footer__column-title", footerContent.exploreTitle);
      const nav = createFooterElement("nav", "footer__nav");
      nav.setAttribute("aria-label", footerContent.navLabel);
      const navList = createFooterElement("ul", "footer__link-list");
      site.pages.forEach((page) => {
        const listItem = createFooterElement("li", "footer__list-item");
        const link = createFooterElement("a", "footer__link", page.title);
        link.href = page.url;
        if (page.url === currentPage.url) link.setAttribute("aria-current", "page");
        listItem.append(link);
        navList.append(listItem);
      });
      nav.append(navList);
      navColumn.append(navTitle, nav);

      const socialColumn = createFooterElement("div", "footer__social-column");
      const socialTitle = createFooterElement("h2", "footer__column-title", footerContent.followTitle);
      const socialList = createFooterElement("ul", "footer__social");
      footerContent.social.forEach((item) => {
        const listItem = createFooterElement("li", "footer__list-item");
        if (item.url && item.url !== "#") {
          const link = createFooterElement("a", "footer__link", item.name);
          link.href = item.url;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          listItem.append(link);
        } else {
          listItem.append(createFooterElement("span", "footer__social-placeholder", item.name));
        }
        socialList.append(listItem);
      });
      socialColumn.append(socialTitle, socialList, createFooterElement("p", "footer__hashtag", footerContent.hashtag));
      columns.append(brand, navColumn, socialColumn);

      const bottom = createFooterElement("div", "footer__bottom");
      const credits = createFooterElement("div", "footer__credit");
      credits.append(createFooterElement("p", "footer__copyright", footerContent.hakCipta));
      const legal = createFooterElement("div", "footer__legal");
      const toTop = createFooterElement("a", "footer__top-link", footerContent.kembaliKeAtas);
      toTop.href = "#";
      const topArrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      topArrow.setAttribute("viewBox", "0 0 16 16");
      topArrow.setAttribute("aria-hidden", "true");
      topArrow.setAttribute("focusable", "false");
      topArrow.innerHTML = '<path d="M8 13V3m-4 4 4-4 4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>';
      toTop.append(topArrow);
      toTop.addEventListener("click", (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      });
      legal.append(toTop);
      bottom.append(credits, legal);
      inner.append(columns, bottom);
      footerRoot.replaceChildren(inner);
    }
  }
})();
