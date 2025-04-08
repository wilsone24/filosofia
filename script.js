let activeCard = null;

document.querySelectorAll(".card").forEach((card) => {
  const inner = document.createElement("div");
  inner.classList.add("card-inner");

  const front = document.createElement("div");
  front.classList.add("card-front");
  front.textContent = "?";

  const back = document.createElement("div");
  back.classList.add("card-back");

  const img = document.createElement("img");
  img.src = card.getAttribute("data-image");

  const blanks = document.createElement("div");
  blanks.className = "blanks";
  blanks.textContent = card.getAttribute("data-blanks");

  back.appendChild(img);
  back.appendChild(blanks);
  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);

  card.addEventListener("click", () => {
    if (activeCard && activeCard !== card) {
      activeCard.classList.remove("flipped");
    }
    card.classList.toggle("flipped");
    activeCard = card.classList.contains("flipped") ? card : null;
  });
});

document.getElementById("guessInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const guess = e.target.value.trim().toLowerCase();
    if (!activeCard) return;

    const correctAnswer = activeCard.getAttribute("data-answer").toLowerCase();
    const blanksElement = activeCard.querySelector(".blanks");

    if (guess === correctAnswer) {
      blanksElement.textContent = correctAnswer.toUpperCase();
      blanksElement.classList.add("correct"); // <- ✨ Añade la clase para el efecto visual
      e.target.value = "";
      activeCard = null;
    } else {
      e.target.value = "";
      alert("¡Incorrecto! Intenta de nuevo.");
    }
  }
});
