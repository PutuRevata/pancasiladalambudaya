(function () {
  "use strict";

  const budaya = [
    {
      id: "tri-hita-karana",
      judul: "Tri Hita Karana",
      sila: "Sila 1, 2, dan 3",
      ringkas: "Tiga hubungan yang dijaga agar hidup selaras.",
      budaya: "Falsafah hidup Bali tentang keharmonisan hubungan dengan Tuhan (parhyangan), sesama (pawongan), dan alam (palemahan).",
      nilai: "Ketuhanan, kemanusiaan yang adil dan beradab, serta persatuan Indonesia.",
      etika: "Berkomunikasi dengan saling menghormati, termasuk menghormati hal yang disakralkan."
    },
    {
      id: "menyama-braya",
      judul: "Menyama Braya",
      sila: "Sila 1 dan 3",
      ringkas: "Hidup berdampingan sebagai saudara.",
      budaya: "Semangat hidup berdampingan sebagai saudara. Warga berbeda agama di Bali terbiasa saling membantu saat hari raya.",
      nilai: "Persatuan Indonesia dan kebebasan beragama.",
      etika: "Tidak menyebarkan ujaran kebencian, SARA, dan provokasi di kolom komentar."
    },
    {
      id: "ngayah",
      judul: "Ngayah dan gotong royong",
      sila: "Sila 3 dan 5",
      ringkas: "Bekerja tulus untuk kebaikan bersama.",
      budaya: "Kerja bakti tulus tanpa pamrih untuk pura, banjar, atau upacara. Warga menyumbang tenaga dan keahlian karena bekerja dianggap bagian dari persembahan (yadnya).",
      nilai: "Persatuan Indonesia dan keadilan sosial: beban dibagi bersama, hasilnya dinikmati bersama.",
      etika: "Berbagi informasi yang benar dan bermanfaat, membantu tanpa mencari sorotan, dan tidak menjadikan kegiatan gotong royong sekadar bahan konten."
    },
    {
      id: "paruman-banjar",
      judul: "Paruman banjar",
      sila: "Sila 4",
      ringkas: "Keputusan lahir dari musyawarah bersama.",
      budaya: "Keputusan banjar diambil lewat rapat bersama (paruman), bukan oleh satu orang.",
      nilai: "Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan.",
      etika: "Berdiskusi dengan sehat, menghargai perbedaan pendapat, dan tidak merundung orang lain."
    },
    {
      id: "subak",
      judul: "Subak",
      sila: "Sila 4 dan 5",
      ringkas: "Air dibagi adil, diatur bersama.",
      budaya: "Sistem pengairan sawah tradisional yang diatur bersama oleh para petani dan diakui UNESCO sebagai Warisan Budaya Dunia (2012).",
      nilai: "Pembagian air yang adil dan keputusan yang diambil bersama.",
      etika: "Akses informasi dan teknologi perlu adil dan merata agar tidak ada yang tertinggal."
    },
    {
      id: "nyepi",
      judul: "Nyepi",
      sila: "Sila 1 dan 2",
      ringkas: "Hening sejenak di tengah dunia yang bising.",
      budaya: "Hari raya dengan Catur Brata Penyepian: amati geni, amati karya, amati lelungan, amati lelanguan. Selama Nyepi, layanan internet seluler di Bali juga dimatikan.",
      nilai: "Ketakwaan dan saling menghormati keyakinan.",
      etika: "Belajar jeda dari layar dan sadar bahwa tidak semua hal perlu diunggah."
    }
  ];

  const grid = document.querySelector("[data-rb-grid]");
  const dialog = document.getElementById("rb-dialog");
  if (!grid || !dialog) return;

  const contentScroller = dialog.querySelector(".rb-m-scroll");
  const title = dialog.querySelector("#rb-dialog-title");
  const imageWrap = dialog.querySelector(".rb-dialog__image-wrap");
  const image = dialog.querySelector("[data-rb-image]");
  const sila = dialog.querySelector("[data-rb-sila]");
  const culture = dialog.querySelector("[data-rb-culture]");
  const values = dialog.querySelector("[data-rb-values]");
  const ethics = dialog.querySelector("[data-rb-ethics]");
  const position = dialog.querySelector("[data-rb-position]");
  const closeButton = dialog.querySelector("[data-rb-close]");
  let activeIndex = 0;
  let returnFocus = null;
  let closeTimer = 0;

  function setImage(target, wrap, item, loading) {
    target.hidden = false;
    wrap.classList.remove("is-missing");
    target.alt = `Ilustrasi ${item.judul} dalam budaya Bali`;
    target.loading = loading;
    target.onerror = function () {
      target.hidden = true;
      wrap.classList.add("is-missing");
    };
    target.src = `assets/budaya/${item.id}.jpg`;
  }

  function makeCard(item, index) {
    const button = document.createElement("button");
    button.className = "rb-card";
    button.type = "button";
    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute("aria-label", `Baca selengkapnya: ${item.judul}`);

    const media = document.createElement("span");
    media.className = "rb-card__media";
    const photo = document.createElement("img");
    photo.width = 800;
    photo.height = 600;
    setImage(photo, media, item, "lazy");
    const shade = document.createElement("span");
    shade.className = "rb-card__shade";
    shade.setAttribute("aria-hidden", "true");
    const badge = document.createElement("span");
    badge.className = "isu__sila-tag rb-card__sila";
    badge.textContent = item.sila;
    media.append(photo, shade, badge);

    const body = document.createElement("span");
    body.className = "rb-card__body";
    const heading = document.createElement("span");
    heading.className = "isu__card-title rb-card__title";
    heading.textContent = item.judul;
    const summary = document.createElement("span");
    summary.className = "isu__text rb-card__summary";
    summary.textContent = item.ringkas;
    const more = document.createElement("span");
    more.className = "rb-card__more";
    more.append(document.createTextNode("Baca selengkapnya"));
    const arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    arrow.setAttribute("viewBox", "0 0 20 20");
    arrow.setAttribute("aria-hidden", "true");
    arrow.setAttribute("focusable", "false");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M3.5 10h12m-5-5 5 5-5 5");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "1.7");
    path.setAttribute("stroke-linecap", "square");
    arrow.append(path);
    more.append(arrow);
    body.append(heading, summary, more);
    button.append(media, body);
    button.addEventListener("click", () => openDialog(index, button));
    return button;
  }

  function render(index) {
    activeIndex = (index + budaya.length) % budaya.length;
    const item = budaya[activeIndex];
    title.textContent = item.judul;
    sila.textContent = item.sila;
    culture.textContent = item.budaya;
    values.textContent = item.nilai;
    ethics.textContent = item.etika;
    position.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(budaya.length).padStart(2, "0")}`;
    contentScroller.scrollTop = 0;
    setImage(image, imageWrap, item, "eager");
  }

  function openDialog(index, trigger) {
    if (closeTimer) window.clearTimeout(closeTimer);
    dialog.classList.remove("is-closing");
    returnFocus = trigger;
    render(index);
    dialog.showModal();
    window.requestAnimationFrame(() => closeButton.focus({ preventScroll: true }));
  }

  function closeDialog() {
    if (!dialog.open || dialog.classList.contains("is-closing")) return;
    dialog.classList.add("is-closing");
    closeTimer = window.setTimeout(() => {
      dialog.close();
      dialog.classList.remove("is-closing");
      closeTimer = 0;
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 150 : 200);
  }

  budaya.forEach((item, index) => grid.append(makeCard(item, index)));
  closeButton.addEventListener("click", closeDialog);
  dialog.querySelector("[data-rb-previous]").addEventListener("click", () => render(activeIndex - 1));
  dialog.querySelector("[data-rb-next]").addEventListener("click", () => render(activeIndex + 1));
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeDialog();
  });
  dialog.addEventListener("close", () => {
    dialog.classList.remove("is-closing");
    if (returnFocus && returnFocus.isConnected) returnFocus.focus({ preventScroll: true });
    returnFocus = null;
  });
})();
