(() => {
  "use strict";

  if (!("speechSynthesis" in window) ||
      !("SpeechSynthesisUtterance" in window)) {
    return;
  }

  const main = document.querySelector("main");
  if (!main) return;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "read-aloud";
  button.textContent = "🔊 このページを読む";
  button.setAttribute("aria-pressed", "false");
  main.before(button);

  let speaking = false;

  function textFor(element) {
    const clone = element.cloneNode(true);

    clone.querySelectorAll(
      "nav,script,style,.qr-code,.short-url,[aria-hidden='true'],[data-no-speak]"
    ).forEach((node) => node.remove());

    clone.querySelectorAll("[data-speak]").forEach((node) => {
      node.textContent = node.dataset.speak;
    });

    clone.querySelectorAll("h1,h2,h3,h4,p,li,blockquote")
      .forEach((node) => node.append(document.createTextNode("。\n")));

    return clone.textContent
      .replace(/\s+/g, " ")
      .replace(/。+/g, "。")
      .trim();
  }

  function japaneseVoice() {
    const voices = speechSynthesis.getVoices();
    return voices.find((voice) => voice.lang === "ja-JP") ||
           voices.find((voice) => voice.lang.startsWith("ja")) ||
           null;
  }

  function stop() {
    speechSynthesis.cancel();
    speaking = false;
    button.textContent = "🔊 このページを読む";
    button.setAttribute("aria-pressed", "false");
  }

  function speak() {
    const text = textFor(main);
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";

    const voice = japaneseVoice();
    if (voice) utterance.voice = voice;

    utterance.onend = stop;
    utterance.onerror = stop;

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);

    speaking = true;
    button.textContent = "■ 読み上げを止める";
    button.setAttribute("aria-pressed", "true");
  }

  button.addEventListener("click", () => {
    speaking ? stop() : speak();
  });

  window.addEventListener("pagehide", stop);
})();
