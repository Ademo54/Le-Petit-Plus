// Fetch formules from the backend
async function fetchFormules() {
    try {
      const response = await fetch('http://localhost:8080/formules'); // Change to your backend URL
      if (!response.ok) {
        throw new Error('Failed to fetch formules');
      }
      const formules = await response.json();
      console.log('Fetched formules:', formules);
      return formules;
    } catch (error) {
      console.error('Error fetching formules:', error);
      return [];
    }
  }
  
  // Generate Swiper slides based on the formules data
  function generateSwiperSlides(formules) {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = ''; // Clear existing slides
  
    formules.forEach(formule => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `
        <a href="formulaire.html?id=${formule._id}">
          <img src="${formule.imageFormule}" alt="${formule.name}" />
          <div class="cost">${formule.name} - ${formule.price}€</div>
          <div class="overlay">
            <h1>${formule.name}</h1>
            <p>${formule.description}</p>
            <div class="ratings">
              <div class="stars">
                <ion-icon class="star" name="star"></ion-icon>
                <ion-icon class="star" name="star"></ion-icon>
                <ion-icon class="star" name="star"></ion-icon>
                <ion-icon class="star" name="star"></ion-icon>
                <ion-icon class="star-half-outline" name="star-half-outline"></ion-icon>
              </div>
            </div>
          </div>
        </a>
      `;
      swiperWrapper.appendChild(slide);
    });
  }
  
  // Initialize the Swiper instance after slides have been injected
  function initializeSwiper() {
    var swiper = new Swiper(".swiper", {
      effect: "cube",
      grabCursor: true,
      loop: true,
      speed: 1000,
      cubeEffect: {
        shadow: false,
        slideShadows: true,
        shadowOffset: 10,
        shadowScale: 0.94,
      },
      autoplay: {
        delay: 2600,
        pauseOnMouseEnter: true,
      },
    });
  }
  
  // On document load, fetch formules and initialize swiper
  document.addEventListener('DOMContentLoaded', async () => {
    const formules = await fetchFormules();
    generateSwiperSlides(formules);
    initializeSwiper();
  });
  