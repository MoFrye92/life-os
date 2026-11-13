
const energyCards = document.querySelectorAll(".energy-card");
const selectionText = document.querySelector("#selection");

energyCards.forEach((card) => {
  card.addEventListener("click", () => {
    const selectedEnergy = card.dataset.energy;

    energyCards.forEach((otherCard) => {
      const isSelected = otherCard === card;

      otherCard.classList.toggle("is-selected", isSelected);
      otherCard.setAttribute(
        "aria-pressed",
        String(isSelected)
      );
    });

    selectionText.textContent =
      `${selectedEnergy} energy selected. Let's find something fun!`;
  });
});
