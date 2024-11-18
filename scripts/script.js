const accordions = document.querySelectorAll(".accordion-header");
const accordionContainers = document.querySelectorAll(".accordion-container");
const accordionIcons = document.querySelectorAll(".accordion-icon");


accordions.forEach((header) => {
  header.addEventListener("click", () => {
    const container = header.nextElementSibling; 
    const icon = header.querySelector(".accordion-icon"); 

    if (container.style.display === "block") {
      container.style.display = "none";
      icon.src = "./assets/icons/IconPlus.svg"; 
    } else {
      const parentAccordion = header.closest(".accordion-container");
      const siblingContainers = parentAccordion
        ? parentAccordion.querySelectorAll(".accordion-container")
        : [];

      siblingContainers.forEach((sibling) => {
        sibling.style.display = "none"; 
        const siblingIcon = sibling.previousElementSibling.querySelector(".accordion-icon");
        if (siblingIcon) siblingIcon.src = "./assets/icons/IconPlus.svg"; 
      });


      container.style.display = "block";
      icon.src = "./assets/icons/IconMinus.svg"; 
    }
  });
});

let currentSlide = 0;
const slider = document.querySelector(".slider");
const sliderItems = document.querySelectorAll(".slider-item");
const dotsContainer = document.querySelector(".slider-dots");


function createSliderDots() {
  dotsContainer.innerHTML = "";

  sliderItems.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = "slider-dot";
    dot.onclick = () => goToSlide(index);
    dotsContainer.appendChild(dot);
  });
}

createSliderDots(); 

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

window.addEventListener("resize", () => {
  createSliderDots();
  updateDots();
});


updateDots();
