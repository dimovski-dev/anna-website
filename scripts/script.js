const accordions = document.querySelectorAll(".accordion");
const accordionContainers = document.querySelectorAll(".accordion-container");
const accordionIcons = document.querySelectorAll(".accordion-icon");

// Add click event listeners to each accordion header
accordions.forEach((header, index) => {
  header.addEventListener("click", () => {
    // Toggle the display property of the selected accordion container
    if (accordionContainers[index].style.display === "block") {
      accordionContainers[index].style.display = "none";
      accordionIcons[index].src = "./assets/icons/IconPlus.svg"; // Change icon to plus
    } else {
      accordionContainers[index].style.display = "block";
      accordionIcons[index].src = "./assets/icons/IconMinus.svg"; // Change icon to minus
    }
  });
});

let currentSlide = 0;
const slider = document.querySelector(".slider");
const sliderItems = document.querySelectorAll(".slider-item");
const dotsContainer = document.querySelector(".slider-dots");

// Function to create slider dots dynamically
function createSliderDots() {
  // Clear existing dots
  dotsContainer.innerHTML = "";

  sliderItems.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = "slider-dot";
    dot.onclick = () => goToSlide(index);
    dotsContainer.appendChild(dot);
  });
}

createSliderDots(); // Create dots when the page loads

function goToSlide(slideIndex) {
  if (slideIndex < 0 || slideIndex >= sliderItems.length) {
    return;
  }

  slider.scrollTo({
    left: slideIndex * slider.clientWidth,
    behavior: "smooth",
  });

  currentSlide = slideIndex;
  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll(".slider-dot");
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

slider.addEventListener("scroll", () => {
  const slideIndex = Math.round(slider.scrollLeft / slider.clientWidth);
  if (slideIndex !== currentSlide) {
    currentSlide = slideIndex;
    updateDots();
  }
});

// Initialize dots and update on window resize
window.addEventListener("resize", () => {
  createSliderDots();
  updateDots();
});

// Initialize dots
updateDots();
