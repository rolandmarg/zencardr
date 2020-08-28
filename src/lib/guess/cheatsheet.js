export default class Cheatsheet {
  constructor(cards) {
    this.cardsIndices = [];

    cards.unique.forEach((card) => {
      const indices = [];

      cards.cards.forEach((c, index) => {
        if (c.name === card.name) {
          indices.push(index);
        }
      });

      this.cardsIndices.push({ card, indices });
    });
  }

  getCardIndices(cardName) {
    const cardIndices = this.cardsIndices.find(
      (cardIndices) => cardIndices.card.name === cardName
    );

    return cardIndices;
  }
}
