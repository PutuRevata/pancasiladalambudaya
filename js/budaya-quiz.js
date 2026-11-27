(function () {
  "use strict";

  const questions = [
    {
      statement: "Semua orang boleh masuk area utama pura kapan saja.",
      answer: "mitos",
      explanation: "Pura punya aturan busana dan pembagian area. Area utama (utama mandala) diperuntukkan bagi mereka yang akan bersembahyang, dan ada waktu tertentu ketika pengunjung tidak diperkenankan masuk."
    },
    {
      statement: "Ogoh-ogoh hanyalah patung hiasan.",
      answer: "mitos",
      explanation: "Ogoh-ogoh melambangkan bhuta kala (kekuatan negatif) yang diarak menjelang Nyepi sebagai simbol penyucian, sehingga punya makna, bukan sekadar hiasan."
    },
    {
      statement: "Subak hanya soal bertani.",
      answer: "mitos",
      explanation: "Subak juga mengatur kerja sama, pembagian air yang adil, dan ritual keagamaan para petani."
    }
  ];

  const root = document.querySelector("[data-fm-quiz]");
  const scoreLabel = document.querySelector("[data-fm-score]");
  const finish = document.querySelector("[data-fm-finish]");
  const finishCopy = document.querySelector("[data-fm-finish-copy]");
  const retry = document.querySelector("[data-fm-retry]");
  if (!root || !scoreLabel || !finish || !finishCopy || !retry) return;

  const cards = [];
  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };

  function updateScore() {
    const score = cards.filter((card) => card.selection === card.data.answer).length;
    scoreLabel.textContent = `Skor: ${score} dari ${questions.length}`;
    return score;
  }

  function choose(card, choice) {
    if (card.selection) return;
    card.selection = choice;
    const correct = choice === card.data.answer;
    card.wrapper.classList.add("is-answered", correct ? "is-correct" : "is-wrong");
    card.buttons.forEach((button) => {
      button.disabled = true;
      if (button.dataset.answer === choice) button.classList.add("is-selected");
    });
    card.result.className = `fm-result ${correct ? "is-correct" : "is-wrong"}`;
    card.badge.textContent = correct ? "Tepat!" : "Belum tepat";
    card.answerLabel.textContent = `Jawaban benar: ${card.data.answer.toUpperCase()}`;
    card.explanation.textContent = card.data.explanation;
    card.reveal.setAttribute("aria-hidden", "false");
    card.reveal.inert = false;

    const score = updateScore();
    const allAnswered = cards.every((item) => item.selection);
    if (allAnswered) {
      finishCopy.textContent = `Kuis selesai. Kamu menjawab ${score} dari ${questions.length} dengan tepat.`;
      finish.hidden = false;
    }
    card.badge.focus({ preventScroll: true });
  }

  questions.forEach((data, index) => {
    const number = String(index + 1).padStart(2, "0");
    const id = `fm-question-${number}`;
    const wrapper = make("article", "fm-card");
    wrapper.setAttribute("role", "group");
    wrapper.setAttribute("aria-labelledby", id);

    const prompt = make("div", "fm-card__prompt");
    const numberLabel = make("span", "fm-card__number", number);
    numberLabel.setAttribute("aria-hidden", "true");
    const statement = make("q", "fm-card__statement", data.statement);
    statement.id = id;
    prompt.append(numberLabel, statement);

    const choices = make("div", "fm-card__choices");
    choices.setAttribute("role", "group");
    choices.setAttribute("aria-label", `Pilih jawaban untuk pernyataan ${number}`);
    const facts = make("button", "fm-card__choice", "Fakta");
    const myth = make("button", "fm-card__choice", "Mitos");
    [facts, myth].forEach((button) => {
      button.type = "button";
      button.dataset.answer = button.textContent.toLowerCase();
      button.addEventListener("click", () => choose(card, button.dataset.answer));
    });
    choices.append(facts, myth);

    const reveal = make("div", "fm-card__reveal");
    reveal.id = `${id}-result`;
    reveal.setAttribute("aria-live", "polite");
    reveal.setAttribute("aria-hidden", "true");
    reveal.inert = true;
    const revealInner = make("div", "fm-card__reveal-inner");
    const result = make("div", "fm-result");
    const badge = make("span", "fm-result__badge", "");
    badge.tabIndex = -1;
    const answerLabel = make("span", "fm-result__answer", "");
    result.append(badge, answerLabel);
    const explanation = make("p", "fm-card__explanation", "");
    revealInner.append(result, explanation);
    reveal.append(revealInner);
    wrapper.append(prompt, choices, reveal);

    const card = { data, wrapper, buttons: [facts, myth], reveal, result, badge, answerLabel, explanation, selection: null };
    cards.push(card);
    root.append(wrapper);
  });

  retry.addEventListener("click", () => {
    cards.forEach((card) => {
      card.selection = null;
      card.wrapper.classList.remove("is-answered", "is-correct", "is-wrong");
      card.buttons.forEach((button) => {
        button.disabled = false;
        button.classList.remove("is-selected");
      });
      card.result.className = "fm-result";
      card.badge.textContent = "";
      card.answerLabel.textContent = "";
      card.explanation.textContent = "";
      card.reveal.setAttribute("aria-hidden", "true");
      card.reveal.inert = true;
    });
    finish.hidden = true;
    updateScore();
    cards[0].buttons[0].focus();
  });

  scoreLabel.hidden = false;
  updateScore();
})();
