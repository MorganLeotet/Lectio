/* =============================================
                    CAROUSEL 
===============================================*/
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll("[data-carousel]");

  carousels.forEach(carousel => {
    const track = carousel.querySelector(".carousel-track");
    const cards = track.children;
    const prevBtn = carousel.querySelector(".carousel-prev");
    const nextBtn = carousel.querySelector(".carousel-next");

    if (!track || !prevBtn || !nextBtn || cards.length === 0) {
      console.warn("Carousel incomplet, ignoré", carousel);
      return;
    }

    const visible = parseInt(carousel.dataset.visible, 10);
    let index = 0;

    const cardWidth = cards[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const step = cardWidth + gap;

    function update() {
      track.style.transform = `translateX(-${index * step}px)`;

      prevBtn.disabled = index === 0;
      nextBtn.disabled = index >= cards.length - visible;
    }

    prevBtn.addEventListener("click", () => {
      if (index > 0) {
        index--;
        update();
      }
    });

    nextBtn.addEventListener("click", () => {
      if (index < cards.length - visible) {
        index++;
        update();
      }
    });

    update();
  });
});

