/* Data shared by every page; keep paths relative for file:// support. */
window.SITE_CONTENT = {
  name: "Pancasila dalam Budaya",
  subtitle: "Jejak Nilai, Etika, dan Kearifan Bali di Dunia Digital",
  pages: [
    { id: "beranda", title: "Beranda", url: "index.html", cta: "Mulai Menjelajah", shortCta: "Jelajahi", credit: "Nama penanggung jawab" },
    { id: "budaya", title: "Budaya", url: "budaya.html", cta: "Lanjut ke Etika", shortCta: "Lanjut", credit: "Nama penanggung jawab" },
    { id: "etika", title: "Etika", url: "etika.html", cta: "Lanjut ke Cek Fakta", shortCta: "Lanjut", credit: "Nama penanggung jawab" },
    { id: "cekfakta", title: "Cek Fakta", url: "cekfakta.html", cta: "Lanjut ke Komitmen", shortCta: "Lanjut", credit: "Nama penanggung jawab" },
    { id: "komitmen", title: "Komitmen", url: "komitmen.html", cta: "Kembali ke Beranda", shortCta: "Kembali", credit: "Nama penanggung jawab" }
  ]
};

/* Salinan teks untuk section isu di beranda. */
window.contentIsu = {
  heroButton: "Lihat Isu yang Kami Angkat",
  sourcePrefix: "Sumber: ",
  note: "Data diakses pada 23 November 2026. Angka dapat berubah mengikuti pembaruan sumber.",
  label: "01 · Isu Aktual",
  title: "Setiap Informasi Punya Dampak",
  intro: "Di tengah derasnya arus informasi, tidak semua yang kita baca mencerminkan kebenaran. Tiga isu berikut menjadi titik awal untuk memahami apa yang terjadi di baliknya.",
  items: [
    {
      number: "01",
      title: "Kabar yang Terlalu Cepat Dipercaya",
      text: "Informasi keliru sering menyebar lebih cepat daripada klarifikasinya, apalagi bila dikemas dengan judul yang memancing emosi. Satu hal sederhana bisa memutus rantainya: periksa sumber sebelum menekan bagikan.",
      dataLabel: "DATA",
      data: "Ditemukan **1.890** konten hoaks sepanjang 20 Okt 2024 - 6 Des 2025 (Komdigi).",
      sumberLabel: "Koran Jakarta, 8 Des 2025",
      sumberUrl: "https://koran-jakarta.com/2025-12-08/menkomdigi-ada-1890-konten-hoaks-dalam-setahun-terakhir",
      sila: "Sila 4",
      silaText: "Berpikir jernih sebelum bersikap."
    },
    {
      number: "02",
      title: "Kata yang Memecah",
      text: "Komentar yang merendahkan seseorang atau kelompok bisa diketik dalam hitungan detik, tetapi dampaknya pada rasa kebersamaan bisa bertahan lama.",
      dataLabel: "DATA",
      data: "Ujaran kebencian menjadi risiko kedua dalam penilaian kesopanan warganet Indonesia: **27%** (Microsoft Digital Civility Index, survei 2020).",
      sumberLabel: "Metro TV",
      sumberUrl: "https://metrotvnews.com/read/bw6Co3jQ-ini-alasan-warganet-ri-dapat-julukan-netizen-paling-tak-sopan",
      sila: "Sila 3",
      silaText: "Perbedaan untuk merekatkan, bukan memisahkan."
    },
    {
      number: "03",
      title: "Data yang Terlanjur Tersebar",
      text: "Foto, alamat, atau percakapan pribadi orang lain kerap dibagikan tanpa izin, seolah milik bersama. Di balik layar, ada manusia yang berhak dihormati.",
      dataLabel: "DATA",
      data: "**56** kasus dugaan pelanggaran perlindungan data pribadi tercatat Okt 2024 - Nov 2025 (Komdigi).",
      sumberLabel: "detikInet, 28 Des 2025",
      sumberUrl: "https://inet.detik.com/law-and-policy/d-8281251/komdigi-terima-ratusan-aduan-soal-perlindungan-data-pribadi",
      sila: "Sila 2",
      silaText: "Martabat manusia di atas rasa penasaran."
    }
  ],
  closingLabel: "IDENTITAS NASIONAL",
  closingIndex: "01 /",
  closingHeadline: "Budaya Bali adalah bagian dari kekayaan Indonesia.",
  closingBefore: "Pancasila dan ",
  closingHighlight: "Bhinneka Tunggal Ika",
  closingAfter: " menyatukan keberagaman, sekaligus mengingatkan kita bahwa menjaga budaya juga berarti menjaga sikap—termasuk di dunia maya."
};

