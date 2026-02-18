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

    if (!track || !prevBtn || !nextBtn || cards.length === 0) return;

    let index = 0;

    function isMobile() {
      return window.innerWidth <= 48 * 16; // 48rem
    }

    function getStep() {
      const firstCard = cards[0];
      const secondCard = cards[1];

      if (!secondCard) return 0;

      if (isMobile()) {
        return secondCard.offsetTop - firstCard.offsetTop;
      } else {
        return secondCard.offsetLeft - firstCard.offsetLeft;
      }
    }

    function getVisible() {
      if (window.innerWidth <= 48 * 16) return 1;
      if (window.innerWidth <= 64 * 16) return 4;
      return parseInt(carousel.dataset.visible, 10) || 6;
    }

    function update() {

      const step = getStep();
      const visible = getVisible();

      if (isMobile()) {
        track.style.transform = `translateY(-${index * step}px)`;
      } else {
        track.style.transform = `translateX(-${index * step}px)`;
      }

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
      if (index < cards.length - getVisible()) {
        index++;
        update();
      }
    });

    window.addEventListener("resize", () => {
      index = 0;
      update();
    });

    update();

  });

});

