(function () {
  "use strict";

  const checks = [
    {
      aspect: "Pikiran",
      question: "Apakah niat saya baik?",
      description: "Mulai dari alasan di balik unggahan.",
      explanation: "Niat menentukan arah konten. Unggahan yang bertujuan mengenalkan makna tradisi akan terasa berbeda dari unggahan yang hanya mengejar sensasi.",
      examples: ["Bagikan untuk mengenalkan makna tradisi, bukan mengejek atau mencari sensasi.", "Tanyakan pada diri sendiri apa yang ingin dipelajari orang dari unggahan ini."],
      icon: ["M11 22h10m-9-4a7 7 0 1 1 8 0c-1.2.9-1.5 2-1.5 3h-5c0-1-.3-2.1-1.5-3Zm4 8v-5m-3 0h6M16 2v3M4.5 8l2.6 1.5m17.8 0L27.5 8"]
    },
    {
      aspect: "Ucapan",
      question: "Apakah keterangan saya benar dan sopan?",
      description: "Keterangan yang akurat menjaga makna budaya.",
      explanation: "Caption dan judul adalah bagian dari informasi. Nama upacara yang keliru atau judul yang berlebihan dapat menyesatkan dan merendahkan budaya yang dibahas.",
      examples: ["Periksa nama upacara dan hindari judul yang menyesatkan.", "Gunakan bahasa yang sopan dan rujuk sumber yang bisa dipercaya."],
      icon: ["M5 7h22v15H15l-6 5v-5H5zM10 12h12m-12 5h8"]
    },
    {
      aspect: "Perbuatan",
      question: "Apakah tindakan ini pantas di lokasi tersebut?",
      description: "Perilaku saat merekam juga ikut dinilai.",
      explanation: "Tempat suci dan upacara punya aturan. Mengambil gambar tidak boleh mengganggu jalannya upacara atau kekhusyukan orang yang beribadah.",
      examples: ["Ikuti arahan setempat dan jangan mengganggu jalannya upacara.", "Berpakaian sesuai aturan dan jangan memasuki area yang tidak diperuntukkan bagi pengunjung."],
      icon: ["M4 19c3-1 5-5 7-5 2 0 3 4 5 4h7a3 3 0 0 1 0 6h-9l-5 3-5-3zm7-7 2-4 3 2 2-4 3 2-2 5"]
    },
    {
      aspect: "Izin dan sumber",
      question: "Apakah saya sudah meminta izin dan memberi kredit?",
      description: "Hormati orang yang direkam dan pemilik karya.",
      explanation: "Orang yang terlihat dalam foto atau video berhak diminta persetujuannya, dan pembuat karya berhak disebut namanya.",
      examples: ["Minta persetujuan orang yang direkam dan cantumkan pemilik foto atau video.", "Tulis sumber informasi di bagian keterangan atau daftar pustaka."],
      icon: ["M16 3 27 7v8c0 7-4.5 11.5-11 14-6.5-2.5-11-7-11-14V7zm-5 13 3.5 3.5L22 14"]
    }
  ];

  const root = document.querySelector("[data-four-checks]");
  if (!root) return;

  const cards = [];
  let lastFlipped = null;
  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };

  function makeIcon(paths, className) {
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("viewBox", "0 0 32 32");
    icon.setAttribute("aria-hidden", "true");
    icon.classList.add(className);
    paths.forEach((d) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", d);
      icon.append(path);
    });
    return icon;
  }

  function setFlipped(card, flipped, returnFocus = true) {
    if (card.flipped === flipped) return;
    if (flipped) cards.filter((item) => item !== card && item.flipped).forEach((item) => setFlipped(item, false, false));
    card.flipped = flipped;
    if (flipped) lastFlipped = card;
    card.front.setAttribute("aria-hidden", String(flipped));
    card.front.inert = flipped;
    card.back.setAttribute("aria-hidden", String(!flipped));
    card.back.inert = !flipped;
    card.flipButton.setAttribute("aria-pressed", String(flipped));
    card.wrapper.classList.toggle("is-flipped", flipped);

    if (returnFocus) (flipped ? card.backButton : card.flipButton).focus();
    if (!flipped && lastFlipped === card) lastFlipped = [...cards].reverse().find((item) => item.flipped) || null;
  }

  checks.forEach((check, index) => {
    const number = String(index + 1).padStart(2, "0");
    const baseId = `fc-${number}`;
    const wrapper = make("article", "fc-card");
    const inner = make("div", "fc-card__inner");

    const front = make("section", "fc-front");
    front.id = `${baseId}-front`;
    front.setAttribute("aria-label", `Pertanyaan ${number}: ${check.aspect}`);
    const flipButton = make("button", "fc-front__button");
    flipButton.type = "button";
    flipButton.setAttribute("aria-pressed", "false");
    flipButton.setAttribute("aria-controls", `${baseId}-back`);

    const frontHeader = make("span", "fc-front__header");
    const frontNumber = make("span", "fc-front__number", number);
    frontNumber.setAttribute("aria-hidden", "true");
    frontHeader.append(frontNumber);

    const summary = make("span", "fc-front__summary");
    const iconCircle = make("span", "fc-front__icon-circle");
    iconCircle.append(makeIcon(check.icon, "fc-front__icon"));
    summary.append(iconCircle, make("span", "fc-front__aspect", check.aspect.toUpperCase()));
    const question = make("span", "fc-front__question", check.question);
    const description = make("span", "fc-front__description", check.description);
    const flipHint = make("span", "fc-front__hint");
    flipHint.textContent = "Balik kartu";
    flipButton.append(frontHeader, summary, question, description, flipHint);
    front.append(flipButton);
    front.setAttribute("aria-hidden", "false");
    front.inert = false;

    const back = make("section", "fc-back");
    back.id = `${baseId}-back`;
    back.setAttribute("aria-labelledby", `${baseId}-back-title`);
    back.setAttribute("aria-hidden", "true");
    back.inert = true;
    const backHeader = make("div", "fc-back__header");
    backHeader.append(make("span", "fc-back__number", number), make("span", "fc-back__aspect", check.aspect));
    const backTitle = make("h3", "fc-back__title", check.aspect);
    backTitle.id = `${baseId}-back-title`;
    const explanation = make("section", "fc-back__section");
    explanation.append(make("h4", "fc-back__section-title", "Penjelasan"), make("p", "fc-back__copy", check.explanation));
    const examples = make("section", "fc-back__section");
    examples.append(make("h4", "fc-back__section-title", "Contoh tindakan"));
    const exampleList = make("ul", "fc-back__examples");
    check.examples.forEach((example) => exampleList.append(make("li", "", example)));
    examples.append(exampleList);
    const backButton = make("button", "fc-back__button", "Kembali");
    backButton.type = "button";
    back.append(backHeader, backTitle, explanation, examples, backButton);

    inner.append(front, back);
    wrapper.append(inner);
    root.append(wrapper);
    const card = { wrapper, front, back, flipButton, backButton, flipped: false };
    cards.push(card);
    flipButton.addEventListener("click", () => setFlipped(card, true));
    backButton.addEventListener("click", () => setFlipped(card, false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (document.querySelector(".menu-panel.is-open")) return;
    const card = lastFlipped?.flipped ? lastFlipped : [...cards].reverse().find((item) => item.flipped);
    if (card) {
      event.preventDefault();
      setFlipped(card, false);
    }
  });

  root.classList.add("fc-grid--enhanced");
})();