/* Salinan teks dan aset untuk preview budaya pada beranda. */
window.contentBudaya = {
  label: "02 · Budaya",
  title: "Warisan yang Mengajarkan Cara Hidup Bersama",
  intro: "Di balik setiap tradisi Bali, tersimpan nilai tentang kebersamaan, keharmonisan, dan rasa saling menghargai. Dari kuliner hingga kesenian, mari mengenali bagaimana warisan budaya mengajarkan kita hidup berdampingan dalam keberagaman.",
  button: "Jelajahi Budaya",
  href: "budaya.html",
  fallbackPrefix: "FOTO: ",
  panels: [
    {
      type: "Kuliner",
      name: "Lawar",
      description: "Dibuat dan dinikmati bersama, dari dapur banjar sampai meja upacara.",
      sila: "Sila 3",
      message: "Bagikan hal yang mempersatukan.",
      photo: "assets/budaya/kuliner.jpeg",
      placeholder: "Hidangan lawar Bali",
      alt: "Hidangan lawar Bali"
    },
    {
      type: "Tarian",
      name: "Tari Kecak",
      description: "Ratusan suara menyatu tanpa satu pun alat musik.",
      sila: "Sila 4",
      message: "Banyak suara, satu irama musyawarah.",
      photo: "assets/budaya/tarian.jpeg",
      placeholder: "Pementasan Tari Kecak",
      alt: "Pementasan Tari Kecak"
    },
    {
      type: "Musik",
      name: "Gamelan",
      description: "Tiap alat berbeda, tetapi harmoni lahir saat dimainkan bersama.",
      sila: "Sila 3 dan 4",
      message: "Perbedaan pendapat tidak harus jadi pertengkaran.",
      photo: "assets/budaya/musik.jpeg",
      placeholder: "Pemain gamelan Bali",
      alt: "Pemain gamelan Bali"
    },
    {
      type: "Kerajinan",
      name: "Ukiran",
      description: "Lahir dari ketelatenan dan penghargaan pada proses.",
      sila: "Sila 5",
      message: "Hargai karya dan pembuatnya, cantumkan sumbernya.",
      photo: "assets/budaya/kerajinan.jpeg",
      placeholder: "Pengrajin ukiran kayu Bali",
      alt: "Pengrajin ukiran kayu Bali"
    }
  ]
};

/* Salinan teks untuk preview etika bermedia pada beranda. */
window.contentEtika = {
  label: "03 · Etika",
  title: "Bijak Mengelola Informasi",
  intro: "Etika bermedia bukan aturan yang rumit. Ia dimulai dari tiga kebiasaan kecil yang bisa dilakukan hari ini.",
  closing: "Tiga kebiasaan kecil ini adalah wujud nyata sila kedua, keempat, dan kelima di layar kita.",
  button: "Pelajari Etika Bermedia",
  href: "etika.html",
  items: [
    {
      number: "01",
      title: "Saring sebelum sharing",
      text: "Periksa siapa yang menulis, kapan ditulis, dan apakah ada sumber lain yang mengatakan hal yang sama.",
      sila: "Sila 4"
    },
    {
      number: "02",
      title: "Hormati orang di balik layar",
      text: "Minta izin sebelum membagikan foto atau cerita orang lain, dan pikirkan bagaimana perasaanmu bila berada di posisinya.",
      sila: "Sila 2"
    },
    {
      number: "03",
      title: "Hargai karya",
      text: "Cantumkan sumber setiap foto, tulisan, atau video yang kamu pakai.",
      sila: "Sila 5"
    }
  ]
};

