(function () {
  "use strict";

  const sila = [
    {
      short: "Ketuhanan",
      title: "Sila 1: Ketuhanan Yang Maha Esa",
      practice: "Tri Hita Karana dan penghormatan pada hari suci.",
      digital: "Menghormati keyakinan serta tidak menjadikan ritual sebagai bahan olok-olok."
    },
    {
      short: "Kemanusiaan",
      title: "Sila 2: Kemanusiaan yang Adil dan Beradab",
      practice: "Menyama Braya dan saling menghargai di lingkungan banjar.",
      digital: "Menjaga martabat orang lain dan tidak menyebarkan ujaran kebencian."
    },
    {
      short: "Persatuan",
      title: "Sila 3: Persatuan Indonesia",
      practice: "Ngayah, gotong royong, dan hidup berdampingan.",
      digital: "Membagikan cerita budaya secara inklusif serta tidak memecah warga dengan informasi SARA."
    },
    {
      short: "Kerakyatan",
      title: "Sila 4: Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan",
      practice: "Paruman banjar dan kesepakatan pengelolaan air dalam subak.",
      digital: "Berdiskusi dengan data, mendengar tanggapan, dan memeriksa informasi sebelum menyimpulkan."
    },
    {
      short: "Keadilan",
      title: "Sila 5: Keadilan Sosial bagi Seluruh Rakyat Indonesia",
      practice: "Subak mengatur pembagian air dan tanggung jawab antarpetani.",
      digital: "Mendorong akses informasi dan teknologi yang setara serta mencantumkan sumber karya."
    }
  ];

  const root = document.querySelector("[data-timeline]");
  const list = root?.querySelector("[data-tl-list]");
  const trackWrap = root?.querySelector("[data-tl-track]");
  const track = trackWrap?.querySelector(".tl-track");
  const progress = trackWrap?.querySelector(".tl-progress");
  if (!root || !list || !track || !progress) return;

  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    element.className = className;
    if (text) element.textContent = text;
    return element;
  };

  const entries = sila.map((item, index) => {
    const entry = make("li", "tl-item");
    const node = make("span", "tl-node");
    const number = make("span", "tl-node-number", String(index + 1));
    number.setAttribute("aria-hidden", "true");
    const announcement = make("span", "tl-sr-only", `Tahap ${index + 1} dari ${sila.length}`);
    node.append(number, announcement);

    const card = make("article", "tl-card");
    const [silaNumber, ...silaName] = item.title.split(":");
    const title = make("h3", "isu__card-title tl-card-title");
    title.append(
      make("span", "tl-card-sila-number", `${silaNumber}:`),
      make("span", "tl-card-sila-name", silaName.join(":").trim().replace("/", "/\u200b"))
    );
    title.dataset.tlReveal = "1";
    const practice = make("section", "tl-card-detail");
    const practiceTitle = make("h4", "tl-card-label", "Praktik budaya Bali");
    practiceTitle.dataset.tlReveal = "2";
    const practiceText = make("p", "isu__text tl-card-copy", item.practice);
    practiceText.dataset.tlReveal = "2";
    practice.append(practiceTitle, practiceText);

    const digital = make("section", "tl-card-detail");
    const digitalTitle = make("h4", "tl-card-label", "Sikap di dunia digital");
    digitalTitle.dataset.tlReveal = "3";
    const digitalText = make("p", "isu__text tl-card-copy", item.digital);
    digitalText.dataset.tlReveal = "3";
    digital.append(digitalTitle, digitalText);

    card.append(title, practice, digital);
    entry.append(node, card);
    list.append(entry);
    return { entry, node, card };
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const supportsObserver = "IntersectionObserver" in window;
  const pending = new Set();
  let revealTimer = 0;
  let observer = null;
  let frame = 0;

  function revealNext() {
    if (revealTimer || pending.size === 0) return;
    const index = Math.min(...pending);
    pending.delete(index);
    revealTimer = window.setTimeout(() => {
      entries[index].entry.classList.add("is-revealed");
      revealTimer = 0;
      revealNext();
      scheduleProgress();
    }, index === 0 ? 0 : 120);
  }

  function observeItems() {
    if (observer) observer.disconnect();
    if (!supportsObserver || reducedMotion) {
      root.classList.remove("tl-motion");
      entries.forEach(({ entry }) => entry.classList.add("is-revealed"));
      return;
    }
    root.classList.add("tl-motion");
    const activationInset = Math.round(window.innerHeight * .22);
    observer = new IntersectionObserver((changes, currentObserver) => {
      changes
        .filter((change) => change.isIntersecting)
        .sort((a, b) => entries.findIndex((item) => item.entry === a.target) -
          entries.findIndex((item) => item.entry === b.target))
        .forEach((change) => {
          const index = entries.findIndex((item) => item.entry === change.target);
          if (index >= 0 && !change.target.classList.contains("is-revealed")) {
            pending.add(index);
            currentObserver.unobserve(change.target);
          }
        });
      revealNext();
    }, { rootMargin: `0px 0px -${activationInset}px 0px`, threshold: 0 });
    entries.forEach(({ entry }) => {
      if (!entry.classList.contains("is-revealed")) observer.observe(entry);
    });
  }

  function updateProgress() {
    const wrapTop = trackWrap.getBoundingClientRect().top;
    const nodeCenter = (index) => {
      const rect = entries[index].node.getBoundingClientRect();
      return rect.top - wrapTop + rect.height / 2;
    };
    const firstCenter = nodeCenter(0);
    track.style.top = `${firstCenter}px`;
    track.style.height = `${Math.max(0, nodeCenter(entries.length - 1) - firstCenter)}px`;
    progress.style.top = `${firstCenter}px`;

    const activationLine = window.innerHeight * .76;
    let activeIndex = 0;
    entries.forEach(({ entry }, index) => {
      if (entry.getBoundingClientRect().top <= activationLine) activeIndex = index;
    });
    progress.style.height = `${Math.max(0, nodeCenter(activeIndex) - firstCenter)}px`;
  }

  function scheduleProgress() {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      updateProgress();
    });
  }

  observeItems();
  scheduleProgress();
  window.addEventListener("scroll", scheduleProgress, { passive: true });
  window.addEventListener("resize", () => {
    observeItems();
    scheduleProgress();
  }, { passive: true });
})();
