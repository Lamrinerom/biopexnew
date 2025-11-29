let suggestions = [
    "Channel",
    "CodingLab",
    "CodingNepal",
    "YouTube",
    "YouTuber",
    "YouTube Channel",
    "Blogger",
    "Bollywood",
    "Vlogger",
    "Vechiles",
    "Facebook",
    "Freelancer",
    "Facebook Page",
    "Designer",
    "Developer",
    "Web Designer",
    "Web Developer",
    "Login Form in HTML & CSS",
    "How to learn HTML & CSS",
    "How to learn JavaScript",
    "How to became Freelancer",
    "How to became Web Designer",
    "How to start Gaming Channel",
    "How to start YouTube Channel",
    "What does HTML stands for?",
    "What does CSS stands for?",
];

// getting all required elements
const searchInput = document.querySelector(".searchInput");
const input = searchInput.querySelector("input");
const resultBox = searchInput.querySelector(".resultBox");
const icon = searchInput.querySelector(".icon");
let linkTag = searchInput.querySelector("a");
let webLink;

// if user press any key and release
input.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase()); 
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = '<li>'+ data +'</li>';
        });
        searchInput.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = resultBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchInput.classList.remove("active"); //hide autocomplete box
    }
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = '<li>'+ userValue +'</li>';
    }else{
        listData = list.join('');
    }
    resultBox.innerHTML = listData;
}
// ---------------------------------------------------------------------------bannee00000


 document.addEventListener('DOMContentLoaded', () => {
  const banners = document.querySelectorAll('.banner-item');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;
  const changeInterval = 7500;

  function showBanner(index) {
    // Update banners
    banners.forEach((banner, i) => {
      banner.classList.toggle('active', i === index);
    });
    
    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function nextBanner() {
    currentIndex = (currentIndex + 1) % banners.length;
    showBanner(currentIndex);
  }

  // Dot click handler
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      showBanner(currentIndex);
    });
  });

  showBanner(currentIndex);
  setInterval(nextBanner, changeInterval);
});

// ------------------------------------------Slider category


(function() {
  'use strict';
  
  const carousel = document.getElementById("carousel");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const dotsContainer = document.getElementById("dots");

  let index = 0;
  let isTransitioning = false;
  let cardWidth = 0;

  // PERFECT CARD WIDTH CALCULATION WITH GAP
  function updateCardWidth() {
    const style = window.getComputedStyle(carousel);
    const gap = parseFloat(style.gap) || 0;
    cardWidth = carousel.children[0].offsetWidth + gap;
  }

  // Clone original cards for infinite loop
  const originalCards = Array.from(carousel.children);
  const originalCount = originalCards.length;
  
  // Add clones at the end
  originalCards.forEach(card => {
    const clone = card.cloneNode(true);
    carousel.appendChild(clone);
  });

  // Initial setup
  updateCardWidth();

  // Create dots for original cards only
  for (let i = 0; i < originalCount; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);

    dot.addEventListener("click", () => {
      if (!isTransitioning) {
        index = i;
        updateCarousel();
      }
    });
  }

  const dots = document.querySelectorAll(".dot");

  // Auto-play
  let autoSlide = setInterval(slideNext, 6000);

  function updateCarousel() {
    carousel.style.transform = `translateX(-${index * cardWidth}px)`;
    updateDots();
    isTransitioning = true;
  }

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === (index % originalCount));
    });
  }

  function slideNext() {
    if (isTransitioning) return;
    
    index++;
    
    if (index >= originalCount) {
      // Slide to clone, then reset
      carousel.style.transition = '0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      updateCarousel();
      
      setTimeout(() => {
        carousel.style.transition = 'none';
        index = 0;
        carousel.style.transform = `translateX(0px)`;
        carousel.offsetHeight; // Trigger reflow
        carousel.style.transition = '0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        isTransitioning = false;
      }, 600);
    } else {
      carousel.style.transition = '0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      updateCarousel();
      setTimeout(() => { isTransitioning = false; }, 600);
    }
  }

  function slidePrev() {
    if (isTransitioning) return;
    
    if (index === 0) {
      // Jump to last original instantly
      carousel.style.transition = 'none';
      index = originalCount - 1;
      carousel.style.transform = `translateX(-${index * cardWidth}px)`;
      carousel.offsetHeight;
      carousel.style.transition = '0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      
      setTimeout(() => {
        index--;
        updateCarousel();
        setTimeout(() => { isTransitioning = false; }, 600);
      }, 50);
    } else {
      index--;
      carousel.style.transition = '0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      updateCarousel();
      setTimeout(() => { isTransitioning = false; }, 600);
    }
  }

  // Event listeners
  nextBtn.addEventListener("click", slideNext);
  prevBtn.addEventListener("click", slidePrev);

  // Pause on hover
  const container = document.querySelector(".carousel-container");
  container.addEventListener("mouseenter", () => clearInterval(autoSlide));
  container.addEventListener("mouseleave", () => {
    autoSlide = setInterval(slideNext, 5000);
  });

  // PERFECT RESIZE HANDLER
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateCardWidth();
      updateCarousel();
    }, 250);
  });

})();

// ------------------------------------------Best seller section


document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.bs-carousel');
  const prevBtn = document.querySelector('.bs-prev');
  const nextBtn = document.querySelector('.bs-next');

  const card = carousel.querySelector('.bs-card');
  const cardWidth = () => card.getBoundingClientRect().width + 16; // 16 = gap

  let holdInterval = null;

  function scrollByCards(direction) {
    carousel.scrollBy({ left: direction * cardWidth(), behavior: 'smooth' });
  }

  // Click scroll
  prevBtn.addEventListener('click', () => scrollByCards(-1));
  nextBtn.addEventListener('click', () => scrollByCards(1));

  // Hold to slide
  function startHold(direction) {
    if (holdInterval) return;
    holdInterval = setInterval(() => {
      carousel.scrollBy({ left: direction * 10, behavior: 'auto' });
    }, 16);
  }
  function stopHold() {
    clearInterval(holdInterval);
    holdInterval = null;
  }

  ['mousedown', 'touchstart'].forEach(ev => {
    prevBtn.addEventListener(ev, e => { e.preventDefault(); startHold(-1); });
    nextBtn.addEventListener(ev, e => { e.preventDefault(); startHold(1); });
  });
  ['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach(ev => {
    prevBtn.addEventListener(ev, stopHold);
    nextBtn.addEventListener(ev, stopHold);
  });

  // Optional: drag to slide
  let isDown = false, startX, scrollLeft;
  carousel.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });
  window.addEventListener('mouseup', () => isDown = false);
  carousel.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5;
    carousel.scrollLeft = scrollLeft - walk;
  });
});