/* Satu contoh klaim untuk preview cek fakta; lengkapi placeholder bersama tim. */
window.contentCekfakta = {
  label: "04 · Cek Fakta",
  title: "Bisakah Kamu Membedakannya?",
  intro: "Coba satu contoh. Baca klaimnya, tebak, lalu lihat faktanya.",
  claimLabel: "Klaim yang beredar",
  question: "Menurutmu, klaim ini...",
  hoaxChoice: "Hoaks",
  factChoice: "Fakta",
  claim: "[ISI KLAIM CONTOH]",
  verdict: "hoaks",
  explanation: "[ISI PENJELASAN + SUMBER BANTAHAN]",
  steps: ["[ISI LANGKAH 1]", "[ISI LANGKAH 2]", "[ISI LANGKAH 3]"],
  sourcePrefix: "Sumber:",
  sourceLabel: "[ISI NAMA SUMBER]",
  sourceUrl: "#",
  factsHeading: "Faktanya",
  stepsHeading: "Cara memeriksanya",
  correctGuess: "Tebakanmu benar.",
  incorrectGuess: "Tebakanmu keliru.",
  retry: "Coba lagi",
  closing: "Masih ada kartu hoaks lain dan lima soal kuis menunggu di halaman Cek Fakta.",
  button: "Ikuti Kuis Lengkapnya",
  href: "cekfakta.html",
  verdictAnnouncement: "Putusan: "
};

/* Salinan teks untuk preview kartu komitmen pada beranda. */
window.contentKomitmen = {
  label: "05 · Komitmen",
  title: "Satu Janji Kecil, Dibagikan Bersama",
  intro: "Pilih komitmen digitalmu, tuliskan namamu, lalu unduh kartunya dan bagikan ke Instagram atau TikTok. Kebiasaan baik menular lewat contoh.",
  legend: "Pilih komitmenmu",
  commitments: [
    "Saya akan memeriksa sumber sebelum membagikan.",
    "Saya akan menulis komentar yang menghargai, bukan merendahkan.",
    "Saya akan meminta izin sebelum membagikan data atau foto orang lain.",
    "Saya akan mencantumkan sumber karya yang saya pakai."
  ],
  nameLabel: "Namamu",
  namePlaceholder: "Tulis namamu",
  privacy: "Namamu hanya tampil di layar ini dan tidak disimpan.",
  cardTitle: "Saya berkomitmen bijak bermedia.",
  defaultName: "Namamu",
  hashtag: "#PancasilaDalamBudaya",
  caption: "Pratinjau kartu",
  button: "Buat Kartu Komitmen",
  href: "komitmen.html",
  logoAlt: "Logo Pancasila dalam Budaya",
  nameAnnouncementPrefix: "Namamu: "
};

/* Penutup beranda dan salinan footer bersama semua halaman. */
window.contentPenutup = {
  titleBefore: "Mulai dari Satu ",
  titleHighlight: "Jeda",
  titleAfter: " Kecil",
  copy: "Menjaga budaya dan menjaga informasi sama-sama dimulai dari hal sederhana: berhenti sejenak sebelum membagikan. Telusuri halaman-halamannya, lalu bawa pulang satu komitmen untuk dibagikan.",
  button: "Mulai Menjelajah",
  href: "budaya.html",
  shareBefore: "Bagikan di Instagram, TikTok, dan YouTube dengan ",
  hashtag: "#PancasilaDalamBudaya"
};

window.contentFooter = {
  subtitle: "Jejak Nilai, Etika, dan Kearifan Bali di Dunia Digital",
  projectNote: "Proyek kelompok mata kuliah Pancasila.",
  exploreTitle: "Jelajahi",
  followTitle: "Ikuti & Bagikan",
  navLabel: "Navigasi footer",
  social: [
    { name: "Instagram", url: "" },
    { name: "TikTok", url: "" },
    { name: "YouTube", url: "" }
  ],
  hashtag: "#PancasilaDalamBudaya",
  hakCipta: "© 2026 Pancasila dalam Budaya",
  kembaliKeAtas: "Kembali ke atas",
  logoAlt: "Pancasila dalam Budaya"
};
