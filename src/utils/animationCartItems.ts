export function animationCartItems(delay: number) {
  const cards = document.querySelectorAll(".cart-item");
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("animated");
    }, index * delay);
  });
}
