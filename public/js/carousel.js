
/* ==== CAROUSSEL ==== */

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carousel-track");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");

  if (!track || !btnPrev || !btnNext) return;

  const card = track.querySelector(".book-card");
  const gap = 32; // 2rem
  const scrollAmount = card.offsetWidth + gap;

  /*const scrollAmount = 220; // largeur carte + marge*/

  btnPrev.addEventListener("click", () => {
    track.scrollLeft -= scrollAmount;
  });

  btnNext.addEventListener("click", () => {
    track.scrollLeft += scrollAmount;
  });
});

