const speak = (obj, text) => {
  const pSpeakBubble = document.createElement("p");
  pSpeakBubble.className = "speech";
  pSpeakBubble.innerHTML = text;
  canvas.appendChild(pSpeakBubble);
};
