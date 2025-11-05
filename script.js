// Carousel functionality
const carousels = {
  screenshots: {
    currentIndex: 0,
    totalSlides: 22,
  },
  team: {
    currentIndex: 0,
    totalSlides: 8,
  },
};

function getVisibleSlides() {
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

function updateCarousel(type) {
  const track = document.getElementById(type + "Track");
  const visibleSlides = getVisibleSlides();
  const slideWidth = 100 / visibleSlides;
  const offset = -(carousels[type].currentIndex * slideWidth);
  track.style.transform = `translateX(${offset}%)`;
  updateDots(type);
}

function updateDots(type) {
  const dotsContainer = document.getElementById(type + "Dots");
  const visibleSlides = getVisibleSlides();
  const totalDots = Math.ceil(carousels[type].totalSlides / visibleSlides);
  const currentDot = Math.floor(carousels[type].currentIndex / visibleSlides);

  dotsContainer.innerHTML = "";
  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement("button");
    dot.className = "carousel-dot" + (i === currentDot ? " active" : "");
    dot.onclick = () => {
      carousels[type].currentIndex = i * visibleSlides;
      updateCarousel(type);
    };
    dotsContainer.appendChild(dot);
  }
}

function nextSlide(type) {
  const visibleSlides = getVisibleSlides();
  const maxIndex = carousels[type].totalSlides - visibleSlides;
  carousels[type].currentIndex = Math.min(
    carousels[type].currentIndex + 1,
    maxIndex
  );
  updateCarousel(type);
}

function prevSlide(type) {
  carousels[type].currentIndex = Math.max(carousels[type].currentIndex - 1, 0);
  updateCarousel(type);
}

// Initialize carousels
window.addEventListener("load", () => {
  updateCarousel("screenshots");
  updateCarousel("team");
});

// Handle window resize
window.addEventListener("resize", () => {
  updateCarousel("screenshots");
  updateCarousel("team");
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
